import React, { Component } from 'react'
import {
  TouchableWithoutFeedback,
  Image,
  Linking,
  Text
} from 'react-native'
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import { createDrawerNavigator, DrawerActions, DrawerItems } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import {
  createStackNavigator,
} from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
import AboutScreen from '../screens/AboutScreen';
import SupportScreen from '../screens/SupportScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsOfServiceScreen from '../screens/TermsOfServiceScreen';
import ImpactScreen from '../screens/ImpactScreen';
import FamilyConnectionsScreen from '../screens/FamilyConnectionsScreen';
import PeopleSearchScreen from '../screens/PeopleSearchScreen';
import SearchResultScreen from '../screens/SearchResultScreen';
import constants from '../helpers/constants';
import AuthenticationView from '../screens/AuthenticationScreen';
import CaseViewScreen from '../screens/CaseViewScreen';
import ConnectionsView from '../screens/ConnectionsView';
import logoImg from '../../assets/logo.png';


//Following StackNavigators are in BottomNav:
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
      },
      navigationOptions: {
        headerStyle: {
          backgroundColor: 'white',
          height: 52
        },
        headerLeft:
          (<Image
            source={logoImg}
            style={{ width: 225, height: 90 }}
            resizeMode="contain"
          />)
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
          (<Image
            source={logoImg}
            style={{ width: 225, height: 90 }}
            resizeMode="contain"
          />)
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
          (<Image
            source={logoImg}
            style={{ width: 225, height: 90 }}
            resizeMode="contain"
          />)
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

// Following StackNavigators are inside "More" drawer:
const AboutNavigator = createStackNavigator(
  {
    About: {
      screen: AboutScreen,
      // initialRouteName: 'About',
      defaultNavigationOptions: {
        headerStyle: {
          height: constants.headerHeight,
          backgroundColor: constants.highlightColor
        }
      }
    },
  }
);

const MyAccountNavigator = createStackNavigator({
  MyAccount: {
    screen: AuthenticationView,
    // initialRouteName: 'MyAccount',
    defaultNavigationOptions: {
      headerStyle: {
        height: constants.headerHeight,
        backgroundColor: constants.highlightColor,
      }
    },
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'white',
        height: 52
      },
      headerLeft:
        (<Image
          source={logoImg}
          style={{ width: 225, height: 90 }}
          resizeMode="contain"
        />)
    }
  },
})

const SupportNavigator = createStackNavigator({
  Support: {
    screen: SupportScreen,
    // initialRouteName: 'Support',
    defaultNavigationOptions: {
      headerStyle: {
        height: constants.headerHeight,
        backgroundColor: constants.highlightColor,
      }
    },
  },
})

const ImpactNavigator = createStackNavigator({
  Impact: {
    screen: ImpactScreen,
    // initialRouteName: 'Impact',
    defaultNavigationOptions: {
      headerStyle: {
        height: constants.headerHeight,
        backgroundColor: constants.highlightColor,
      }
    },
  },
})

const PrivacyPolicyNavigator = createStackNavigator({
  PrivacyPolicy: {
    screen: PrivacyPolicyScreen,
    // initialRouteName: 'PrivacyPolicy',
    defaultNavigationOptions: {
      headerStyle: {
        height: constants.headerHeight,
        backgroundColor: constants.highlightColor,
      }
    },
  },
})

const TermsOfServiceNavigator = createStackNavigator({
  Terms: {
    screen: TermsOfServiceScreen,
    // initialRouteName: 'TermsOfService',
    defaultNavigationOptions: {
      headerStyle: {
        height: constants.headerHeight,
        backgroundColor: constants.highlightColor,
      }
    },
  },
})

const DrawerNavigator = createDrawerNavigator({
  'About': {
    screen: AboutNavigator,
  },
  'My Account': {
    screen: MyAccountNavigator,
  },
  'Impact Dashboard': {
    screen: ImpactNavigator,
  },
  'Support': {
    screen: SupportNavigator,
  },
  'Privacy Policy': {
    screen: PrivacyPolicyNavigator,
  },
  'Terms of Service': {
    screen: TermsOfServiceNavigator,
  },
  'Log Out': {
    screen: MyAccountNavigator,
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
  More: { screen: BottomNavigator },
  About: { screen: DrawerNavigator },
  Impact: { screen: DrawerNavigator },
  MyProfile: { screen: DrawerNavigator },
  Support: { screen: DrawerNavigator },
  PrivacyPolicy: { screen: DrawerNavigator },
  TermsOfService: { screen: DrawerNavigator },
  About: { screen: DrawerNavigator },
  FamilyConnections: { screen: BottomNavigator },
  PeopleSearch: { screen: BottomNavigator },
  Authentication: { screen: DrawerNavigator },
});

const AppContainer = createAppContainer(AppBottomSwitchNavigator);

export default AppContainer;