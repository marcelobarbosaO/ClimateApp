import React from 'react';
import { Text } from 'react-native';

import STYLES from '@config/styles';
import COLORS from '@config/colors';

const Title = props => {
  const { text, hasFont, size, color, style } = props;

  const fontFamily = hasFont ? STYLES.ColdClimate : {};
  const fontSize = { fontSize: size ? size : 13 };
  const fontColor = { color: color ? color : COLORS.black };

  return (
    <Text style={[fontFamily, fontSize, fontColor, style]}>{text}</Text>
  )
};

export default Title;
