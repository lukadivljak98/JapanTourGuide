import { ScrollView, View, Image, StyleSheet, Text } from "react-native";
import { JAPAN } from "../data/dummy-data-japan";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

function GeneralScreen() {
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

  useEffect(() => {
    getSetting();
  }, []);

  const capitalText = selectedLanguage == "English" ? "Capital" : "Glavni grad";
  const areaText = selectedLanguage == "English" ? "Area" : "Površina";
  const populationText =
    selectedLanguage == "English" ? "Population" : "Populacija";
  const callingCodeText =
    selectedLanguage == "English" ? "Calling Code" : "Pozivni broj";
  const regionText = selectedLanguage == "English" ? "Region" : "Regija";
  const languageText = selectedLanguage == "English" ? "Language" : "Jezik";
  const timeZoneText =
    selectedLanguage == "English" ? "Time Zone" : "Vremenska zona";
  const gdpText = selectedLanguage == "English" ? "GDP" : "BDP";
  const aboutText = selectedLanguage == "English" ? "About" : "Uopšteno";
  const millionText = selectedLanguage == "English" ? "million" : "miliona";
  const trillionText = selectedLanguage == "English" ? "trillion" : "biliona";
  const aboutJapanText =
    selectedLanguage == "English" ? JAPAN.about : JAPAN.aboutSr;
  const regionJapanText =
    selectedLanguage == "English" ? JAPAN.region : JAPAN.regionSr;
  const jezikText =
    selectedLanguage == "English" ? JAPAN.language : JAPAN.jezikSr;

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          borderTopWidth: 1,
          borderBottomWidth: 1,
          width: 200,
          alignSelf: "center",
        }}
      >
        <Image source={require("../assets/jpn.png")} style={styles.image} />
      </View>
      <Text style={styles.title}>JAPAN</Text>
      <View style={styles.innerContainer}>
        <Text>
          {capitalText}:{"    "}
          <Text>{JAPAN.capital}</Text>
        </Text>
        <Text>
          {areaText}:{"    "}
          {JAPAN.area} km2
        </Text>
        <Text>
          {populationText}:{"    "}
          {JAPAN.population} {millionText}
        </Text>
        <Text>
          {callingCodeText}:{"    "}
          {JAPAN.callingCode}
        </Text>
        <Text>
          {regionText}:{"    "}
          {regionJapanText}
        </Text>
        <Text>
          {languageText}:{"    "}
          {jezikText}
        </Text>
        <Text>
          {timeZoneText}:{"    "}
          {JAPAN.timeZone}
        </Text>
        <Text>
          {gdpText}:{"    "}
          {JAPAN.gdp} {trillionText} $
        </Text>
      </View>
      <View style={{ margin: 10 }}>
        <Text style={styles.about}>{aboutText}:</Text>
        <Text>{aboutJapanText}</Text>
      </View>
    </ScrollView>
  );
}

export default GeneralScreen;

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  image: {
    height: 100,
    width: 200,
    alignSelf: "center",
  },
  title: {
    alignSelf: "center",
    fontSize: 28,
    fontWeight: "bold",
    margin: 10,
    color: "#283593",
  },
  innerContainer: {
    margin: 15,
    borderWidth: 1,
    borderColor: "#C5CAE9",
    borderRadius: 10,
    paddingHorizontal: 80,
    paddingVertical: 15,
    alignItems: "center",
  },
  about: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
  },
});
