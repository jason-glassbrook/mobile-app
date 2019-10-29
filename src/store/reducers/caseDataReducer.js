import {
    GET_CASE_DATA_START,
    GET_CASE_DATA_SUCCESS,
    GET_CASE_DATA_FAILURE,
    CLEAR_CASE_DATA
} from "../actions/caseData";

const initialState = {
    caseData: {},
    isLoading: false,
    error: ""
};

export const getCaseDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CASE_DATA_START:
            return {
                ...state,
                isLoading: true,
                error: ""
            };

        case GET_CASE_DATA_SUCCESS:
            // console.log("case data payload", action.payload);
            return {
                ...state,
                isLoading: false,
                caseData: {...action.payload}
            };

        case GET_CASE_DATA_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: "Error loading case data. Please try again later."
            };
        
        case CLEAR_CASE_DATA:
            return {
                caseData: {}
            }

        default:
            return state;
    }
};