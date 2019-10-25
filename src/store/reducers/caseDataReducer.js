import {
    GET_CASE_DATA_START,
    GET_CASE_DATA_SUCCESS,
    GET_CASE_DATA_FAILURE
} from "../actions/userCases";

const initialState = {
    caseData: [],
    isFetching: false,
    error: ""
};

const getUserCasesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CASE_DATA_START:
            return {
                ...state,
                isFetching: true,
                error: ""
            };

        case GET_CASE_DATA_SUCCESS:
            console.log("user cases payload", action.payload);
            return {
                ...state,
                isFetching: false,
                ...action.payload
            };

        case GET_CASE_DATA_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: "Error loading case data. Please try again later."
            };

        default:
            return state;
    }
};

export default getCaseDataReducer;