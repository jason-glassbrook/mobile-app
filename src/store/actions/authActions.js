import {
  LOG_OUT,
  SET_MODAL_VISIBLE,
  SET_VIDEO_AGREE_VISIBLE,
  SET_VIDEO_PLAYER_VISIBLE,
  SET_USER_CREDS,
  SET_LOGGED_IN_STATUS,
  SET_ACCESS_TOKEN,
  SET_ID_TOKEN
} from './actionTypes';
import { sendEvent } from './../../helpers/createEvent';
import * as SecureStore from 'expo-secure-store'
import jwtDecode from 'jwt-decode';


export const logOut = email => {
  sendEvent(email, 'click', 'logout');
  return { type: LOG_OUT };
};

export const setUserCreds = (decodedToken, auth0Data) => {
  return { type: SET_USER_CREDS, decodedToken, auth0Data };
};

export const authChecker = () => dispatch => {
  SecureStore.getItemAsync('cok_access_token')
    .then(res => {
      if (res) {
        // const decodedIdToken = jwtDecode(res)
        // const accessToken = res        
        dispatch({ type: SET_ACCESS_TOKEN, payload: res })
        console.log('we checked for access token', res)
        // return accessToken
        SecureStore.getItemAsync('cok_id_token')
        .then(res => {
          if (res) {
            const decodedIdToken = jwtDecode(res)
            dispatch({ type: SET_ID_TOKEN, payload: decodedIdToken })
            console.log('we checked for id token', decodedIdToken)
            // dispatch({ type: SET_ACCESS_TOKEN, payload: accessToken})
            dispatch({ type: SET_LOGGED_IN_STATUS, payload: true })
            console.log('set logged in true')
          } else {
            dispatch({ type: SET_LOGGED_IN_STATUS, payload: false })
            console.log('set logged in false')
          }
        })
      } else {
        dispatch({ type: SET_LOGGED_IN_STATUS, payload: false })
        console.log('logged out at access token')
      }
    })
  .catch(err => console.log(err))
}

// Sign Up Modal Sequence Actions
export const setModalVisible = visible => {
  return { type: SET_MODAL_VISIBLE, payload: visible };
};

export const setAgreeModalVisible = visible => {
  return { type: SET_VIDEO_AGREE_VISIBLE, payload: visible };
};

export const setVideoPlayerModalVisible = visible => {
  return { type: SET_VIDEO_PLAYER_VISIBLE, payload: visible };
};
