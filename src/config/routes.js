import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Splash from '@scenes/Splash';

function Routes() {
  return (
    <Router navigationBarStyle={{ backgroundColor: '#FFF' }}>
      <Scene key="root" hideNavBar>
        <Scene key="splash" component={Splash} initial />
      </Scene>
    </Router>
  );
}

export default Routes;
