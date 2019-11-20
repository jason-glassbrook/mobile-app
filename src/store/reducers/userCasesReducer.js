import {
    GET_USER_CASES_START,
    GET_USER_CASES_SUCCESS,
    GET_USER_CASES_FAILURE,
    CLEAR_USER_CASES
} from "../actions/userCases";


const initialState = {
    results: [],
    isLoading: true,
    error: ""
};

export const getUserCasesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_CASES_START:

            return {
                ...state,
                isLoading: true,
                error: ""
            };

        case GET_USER_CASES_SUCCESS:

            return {
                ...state,
                isLoading: false,
                ...action.payload
            };

        case GET_USER_CASES_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: "Error loading case data. Please try again later."
            };
        
        case CLEAR_USER_CASES:
            return {
                ...state,
                results: []
            };

        default:
            return state;
    }
};