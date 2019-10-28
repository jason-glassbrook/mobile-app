import {
    GET_CASE_DATA_START,
    GET_CASE_DATA_SUCCESS,
    GET_CASE_DATA_FAILURE
} from "../actions/userCases";

const initialState = {
    caseData: [],
    isLoading: false,
    error: ""
};

const getUserCasesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CASE_DATA_START:
            return {
                ...state,
                isLoading: true,
                error: ""
            };

        case GET_CASE_DATA_SUCCESS:
            console.log("user cases payload", action.payload);
            return {
                ...state,
                isLoading: false,
                ...action.payload
            };

        case GET_CASE_DATA_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: "Error loading case data. Please try again later."
            };

        default:
            return state;
    }
};

export default getCaseDataReducer;