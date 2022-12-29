import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  DevSettings,
} from "react-native";
import { uniqueId } from "lodash";
import { useEffect, useReducer, useState } from "react";
import AppModal from "../components/AppModal";
import IconButton from "../components/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";

function SettingsScreen() {
  const [isEnabled, setIsEnabled] = useState();

  const toggleSwitch = () => {
    saveSetting("isEnabled", JSON.stringify(!isEnabled));
    setIsEnabled(!isEnabled);
  };

  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [citiesModalVisible, setCitiesModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [numOfPhotos, setNumOfPhotos] = useState(5);

  const saveSetting = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  };

  const getSetting = async () => {
    try {
      const languagePref = await AsyncStorage.getItem("language");
      const numOfPhotosPref = await AsyncStorage.getItem("numOfPhotos");
      const isEnabledPref = await AsyncStorage.getItem("isEnabled");

      if (languagePref !== null) {
        setSelectedLanguage(languagePref);
      }
      if (numOfPhotosPref !== null) {
        setNumOfPhotos(numOfPhotosPref);
      }
      if (isEnabledPref !== null) {
        if (isEnabledPref == "true") {
          setIsEnabled(true);
        } else {
          setIsEnabled(false);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSetting();
  }, []);

  const settingsOptions = [
    {
      mainTitle: selectedLanguage == "English" ? "Languages" : "Jezici",
      title:
        selectedLanguage == "English" ? "Selected Language" : "Izabrani jezik",
      subTitle: selectedLanguage,
      onPress: () => {
        setLanguageModalVisible(true);
      },
    },
    {
      mainTitle: selectedLanguage == "English" ? "Cities" : "Gradovi",
      title:
        selectedLanguage == "English"
          ? "Number of photos per city"
          : "Broj slika po gradu",
      subTitle: numOfPhotos,
      onPress: () => {
        setCitiesModalVisible(true);
      },
    },
    {
      mainTitle: selectedLanguage == "English" ? "News" : "Vijesti",
      title: selectedLanguage == "English" ? "Caching" : "Keširanje",
      subTitle: null,
      onPress: () => {},
    },
  ];

  const prefArray = [
    {
      language: "Srpski",
      selected: selectedLanguage === "Srpski",
      onPress: () => {
        setSelectedLanguage("Srpski");
        saveSetting("language", "Srpski");
        alert("Reopen the app for all changes to take effect");
        setLanguageModalVisible(false);
        getSetting();
        //forceUpdate();
      },
      title:
        selectedLanguage == "English" ? "Select Language" : "Izaberite jezik",
    },
    {
      language: "English",
      selected: selectedLanguage === "English",
      onPress: () => {
        setSelectedLanguage("English");
        saveSetting("language", "English");
        alert("Reopen the app for all changes to take effect");
        setLanguageModalVisible(false);
        getSetting();
        //forceUpdate();
      },
    },
  ];

  const prefArrayCities = [
    {
      num: "5",
      selected: numOfPhotos == "5",
      onPress: () => {
        setNumOfPhotos(5);
        saveSetting("numOfPhotos", "5");
        setCitiesModalVisible(false);
      },
    },
    {
      num: "10",
      selected: numOfPhotos == "10",
      onPress: () => {
        setNumOfPhotos(10);
        saveSetting("numOfPhotos", "10");
        setCitiesModalVisible(false);
      },
    },
  ];

  const languageModalTitle =
    selectedLanguage == "English" ? "Select Language" : "Odaberite jezik";
  const cityModalTitle =
    selectedLanguage == "English"
      ? "Number of photos per city"
      : "Broj slika po gradu";

  return (
    <>
      <AppModal
        modalVisible={languageModalVisible}
        modalBody={
          <View>
            {prefArray.map(({ language, selected, onPress, title }) => (
              <View key={uniqueId()}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    paddingVertical: 20,
                    alignItems: "center",
                  }}
                  onPress={onPress}
                >
                  {selected && (
                    <IconButton name="checkmark-outline" color="black" />
                  )}
                  <Text
                    style={{ fontSize: 18, paddingLeft: selected ? 15 : 30 }}
                  >
                    {language}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        }
        title={languageModalTitle}
        setModalVisible={setLanguageModalVisible}
        closOnTouchOutside={false}
      />
      <AppModal
        modalVisible={citiesModalVisible}
        modalBody={
          <View>
            {prefArrayCities.map(({ num, selected, onPress }) => (
              <View key={uniqueId()}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    paddingVertical: 20,
                    alignItems: "center",
                  }}
                  onPress={onPress}
                >
                  {selected && (
                    <IconButton name="checkmark-outline" color="black" />
                  )}
                  <Text
                    style={{ fontSize: 18, paddingLeft: selected ? 15 : 30 }}
                  >
                    {num}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        }
        title={cityModalTitle}
        setModalVisible={setCitiesModalVisible}
        closOnTouchOutside={false}
      />
      <ScrollView style={styles.container}>
        {settingsOptions.map(({ mainTitle, title, subTitle, onPress }) => (
          <View key={uniqueId()}>
            <Text style={styles.title}>{mainTitle}</Text>
            <TouchableOpacity key={uniqueId()} onPress={onPress}>
              <View
                style={{
                  paddingBottom: 20,
                  paddingTop: 20,
                  flexDirection:
                    title === "Caching" || title === "Keširanje"
                      ? "row"
                      : "column",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    paddingTop: title === "Caching" ? 10 : 0,
                  }}
                >
                  {title}
                </Text>

                <Text style={{ opacity: 0.5, paddingTop: 5 }}>{subTitle}</Text>

                {(title === "Caching" || title === "Keširanje") && (
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={{ marginLeft: 240 }}
                  />
                )}
              </View>
            </TouchableOpacity>
            <View
              style={{ height: 0.5, backgroundColor: "#9FA8DA", width: "100%" }}
            ></View>
          </View>
        ))}
      </ScrollView>
    </>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#283593",
    paddingTop: 20,
  },
});
