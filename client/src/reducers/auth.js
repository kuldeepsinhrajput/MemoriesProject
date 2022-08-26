import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            console.log(action?.data);//?. added after action because if it is null it will not thrown an error
            return state;
        default:
            return state;
    }
};

export default authReducer;