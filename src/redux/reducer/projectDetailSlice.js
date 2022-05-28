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
        createTaskProjectDetail(state, action) {
            const { payload } = action;

            let currentTaskLists = state.data.lstTask.find(
                (task) => task.statusId === payload.statusId
            );
            currentTaskLists.lstTaskDeTail.push(payload);
        },
        updateTaskProjectDetail(state, action) {
            const { payload } = action;
            let currentTaskLists = state.data.lstTask.find(
                (task) => task.statusId === payload.statusId
            );
            let currentTaskIndex = currentTaskLists.lstTaskDeTail.findIndex(
                (task) => task.taskId === payload.taskId
            );
            if (currentTaskIndex !== -1) {
                currentTaskLists.lstTaskDeTail.splice(
                    currentTaskIndex,
                    1,
                    payload
                );
            }
        },
        deleteTaskProjectDetail(state, action) {
            const { payload } = action;
            let currentTaskLists = state.data.lstTask.find(
                (task) => task.statusId === payload.statusId
            );
            let currentTaskIndex = currentTaskLists.lstTaskDeTail.findIndex(
                (task) => task.taskId === payload.taskId
            );
            if (currentTaskIndex !== -1) {
                currentTaskLists.lstTaskDeTail.splice(currentTaskIndex, 1);
            }
        },
    },
});

export const {
    getProjectDetailRequest,
    getProjectDetailSuccess,
    getProjectDetailFailure,
    createTaskProjectDetail,
    updateTaskProjectDetail,
    deleteTaskProjectDetail,
} = projectDetailReducer.actions;

export default projectDetailReducer.reducer;
