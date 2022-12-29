import {
  Image,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";

function PhotoItem({ image, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={{ uri: image }}
          style={styles.img}
          resizeMode={"cover"}
        />
      </TouchableOpacity>
    </View>
  );
}

export default PhotoItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    margin: 8,
  },
  img: {
    width: "100%",
    height: 200,
  },
});
