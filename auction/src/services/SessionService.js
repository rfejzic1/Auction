import axios from 'axios';
import Cookies from 'js-cookie';

export const setAPIBaseURL = domain => {
    axios.defaults.baseURL = domain;
};

function setAuthorizationHeaderDefault(token) {
    if(token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export const setUserLoginState = (res, dispatch) => {
    const { user, token } = res.data;

    dispatch({
        type: 'LOGIN',
        user
    });

    setAuthorizationHeaderDefault(token);
    console.log(`Token ${token} is set!`);
    Cookies.set('token', token, { expires: 7 });
};

export const register = (dispatch, registerData) => {
    axios.post('/register', registerData)
        .then(res => setUserLoginState(res, dispatch))
        .catch(err => console.log(err));
};

export const login = (dispatch, loginData) => {
    axios.post('/login', loginData)
        .then(res => setUserLoginState(res, dispatch))
        .catch(err => console.log(err));
};

export const logout = dispatch => {
    dispatch({
        type: 'LOGOUT'
    });

    setAuthorizationHeaderDefault(null);
    Cookies.remove('token');
};
