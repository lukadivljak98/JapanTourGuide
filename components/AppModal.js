import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import IconButton from "./IconButton";
import PropTypes from "prop-types";

function AppModal({
  modalVisible,
  modalBody,
  title,
  setModalVisible,
  closOnTouchOutside,
}) {
  return (
    <Modal visible={modalVisible} transparent>
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => {
          if (closOnTouchOutside) {
            setModalVisible(false);
          }
        }}
      >
        <View style={styles.modalView}>
          <ScrollView>
            <View style={styles.header}>
              <IconButton
                name="close-outline"
                color="black"
                onPress={() => {
                  setModalVisible(false);
                }}
              />
              <Text style={styles.title}>{title}</Text>
              <View />
              <View />
              <View />
            </View>
            <View
              style={{ height: 0.5, backgroundColor: "#9FA8DA", width: "100%" }}
            ></View>
            <View style={styles.body}>{modalBody}</View>
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

AppModal.propTypes = {
  closOnTouchOutside: PropTypes.bool,
};

AppModal.defaultProps = {
  closOnTouchOutside: true,
};

export default AppModal;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "rgba(0,0,0,0.6)",
    flex: 1,
    justifyContent: "center",
  },
  modalView: {
    backgroundColor: "white",
    minHeight: 300,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
  },
  body: {
    minHeight: 300,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
