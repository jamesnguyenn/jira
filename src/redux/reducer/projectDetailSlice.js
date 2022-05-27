import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
    data: {},
    isLoading: false,
};

const projectDetailReducer = createSlice({
    name: 'projectDetail',
    initialState,
    reducers: {
        getProjectDetailRequest(state, action) {
            return {
                ...state,
                isLoading: true,
            };
        },
        getProjectDetailSuccess(state, action) {
            const { payload } = action;
            return {
                ...state,
                data: { ...payload },
                isLoading: false,
            };
        },
        getProjectDetailFailure(state, action) {
            return {
                ...state,
                isLoading: false,
            };
        },
        updateProjectDetail(state, action) {
            const { payload } = action;

            let currentTaskLists = state.data.lstTask.find(
                (task) => task.statusId === payload.statusId
            );
            currentTaskLists.lstTaskDeTail.push(payload);
        },
    },
});

export const {
    getProjectDetailRequest,
    getProjectDetailSuccess,
    getProjectDetailFailure,
    updateProjectDetail,
} = projectDetailReducer.actions;

export default projectDetailReducer.reducer;
