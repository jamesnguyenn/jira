const stateDefault = {
  userSearch: [],
};

export const userSearchReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case 'ADD_SEARCH_USER': {
      const users = { ...state };

      console.log('users', state.userSearch);

      users.userSearch = action.user;

      return { ...users };
    }
    default:
      return state;
      break;
  }
};
