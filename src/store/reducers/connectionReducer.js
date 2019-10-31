import {
    GET_ENGAGEMENTS_START,
    GET_ENGAGEMENTS_SUCCESS,
    GET_ENGAGEMENTS_FAILURE,
    CLEAR_ENGAGEMENTS,

    GET_DOCUMENTS_START,
    GET_DOCUMENTS_SUCCESS,
    GET_DOCUMENTS_FAILURE,
    CLEAR_DOCUMENTS,
} from "../actions/connectionData";

const initialState = {
    documents: [],
    engagements: [],
    isLoadingEngagements: false,
    engagementsError: "",
    isLoadingDocuments: false,
    documentsError: "",
};

export const connectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ENGAGEMENTS_START:
            return {
                ...state,
                isLoadingEngagements: true,
                engagementsError: ""
            };

        case GET_ENGAGEMENTS_SUCCESS:
            // console.log("case data payload", action.payload);
            return {
                ...state,
                isLoadingEngagements: false,
                engagements: { ...action.payload }
            };

        case GET_ENGAGEMENTS_FAILURE:
            return {
                ...state,
                isLoadingConnections: false,
                engagementsError: ""
            };

        case CLEAR_ENGAGEMENTS:
            return {
                connections: {}
            }

        case GET_DOCUMENTS_START:
            return {
                ...state,
                isLoadingDocuments: true,
                documentsError: ""
            };

        case GET_DOCUMENTS_SUCCESS:
            // console.log("case data payload", action.payload);
            return {
                ...state,
                isLoadingDocuments: false,
                documents: { ...action.payload }
            };

        case GET_DOCUMENTS_FAILURE:
            return {
                ...state,
                isLoadingDocuments: false,
                documentsError: "Maybe see a couples' counselor?"
            };

        case CLEAR_DOCUMENTS:
            return {
                documents: {}
            }

        default:
            return state;
    }
};