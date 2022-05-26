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
      alias: '',
      creator: 0,
      description: '',
      categoryId: '',
    },
  ],
};

export const editProjectReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case 'UPDATE_PROJECT': {
      const currentState = { ...state };
      currentState.updateProject = action.data;
      return { ...currentState };
    }
    case 'FILL_INPUT': {
      const currentState = { ...state };
      currentState.editProject = action.data;
      return { ...currentState };
    }
    default:
      return state;
      break;
  }
};
