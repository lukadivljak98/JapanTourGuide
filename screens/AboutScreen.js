import { View, Image, Text, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function AboutScreen() {
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

  const text =
    selectedLanguage == "English"
      ? "This is a faculty project for course Mobile Computing"
      : "Ovo je fakultetski projekat za kurs Mobilno Računarstvo";

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("../assets/ETF_logo_transparent.png")}
        style={styles.image}
      />
      <Text style={styles.text}>{text}</Text>
    </ScrollView>
  );
}

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  image: {
    width: 260,
    height: 225,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 10,
  },
  text: {
    margin: 30,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
