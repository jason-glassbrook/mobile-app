import {
    GET_USER_PROFILE_START,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAILURE
} from "../actions/userProfile";


const initialState = {
    results: [],
    isLoading: false,
    error: ""
};

export const getUserProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_PROFILE_START:
            // console.log('hey yo, this is starting!', state.isLoading)
            return {
                ...state,
                isLoading: true,
                error: ""
            };

        case GET_USER_PROFILE_SUCCESS:
            // console.log("user cases payload", action.payload, 'this state is loading', state.isLoading);
            return {
                ...state,
                isLoading: false,
                ...action.payload
            };

        case GET_USER_PROFILE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: "Error loading user profile. Please try again later."
            };

        default:
            return state;
    }
};