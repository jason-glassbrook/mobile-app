import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import { Text } from 'react-native';

// import CaseViewScreen from './screens/CaseViewScreen.js';

// const TabScreen = createMaterialTopTabNavigator(
//   {
//     Engagement: { screen: CaseViewScreen },
//     Settings: { screen: SecondPage },
//   },
//   {
//     tabBarPosition: 'top',
//     swipeEnabled: true,
//     animationEnabled: true,
//     tabBarOptions: {
//       activeTintColor: '#FFFFFF',
//       inactiveTintColor: '#F8F8F8',
//       style: {
//         backgroundColor: '#633689',
//       },
//       labelStyle: {
//         textAlign: 'center',
//       },
//       indicatorStyle: {
//         borderBottomColor: '#87B56A',
//         borderBottomWidth: 2,
//       },
//     },
//   }
// );
 
// //making a StackNavigator to export as default
// const App = createStackNavigator({
//   TabScreen: {
//     screen: TabScreen,
//     navigationOptions: {
//       headerStyle: {
//         backgroundColor: '#633689',
//       },
//       headerTintColor: '#FFFFFF',
//       title: 'TabExample',
//     },
//   },
// });
// export default createAppContainer(App);

export const Engagement = (props) => {

  return(
    <>
    <Text>Engagement</Text>



    </>
  )
}

export const Participants = (props) => {

  return(
    <>
    <Text>Participants</Text>
    </>
  )
}

export const Highlights = (props) => {

  return(
    <>
    <Text>Highlights</Text>
    </>
  )
}