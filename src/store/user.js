import { API } from '../config';

const USER = 'profile/user'

export const selectedUser = list => ({ type: USER, list });

export const getUser = (user) => async (dispatch) => {
    const response = await fetch(`${API}/user/${user}`);
    if (response.ok) {
        const res = await response.json();
        dispatch(selectedUser(res));
    }
}


export default function reducer(state = { types: [] }, action) {
    switch (action.type) {


        case USER: {
            return {
                ...state,
                list: action.list.user,
            };
        }

        case "CLEAR_POSTS": {
            return {
                ...state,
                list: []
            };
        }

        default: return state;
    }
}
