import { ACCESSTOKEN, DOMAIN, http } from '../../axios/index';
import {
    checkToken,
    getAllProject,
    getProjectDetailURL,
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
import axios from 'axios';
import {
    getProjectDetailFailure,
    getProjectDetailSuccess,
} from '../reducer/projectDetailSlice';

//Login
export const loginThunk = (userInfo, navigate) => {
    return async (dispatch) => {
        try {
            const response = await http.post(signInURL, userInfo);
            const { content, message } = response.data;

            localStorage.setItem(ACCESSTOKEN, JSON.stringify(content));
            dispatch(loginSuccess(content));
            toast.success('Login Successfully', {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate('/');
        } catch (err) {
            dispatch(loginFailed());
            toast.error(err.response.data.message, {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
};

//SignInFacebook
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

//Register Account
export const registerThunk = (userInfo, onClick) => {
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
            onClick();
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

//Check if user is logged in
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

//Call api for project management

export const getAllProjectAction = async (dispatch) => {
    try {
        let result = await axios({
            url: `${DOMAIN}/Project/getAllProject`,
            method: 'GET',
            headers: { Authorization: 'Bearer ' + ACCESSTOKEN },
        });
        console.log('All_project', result);
        dispatch({
            type: 'GET_PROJECTS',
            content: result.content,
        });
    } catch (error) {
        console.log(error);
    }
};

//Get Project Detail

export const getProjectDetailThunk = (projectID) => {
    return async (dispatch) => {
        try {
            const response = await http.get(
                getProjectDetailURL + `?id=${projectID}`
            );
            dispatch(getProjectDetailSuccess(response.data.content));
        } catch (err) {
            toast.error(err.response.data.message, {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch(getProjectDetailFailure());
        }
    };
};
