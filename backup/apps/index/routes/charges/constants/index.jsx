/**
 * 这里可以放模块内私有的声明常量
 * */
import {APP_SERVER_URL,APP_SERVER_RECHARGE} from '../../../constants/index.jsx';
export const someDefaults = {

}

export const URL_CONFIG = {
    GET_HISTORY_BILL:APP_SERVER_URL+'/users',
    GET_CHARGE:APP_SERVER_URL + '/users',
    GET_RECHARGE:APP_SERVER_URL
};
