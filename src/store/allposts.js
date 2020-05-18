import { API } from '../config';

const LOAD = 'posts/load';
const PROFILE = 'profile/posts'

export const load = list => ({ type: LOAD, list });
export const profile = list => ({ type: PROFILE, list });

export const getPosts = () => async (dispatch) => {
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
