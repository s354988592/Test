/**
 * 这里可以放模块内私有的声明常量
 * */
import {APP_SERVER_URL} from '../../../constants/index.jsx';
export const URL_CONFIG = {
    GET_USER_LOGIN:APP_SERVER_URL+'/users/login',
    GET_USERS:APP_SERVER_URL+'/users',
    GET_USER_MOBILE:APP_SERVER_URL+'/users/verify_codes'
};
