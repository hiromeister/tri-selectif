import ActionsTypes from "./ActionsTypes";

export const fetchApiStart = () => ({
    type: ActionsTypes.FETCH_API_START
})

export const fetchApiSuccess = (items) => ({
    type: ActionsTypes.FETCH_API_SUCCESS,
    payload: { items }
})

export const fetchApiFail = (error) => ({
    type: ActionsTypes.FETCH_API_FAILED,
    payload: { error }
})

export const fetchApi = () => {
    return dispatch => {
        dispatch(fetchApiStart());
        return fetch("./api/api.json")
            .then(handleErrors)
            .then(res => res.json())
            .then(data => {
                dispatch(fetchApiSuccess(data));
            })
            .catch(error => dispatch(fetchApiFail(error)));
    };
}

const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText)
    }
    return response;
}
