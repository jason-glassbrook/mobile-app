import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
export const GET_USER_PROFILE_START = "GET_USER_PROFILE_START";
export const GET_USER_PROFILE_SUCCESS = "GET_USER_PROFILE_SUCCESS";
export const GET_USER_PROFILE_FAILURE = "GET_USER_PROFILE_FAILURE";

export const getUserProfile = () => dispatch => {
    SecureStore.getItemAsync('cok_access_token')
        .then((accessToken) => {
            dispatch({ type: GET_USER_PROFILE_START });
            axios
                .get("https://family-staging.connectourkids.org/user/profile", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                .then(response => {
                    // console.log(response, response.data);
                    dispatch({
                        type: GET_USER_PROFILE_SUCCESS,
                        payload: response.data,
                    });
                })
                .catch(error => {
                    // console.log(error, error.response, error.response.data);
                    dispatch({
                        type: GET_USER_PROFILE_FAILURE,
                        payload: error.response.data
                    });
                });
        })

};


