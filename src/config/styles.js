import { StyleSheet, Platform } from 'react-native';

import COLORS from '@config/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    position: 'relative',
  },
  ColdClimate: {
    ...Platform.select({
      ios: {
        fontFamily: 'Cold Climate',
        fontWeight: 'normal',
      },
      android: { fontFamily: 'cold-climate' },
    }),
  },
});
