import { toogleMenuType } from '@config/types';

const initialState = {
  locationInfo: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case toogleMenuType:
      return { ...state, locationInfo: action.status };
    default:
      return state;
  }
};
