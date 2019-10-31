import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
export const GET_RELATIONSHIPS_START = "GET_RELATIONSHIPS_START";
export const GET_RELATIONSHIPS_SUCCESS = "GET_RELATIONSHIPS_SUCCESS";
export const GET_RELATIONSHIPS_FAILURE = "GET_RELATIONSHIPS_FAILURE";
export const CLEAR_RELATIONSHIPS = "CLEAR_RELATIONSHIPS";



export const getEngagements = (pk) => dispatch => {
    SecureStore.getItemAsync('cok_access_token')
        .then((accessToken) => {
            dispatch({ type: GET_RELATIONSHIPS_START });
            axios
                .get(`https://family-staging.connectourkids.org/api/v1/person/${pk}/histories/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                .then(res => {
                    // console.log(res);
                    dispatch({
                        type: GET_RELATIONSHIPS_SUCCESS,
                        payload: res.data
                    });
                })
                .catch(err => {
                    // console.log(err);
                    dispatch({
                        type: GET_RELATIONSHIPS_FAILURE,
                        payload: err.response
                    });
                });
        })
};

export const clearEngagements = () => dispatch => {
    dispatch({ type: CLEAR_RELATIONSHIPS })
}