import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';

import Title from '@components/Title';
import WeatherInfo from '@components/WeatherInfo';

import COLORS from '@config/colors';
import { urlLocationInfo, urlWeatherInfo, responseAlert } from '@config/constants';

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
