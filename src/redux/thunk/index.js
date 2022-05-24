import { ACCESSTOKEN, DOMAIN, http } from '../../axios/index';
import {
  checkToken,
  register,
  signInURL,
  signInWithFacebook,
  getAllProject,
  deleteProject,
} from '../../axios/apiURL';
import { toast } from 'react-toastify';
import {
  loginFailed,
  loginSuccess,
  registerUserFailed,
  registerUserSuccess,
} from '../reducer/userSlice';
import axios from 'axios';
import { delProject, gettAllProject } from '../reducer/projectSlice';

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

//Delete project in project management
export const delProjectAction = (projectId) => {
  return async (dispatch) => {
    try {
      let result = await http.delete(deleteProject);

      alert(result);

      const actionDel = delProject(projectId);
      dispatch(actionDel);

      const action = getListProjectAction();
      dispatch(action);

      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  };
};
