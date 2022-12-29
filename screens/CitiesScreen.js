import { FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import CityListItem from "../components/CityListItem";
import LocationFloatingButton from "../components/LocationFloatingButton";
import { CITIES } from "../data/dummy-data";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function CitiesScreen({ navigation }) {
  function renderCityItem(itemData) {
    function pressHandler() {
      navigation.navigate("City", {
        cityId: itemData.item.id,
      });
    }

    const nameText =
      selectedLanguage == "English" ? itemData.item.name : itemData.item.nameSr;

    return (
      <CityListItem
        cityName={nameText}
        cityImage={itemData.item.imageUrl}
        onPress={pressHandler}
      />
    );
  }

  function buttonPressHandler() {
    navigation.navigate("Map");
  }

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

  return (
    <>
      <FlatList
        data={CITIES}
        keyExtractor={(item) => item.id}
        renderItem={renderCityItem}
      />
      <LocationFloatingButton onPress={buttonPressHandler} />
    </>
  );
}

export default CitiesScreen;
