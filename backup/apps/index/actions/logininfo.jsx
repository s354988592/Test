import {ACTION_TYPES,APP_URL_CONFIG} from '../constants/index.jsx';
export const getLoginInfo = (json)=>{
    return {
        type: ACTION_TYPES.GET_LOGIN_INFO,
        loginInfo:json
    }
};