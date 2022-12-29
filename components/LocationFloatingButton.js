import { StyleSheet, TouchableOpacity } from "react-native";
import IconButton from "./IconButton";

function LocationFloatingButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.touchableOpacity} onPress={onPress}>
      <IconButton name="location" color="white" onPress={onPress} />
    </TouchableOpacity>
  );
}

export default LocationFloatingButton;

const styles = StyleSheet.create({
  touchableOpacity: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
    backgroundColor: "#283593",
    borderRadius: 30,
  },
  floatingButton: {},
});
