import React, { Component } from 'react'
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
// import { createDrawerNavigator } from 'react-navigation-drawer';
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
import ConnectionsViewScreen from '../screens/ConnectionsViewScreen';

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
      }
    },
    ConnectionsView: {
      screen: ConnectionsViewScreen,
      initialRouteName: 'FamilyConnections',
      defaultNavigationOptions: {
        headerStyle: {
          height: constants.headerHeight,
          backgroundColor: constants.highlightColor
        }
      }
    },
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
  },
);

const BottomNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: BestPracticeNavigator,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-home" size={30} color='white' />
        )
      }
    },
    FamilyConnections: {
      screen: FamilyConnectionsNavigator,
      navigationOptions: {
        tabBarLabel: 'Connections',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-people" size={30} color='white' />
        )
      }
    },
    PeopleSearchNavigator: {
      screen: PeopleSearchNavigator,
      navigationOptions: {
        tabBarLabel: 'People Search',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-search" size={30} color='white' />
        )
      }
    },
  },
  {
    tabBarOptions: {
      inactiveTintColor: 'white',
      activeTintColor: 'black',
      style: {
        backgroundColor: constants.highlightColor,
        height: 53,
        padding: 3,
        width: '100%'
      }
    }
  })

const AppBottomSwitchNavigator = createSwitchNavigator({
  BestPractices: { screen: BottomNavigator },
  FamilyConnections: { screen: BottomNavigator },
  PeopleSearch: { screen: BottomNavigator },
  Authentication: { screen: BottomNavigator },
  // Authentication2: { screen: BottomNavigator },
});

const AppContainer = createAppContainer(AppBottomSwitchNavigator);

export default AppContainer;