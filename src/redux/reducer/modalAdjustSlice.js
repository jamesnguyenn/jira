import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    visible: false,
    componentModalContent: {},
};

const modalReducer = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            return {
                ...state,
                visible: true,
            };
        },

        closeModal: (state, action) => {
            return {
                ...state,
                visible: false,
            };
        },
    },
});

export const { openModal, closeModal, getProjectDetailModal } =
    modalReducer.actions;

export default modalReducer.reducer;
