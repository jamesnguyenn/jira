import { ACCESSTOKEN, DOMAIN, http } from '../../axios/index';
import {
    checkToken,
    getAllProject,
    getProjectDetailURL,
    register,
    signInURL,
    signInWithFacebook,
    updateProject,
    deleteProject,
    createTaskURL,
    getTaskDetailURL,
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
    updateProjectDetail,
} from '../reducer/projectDetailSlice';
import { delProject, gettAllProject } from '../reducer/projectSlice';
import { closeModal } from '../reducer/modalAdjustSlice';

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
            toast.error('Email/Password Not Correct!', {
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
export const getListProjectAction = () => {
    return async (dispatch) => {
        try {
            let result = await http.get(getAllProject);
            const action = gettAllProject(result.data.content);
            dispatch(action);
        } catch (error) {
            console.log(error);
        }
    };
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
//Update project
export const updateProjectAction = (projectID) => {
    return async (dispatch) => {
        try {
            const result = await http.put(
                updateProject + `?projectId=${projectID}`
            );
            dispatch({
                type: 'UPDATE_PROJECT',
                data: result.data.content,
            });
        } catch (error) {
            toast.error('Cannot update project. Please try again later !', {
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

//Delete project in project management
export const deleteProjectAction = (projectID) => {
    return async (dispatch) => {
        try {
            const result = await http.delete(
                `${deleteProject}?projectId=${projectID}`
            );

            const actionDelete = delProject(projectID);
            dispatch(actionDelete);
            toast.success('Delete Project Successfully', {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            toast.error('Cannot delete project. Please try again later !', {
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
//Create Task Thunk
export const createTaskThunk = (taskInfo) => {
    return async (dispatch) => {
        try {
            const response = await http.post(createTaskURL, taskInfo);

            const getTaskDetail = await http.get(
                `${getTaskDetailURL}?taskId=${response.data.content.taskId}`
            );

            dispatch(updateProjectDetail(getTaskDetail.data.content));
            dispatch(closeModal());
            toast.success('Create Task Successfully', {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            toast.error(err.response.data.content, {
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
