import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import moment from "moment/moment";
import * as WebBrowser from "expo-web-browser";

function Article({
  urlToImage,
  title,
  description,
  author,
  date,
  source,
  url,
}) {
  function goToSource() {
    WebBrowser.openBrowserAsync(url);
  }

  return (
    <TouchableOpacity style={styles.container} onPress={goToSource}>
      <Image
        source={{
          uri: urlToImage,
        }}
        style={styles.image}
      />
      <View style={{ padding: 13 }}>
        <Text style={styles.title}> {title}</Text>
        <Text style={styles.desc} numberOfLines={3}>
          {description}
        </Text>
        <View style={styles.data}>
          <Text style={styles.heading}>
            by: <Text style={styles.author}>{author}</Text>
          </Text>
          <Text style={styles.date}>{moment(date).format("MMM Do YY")}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text>
            source: <Text style={styles.source}>{source}</Text>{" "}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Article;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    borderRadius: 40,
    shadowOpacity: 0.5,
    shadowColor: "#000",
    shadowOffset: {
      height: 5,
      width: 5,
    },
    backgroundColor: "#fff",
    marginTop: 7,
    marginBottom: 7,
    elevation: 4,
  },
  image: {
    height: 200,
    width: "100%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
  desc: {
    fontSize: 10,
    fontWeight: "400",
    marginTop: 10,
  },
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  heading: {},
  author: {
    fontWeight: "bold",
  },
  date: {
    fontWeight: "bold",
    color: "#e63946",
    fontSize: 10,
  },
  source: {
    color: "#e63946",
    fontWeight: "bold",
    fontSize: 12,
  },
});
