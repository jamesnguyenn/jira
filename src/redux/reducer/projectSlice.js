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
      state.project = state.project.filter(
        (item) => item.id !== action.payload
      );
    },
    updateProjects: (state, action) => {
      const project = state.project;

      const currentProject = project.find(
        (item) => item.id === action.payload.id
      );

      if (currentProject) {
        for (let key in currentProject) {
          currentProject[key] = action.payload[key];
        }
      }
    },
  },
});

export const { gettAllProject, delProject, updateProjects } =
  projectReducer.actions;

export default projectReducer.reducer;
