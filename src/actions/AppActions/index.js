import {
  toggleMenuType
} from '@config/types';

export const toggleMenu = (status) => {
  return { type: toggleMenuType, status };
};
