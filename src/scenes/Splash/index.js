import React, { useEffect } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { Actions, ActionConst } from 'react-native-router-flux';

import Title from '@components/Title';

import COLORS from '@config/colors';

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.primary
  },
  animation: {
    marginHorizontal: 50,
    height: 200
  }
};

const Splash = () => {

  useEffect(() => {
    setTimeout(() => {
      Actions.home({ type: ActionConst.RESET });
    }, 3000);
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.animation}>
        <LottieView
          source={require('@assets/splash.json')}
          autoPlay
          loop
        />
      </View>
      <Title
        text="Climate App"
        hasFont
        size={80}
        color={COLORS.black}
        style={{ alignSelf: 'center' }} />
    </View>
  )
};

export default Splash;
