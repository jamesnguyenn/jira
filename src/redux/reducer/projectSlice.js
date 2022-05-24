import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  project: [],
};

const projectReducer = createSlice({
  name: 'project',
  initialState,
  reducers: {
    gettAllProject: (state, action) => {
      state.project = action.payload;
    },
    delProject: (state, action) => {
      console.log('DEL', action);
      state.project = state.project.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { gettAllProject, delProject } = projectReducer.actions;

export default projectReducer.reducer;
