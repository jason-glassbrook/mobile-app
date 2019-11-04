import {
    GET_USER_CASES_START,
    GET_USER_CASES_SUCCESS,
    GET_USER_CASES_FAILURE
} from "../actions/userCases";


const initialState = {
    results: [],
    isLoading: false,
    error: ""
};

export const getUserCasesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_CASES_START:
            // console.log('hey yo, this is starting!', state.isLoading)
            return {
                ...state,
                isLoading: true,
                error: ""
            };

        case GET_USER_CASES_SUCCESS:
            // console.log("user cases payload", action.payload, 'this state is loading', state.isLoading);
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

        default:
            return state;
    }
};