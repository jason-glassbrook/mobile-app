import React, { Component } from 'react'
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
// import { createDrawerNavigator } from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {
  createStackNavigator,
} from 'react-navigation-stack'
import { Ionicons } from '@expo/vector-icons';
import BestPracticesScreen from '../screens/BestPracticesScreen';
import FamilyConnectionsScreen from '../screens/FamilyConnectionsScreen';
import PeopleSearchScreen from '../screens/PeopleSearchScreen';
import SearchResultScreen from '../screens/SearchResultScreen';
import constants from '../helpers/constants';
import AuthenticationView from '../screens/AuthenticationScreen';

import {Icon} from 'react-native-elements';

const BestPracticeNavigator = createStackNavigator(
  {
    BestPractices: {
      screen: BestPracticesScreen
    }
  },
  {
    initialRouteName: 'BestPractices',
    defaultNavigationOptions: {
      headerStyle: {
        height: 55,
        // backgroundColor: constants.highlightColor
      }
    }
  }
);

const FamilyConnectionsNavigator = createStackNavigator(
  {
    FamilyConnections: {
      screen: FamilyConnectionsScreen
    }
  },
  {
    initialRouteName: 'FamilyConnections',
    defaultNavigationOptions: {
      headerStyle: {
        height: 80
      }
    }
  }
);

const PeopleSearchNavigator = createStackNavigator(
  {
    PeopleSearch: {
      screen: PeopleSearchScreen
    },
    SearchResult: {
      screen: SearchResultScreen
    }
  },
  {
    initialRouteName: 'PeopleSearch',
    defaultNavigationOptions: {
      headerStyle: {
        height: 80
      }
    }
  }
);

const AccountNavigator = createStackNavigator(
  {
    MyAccount: {
      screen: AuthenticationView
    }
  },
  {
    initialRouteName: 'MyAccount',
    defaultNavigationOptions: {
      headerStyle: {
        height: 80
      }
    }
  }
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
    AccountNavigator: {
      screen: AccountNavigator,
      navigationOptions: {
        tabBarLabel: 'My Account',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="md-person" size={30} color='white' />
        )
      }
    }
  },
  {
    tabBarOptions: {
      inactiveTintColor: 'white',
      activeTintColor: 'black',
      style: {
        backgroundColor: constants.highlightColor,
        height: 60,
        padding: 5
      }
    }
  })

const AppSwitchNavigator = createSwitchNavigator({
  BestPractices: { screen: BottomNavigator },
  FamilyConnections: { screen: BottomNavigator },
  PeopleSearch: { screen: BottomNavigator },
  Authentication: { screen: BottomNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default AppContainer;