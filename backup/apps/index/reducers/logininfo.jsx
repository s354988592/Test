import { ACTION_TYPES } from '../constants/index.jsx';

export default function LoginInfo(state = {}, action) {

    switch (action.type) {
        case ACTION_TYPES.GET_LOGIN_INFO :
        // console.log(action.loginInfo);
            return Object.assign({}, state, {loginInfo: action.loginInfo});
        default :
            return state;
    }
}