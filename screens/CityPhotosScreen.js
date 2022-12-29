import { Text, View, Image, FlatList } from "react-native";
import { CITIES } from "../data/dummy-data";
import PhotoItem from "../components/PhotoItem";
import { useLayoutEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function CityPhotosScreen({ route, navigation }) {
  const getSetting = async () => {
    try {
      const numOfPhotosPref = await AsyncStorage.getItem("numOfPhotos");
      if (numOfPhotosPref !== null) {
        setNumOfPhotos(Number(numOfPhotosPref));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useLayoutEffect(() => {
    getSetting();
    const cityName = CITIES.find((city) => city.id === cityId).name;
    navigation.setOptions({
      title: cityName + " Photos",
    });
  }, [cityId, navigation]);

  const [numOfPhotos, setNumOfPhotos] = useState();

  const cityId = route.params.cityId;
  const images = CITIES.find((city) => city.id === cityId).photos.slice(
    0,
    numOfPhotos
  );

  return (
    <FlatList
      data={images}
      renderItem={({ item }) => (
        <PhotoItem
          image={item}
          onPress={() => {
            navigation.navigate("PhotoScreen", {
              url: item,
              cityId: cityId,
              allImages: images,
            });
          }}
        />
      )}
      keyExtractor={(item) => item}
      numColumns={2}
    />
  );
}

export default CityPhotosScreen;
