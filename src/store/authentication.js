import { API } from '../config';

const SET_TOKEN = 'LOGIN/AUTHENTICATION';
const PRIVATE_TOKEN = 'PRIVATE/AUTHENTICATION';
const REG_TOKEN = 'REGISTER/AUTHENTICATION';
const UPLOAD_IMG_TOKEN = 'IMAGE/UPLOAD';

export const setToken = payload => ({ type: SET_TOKEN, payload });
export const privateToken = payload => ({ type: SET_TOKEN, payload });
export const regToken = payload => ({ type: SET_TOKEN, payload });
export const uploadImgToken = payload => ({ type: SET_TOKEN, payload });


export const loadToken = () => async dispatch => {
    const token = window.localStorage.getItem('userID');
    if (token) {
        dispatch(privateToken(token));
    }
};

export const login = (username, password) => async dispatch => {
    // Dispatch an action, here
    const response = await fetch(`${API}/users/token`, {
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

export const register = (username, password, email) => async dispatch => {
    // Dispatch an action, here
    const response = await fetch(`${API}/users`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
    });

    if (response.ok) {
        const payload = await response.json();
        window.localStorage.setItem("userID", payload.user.id);
        dispatch(regToken(payload));
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
        case PRIVATE_TOKEN: {
            return {
                ...state,
                user: action.payload,
            };
        }
        case REG_TOKEN: {
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
