import { ScrollView, Text, StyleSheet, ImageBackground } from "react-native";
import { SIGHTS } from "../data/dummy-data-sight";
import { useLayoutEffect, useContext, useState } from "react";
import IconButton from "../components/IconButton";
import FavouritesContext from "../data/favourites-contex";
import AsyncStorage from "@react-native-async-storage/async-storage";

function SightScreen({ route, navigation }) {
  const sightId = route.params.sightId;
  const selectedSight = SIGHTS.find((sight) => sight.id === sightId);

  const favouritesCtx = useContext(FavouritesContext);

  let itemIsFavourite = favouritesCtx.itemIsFavourite(sightId);

  let color;

  function toggleFavouritesHandler() {
    if (itemIsFavourite) {
      favouritesCtx.removeFavourite(selectedSight);
    } else {
      favouritesCtx.addFavourite(selectedSight);
    }
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

  useLayoutEffect(() => {
    const sightName = SIGHTS.find((sight) => sight.id === sightId).name;

    if (itemIsFavourite === true) {
      color = "red";
    } else {
      color = "white";
    }

    navigation.setOptions({
      title: sightName,
      headerRight: () => {
        return (
          <IconButton
            name="heart"
            color={color}
            onPress={toggleFavouritesHandler}
          />
        );
      },
    });
    getSetting();
  }, [sightId, navigation, itemIsFavourite]);

  const descText =
    selectedLanguage == "English" ? selectedSight.desc : selectedSight.descSr;
  const nameText =
    selectedLanguage == "English" ? selectedSight.name : selectedSight.nameSr;

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={{ uri: selectedSight.imageUrl }}
        style={styles.image}
      >
        <Text style={styles.text}>{nameText}</Text>
      </ImageBackground>

      <Text style={styles.desc}>{descText}</Text>
    </ScrollView>
  );
}

export default SightScreen;

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
    textAlign: "center",
  },
});
