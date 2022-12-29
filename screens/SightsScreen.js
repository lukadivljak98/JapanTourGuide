import { View, Text, FlatList } from "react-native";
import { SIGHTS } from "../data/dummy-data-sight";
import SightListItem from "../components/SightListItem";
import LocationFloatingButton from "../components/LocationFloatingButton";
import FavouritesFloatingButton from "../components/FavouritesFloatingButton";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function SightsScreen({ navigation }) {
  function renderSightItem(itemData) {
    function pressHandler() {
      navigation.navigate("Sight", {
        sightId: itemData.item.id,
      });
    }

    const nameText =
      selectedLanguage == "English" ? itemData.item.name : itemData.item.nameSr;

    return (
      <SightListItem
        sightName={nameText}
        sightImage={itemData.item.imageUrl}
        onPress={pressHandler}
      />
    );
  }

  function buttonPressHandler() {
    navigation.navigate("MapSights");
  }

  function favouritesButtonPressHandler() {
    navigation.navigate("Favourite Sights");
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
        data={SIGHTS}
        keyExtractor={(item) => item.id}
        renderItem={renderSightItem}
      />
      <LocationFloatingButton onPress={buttonPressHandler} />
      <FavouritesFloatingButton onPress={favouritesButtonPressHandler} />
    </>
  );
}

export default SightsScreen;
