import { API } from '../config';

const LOAD = 'posts/load';

export const load = list => ({ type: LOAD, list });

export const getPosts = () => async (dispatch, getState) => {
    const response = await fetch(`${API}/posts`);
    if (response.ok) {
        const { posts } = await response.json();
        dispatch(load(posts));
    }
}

export default function reducer(state = { types: [] }, action) {
    switch (action.type) {

        case LOAD: {
            return {
                ...state,
                list: action.list
            };
        }

        default: return state;
    }
}
