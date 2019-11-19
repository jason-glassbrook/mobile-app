import AuthSessionCustom from './AuthSessionCustom.js';
import getEnvVars from '../../environment.js';
import jwtDecode from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import Constants from 'expo-constants';
import getRefreshToken from './getRefreshToken'
import getNewAccessToken from './getNewAccessToken'
// import { verifier, challenge } from './auth0Verifiers'

const { auth0Domain, auth0ClientId, auth0RedirectScheme } = getEnvVars();

const toQueryString = params => {
  return (
    '?' +
    Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&')
  );
};

const setItem = async (key, value, options) => {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(value), options);
  } catch (e) {
    console.log(`error storing ${key}`, e);
  }
};

const handleLogin = async (AuthSession, setUserCreds) => {

  await initialLogin();
    
    const id_token = await SecureStore.getItemAsync('cok_id_token');
    const decoded = jwtDecode(id_token);
    const { name, email } = decoded;
    setUserCreds(decoded, id_token);

  // await LocalAuthentication.hasHardwareAsync()
  //   .then(res =>
  //     console.log(res),
  //     await LocalAuthentication.supportedAuthenticationTypesAsync()
  //       .then(res =>
  //         console.log(res),
  //         await LocalAuthentication.isEnrolledAsync()
  //           .then(res =>
  //             console.log(res),
  //             await LocalAuthentication.authenticateAsync({
  //               promptMessage: 'Authenticate',
  //               fallbackLabel: 'Use Passcode'
  //             })
  //               .then(async res => {
  //                 console.log(res);
  //                 const refresh = await SecureStore.getItemAsync('cok_refresh_token');
  //                 console.log('refreshhhhh', refresh)
  //                 if (refresh) {
  //                   await getNewAccessToken();
  //                   // const idToken = await SecureStore.getItemAsync('cok_id_token');
  //                   // const decoded = jwtDecode(idToken);
  //                   // const { name, email } = decoded;
  //                   // setUserCreds(decoded, idToken);
  //                   console.log('getNewAccessToken')
  //                 } else {
  //                   await initialLogin();
  //                   // await getRefreshToken();
  //                   console.log('initialLogin')
  //                 }
  //                 const id_token = await SecureStore.getItemAsync('cok_id_token');
  //                 const decoded = jwtDecode(id_token);
  //                 const { name, email } = decoded;
  //                 setUserCreds(decoded, id_token);
  //               }
  //               )
  //               .catch(err =>
  //                 console.log(err)
  //               )
  //           )
  //           .catch(err =>
  //             console.log(err)
  //           )
  //       )
  //       .catch(err =>
  //         console.log(err)
  //       )
  //   )
  //   .catch(err => console.log(err));



};

// check if refresh_token exists in SecureStorage
// const refreshChecker = async () => {
//   await SecureStore.getItemAsync('cok_refresh_token');
// }

const initialLogin = async (AuthSession, setUserCreds) => {

  // if no refresh_token exists, then this is a first time and we need to perform initial /authorize endpoint

  // const redirectUrl = "exp://127.0.0.1:19000/--/expo-auth-session";

  // Structure the auth parameters and URL
  const queryParams = toQueryString({
    client_id: auth0ClientId,
    redirect_uri: auth0RedirectScheme,
    audience: 'https://api-staging.connectourkids.org/',
    response_type: 'code id_token token', // id_token will return a JWT token
    scope: 'offline_access openid profile email', // retrieve the user's profile
    device: Constants.deviceName,
    prompt: 'consent',
    nonce: 'nonce', // ideally, this will be a random value

    // client_id: auth0ClientId,
    // code_verifier: verifier,
    // code_challenge: challenge,
    // response_type: 'code',
    // audience: 'https://family-staging.connectourkids.org/api/v1/',
    // scope: 'offline_access openid profile email',
    // redirect_uri: 'exp://127.0.0.1:19000/--/expo-auth-session',
    state: 'asldfkj6748fjh9pjshhjs'

  });
  const authUrl = `https://${auth0Domain}/authorize` + queryParams;


  // Perform the authentication
  const response = await AuthSessionCustom.startAsync({ authUrl });

  if (response.error) {
    Alert('Authentication error', response.error_description || 'something went wrong');
    return;
  }
  // if users cancels login process, terminate method
  else if (response.type === 'dismiss') return;

  // await SecureStore.setItemAsync('cok_auth_code', JSON.stringify(response.params.code))
  // await SecureStore.setItemAsync('cok_id_token', JSON.stringify(response.params.id_token))

  // assume success


  // SET THE TIME TOKEN EXPIRES IN ASYNC STORAGE
  const expiresAt = response.expires_in * 1000 + new Date().getTime();
  setItem('expiresAt', expiresAt);
  // setItem('cok_auth_code', response.params.code);
  // setItem('cok_id_token', response.params.id_token);
  // setItem('cok_access_token', response.params.access_token);
  await SecureStore.setItemAsync('cok_auth_code', response.params.code)
  await SecureStore.setItemAsync('cok_id_token', response.params.id_token)
  await SecureStore.setItemAsync('cok_access_token', response.params.access_token)
  // await getRefreshToken();
}

export default {
  toQueryString,
  setItem,
  handleLogin
};
