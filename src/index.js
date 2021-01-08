import React from 'react';
import { Provider } from 'react-redux';

import Routes from '@config/routes';
import configStore from '@config/store';

function App() {
  return (
    <Provider store={configStore()}>
      <Routes />
    </Provider>
  );
}

export default App;
