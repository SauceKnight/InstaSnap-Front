
const SET_TOKEN = 'LOGIN/AUTHENTICATION';
const UPLOAD_IMG_TOKEN = 'IMAGE/UPLOAD';

export const setToken = payload => ({ type: SET_TOKEN, payload });
export const uploadImgToken = payload => ({ type: SET_TOKEN, payload });

export const login = (username, password) => async dispatch => {
    // Dispatch an action, here
    const response = await fetch(`${process.env.API_URL}/users/token`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        const payload = await response.json();
        window.localStorage.setItem("userID", payload.user.id);
        dispatch(setToken(payload));
    }

}

export const upload = (imageurl, caption) => async dispatch => {

    const response = await fetch(`https://api.cloudinary.com/v1_1/sauceknight/image/upload`, {
        method: 'post',
        body: JSON.stringify({ imageurl, caption }),
    });

}

export default function reducer(state = {}, action) {
    switch (action.type) {
        case SET_TOKEN: {
            return {
                ...state,
                user: action.payload,
            };
        }
        case UPLOAD_IMG_TOKEN: {
            return {
                ...state,
                post: action.payload,
            };
        }

        default: return state;
    }
}
