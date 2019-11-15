import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import constants from '../helpers/constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const toTop = () => {
  props.scrollTo({ x: 0, y: 0, animated: true })
}

const ScrollToTop = (props) => {
  // by spreading props and styles in an array, we can pass it custom styles to override or add to these base styles when we use this component
  return (
    <TouchableOpacity 
      {...props}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
      }}
      onPress={() => props.toTop()}
    >
      <View style={{
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <MaterialCommunityIcons size={30} />
        <Text>TOP</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ScrollToTop;
