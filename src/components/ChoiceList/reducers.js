import ActionsTypes from "./ActionsTypes";

const initialState = {
    items: [],
    loading: false,
    error: null
}

const ChoiceListReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionsTypes.FETCH_API_START:
            return {
                ...state,
                loading: true,
                error: null
            }

        case ActionsTypes.FETCH_API_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.items
            }


        case ActionsTypes.FETCH_API_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            }



        default:
            return state;
    }
}

export default ChoiceListReducer