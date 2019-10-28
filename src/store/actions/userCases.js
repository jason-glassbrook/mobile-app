import * as SecureStore from 'expo-secure-store';

export const GET_USER_CASES_START = "GET_USER_CASES_START";
export const GET_USER_CASES_SUCCESS = "GET_USER_CASES_SUCCESS";
export const GET_USER_CASES_FAILURE = "GET_USER_CASES_FAILURE";

const accessToken = SecureStore.getItemAsync('cok_access_token')
console.log("accessToken:", accessToken);

export const getUserCases = () => dispatch => {
    dispatch({ type: GET_USER_CASES_START });
    axios
        .get("https://family-staging.connectourkids.org/api/v1/cases/", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(response => {
            console.log(response, response.data);
            dispatch({
                type: GET_USER_CASES_SUCCESS,
                payload: response.data,
            });
        })
        .catch(error => {
            console.log(error, error.response, error.response.data);
            dispatch({
                type: GET_USER_CASES_FAILURE,
                payload: error.response.data
            });
        });
};
