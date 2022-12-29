import {
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  View,
  Button,
  Pressable,
} from "react-native";
import { CITIES } from "../data/dummy-data";
import { useLayoutEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function CityScreen({ route, navigation }) {
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const getSetting = async () => {
    try {
      const languagePref = await AsyncStorage.getItem("language");

      if (languagePref !== null) {
        setSelectedLanguage(languagePref);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const cityId = route.params.cityId;
  const selectedCity = CITIES.find((city) => city.id === cityId);

  useLayoutEffect(() => {
    const cityName = CITIES.find((city) => city.id === cityId).name;
    navigation.setOptions({
      title: cityName,
    });
    getSetting();
  }, [cityId, navigation]);

  function photosPressHandler() {
    navigation.navigate("CityPhotos", {
      cityId: cityId,
    });
  }

  function videosPressHandler() {
    navigation.navigate("CityVideos", {
      cityId: cityId,
    });
  }

  function weatherPressHandler() {
    navigation.navigate("Weather", {
      cityId: cityId,
    });
  }

  const aboutText =
    selectedLanguage == "English" ? selectedCity.desc : selectedCity.descSr;
  const affordabilityText =
    selectedLanguage == "English"
      ? selectedCity.affordability
      : selectedCity.affordabilitySr;
  const populationText =
    selectedLanguage == "English" ? "Population" : "Populacija";
  const areaText = selectedLanguage == "English" ? "Area" : "Površina";
  const affordabilityText2 =
    selectedLanguage == "English" ? "Affordability" : "Pristupačnost";
  const photosText = selectedLanguage == "English" ? "Photos" : "Slike";
  const weatherText =
    selectedLanguage == "English" ? "Weather" : "Vremenska prognoza";
  const nameText =
    selectedLanguage == "English" ? selectedCity.name : selectedCity.nameSr;

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={{ uri: selectedCity.imageUrl }}
        style={styles.image}
      >
        <Text style={styles.text}>{nameText}</Text>
      </ImageBackground>

      <Text style={styles.desc}>{aboutText}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.details}>
          {populationText}: {selectedCity.population}
        </Text>
        <Text style={styles.details}>
          {areaText}: {selectedCity.area} km2
        </Text>
        <Text style={styles.details}>
          {affordabilityText2}: {affordabilityText}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          android_ripple={{ color: "#ccc" }}
          onPress={photosPressHandler}
        >
          <Text style={styles.buttonText}>{photosText}</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          android_ripple={{ color: "#ccc" }}
          onPress={videosPressHandler}
        >
          <Text style={styles.buttonText}>Video</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          android_ripple={{ color: "#ccc" }}
          onPress={weatherPressHandler}
        >
          <Text style={styles.buttonText}>{weatherText}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

export default CityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 36,
    color: "white",
    fontWeight: "bold",
    textShadowOffset: {
      height: 3,
      width: 3,
    },
    textShadowColor: "black",
    textShadowRadius: 2,
  },
  desc: {
    padding: 12,
    textAlign: "left",
  },
  details: {
    fontWeight: "bold",
    textAlign: "center",
    padding: 6,
  },
  detailsContainer: {
    margin: 8,
    borderColor: "#9FA8DA",
    borderWidth: 1,
    marginHorizontal: 84,
    marginVertical: 10,
    borderRadius: 12,
  },
  buttonContainer: {
    margin: 8,
    padding: 8,
  },
  button: {
    backgroundColor: "#303F9F",
    margin: 8,
    height: 50,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    paddingTop: 14,
  },
});
