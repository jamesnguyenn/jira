import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {},
  isLoading: false,
};

const projectDetailReducer = createSlice({
  name: 'projectDetail',
  initialState,
  reducers: {
    getProjectDetailRequest: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    getProjectDetailSuccess: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        data: { ...payload },
        isLoading: false,
      };
    },
    getProjectDetailFailure: (state, action) => {
      return {
        ...state,
        isLoading: false,
      };
    },
  },
});

export const {
  getProjectDetailRequest,
  getProjectDetailSuccess,
  getProjectDetailFailure,
} = projectDetailReducer.actions;

export default projectDetailReducer.reducer;
