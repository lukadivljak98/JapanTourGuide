import { StyleSheet, View } from "react-native";
import CitiesScreen from "./screens/CitiesScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CityScreen from "./screens/CityScreen";
import { StatusBar } from "expo-status-bar";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SightsScreen from "./screens/SightsScreen";
import SightScreen from "./screens/SightScreen";
import IconButton from "./components/IconButton";
import NewsScreen from "./screens/NewsScreen";
import GeneralScreen from "./screens/GeneralScreen";
import SettingsScreen from "./screens/SettingsScreen";
import AboutScreen from "./screens/AboutScreen";
import CityPhotosScreen from "./screens/CityPhotosScreen";
import PhotoScreen from "./screens/PhotoScreen";
import CityVideosScreen from "./screens/CityVideosScreen";
import WeatherScreen from "./screens/WeatherScreen";
import MapScreen from "./screens/MapScreen";
import MapSightsScreen from "./screens/MapSightsScreen";
import FavouriteSightsScreen from "./screens/FavouriteSightsScreen";
import { FavouritesContextProvider } from "./data/favourites-contex";
import { useEffect, useState, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import { translations } from "./data/localizations";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Root() {
  function onPressHandler() {}

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

  const settingsNavigatorText =
    selectedLanguage == "English" ? "Settings" : "Podešavanja";
  const citiesNavigatorText =
    selectedLanguage == "English" ? "Cities" : "Gradovi";
  const sightsNavigatorText =
    selectedLanguage == "English" ? "Sights" : "Znamenitosti";
  const newsNavigatorText = selectedLanguage == "English" ? "News" : "Vijesti";
  const generalNavigatorText =
    selectedLanguage == "English" ? "General" : "Opšte";
  const aboutNavigatorText =
    selectedLanguage == "English" ? "About" : "O aplikaciji";

  return (
    <>
      <Drawer.Navigator
        screenOptions={{
          headerShown: true,
        }}
      >
        <Drawer.Screen
          name={citiesNavigatorText}
          component={CitiesScreen}
          options={{
            drawerIcon: () => (
              <IconButton
                name="business-outline"
                color="#303F9F"
                onPress={onPressHandler}
              />
            ),
          }}
        />

        <Drawer.Screen
          name={sightsNavigatorText}
          component={SightsScreen}
          options={{
            drawerIcon: () => (
              <IconButton
                name="image-outline"
                color="#303F9F"
                onPress={onPressHandler}
              />
            ),
          }}
        />

        <Drawer.Screen
          name={newsNavigatorText}
          component={NewsScreen}
          options={{
            drawerIcon: () => (
              <IconButton
                name="newspaper-outline"
                color="#303F9F"
                onPress={onPressHandler}
              />
            ),
          }}
        />
        <Drawer.Screen
          name={generalNavigatorText}
          component={GeneralScreen}
          options={{
            drawerIcon: () => (
              <IconButton
                name="globe-outline"
                color="#303F9F"
                onPress={onPressHandler}
              />
            ),
          }}
        />
        <Drawer.Screen
          name={settingsNavigatorText}
          component={SettingsScreen}
          options={{
            drawerIcon: () => (
              <IconButton
                name="settings-outline"
                color="#303F9F"
                onPress={onPressHandler}
              />
            ),
          }}
        />
        <Drawer.Screen
          name={aboutNavigatorText}
          component={AboutScreen}
          options={{
            drawerIcon: () => (
              <IconButton
                name="help-outline"
                color="#303F9F"
                onPress={onPressHandler}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </>
  );
}

export default function App() {
  //const deviceLanguage = getLocales()[0].languageCode;

  const i18n = new I18n(translations);

  //i18n.enableFallback = true;

  const [selectedLanguage, setSelectedLanguage] = useState("");

  const getSetting = async () => {
    try {
      const languagePref = await AsyncStorage.getItem("language");

      if (languagePref !== null) {
        setSelectedLanguage(languagePref);
        if (languagePref === "English") i18n.locale = "en";
        else i18n.locale = "sr";
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSetting();
  }, []);

  const appName =
    selectedLanguage == "English" ? "Japan Tour Guide" : "Japan Vodič";

  return (
    <FavouritesContextProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#283593" },
            headerTintColor: "white",
            contentStyle: { backgroundColor: "#E8EAF6" },
          }}
        >
          <Stack.Screen name={appName} component={Root} />
          <Stack.Screen name="City" component={CityScreen} />

          <Stack.Screen name="Sight" component={SightScreen} />

          <Stack.Screen name="CityPhotos" component={CityPhotosScreen} />
          <Stack.Screen name="PhotoScreen" component={PhotoScreen} />
          <Stack.Screen name="CityVideos" component={CityVideosScreen} />
          <Stack.Screen name="Weather" component={WeatherScreen} />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="MapSights" component={MapSightsScreen} />

          <Stack.Screen
            name="Favourite Sights"
            component={FavouriteSightsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavouritesContextProvider>
  );
}

const styles = StyleSheet.create({});
