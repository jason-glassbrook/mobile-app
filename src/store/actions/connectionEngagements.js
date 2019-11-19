import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import getEnvVars from '../../../environment'
export const POST_CONNECTION_ENGAGEMENTS_START = "POST_CONNECTION_ENGAGEMENTS_START";
export const POST_CONNECTION_ENGAGEMENTS_SUCCESS = "POST_CONNECTION_ENGAGEMENTS_SUCCESS";
export const POST_CONNECTION_ENGAGEMENTS_FAILURE = "POST_CONNECTION_ENGAGEMENTS_FAILURE";
export const POST_CONNECTION_DOCUMENT_START = "POST_CONNECTION_DOCUMENT_START";
export const POST_CONNECTION_DOCUMENT_SUCCESS = "POST_CONNECTION_DOCUMENT_SUCCESS";
export const POST_CONNECTION_DOCUMENT_FAILURE = "POST_CONNECTION_DOCUMENT_FAILURE";
export const CLEAR_CONNECTION_ENGAGEMENTS = "CLEAR_CONNECTION_ENGAGEMENTS";

const { familyConnectionsURL } = getEnvVars()

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
                .post(`${familyConnectionsURL}/api/v1/person/${id}/histories/`, body, {
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
                        payload: error.data
                    });
                });
        })

};

export const postConnectionDocument = (id, title, category, isPublic, notes, attachment) => dispatch => {
    const createFormBody = () => {
        const formBody = new FormData()
        formBody.append("title", title);
        formBody.append("category", category);
        formBody.append("tags", "[]");
        formBody.append("is_public", isPublic);
        formBody.append("notes", notes);
        formBody.append("person", id);
        formBody.append("attachment", {
            uri: attachment,
            type: 'image/jpg',
            name: 'photo.jpg',
        });
        return formBody
    }
    
    SecureStore.getItemAsync('cok_access_token')
        .then((accessToken) => {          
            dispatch({ type: POST_CONNECTION_DOCUMENT_START });
            console.log(createFormBody())
            axios
                .post(`${familyConnectionsURL}/api/v1/documents/`, createFormBody(), {
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": 'multipart/form-data',
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then(res => {
                    console.log('res in actions', res.data);
                    dispatch({
                        type: POST_CONNECTION_DOCUMENT_SUCCESS,
                        payload: res.data,
                    });
                })
                .catch(error => {
                    console.log('ERROR', JSON.stringify(error));
                    dispatch({
                        type: POST_CONNECTION_DOCUMENT_FAILURE,
                        payload: error
                    });
                });
        })
}

export const clearConnectionEngagements = () => dispatch => {
    dispatch({ type: CLEAR_CONNECTION_ENGAGEMENTS });
}