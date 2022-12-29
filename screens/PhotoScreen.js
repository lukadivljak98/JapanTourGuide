import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { Modal } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

function PhotoScreen({ route, navigation }) {
  const images = [
    {
      url: route.params.url,
    },
  ];

  function onSwipeDownHandler() {
    navigation.navigate("CityPhotos", {
      cityId: route.params.cityId,
    });
  }
  return (
    <View style={styles.container}>
      <Modal
        visible={true}
        transparent={true}
        onRequestClose={onSwipeDownHandler}
      >
        <ImageViewer
          imageUrls={images}
          enableSwipeDown
          onSwipeDown={onSwipeDownHandler}
        />
      </Modal>
    </View>
  );
}

export default PhotoScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 250,
  },
  img: {
    width: "100%",
    height: 250,
  },
});
