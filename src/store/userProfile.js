import { API } from '../config';

const PROFILE = 'profile/posts'

export const profile = list => ({ type: PROFILE, list });

export const getProfilePosts = (user) => async (dispatch) => {
    const response = await fetch(`${API}/profile/${user}`);
    if (response.ok) {
        const { userProfile } = await response.json();
        dispatch(profile(userProfile));
    }
}

export default function reducer(state = { types: [] }, action) {
    switch (action.type) {


        case PROFILE: {
            return {
                ...state,
                list: action.list.Posts
            };
        }
        case "CLEAR_POSTS": {
            debugger;
            return {
                ...state,
                list: []
            };
        }

        default: return state;
    }
}
