import React, { Component } from 'react'
import {
  TouchableWithoutFeedback,
  Image
} from 'react-native'
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import { Text } from 'react-native';
import { createDrawerNavigator, DrawerActions, DrawerItems } from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {
  createStackNavigator,
} from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
import BestPracticesScreen from '../screens/BestPracticesScreen';
import FamilyConnectionsScreen from '../screens/FamilyConnectionsScreen';
import PeopleSearchScreen from '../screens/PeopleSearchScreen';
import SearchResultScreen from '../screens/SearchResultScreen';
import constants from '../helpers/constants';
import AuthenticationView from '../screens/AuthenticationScreen';
import CaseViewScreen from '../screens/CaseViewScreen';
import ConnectionsView from '../screens/ConnectionsView';
import logoImg from '../../assets/logo.png'

const BestPracticeNavigator = createStackNavigator(
  {
    BestPractices: {
      screen: BestPracticesScreen,
      initialRouteName: 'BestPractices',
      defaultNavigationOptions: {
        headerStyle: {
          height: constants.headerHeight,
          backgroundColor: constants.highlightColor
        }
      }
    },
  }
);

const FamilyConnectionsNavigator = createStackNavigator(
  {
    FamilyConnections: {
      screen: FamilyConnectionsScreen,
      initialRouteName: 'FamilyConnections',
      defaultNavigationOptions: {
        headerStyle: {
          height: constants.headerHeight,
          backgroundColor: constants.highlightColor
        }
      }
    },
    CaseView: {
      screen: CaseViewScreen,
      initialRouteName: 'FamilyConnections',
      defaultNavigationOptions: {
        headerStyle: {
          height: constants.headerHeight,
          backgroundColor: constants.highlightColor
        }
      },
      navigationOptions: {
        headerStyle: {
          backgroundColor: 'white',
          height: 52
        },
        headerLeft: 
          (<TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('FamilyConnections');
              sendEvent(email, 'click', 'logo');
            }}
          >
            <Image
              source={logoImg}
              style={{width: 225, height: 90}}
              resizeMode="contain"
            />
          </TouchableWithoutFeedback>)
      }
    },
    ConnectionsView: {
      screen: ConnectionsView,
      initialRouteName: 'FamilyConnections',
      defaultNavigationOptions: {
        headerStyle: {
          height: constants.headerHeight,
          backgroundColor: constants.highlightColor
        }
      },
      navigationOptions: {
        headerStyle: {
          backgroundColor: 'white',
          height: 52
        },
        headerLeft: 
          (<TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('FamilyConnections');
              sendEvent(email, 'click', 'logo');
            }}
          >
            <Image
              source={logoImg}
              style={{width: 225, height: 90}}
              resizeMode="contain"
            />
          </TouchableWithoutFeedback>)
      }
    },
  },
);

const PeopleSearchNavigator = createStackNavigator(
  {
    PeopleSearch: {
      screen: PeopleSearchScreen,
      initialRouteName: 'PeopleSearch',
      defaultNavigationOptions: {
        headerStyle: {
          height: constants.headerHeight,
          backgroundColor: constants.highlightColor
        }
      }
    },
    SearchResult: {
      screen: SearchResultScreen,
      initialRouteName: 'PeopleSearch',
      defaultNavigationOptions: {
        headerStyle: {
          height: constants.headerHeight,
          backgroundColor: constants.highlightColor
        }
      }
    },
  },
);

const AccountNavigator = createStackNavigator({
  MyAccount: {
    screen: AuthenticationView,
    initialRouteName: 'MyAccount',
    defaultNavigationOptions: {
      headerStyle: {
        height: constants.headerHeight,
        backgroundColor: constants.highlightColor,
      }
    },
  },
})

const DrawerNavigator = createDrawerNavigator({
  'Edit Profile': {
    screen: AccountNavigator,
  },
  'Impact Dashboard': {
    screen: AccountNavigator,
  },
  'About': {
    screen: AccountNavigator,
  },
  'Support': {
    screen: AccountNavigator,
  },
  'Privacy Policy': {
    screen: AccountNavigator,
  },
  'Terms of Service': {
    screen: AccountNavigator,
  },
  'Log Out': {
    screen: AccountNavigator,
  }
},
{
  drawerPosition: 'right',
  drawerType: 'front',
  drawerWidth: 225,
  hideStatusBar: true,
  contentOptions: { 
    activeTintColor: constants.highlightColor,
  },
})

const BottomNavigator = createBottomTabNavigator(
  {
    PeopleSearchNavigator: {
      screen: PeopleSearchNavigator,
      navigationOptions: {
        tabBarLabel: 'SEARCH',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons 
            name="md-search" 
            size={36} 
            color={tintColor} />
        )
      },
    },
    FamilyConnections: {
      screen: FamilyConnectionsNavigator,
      navigationOptions: {
        tabBarLabel: 'CONNECTIONS',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons 
            name="md-people" 
            size={36} 
            color={tintColor} />
        )
      },
    },
    MoreNavigator: {
      screen: DrawerNavigator,
      navigationOptions: {
        tabBarLabel: 'MORE',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons 
            name="ios-menu" 
            size={36} 
            color={tintColor} 
          />
        ),
        tabBarOnPress: (props) => props.navigation.toggleDrawer()
      },
    },
  },
  {
    initialRouteName: 'FamilyConnections',
    tabBarOptions: {
      inactiveTintColor: '#FFFFFF',
      activeTintColor: '#212529',
      style: {
        backgroundColor: constants.highlightColor,
        height: 55,
        paddingTop: 3,
        paddingBottom: 3,
        justifyContent: 'space-between',
        width: '100%',
      }
    }
  })

const AppBottomSwitchNavigator = createSwitchNavigator({
  BestPractices: { screen: BottomNavigator },
  FamilyConnections: { screen: BottomNavigator },
  PeopleSearch: { screen: BottomNavigator },
  Authentication: { screen: BottomNavigator },
  More: { screen: DrawerNavigator },
});

const AppContainer = createAppContainer(AppBottomSwitchNavigator);

export default AppContainer;