import { configureStore } from '@reduxjs/toolkit';
import userReducers from '../reducer/userSlice';
import projectReducer from '../reducer/projectSlice';
import projectDetailReducer from '../reducer/projectDetailSlice';

export const store = configureStore({
    reducer: {
        user: userReducers,
        project: projectReducer,
        projectDetail: projectDetailReducer,
    },
});
