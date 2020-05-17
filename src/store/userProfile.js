import { API } from '../config';

const PROFILE = 'profile/posts'
const USER = 'profile/user'

export const profile = list => ({ type: PROFILE, list });
export const user = list => ({ type: USER, list });

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
                list: action.list.Posts,
            };
        }


        default: return state;
    }
}
