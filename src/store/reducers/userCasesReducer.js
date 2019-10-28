import {
    GET_USER_CASES_START,
    GET_USER_CASES_SUCCESS,
    GET_USER_CASES_FAILURE
} from "../actions/userCases";

import axios from 'axios'

const initialState = {
    results: [],
    isLoading: false,
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
            console.log("user cases payload", action.payload);
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