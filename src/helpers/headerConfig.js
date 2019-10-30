import HeaderTitle from './../components/HeaderTitle';
import logoImg from '../../assets/simple-logo.png';
import {
  Image,
  Platform,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';
import { 
  createStackNavigator
} from 'react-navigation-stack';
import {
  createSwitchNavigator,
  createAppContainer,
  NavigationActions
} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { sendEvent } from '../helpers/createEvent';
import AuthenticationView from '../screens/AuthenticationScreen';
import constants from '../helpers/constants';

// const navigateAction = NavigationActions.navigate({
//   routeName: 'MyAcount',

//   // params: {},

//   // action: NavigationActions.navigate({ routeName: 'MyAccount' }),
// });

// this.props.navigation.dispatch(navigateAction);

// const AccountNavigator = createStackNavigator(
//   {
//     MyAccount: {
//       screen: AuthenticationView
//     }
//   },
//   {
//     initialRouteName: 'MyAccount',
//     defaultNavigationOptions: {
//       headerStyle: {
//         height: constants.headerHeight,
//         backgroundColor: constants.highlightColor
//       }
//     }
//   }
// );

// const TopNavigator = createMaterialTopTabNavigator(
//   {
//     AccountNavigator: {
//         screen: AccountNavigator,
//         navigationOptions: {
//           headerMode: 'none',
//           // tabBarLabel: 'My Account',
//           tabBarIcon: ({ tintColor }) => (
//             <Ionicons name="ios-settings" size={30} color='white' />
//           )
//         }
//       }
//   }
// )
// const AppSwitchNavigator = createSwitchNavigator({
//   // FamilyConnections: { screen: BottomNavigator },
//   Authentication: { screen: AccountNavigator }
// });

// const AppContainer = createAppContainer(AppSwitchNavigator);

export default (headerConfig = (title, navigation, email) => {
  return {
    headerTitle: <HeaderTitle title={title} navigation={navigation} />,
    headerLeft:
      Platform.OS === 'ios' ? (
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('BestPractices');
            sendEvent(email, 'click', 'logo');
          }}
        >
          <Image
            source={logoImg}
            style={styles.imageStyles}
            resizeMode="contain"
          />
        </TouchableWithoutFeedback>
      ) : null,
    headerRight: (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('MyAccount')
          // NavigationActions.navigate({
          //   routeName: 'MyAccount',
          //   action: NavigationActions.navigate({ routeName: 'MyAccount' })
          // });
          // sendEvent(email, 'click', 'logo');
        }}
      >
      <Ionicons 
        name="ios-settings" 
        size={32} color='white' 
        style={{ width: 32, height: 32, marginHorizontal: 10 }}
        resizeMode="contain"
      />
      </TouchableWithoutFeedback>
    )
  };
});

const styles = StyleSheet.create({
  imageStyles: { width: 40, height: 40, marginHorizontal: 20 },
  iconStyles: { fontSize: 40, color: '#000', paddingRight: 20 }
});

