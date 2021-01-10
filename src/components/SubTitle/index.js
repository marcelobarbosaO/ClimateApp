import React from 'react';
import { View } from 'react-native';

import Title from '@components/Title';
import COLORS from '@config/colors';

const SubTitle = props => {
  const { text } = props;
  return (
    <View>
      <Title text={text} size={17} color={COLORS.black} style={{ marginBottom: 10, fontWeight: 'bold' }} />
    </View>
  )
};

export default SubTitle;
