import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import getEnvVars from '../../../environment';
export const GET_USER_CASES_START = "GET_USER_CASES_START";
export const GET_USER_CASES_SUCCESS = "GET_USER_CASES_SUCCESS";
export const GET_USER_CASES_FAILURE = "GET_USER_CASES_FAILURE";
export const CLEAR_USER_CASES = "CLEAR_USER_CASES";

const { familyConnectionsURL } = getEnvVars()

export const getUserCases = () => dispatch => {
    SecureStore.getItemAsync('cok_access_token')
    .then((accessToken) => {
        dispatch({ type: GET_USER_CASES_START });
        axios
            .get(`${familyConnectionsURL}/api/v1/cases/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then(response => {
                // console.log(response, response.data);
                dispatch({
                    type: GET_USER_CASES_SUCCESS,
                    payload: response.data,
                });
            })
            .catch(error => {
                // console.log(error, error.response, error.response.data);
                dispatch({
                    type: GET_USER_CASES_FAILURE,
                    payload: error.response.data
                });
            }); 
    })

};

export const clearUserCases = () => dispatch => {
    dispatch({ type: CLEAR_USER_CASES });
}