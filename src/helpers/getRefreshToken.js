import axios from 'axios';
import * as SecureStore from 'expo-secure-store'
import getEnvVars from '../../environment.js';

const { auth0ClientId } = getEnvVars();

// Refresh Token
const getRefreshToken = async () => {

  const code = await SecureStore.getItemAsync('cok_auth0code');

  const refreshParams = {
    client_id: auth0ClientId,
    redirect_uri: 'exp://127.0.0.1:19000/--/expo-auth-session',
    grant_type: 'authorization_code',
    code: code,
  }

  axios
    .post('https://connectourkids.auth0.com/oauth/token', refreshParams)
    .then(res => {
      SecureStore.setItemAsync('cok_refresh_token', res.data.refresh_token)
    })
    .catch(err => console.log(err))
}

export default getRefreshToken;