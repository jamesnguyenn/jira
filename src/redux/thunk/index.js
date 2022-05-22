import { ACCESSTOKEN, http } from '../../axios/index';
import {
    checkToken,
    register,
    signInURL,
    signInWithFacebook,
} from '../../axios/apiURL';
import { toast } from 'react-toastify';
import {
    loginFailed,
    loginSuccess,
    registerUserFailed,
    registerUserSuccess,
} from '../reducer/userSlice';

export const loginThunk = (userInfo, navigate) => {
    return async (dispatch) => {
        try {
            const response = await http.post(signInURL, userInfo);
            const { content, message } = response.data;

            localStorage.setItem(ACCESSTOKEN, JSON.stringify(content));
            dispatch(loginSuccess(content));
            toast.success('Login Successfully', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            dispatch(loginFailed());
            toast.error(err.response.data.message, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
};

export const signInFacebook = (facebookToken) => {
    return async (dispatch) => {
        try {
            const getUser = await http.post(signInWithFacebook, {
                facebookToken: facebookToken,
            });
            console.log(getUser);
        } catch (err) {
            console.log(err);
        }
    };
};

export const registerThunk = (userInfo, navigate) => {
    return async (dispatch) => {
        try {
            const response = await http.post(register, userInfo);
            const { content, message } = response.data;

            const { email } = content;
            dispatch(registerUserSuccess(email));
            toast.success('Register Successfully', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate('/auth/login');
        } catch (err) {
            dispatch(registerUserFailed());
            toast.error(err.response.data.message, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
};

export const checkTokenThunk = (userData) => {
    return async (dispatch) => {
        try {
            const response = await http.post(checkToken);
        } catch (err) {
            if (err.response?.data?.message === 'Đăng nhập thành công!') {
                dispatch(loginSuccess(userData));
            } else {
                localStorage.removeItem(ACCESSTOKEN);
            }
        }
    };
};
