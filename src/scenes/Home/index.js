import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableHighlight, View } from 'react-native';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';

import Title from '@components/Title';

import COLORS from '@config/colors';
import { urlLocationInfo, urlWeatherInfo } from '@config/constants';

const styles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.primary
  },
  btn: {
    padding: 20,
    paddingHorizontal: 60,
    backgroundColor: COLORS.white,
    borderRadius: 40
  }
};

const SubTitle = props => {
  const { text } = props;
  return (<View><Title text={text} size={15} color={COLORS.white} style={{ marginBottom: 10 }} /></View>)
}

const WeatherInfo = (props) => {
  const { weather, location, reloadData } = props;

  const now = new Date;

  const roundNumber = (value) => {
    return Math.round(value);
  };

  const converteMetersToKilometers = (value) => (Math.round(value * 3.6));

  return (
    <View style={{ justifyContent: 'space-between', flex: 1, padding: 30 }}>
      <View style={{ alignItems: 'center', paddingTop: 20 }}>
        <Title text={location.name} hasFont size={90} />
      </View>

      <View style={{ alignItems: 'center' }}>
        <Title text={weather.weather[0].description} color={COLORS.white} size={17} />
        <Title text={`${roundNumber(weather.main.temp)}º`} color={COLORS.white} size={100} style={{ fontWeight: 'bold' }} />

        <View style={{ flexDirection: 'row', marginTop: 25 }}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <SubTitle text="Ventos" />
            <Title size={15} text={`${converteMetersToKilometers(weather.wind.speed)} km/h`} />
          </View>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <SubTitle text="Sensação Térmica" />
            <Title size={15} text={`${roundNumber(weather.main.feels_like)} º`} />
          </View>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <SubTitle text="Umidade" />
            <Title size={15} text={`${weather.main.humidity} %`} />
          </View>
        </View>
      </View>


      <View style={{ alignItems: 'center' }}>
        <Title text={`Atualizado em: ${now.toLocaleString()}`} style={{ marginBottom: 15 }} />
        <TouchableHighlight style={styles.btn} onPress={() => reloadData()}>
          <Title text="Atualizar" size={16} />
        </TouchableHighlight>
      </View>

    </View>
  )
};

const Home = () => {
  const [coords, setCoords] = useState(null);
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  const getWeatherInfo = (coords) => {
    const { latitude, longitude } = coords;
    const url = urlWeatherInfo(latitude, longitude);

    axios.get(url)
      .then(resp => {
        setTimeout(() => {
          setWeather(resp.data);
        }, 500);
      }).catch(err => {
        console.log("ERR:", err);
      });
  };

  const getInfo = (coords) => {
    const { latitude, longitude } = coords;
    const url = urlLocationInfo(latitude, longitude);

    axios.get(url)
      .then(resp => {
        setCoords(coords);
        setLocation(resp.data[0]);

        getWeatherInfo(coords);
      }).catch(err => {
        console.log("EE:", err);
      });
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(info => getInfo(info.coords));
  };

  const reload = () => {
    setLocation(null);
    setCoords(null);
    setWeather(null);

    setTimeout(() => {
      getCurrentLocation();
    }, 500);
  };

  const renderContent = () => {
    if (weather && coords && location) return <WeatherInfo reloadData={() => reload()} location={location} weather={weather} />;

    return (
      <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.black} />
        <Title text="Carregando..." size={17} style={{ marginTop: 25 }} />
      </View>
    )
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      {renderContent()}
    </View>
  )
};

export default Home;
