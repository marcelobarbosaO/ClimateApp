import { createStore } from 'redux';
import reducers from '@reducers';

const configStore = (state) => {
  return createStore(reducers, state);
};

export default configStore;
