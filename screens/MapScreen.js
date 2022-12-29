import MapView, { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps/lib/ProviderConstants";
import { StyleSheet, View } from "react-native";
import { CITIES } from "../data/dummy-data";

function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: 36.2048,
          longitude: 138.2529,
          latitudeDelta: 17.515,
          longitudeDelta: 17.0121,
        }}
      >
        <Marker
          coordinate={{
            latitude: CITIES.find((city) => city.id === "c1").latitude,
            longitude: CITIES.find((city) => city.id === "c1").longitude,
          }}
        />
        <Marker
          coordinate={{
            latitude: CITIES.find((city) => city.id === "c2").latitude,
            longitude: CITIES.find((city) => city.id === "c2").longitude,
          }}
        />
        <Marker
          coordinate={{
            latitude: CITIES.find((city) => city.id === "c3").latitude,
            longitude: CITIES.find((city) => city.id === "c3").longitude,
          }}
        />
        <Marker
          coordinate={{
            latitude: CITIES.find((city) => city.id === "c4").latitude,
            longitude: CITIES.find((city) => city.id === "c4").longitude,
          }}
        />
        <Marker
          coordinate={{
            latitude: CITIES.find((city) => city.id === "c5").latitude,
            longitude: CITIES.find((city) => city.id === "c5").longitude,
          }}
        />
        <Marker
          coordinate={{
            latitude: CITIES.find((city) => city.id === "c6").latitude,
            longitude: CITIES.find((city) => city.id === "c6").longitude,
          }}
        />
        <Marker
          coordinate={{
            latitude: CITIES.find((city) => city.id === "c7").latitude,
            longitude: CITIES.find((city) => city.id === "c7").longitude,
          }}
        />
        <Marker
          coordinate={{
            latitude: CITIES.find((city) => city.id === "c8").latitude,
            longitude: CITIES.find((city) => city.id === "c8").longitude,
          }}
        />
        <Marker
          coordinate={{
            latitude: CITIES.find((city) => city.id === "c9").latitude,
            longitude: CITIES.find((city) => city.id === "c9").longitude,
          }}
        />
        <Marker
          coordinate={{
            latitude: CITIES.find((city) => city.id === "c10").latitude,
            longitude: CITIES.find((city) => city.id === "c10").longitude,
          }}
        />
      </MapView>
    </View>
  );
}

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
