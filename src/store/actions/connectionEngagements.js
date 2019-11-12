import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
export const POST_CONNECTION_ENGAGEMENTS_START = "POST_CONNECTION_ENGAGEMENTS_START";
export const POST_CONNECTION_ENGAGEMENTS_SUCCESS = "POST_CONNECTION_ENGAGEMENTS_SUCCESS";
export const POST_CONNECTION_ENGAGEMENTS_FAILURE = "POST_CONNECTION_ENGAGEMENTS_FAILURE";
export const CLEAR_CONNECTION_ENGAGEMENTS = "CLEAR_CONNECTION_ENGAGEMENTS";

export const postConnectionEngagements = (id, note, subject, dataType, dueDate, isPublic) => dispatch => {
    SecureStore.getItemAsync('cok_access_token')
    .then((accessToken) => {
        console.log('accessToken', accessToken)
        console.log('formState in reducer action', id, note, subject, dataType, isPublic)
        const body = {
            data: {
                note: note,
                subject: subject,
            },
            data_type: dataType,
            due_date: dueDate,
            is_public: isPublic,
            person: id,
        }
        dispatch({ type: POST_CONNECTION_ENGAGEMENTS_START });
        axios
            .post(`https://family-staging.connectourkids.org/api/v1/person/${id}/histories/`, body, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then(res => {
                console.log('res.data in actions', res.data);
                dispatch({
                    type: POST_CONNECTION_ENGAGEMENTS_SUCCESS,
                    payload: res.data,
                });
            })
            .catch(error => {
                // console.log(error, error.response, error.response.data);
                dispatch({
                    type: POST_CONNECTION_ENGAGEMENTS_FAILURE,
                    payload: error.response.data
                });
            }); 
    })

};

export const clearConnectionEngagements = () => dispatch => {
    dispatch({ type: CLEAR_CONNECTION_ENGAGEMENTS });
}