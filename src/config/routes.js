import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Splash from '@scenes/Splash';
import Home from '@scenes/Home';

function Routes() {
  return (
    <Router navigationBarStyle={{ backgroundColor: '#FFF' }}>
      <Scene key="root" hideNavBar>
        <Scene key="splash" component={Splash} initial />
        <Scene key="home" component={Home} />
      </Scene>
    </Router>
  );
}

export default Routes;
