import { configureStore } from '@reduxjs/toolkit';
import userReducers from '../reducer/userSlice';
import projectReducer from '../reducer/projectSlice';

export const store = configureStore({
  reducer: {
    user: userReducers,
    project: projectReducer,
  },
});
