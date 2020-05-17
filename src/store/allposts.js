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

// export const getProfilePosts = (user) => async (dispatch) => {
//     const response = await fetch(`${API}/profile/${user}`);
//     if (response.ok) {
//         const { userProfile } = await response.json();
//         dispatch(profile(userProfile));
//     }
// }

export default function reducer(state = { types: [] }, action) {
    switch (action.type) {

        case LOAD: {
            return {
                ...state,
                list: action.list
            };
        }
        // case PROFILE: {
        //     return {
        //         ...state,
        //         list: action.list.Posts
        //     };
        // }
        case "CLEAR_POSTS": {
            return {
                ...state,
                list: []
            };
        }

        default: return state;
    }
}
