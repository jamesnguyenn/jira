import { configureStore } from '@reduxjs/toolkit';
import userReducers from '../reducer/userSlice';
import projectReducer from '../reducer/projectSlice';
import projectDetailReducer from '../reducer/projectDetailSlice';
import modalReducer from '../reducer/modalAdjustSlice';
import { editProjectReducer } from '../reducer/editProjectSlice';
import { userSearchReducer } from '../reducer/userSearchSlice';

export const store = configureStore({
  reducer: {
    user: userReducers,
    project: projectReducer,
    projectDetail: projectDetailReducer,
    modalAdjust: modalReducer,
    editProject: editProjectReducer,
    userSearch: userSearchReducer,
  },
});
