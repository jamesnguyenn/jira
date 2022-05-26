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
      const currentState = { ...state };
      currentState.updateProject = action.data;

<<<<<<< HEAD
      return { ...currentState };
=======
            return { ...currentState };
        }
        case 'FILL_INPUT': {
            const currentState = { ...state };
            currentState.editProject = action.data;
            return { ...currentState };
        }
        default:
            return state;
>>>>>>> 7fb56e41e325dfad5d0db7eced11ecd9f57f1a70
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
