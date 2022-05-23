import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: '',
    isLoading: false,
    isCheckToken: false,
};

const userReducers = createSlice({
    name: 'user',
    initialState,
    reducers: {
        registerUserRequest: (state, action) => {
            return {
                ...state,
                isLoading: true,
            };
        },
        registerUserSuccess: (state, action) => {
            const { payload } = action;
            return {
                ...state,
                email: payload,
                isLoading: false,
            };
        },
        registerUserFailed: (state, action) => {
            return {
                ...state,
                isLoading: false,
            };
        },
        loginRequest: (state, action) => {
            return {
                ...state,
                isLoading: true,
            };
        },
        loginSuccess: (state, action) => {
            const { payload } = action;

            return {
                ...state,
                ...payload,
                isLoading: false,
                isCheckToken: false,
            };
        },
        loginFailed: (state, action) => {
            return {
                ...state,
                isLoading: false,
                isCheckToken: false,
            };
        },
        logOut: (state, action) => {
            return {
                ...initialState,
                email: state.email,
            };
        },
        checkTokenRequest: (state, action) => {
            return {
                ...state,
                isCheckToken: true,
            };
        },
    },
});

export const {
    registerUserRequest,
    registerUserSuccess,
    registerUserFailed,
    loginRequest,
    loginSuccess,
    loginFailed,
    logOut,
    checkTokenRequest,
} = userReducers.actions;

export default userReducers.reducer;
