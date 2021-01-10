import { Dimensions, Platform, Alert } from 'react-native';
import { ActionConst, Actions } from 'react-native-router-flux';
import axios from 'axios';

export const tokenOpenWeather = '7bb23deaf4e3c1294c4652aae5915b7e';
export const urlWeatherInfo = (lat, lng) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${tokenOpenWeather}&units=metric&lang=pt_br`;
export const urlLocationInfo = (lat, lng) => `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=5&appid=${tokenOpenWeather}`;

export const { OS } = Platform;
export const versionApp = '1.0.0';

export const viewport = Dimensions.get('window');

export const WIDTH_SCREEN = viewport.width;
export const HEIGHT_SCREEN = viewport.height;

export const alertText = 'Climate App';

const defaultButtons = [{ text: 'Ok', onPress: () => false }];

export const responseAlert = (
  message,
  buttons = defaultButtons,
  cancelable = false
) => {
  Alert.alert('Climate App', message, buttons, { cancelable });
};

export const validateErrors = (response) => {
  if (response.statusCode === 401) {
    responseAlert("Sessão expirada.", [
      {
        text: "OK",
        onPress: () => Actions.splash({ type: ActionConst.RESET, invalidToken: true })
      }
    ]);
  } else {
    const message = response?.data?.message || response?.message || "Houve um erro";
    if (typeof message === "string")
      responseAlert(message);
    else
      responseAlert("Houve um erro");
  }
};

export const fetchAddressByCep = async (cep) => {
  const cepFormatted = cep.replace(/\D/g, "");

  if (cepFormatted.length < 8) return false;

  const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`);

  if (!response.data) return false;

  const { logradouro, complemento } = response.data;

  return { logradouro, complemento };
};
