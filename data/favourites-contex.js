import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavouritesContext = createContext({
  favourites: [],
  addFavourite: (favouriteSight) => {},
  removeFavourite: (sightId) => {},
  itemIsFavourite: (sightId) => {},
});

export function FavouritesContextProvider(props) {
  const [userFavourites, setUserFavourites] = useState([]);

  function addFavouriteHandler(favouriteSight) {
    /*setUserFavourites((prevUserFavourites) => {
      return prevUserFavourites.concat(favouriteSight);
    });*/
    const newFavourites = [...userFavourites, favouriteSight];
    setUserFavourites(newFavourites);
    saveToStorage("userFavourites", JSON.stringify(newFavourites));
  }

  function removeFavouriteHandler(sight) {
    var array = [...userFavourites];
    var index = array.indexOf(sight);
    if (index !== -1) {
      array.splice(index, 1);
      setUserFavourites(array);
    }
    saveToStorage("userFavourites", JSON.stringify(array));
  }

  function itemIsFavouriteHandler(sightId) {
    return userFavourites.some((sight) => sight.id === sightId);
  }

  useEffect(() => {
    getFromStorage();
  }, []);

  const saveToStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  };

  const getFromStorage = async () => {
    try {
      const userFavourites = await AsyncStorage.getItem("userFavourites");
      if (userFavourites !== null) {
        setUserFavourites(JSON.parse(userFavourites));
      }
    } catch {}
  };

  const context = {
    favourites: userFavourites,
    addFavourite: addFavouriteHandler,
    removeFavourite: removeFavouriteHandler,
    itemIsFavourite: itemIsFavouriteHandler,
  };

  return (
    <FavouritesContext.Provider value={context}>
      {props.children}
    </FavouritesContext.Provider>
  );
}

export default FavouritesContext;
