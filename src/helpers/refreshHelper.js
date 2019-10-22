import React, { useEffect } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'
import getEnvVars from '../../environment.js';

const { auth0ClientId } = getEnvVars();

// Refresh Token
const refreshHelper = async () => {

  const code = await SecureStore.getItemAsync('auth0code');
  console.log(code)
  const refQueryParams = {
    client_id: auth0ClientId,
    redirect_uri: 'exp://127.0.0.1:19000/--/expo-auth-session',
    grant_type: 'authorization_code',
    code: code,
  }
  console.log(refQueryParams)

  axios
    .post('https://connectourkids.auth0.com/oauth/token', refQueryParams)
    .then(res => {
      SecureStore.setItemAsync('cok_refresh_token', res.data.refresh_token)
    })
    .catch(err => console.log(err))

    console.log(await SecureStore.getItemAsync('cok_refresh_token'))
}

export default refreshHelper;