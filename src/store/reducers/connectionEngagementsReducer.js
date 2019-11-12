import {
    POST_CONNECTION_ENGAGEMENTS_START,
    POST_CONNECTION_ENGAGEMENTS_SUCCESS,
    POST_CONNECTION_ENGAGEMENTS_FAILURE,
    CLEAR_CONNECTION_ENGAGEMENTS
} from "../actions/connectionEngagements";

const initialState = {
    data: {},
    // dataType: 'N',
    // // due_date: null,
    // isPublic: true,
    // person: null,
    isLoadingEngagements: false,
    engagementsError: ""
};

export const connectionEngagementsReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_CONNECTION_ENGAGEMENTS_START:
            return {
                ...state,
                isLoadingEngagements: true,
                engagementsError: ""
            };

        case POST_CONNECTION_ENGAGEMENTS_SUCCESS:
            return {
                ...state,
                isLoadingEngagements: false,
                data: {...action.payload}
                
                // dataType: action.data_type,
                // // due_date: action.due_date,
                // isPublic: action.is_public,
                // person: action.person,
            };

        case POST_CONNECTION_ENGAGEMENTS_FAILURE:
            return {
                ...state,
                isLoadingEngagements: false,
                engagementsError: "Error loading engagements. Please try again later."
            };

        default:
            return state;
    }
};