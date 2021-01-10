import { Platform, Alert } from 'react-native';
import { ActionConst, Actions } from 'react-native-router-flux';
import { API_KEY_WEATHER } from "@env";

export const urlWeatherInfo = (lat, lng) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY_WEATHER}&units=metric&lang=pt_br`;
export const urlLocationInfo = (lat, lng) => `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=5&appid=${API_KEY_WEATHER}`;
export const urlIcon = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

export const { OS } = Platform;
export const versionApp = '1.0.0';

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
