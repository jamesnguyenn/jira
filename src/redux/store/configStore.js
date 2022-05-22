import { configureStore } from '@reduxjs/toolkit';
import userReducers from '../reducer/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducers,
    },
});
