import {
    GET_USER_CASES_START,
    GET_USER_CASES_SUCCESS,
    GET_USER_CASES_FAILURE
} from "../actions/userCases";

const initialState = {
    userCases: [],
    isFetching: false,
    error: ""
};

const getUserCasesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_CASES_START:
            return {
                ...state,
                isFetching: true,
                error: ""
            };

        case GET_USER_CASES_SUCCESS:
            console.log("user cases payload", action.payload);
            return {
                ...state,
                isFetching: false,
                ...action.payload
            };

        case GET_USER_CASES_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: "Error loading case data. Please try again later."
            };

        default:
            return state;
    }
};

export default getUserCasesReducer;