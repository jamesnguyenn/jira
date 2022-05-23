import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  project: [],
};

const projectReducer = createSlice({
  name: 'project',
  initialState,
  reducers: {
    gettAllProject: (state, action) => {
      switch (action.type) {
        case 'GET_TASKS':
          {
            state.project = action.content;
            console.log(action.content);

            return { ...state };
          }

          break;

        default:
          return { ...state };
          break;
      }
    },
  },
});

export const { gettAllProject } = projectReducer.actions;

export default projectReducer.reducer;
