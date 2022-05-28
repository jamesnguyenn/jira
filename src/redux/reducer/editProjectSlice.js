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

  deleteProject: [
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
    case 'FILL_INPUT': {
      const currentState = { ...state };
      currentState.editProject = action.data;
      return { ...currentState };
    }

    case 'DELETE_PROJECT': {
      const deleteProject = [...state.deleteProject];

      const currentProject = deleteProject.findIndex(
        (item) => item.id === action.id
      );

      if (currentProject) {
        deleteProject.splice(currentProject, 1);
      }

      return { ...state };
    }
    default:
      return state;
      break;
  }
};
