import React from 'react';
import { View, Image, TouchableHighlight } from 'react-native';

import Title from '@components/Title';
import SubTitle from '@components/SubTitle';

import COLORS from '@config/colors';
import { roundNumber, converteMetersToKilometers, urlIcon } from '@config/constants';

const styles = {
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

const WeatherInfo = (props) => {
  const { weather, location, reloadData } = props;
  const now = new Date;
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

export default WeatherInfo;
