import axios from 'axios';
import Cookies from 'js-cookie';

function setAuthorizationHeaderDefault(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const login = (dispatch, loginData) => {
    axios.post('http://localhost:9000/login', loginData)
    .then(res => {
        const { user, token } = res.data;

        dispatch({
            type: 'LOGIN',
            user
        });

        setAuthorizationHeaderDefault(token);
        Cookies.set('token', token, { expires: 7 });
    })
    .catch(err => console.log(err));
};

export const logout = dispatch => {
    dispatch({
        type: 'LOGOUT'
    });

    setAuthorizationHeaderDefault(null);
    Cookies.remove('token');
};
