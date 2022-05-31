import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: {},
    isLoading: false,
};

const taskDetailReducer = createSlice({
    name: 'projectDetail',
    initialState,
    reducers: {
        updateTaskDetail(state, action) {
            const { payload } = action;
            state.data = payload;
        },
    },
});

export const { updateTaskDetail } = taskDetailReducer.actions;

export default taskDetailReducer.reducer;
