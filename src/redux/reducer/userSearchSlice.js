const stateDefault = {
    userSearch: [],
    userManagement: [],
    editUserManagement: {
        name: '',
        userId: '',
        phoneNumber: '',
        email: '',
    },
};

export const userSearchReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'ADD_SEARCH_USER': {
            const users = { ...state };

            users.userSearch = action.user;

            return { ...users };
        }

        case 'GET_ALL_USER': {
            const users = { ...state };

            users.userManagement = action.users;

            return { ...users };
        }

        case 'DELETE_USER': {
            const users = { ...state };
            users.userManagement = [
                ...state.userManagement.filter(
                    (user) => user.userId !== action.userId
                ),
            ];

            return { ...users };
        }

        case 'FILL_INPUT': {
            const currentUser = { ...state };
            currentUser.editUserManagement = action.data;
            return { ...currentUser };
        }

        default:
            return state;
    }
};
