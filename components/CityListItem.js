import { Pressable, View, Text, StyleSheet, Image } from "react-native";

function CityListItem({ cityName, cityImage, onPress }) {
  return (
    <View style={styles.listItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        onPress={onPress}
        style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
      >
        <View style={styles.innerContainer}>
          <Image
            source={{
              uri: cityImage,
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.title}>{cityName}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default CityListItem;

const styles = StyleSheet.create({
  listItem: {
    margin: 16,
    borderRadius: 8,
    elevation: 4,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 16,
    overflow: "hidden",
    backgroundColor: "white",
  },
  innerContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "black",
    textAlign: "center",
    margin: 8,
  },
  image: {
    width: "100%",
    height: 150,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
