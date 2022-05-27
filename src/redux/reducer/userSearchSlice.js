const stateDefault = {
  userSearch: [],
};

export const userSearchReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case 'ADD_SEARCH_USER': {
      const users = { ...state };

      users.userSearch = action.user;

      return { ...users };
    }
    default:
      return state;
      break;
  }
};
