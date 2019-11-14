import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
export const POST_CONNECTION_ENGAGEMENTS_START = "POST_CONNECTION_ENGAGEMENTS_START";
export const POST_CONNECTION_ENGAGEMENTS_SUCCESS = "POST_CONNECTION_ENGAGEMENTS_SUCCESS";
export const POST_CONNECTION_ENGAGEMENTS_FAILURE = "POST_CONNECTION_ENGAGEMENTS_FAILURE";
export const POST_CONNECTION_DOCUMENT_START = "POST_CONNECTION_DOCUMENT_START";
export const POST_CONNECTION_DOCUMENT_SUCCESS = "POST_CONNECTION_DOCUMENT_SUCCESS";
export const POST_CONNECTION_DOCUMENT_FAILURE = "POST_CONNECTION_DOCUMENT_FAILURE";
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
                        payload: error.res.data
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
        // console.log('formBody', formBody)
        return formBody
    }
    
    SecureStore.getItemAsync('cok_access_token')
        .then((accessToken) => {
            // const fileReader = new FileReader()
            // const buffer = fileReader.readAsArrayBuffer(attachment)
            // console.log('buffer', buffer)

            // const formBody = {
            //     title: title,
            //     category: category,
            //     tags: [],
            //     is_public: isPublic,
            //     notes: notes,
            //     person: id,
            //     attachment: attachment
            // }
            // const config = {
            //     headers: {
            //         "content-type": `multipart/form-data; boundary=${formBody._boundary}`,
            //         Authorization: `Bearer ${accessToken}`,
            //     }
            // }
            dispatch({ type: POST_CONNECTION_DOCUMENT_START });
            console.log(createFormBody())
            axios
                .post(`https://family-staging.connectourkids.org/api/v1/documents/`, createFormBody(), {
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": 'multipart/form-data',
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
            // mimeType: "multipart/form-data",
            })
            .then(res => {
                console.log('res in actions', res);
                dispatch({
                    type: POST_CONNECTION_DOCUMENT_SUCCESS,
                    payload: res,
                });
            })
            .catch(error => {
                console.log('ERROR', error);
                dispatch({
                    type: POST_CONNECTION_DOCUMENT_FAILURE,
                    payload: error
                });
            });

}

export const clearConnectionEngagements = () => dispatch => {
    dispatch({ type: CLEAR_CONNECTION_ENGAGEMENTS });
}



// const upload = (url, data) => {
//     let options = {
//         headers: {
//             'Content-Type': 'multipart/form-data'
//         },
//         method: 'POST'
//     };

//     options.body = new FormData();
//     for (let key in data) {
//         options.body.append(key, data[key]);
//     }

//     return fetch('https://family-staging.connectourkids.org/api/v1/documents/', options)
//         .then(response => {
//             return response.json()
//                 .then(responseJson => {
//                     //You put some checks here
//                     return responseJson;
//                 });
//         });
// }
// upload('https://family-staging.connectourkids.org/api/v1/documents/', {
//     file: {
//         uri: image.path,
//         type: image.mime,
//         name: image.name,
//     }
// }).then(r => {
//     //do something with `r`
// });