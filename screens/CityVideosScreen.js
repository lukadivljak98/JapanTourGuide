import { View, StyleSheet, Button } from "react-native";
import { Video } from "expo-av";
import { CITIES } from "../data/dummy-data";
import * as React from "react";

function CityVideosScreen({ route, navigation }) {
  const cityId = route.params.cityId;
  const videoUrl = CITIES.find((city) => city.id === cityId).video;
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  React.useLayoutEffect(() => {
    const cityName = CITIES.find((city) => city.id === cityId).name;
    navigation.setOptions({
      title: cityName + " Video",
    });
  }, [cityId, navigation]);

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: videoUrl,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View>
    </View>
  );
}

export default CityVideosScreen;

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: "100%",
  },
});
