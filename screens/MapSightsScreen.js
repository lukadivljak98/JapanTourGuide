import MapView, { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps/lib/ProviderConstants";
import { StyleSheet, View } from "react-native";
import { SIGHTS } from "../data/dummy-data-sight";

function MapSightsScreen({ navigation }) {
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
            latitude: SIGHTS.find((sight) => sight.id === "s1").latitude,
            longitude: SIGHTS.find((sight) => sight.id === "s1").longitude,
          }}
          onPress={() => {
            navigation.navigate("Sight", {
              sightId: "s1",
            });
          }}
        />
        <Marker
          coordinate={{
            latitude: SIGHTS.find((sight) => sight.id === "s2").latitude,
            longitude: SIGHTS.find((sight) => sight.id === "s2").longitude,
          }}
          onPress={() => {
            navigation.navigate("Sight", {
              sightId: "s2",
            });
          }}
        />
        <Marker
          coordinate={{
            latitude: SIGHTS.find((sight) => sight.id === "s3").latitude,
            longitude: SIGHTS.find((sight) => sight.id === "s3").longitude,
          }}
          onPress={() => {
            navigation.navigate("Sight", {
              sightId: "s3",
            });
          }}
        />
        <Marker
          coordinate={{
            latitude: SIGHTS.find((sight) => sight.id === "s4").latitude,
            longitude: SIGHTS.find((sight) => sight.id === "s4").longitude,
          }}
          onPress={() => {
            navigation.navigate("Sight", {
              sightId: "s4",
            });
          }}
        />
        <Marker
          coordinate={{
            latitude: SIGHTS.find((sight) => sight.id === "s5").latitude,
            longitude: SIGHTS.find((sight) => sight.id === "s5").longitude,
          }}
          onPress={() => {
            navigation.navigate("Sight", {
              sightId: "s5",
            });
          }}
        />
        <Marker
          coordinate={{
            latitude: SIGHTS.find((sight) => sight.id === "s6").latitude,
            longitude: SIGHTS.find((sight) => sight.id === "s6").longitude,
          }}
          onPress={() => {
            navigation.navigate("Sight", {
              sightId: "s6",
            });
          }}
        />
        <Marker
          coordinate={{
            latitude: SIGHTS.find((sight) => sight.id === "s7").latitude,
            longitude: SIGHTS.find((sight) => sight.id === "s7").longitude,
          }}
          onPress={() => {
            navigation.navigate("Sight", {
              sightId: "s7",
            });
          }}
        />
        <Marker
          coordinate={{
            latitude: SIGHTS.find((sight) => sight.id === "s8").latitude,
            longitude: SIGHTS.find((sight) => sight.id === "s8").longitude,
          }}
          onPress={() => {
            navigation.navigate("Sight", {
              sightId: "s8",
            });
          }}
        />
        <Marker
          coordinate={{
            latitude: SIGHTS.find((sight) => sight.id === "s9").latitude,
            longitude: SIGHTS.find((sight) => sight.id === "s9").longitude,
          }}
          onPress={() => {
            navigation.navigate("Sight", {
              sightId: "s9",
            });
          }}
        />
        <Marker
          coordinate={{
            latitude: SIGHTS.find((sight) => sight.id === "s10").latitude,
            longitude: SIGHTS.find((sight) => sight.id === "s10").longitude,
          }}
          onPress={() => {
            navigation.navigate("Sight", {
              sightId: "s10",
            });
          }}
        />
      </MapView>
    </View>
  );
}

export default MapSightsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
