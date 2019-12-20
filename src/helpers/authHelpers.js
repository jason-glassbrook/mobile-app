import {AuthSession} from 'expo';
import getEnvVars from '../../environment.js';
import jwtDecode from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import Constants from 'expo-constants';
import getRefreshToken from './getRefreshToken'
import getNewAccessToken from './getNewAccessToken'
import AuthSessionCustom from "./AuthSessionCustom";
// import { verifier, challenge } from './auth0Verifiers'
import {Alert, Platform} from 'react-native';

const { auth0Domain, auth0Audience, auth0ClientId, auth0RedirectScheme } = getEnvVars();

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

const handleLogin = async (AuthSession, callBack) => {
  // for handleLogin, you'll likely want to implement 2 login flows - i.e. initialLogin below and another one... perhaps reLogin...
  // the idea is that the first time a user logs in, it will call initialLogin, and then other times, you'll want to call
  // another request that will use a refresh token from Auth0 to get a new access token.
  // This is desired by Travis to make a more seamless login/re-login experience for the user.
  // We began this process below and initialLogin is the only 'actual' working login flow

  if(!await initialLogin()) {
    return;
  }

  const id_token = await SecureStore.getItemAsync('cok_id_token');
  const decoded = jwtDecode(id_token);
  const { name, email } = decoded;
  callBack(decoded, id_token);
};

const initialLogin = async () => {

  // if no refresh_token exists, then this is a first time and we need to perform initial /authorize endpoint

  // Structure the auth parameters and URL. These are required to generate the appropriate idToken and accessToken response.
  const queryParams = toQueryString({
    client_id: auth0ClientId,
    redirect_uri: AuthSessionCustom.getDefaultReturnUrl(),
    audience: auth0Audience,
    response_type: 'code id_token token', // id_token will return a JWT token
    scope: 'offline_access openid profile email', // retrieve the user's profile
    device: Constants.deviceName,
    prompt: 'consent',
    nonce: 'nonce', // ideally, this will be a random value
  });

  const authUrl = `https://${auth0Domain}/authorize` + queryParams;

  console.log("Auth Url", authUrl);

  // Perform the authentication - AuthSessionCustom creates an authentication session in your browser behind the scenes.
  // This is why after your first login, you only need to hit 'Authorize' in Auth0 and you don't have to type in username/password every time.
  // If you clear Safari cache or other browser cache, you lose this session and will need to fully login with username and password
  const response = await AuthSessionCustom.startAsync( { authUrl: authUrl});

  console.log("startAsync Response");
  console.log(response);

  if(response.type === 'cancel') {
    // Nothing to do
    return false;
  }  // if user cancels login process, terminate method
  else if (response.type === 'dismiss') { return false; }
  else if (response.params && response.params.error) {
    Alert.alert('Authentication error', response.params.error_description || 'something went wrong');
    return false;
  }

  // SET THE TIME TOKEN EXPIRES IN EXPO SECURE STORE
  // Set each token to the expo secure store. These are accessed all throughout the application AND in almost every Redux Action
  const expiresAt = response.expires_in * 1000 + new Date().getTime();
  await setItem('expiresAt', expiresAt);
  await SecureStore.setItemAsync('cok_auth_code', response.params.code);
  await SecureStore.setItemAsync('cok_id_token', response.params.id_token);
  await SecureStore.setItemAsync('cok_access_token', response.params.access_token);

  return true;
};

export default {
  toQueryString,
  setItem,
  handleLogin
};
