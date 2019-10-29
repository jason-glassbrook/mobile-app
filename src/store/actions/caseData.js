import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
export const GET_CASE_DATA_START = "GET_CASE_DATA_START";
export const GET_CASE_DATA_SUCCESS = "GET_CASE_DATA_SUCCESS";
export const GET_CASE_DATA_FAILURE = "GET_CASE_DATA_FAILURE";
export const CLEAR_CASE_DATA = "CLEAR_CASE_DATA";

export const getCaseData = (pk) => dispatch => {
    SecureStore.getItemAsync('cok_access_token')
        .then((accessToken) => {
            dispatch({ type: GET_CASE_DATA_START });
            axios
                .get(`https://family-staging.connectourkids.org/api/v1/cases/${pk}/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                .then(res => {
                    // console.log(res);
                    dispatch({
                        type: GET_CASE_DATA_SUCCESS,
                        payload: res.data
                    });
                    // console.log("Initiation:", this.state.caseData.foster_care);
                    // console.log("caseData:", this.state.caseData);
                })
                .catch(err => {
                    console.log(err);
                    dispatch({
                        type: GET_CASE_DATA_FAILURE,
                        payload: err.response
                    });
                });
            })
}; 

export const clearCaseData = () => dispatch => {
    dispatch({ type: CLEAR_CASE_DATA })
}