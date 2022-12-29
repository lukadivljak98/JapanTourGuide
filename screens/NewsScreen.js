import { useEffect, useState, useCallback } from "react";
import { View, ScrollView, StyleSheet, FlatList } from "react-native";
import Article from "../components/Article";
import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

function NewsScreen() {
  const [articles, setArticles] = useState([]);
  const [isCachingEnabled, setIsCachingEnabled] = useState();
  const [cachedArticles, setCachedArticles] = useState([]);
  const netInfo = NetInfo.useNetInfo();

  const getNews = () => {
    if (netInfo.isConnected || netInfo.isConnected === null) {
      axios
        .get(
          "https://newsapi.org/v2/top-headlines?country=jp&apiKey=08622915bdfb48bf87979d58ddc769a5",
          {
            params: {
              category: "general",
            },
          }
        )
        .then(function (response) {
          // handle success
          setArticles(response.data.articles);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
      if (isCachingEnabled) {
        saveSetting("articles", JSON.stringify(articles));
        getArticles();
      }
    } else if (!netInfo.isConnected && isCachingEnabled) {
      setArticles(cachedArticles);
    }
  };

  const saveSetting = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  };

  const getSetting = async () => {
    try {
      const isEnabledPref = await AsyncStorage.getItem("isEnabled");
      if (isEnabledPref !== null) {
        if (isEnabledPref == "true") {
          setIsCachingEnabled(true);
        } else {
          setIsCachingEnabled(false);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getArticles = async () => {
    try {
      const cachedArticles = await AsyncStorage.getItem("articles");
      if (cachedArticles !== null) {
        setCachedArticles(cachedArticles);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getNews();
    getSetting();
  }, []);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    wait(1000).then(() => setIsRefreshing(false));
    getNews();
  }, [articles]);

  return (
    <View>
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <Article
            urlToImage={item.urlToImage}
            title={item.title}
            description={item.description}
            author={item.author}
            date={item.publishedAt}
            source={item.source.name}
            url={item.url}
          />
        )}
        keyExtractor={(item) => item.title}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
}

export default NewsScreen;
