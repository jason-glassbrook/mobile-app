/*****************************
 * environment.js
 * path: '/environment.js' (root of your project)
 ******************************/

import Constants from 'expo-constants';
// import { Platform } from 'react-native';
// const localhost = Platform.OS === 'ios' ? 'localhost:8080' : '10.0.2.2:8080';

const ENV = {
  dev: {
    auth0Domain: 'login.connectourkids.org',
    auth0ClientId: '3dKTXilDyoCV3YP06e90059KI6bPERYQ',
    familyConnectionsURL: 'https://family-staging.connectourkids.org',
    auth0RedirectScheme: 'exp://127.0.0.1:19000/--/expo-auth-session',
    // auth0Domain: `ck-testing.auth0.com`,
    // auth0ClientId: 'u2uduMsueiqYuJ6m2JG6qpCUpSgaYR1b',
    peopleSearchURL: 'https://dev.search.connectourkids.org/api/search-v2',
    eventTrackingURL: 'https://dev.search.connectourkids.org/api/sendEvent'
  },
  staging: {
    auth0Domain: 'login.connectourkids.org',
    auth0ClientId: '3dKTXilDyoCV3YP06e90059KI6bPERYQ',
    familyConnectionsURL: 'https://family-staging.connectourkids.org',
    auth0RedirectScheme: 'exp://127.0.0.1:19000/--/expo-auth-session',
    peopleSearchURL: 'https://dev.search.connectourkids.org/api/search-v2',
    eventTrackingURL: 'https://dev.search.connectourkids.org/api/sendEvent'
    // Add other keys you want here
  },
  prod: {
    auth0Domain: `login.connectourkids.org`,
    auth0ClientId: 'QzXVCpRPy4m6IOPpm6Jl644nQIvpTknR',
    auth0RedirectScheme: 'connectourkids://127.0.0.1:19000/--/expo-auth-session',
    familyConnectionsURL: 'https://family.connectourkids.org',
    // auth0ClientId: '3dKTXilDyoCV3YP06e90059KI6bPERYQ',
    peopleSearchURL: 'https://search.connectourkids.org/api/search-v2',
    eventTrackingURL: 'https://search.connectourkids.org/api/sendEvent'
    // Add other keys you want here
  }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // console.log('ENV ===> ', env, ENV)
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.dev;
  } else if (env === 'staging') {
    return ENV.staging;
  } else if (env === 'prod') {
    return ENV.prod;
  } else {
    return ENV.prod;
  }
};

export default getEnvVars;

// const getEnvVars = (env = Constants.manifest.packagerOpts.dev) => {
//   if (env === true) return ENV.dev
//   // if (env.indexOf('dev') !== -1) return ENV.dev
//   // if (env.indexOf('staging') !== -1) return ENV.staging
//   if (env === false) return ENV.prod
// }
// export default getEnvVars;