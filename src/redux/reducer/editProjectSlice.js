const stateDefault = {
  updateProject: [
    {
      id: 0,
      projectName: '',
      creator: 0,
      description: '',
      categoryId: '',
    },
  ],
  editProject: [
    {
      id: 0,
      projectName: '',
      creator: 0,
      description: '',
      categoryId: '',
    },
  ],
};

export const editProjectReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case 'UPDATE_PROJECT': {
      state.updateProject = action.data;

      return { ...state };
    }
    case 'FILL_INPUT': {
      state.editProject = action.data;

      return { ...state };
    }
    default:
      return state;
      break;
  }
};
