import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import constants from '../helpers/constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// const toTop = () => {
//   scrollTo({ x: 0, y: 0, animated: true })
// }

const ScrollToTop = (props) => {
  // by spreading props and styles in an array, we can pass it custom styles to override or add to these base styles when we use this component
  return (
    <TouchableOpacity 
      {...props}
      style={{
        position: 'absolute',
        zIndex: 1000,
        bottom: 0,
        right: 0,
      }}
      
    >
      <View style={{
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <MaterialCommunityIcons name="chevron-double-up" size={30} />
        <Text>TOP</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ScrollToTop;
