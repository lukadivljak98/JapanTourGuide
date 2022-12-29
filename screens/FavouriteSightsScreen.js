import { useContext } from "react";
import { FlatList, Text } from "react-native";
import FavouritesContext from "../data/favourites-contex";
import { SIGHTS } from "../data/dummy-data-sight";
import SightListItem from "../components/SightListItem";

function FavouriteSightsScreen({ navigation }) {
  const favouriteCtx = useContext(FavouritesContext);

  function renderSightItem(itemData) {
    function pressHandler() {
      navigation.navigate("Sight", {
        sightId: itemData.item.id,
      });
    }

    return (
      <SightListItem
        sightName={itemData.item.name}
        sightImage={itemData.item.imageUrl}
        onPress={pressHandler}
      />
    );
  }

  return (
    <FlatList
      data={favouriteCtx.favourites}
      keyExtractor={(item) => item.id}
      renderItem={renderSightItem}
    />
  );
}

export default FavouriteSightsScreen;
