import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: {},
};

const viewPortReducer = createSlice({
    name: 'viewport',
    initialState,
    reducers: {
        updateViewPort(state, action) {
            const { payload } = action;
            state.data = payload;
        },
    },
});

export const { updateViewPort } = viewPortReducer.actions;

export default viewPortReducer.reducer;
