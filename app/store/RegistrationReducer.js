const SET_TOKKEN = "SET_TOKKEN";
const SET_EMAIL = "SET_EMAIL";
const SET_PASSWORD = "SET_PASSWORD";
const SET_ADMIN = "SET_ADMIN";

const defaultState = {
    tokken: "",
    email: "",
    password: "",
    admin: false
};

const RegistrationReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_TOKKEN: {
            return {
                ...state,
                tokken: action.payload,
            };
        }
        case SET_EMAIL: {
            return {
                ...state,
                email: action.payload,
            };
        }
        case SET_PASSWORD: {
            return {
                ...state,
                password: action.payload,
            };
        }
        case SET_ADMIN: {
            return {
                ...state,
                admin: action.payload,
            };
        }
        default:
            return state;
    }
}

export default RegistrationReducer;


export const setTokkenAction = (str) => ({
    type: SET_TOKKEN,
    payload: str,
});

export const setEmailAction = (str) => ({
    type: SET_EMAIL,
    payload: str,
});

export const setPasswordAction = (str) => ({
    type: SET_PASSWORD,
    payload: str,
});

export const setAdminAction = (bool) => ({
    type: SET_ADMIN,
    payload: bool,
});
