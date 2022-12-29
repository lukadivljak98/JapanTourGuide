import { StyleSheet, View, Text, Image } from "react-native";

function FutureForecast({ desc, tempMin, tempMax, date, time }) {
  const img = { uri: "http://openweathermap.org/img/wn/10d@2x.png" };
  return (
    <View style={styles.futureForecastItemContainer}>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.temp}>{date}</Text>
        <Text style={styles.temp}>{time}</Text>
      </View>
      <Text style={styles.day}>{desc}</Text>
      <Image source={img} style={styles.image} />
      <Text style={styles.temp}>
        Min: {Math.round(tempMin - 272.15)} &#176;C
      </Text>
      <Text style={styles.temp}>
        Max: {Math.round(tempMax - 272.15)} &#176;C
      </Text>
    </View>
  );
}

export default FutureForecast;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  futureForecastItemContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#00000033",
    borderRadius: 10,
    borderColor: "#eee",
    borderWidth: 2,
    padding: 20,
    margin: 10,
    alignItems: "center",
    height: 480,
  },
  day: {
    fontSize: 14,
    color: "white",
    backgroundColor: "#3c3c44",
    padding: 10,
    textAlign: "center",
    borderRadius: 50,
    fontWeight: "200",
    marginBottom: 15,
  },
  temp: {
    fontSize: 14,
    color: "black",
    fontWeight: "100",
    textAlign: "center",
    fontWeight: "bold",
  },
  dateTimeContainer: {
    paddingBottom: 50,
  },
});
