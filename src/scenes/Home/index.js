import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, TouchableHighlight, View } from 'react-native';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';

import Title from '@components/Title';

import COLORS from '@config/colors';
import { urlLocationInfo, urlWeatherInfo, urlIcon, responseAlert } from '@config/constants';

const styles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.primary
  },
  extraInfoContainer: {
    position: "relative",
    alignItems: 'center',
  },
  boxExtraInfo: {
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center',
    borderRadius: 30,
    padding: 20,
    backgroundColor: COLORS.white,
    position: "relative",
    zIndex: 1
  },
  overlayBox: {
    height: 40,
    width: '80%',
    top: 8,
    left: 30,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.3)',
    position: 'absolute',
    zIndex: 0
  },
  rowTemp: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  textTemp: {
    fontWeight: 'bold',
    position: 'relative',
    zIndex: 2,
    left: -50
  },
  icon: {
    position: 'relative',
    zIndex: 1,
    left: 30,
    height: 100,
    width: 200,
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
  return (
    <View>
      <Title text={text} size={17} color={COLORS.black} style={{ marginBottom: 10, fontWeight: 'bold' }} />
    </View>
  )
}

const WeatherInfo = (props) => {
  const { weather, location, reloadData } = props;

  const now = new Date;

  const roundNumber = (value) => {
    return Math.round(value);
  };

  const converteMetersToKilometers = (value) => (Math.round(value * 3.6));

  const iconWeather = urlIcon(weather.weather[0].icon);

  return (
    <View style={{ justifyContent: 'space-between', flex: 1, padding: 30 }}>
      <View style={{ alignItems: 'center', paddingTop: 20 }}>
        <Title text={location.name} hasFont size={90} />
      </View>

      <View style={{ alignItems: 'center' }}>
        <Title text={weather.weather[0].description} color={COLORS.white} size={17} />
        <View style={styles.rowTemp}>
          <Image source={{ uri: iconWeather, width: 200, height: 200 }} style={styles.icon} />
          <Title
            text={`${roundNumber(weather.main.temp)}º`}
            color={COLORS.white}
            size={100}
            style={styles.textTemp} />
        </View>

        <View style={styles.extraInfoContainer}>
          <View style={styles.overlayBox} />
          <View style={styles.boxExtraInfo}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <SubTitle text="Ventos" />
              <Title size={17} text={`${converteMetersToKilometers(weather.wind.speed)} km/h`} />
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
              <SubTitle text="Sensação Térmica" />
              <Title size={17} text={`${roundNumber(weather.main.feels_like)} º`} />
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
              <SubTitle text="Umidade" />
              <Title size={17} text={`${weather.main.humidity} %`} />
            </View>
          </View>
        </View>
      </View>


      <View style={{ alignItems: 'center' }}>
        <Title text={`Atualizado em: ${now.toLocaleString()}`} style={{ marginBottom: 15 }} />

        <TouchableHighlight style={styles.btn} onPress={() => reloadData()}>
          <Title text="Atualizar" size={16} style={{ fontWeight: 'bold' }} />
        </TouchableHighlight>
      </View>

    </View>
  )
};

const Home = () => {
  const [titleLoader, setTitleLoader] = useState("Obtendo sua localização...");
  const [coords, setCoords] = useState(null);
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  const getWeatherInfo = (coords) => {
    setTitleLoader("Obtendo informações do clima...");

    const { latitude, longitude } = coords;
    const url = urlWeatherInfo(latitude, longitude);

    axios.get(url)
      .then(resp => {
        setTimeout(() => {
          setWeather(resp.data);
        }, 2000);
      }).catch(err => {
        responseAlert(
          "Houve um erro ao obter os dados do clima. Tente novamente",
          [
            { text: "Tentar Novamente", onPress: reloadFlux() }
          ]
        )
      });
  };

  const getCityInfo = (coords) => {
    setTitleLoader("Obtendo nome da sua cidade...");
    const { latitude, longitude } = coords;
    const url = urlLocationInfo(latitude, longitude);

    axios.get(url)
      .then(resp => {
        setCoords(coords);
        setLocation(resp.data[0]);

        setTimeout(() => {
          getWeatherInfo(coords);
        }, 2000);
      }).catch(err => {
        responseAlert(
          "Houve um erro ao obter o nome da sua cidade. Tente novamente",
          [
            { text: "Tentar Novamente", onPress: reloadFlux() }
          ]
        )
      });
  };

  const renderErrorLocation = err => {
    if (err.code === 1) {
      responseAlert(
        "Não conseguimos obter sua localização por que você rejeitou a permissão. Vá nas configurações e permita o uso da localização.",
        [
          { text: 'Fechar', onPress: () => false }
        ]
      );
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => getCityInfo(position.coords),
      err => renderErrorLocation(err)
    );
  };

  const reloadFlux = () => {
    setTitleLoader("Obtendo sua localização...");
    setLocation(null);
    setCoords(null);
    setWeather(null);

    setTimeout(() => {
      getCurrentLocation();
    }, 500);
  };

  const renderContent = () => {
    if (weather && coords && location) return <WeatherInfo reloadData={() => reloadFlux()} location={location} weather={weather} />;

    return (
      <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.black} />
        <Title text={titleLoader} size={19} style={{ marginTop: 25, fontWeight: 'bold' }} />
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
