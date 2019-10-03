/*****************************
 * environment.js
 * path: '/environment.js' (root of your project)
 ******************************/

import Constants from 'expo-constants';
// import { Platform } from 'react-native';

// const localhost = Platform.OS === 'ios' ? 'localhost:8080' : '10.0.2.2:8080';

const ENV = {
  dev: {
    auth0Domain: `connectourkids.auth0.com`,
    auth0ClientId: 'JUR6JVt9N4sn8bHrSXR818rwrj91hsTb',
    // auth0Domain: `ck-testing.auth0.com`,
    // auth0ClientId: 'u2uduMsueiqYuJ6m2JG6qpCUpSgaYR1b',
    peopleSearchURL: 'https://dev.search.connectourkids.org/api/search-v2',
    eventTrackingURL: 'https://dev.search.connectourkids.org/api/sendEvent'
  },
  staging: {
    auth0Domain: `connectourkids.auth0.com`,
    auth0ClientId: 'JUR6JVt9N4sn8bHrSXR818rwrj91hsTb',
    peopleSearchURL: 'https://dev.search.connectourkids.org/api/search-v2',
    eventTrackingURL: 'https://dev.search.connectourkids.org/api/sendEvent'
    // Add other keys you want here
  },
  prod: {
    auth0Domain: `login.connectourkids.org`,
    auth0ClientId: 'i5NGofkl7Z4jEexA7YTbasrLT8pcKLDU',
    peopleSearchURL: 'https://search.connectourkids.org/api/search-v2',
    eventTrackingURL: 'https://search.connectourkids.org/api/sendEvent'
    // Add other keys you want here
  }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.dev;
  } else if (env === 'staging') {
    return ENV.staging;
  } else if (env === 'prod') {
    return ENV.prod;
  }
};

export default getEnvVars;
