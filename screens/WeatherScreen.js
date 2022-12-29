import { View, ScrollView, StyleSheet, Image, Text } from "react-native";
import FutureForecast from "../components/FutureForecast";
import { useEffect, useState, useLayoutEffect } from "react";
import { CITIES } from "../data/dummy-data";

function WeatherScreen({ route, navigation }) {
  let temp;
  let wind;
  const cityId = route.params.cityId;
  const cityName = CITIES.find((city) => city.id === cityId).name;
  const key = "5d36379e2fc3a4bdf6089df4fe9326f3";

  const [data, setData] = useState([""]);
  const [forecastData, setForecastData] = useState([""]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Weather in " + cityName,
    });
  }, [cityId, navigation]);

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  useEffect(() => {
    fetchForecastDataFromApi();
  }, []);

  const fetchDataFromApi = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  };

  const fetchForecastDataFromApi = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}`
    )
      .then((res) => res.json())
      .then((data) => {
        setForecastData(data);
      });
  };

  return (
    <ScrollView>
      <View style={styles.outterContainer}>
        <CurrentTempEl
          desc={data.weather ? data.weather[0].description : ""}
          temp={data.main ? data.main.temp : ""}
          wind={data.wind ? data.wind.speed : ""}
          humidity={data.main ? data.main.humidity : ""}
          icon={data.weather ? data.weather[0].icon : ""}
        />
      </View>
      <ScrollView style={styles.scrollView} horizontal={true}>
        <FutureForecast
          desc={
            forecastData.list ? forecastData.list[0].weather[0].description : ""
          }
          tempMin={forecastData.list ? forecastData.list[0].main.temp_min : ""}
          tempMax={forecastData.list ? forecastData.list[0].main.temp_max : ""}
          date={
            forecastData.list ? forecastData.list[0].dt_txt.split(" ")[0] : ""
          }
          time={
            forecastData.list ? forecastData.list[0].dt_txt.split(" ")[1] : " "
          }
        />
        <FutureForecast
          desc={
            forecastData.list ? forecastData.list[1].weather[0].description : ""
          }
          tempMin={forecastData.list ? forecastData.list[1].main.temp_min : ""}
          tempMax={forecastData.list ? forecastData.list[1].main.temp_max : ""}
          date={
            forecastData.list ? forecastData.list[1].dt_txt.split(" ")[0] : ""
          }
          time={
            forecastData.list ? forecastData.list[1].dt_txt.split(" ")[1] : " "
          }
        />
        <FutureForecast
          desc={
            forecastData.list ? forecastData.list[2].weather[0].description : ""
          }
          tempMin={forecastData.list ? forecastData.list[2].main.temp_min : ""}
          tempMax={forecastData.list ? forecastData.list[2].main.temp_max : ""}
          date={
            forecastData.list ? forecastData.list[2].dt_txt.split(" ")[0] : ""
          }
          time={
            forecastData.list ? forecastData.list[2].dt_txt.split(" ")[1] : " "
          }
        />
        <FutureForecast
          desc={
            forecastData.list ? forecastData.list[3].weather[0].description : ""
          }
          tempMin={forecastData.list ? forecastData.list[3].main.temp_min : ""}
          tempMax={forecastData.list ? forecastData.list[3].main.temp_max : ""}
          date={
            forecastData.list ? forecastData.list[3].dt_txt.split(" ")[0] : ""
          }
          time={
            forecastData.list ? forecastData.list[3].dt_txt.split(" ")[1] : " "
          }
        />
        <FutureForecast
          desc={
            forecastData.list ? forecastData.list[4].weather[0].description : ""
          }
          tempMin={forecastData.list ? forecastData.list[4].main.temp_min : ""}
          tempMax={forecastData.list ? forecastData.list[4].main.temp_max : ""}
          date={
            forecastData.list ? forecastData.list[4].dt_txt.split(" ")[0] : ""
          }
          time={
            forecastData.list ? forecastData.list[4].dt_txt.split(" ")[1] : " "
          }
        />
      </ScrollView>
    </ScrollView>
  );
}

const CurrentTempEl = ({ desc, temp, wind, humidity, icon }) => {
  const img = { uri: `http://openweathermap.org/img/wn/${icon}.png` };
  return (
    <View style={styles.currentTempContainer}>
      <Image source={img} style={styles.img} />
      <View style={styles.otherContainer}>
        <Text style={styles.day}>{desc}</Text>
        <Text style={styles.temp}>
          Temperature: {Math.round(temp - 272.15)} &#176;C
        </Text>
        <Text style={styles.temp}>Wind speed: {wind} km/h</Text>
        <Text style={styles.temp}>Humidity: {humidity} %</Text>
      </View>
    </View>
  );
};

export default WeatherScreen;

const styles = StyleSheet.create({
  outterContainer: {
    padding: 16,
  },
  img: {
    width: 150,
    height: 150,
  },
  scrollView: {
    flex: 0.4,
  },
  currentTempContainer: {
    flexDirection: "row",
    backgroundColor: "#00000033",
    justifyContent: "center",
    allignItems: "center",
    borderRadius: 10,
    borderColor: "#eee",
    borderWidth: 2,
    padding: 35,
  },
  otherContainer: {
    paddingRight: 40,
    paddingTop: 20,
  },
  day: {
    fontSize: 20,
    color: "white",
    backgroundColor: "#3c3c44",
    padding: 10,
    textAlign: "center",
    borderRadius: 50,
    marginBottom: 15,
    fontWeight: "bold",
  },
  temp: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
});
