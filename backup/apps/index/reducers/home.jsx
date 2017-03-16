/**
 * Created by mac on 2017/2/7.
 */

import { ACTION_TYPES } from '../constants/index.jsx';

export default function Home(state = {}, action) {
    switch (action.type) {

        case ACTION_TYPES.USER_LOGIN:
            return Object.assign({}, state, {userId: action.userId,isLogin:false});

        case ACTION_TYPES.CHANGE_PROVINCE:
            return Object.assign({}, state, {provinceId: action.provinceId});

        case ACTION_TYPES.GET_PROVINCE_INFO :
            return Object.assign({}, state, {provinceInfo: action.provinceInfo});

        case ACTION_TYPES.GET_CITY_LIST :
            return Object.assign({}, state, {cityListAction: action.cityListAction});

        case ACTION_TYPES.GET_ACTIVITY_LIST :

            return Object.assign({}, state, {activityList: action.activityList});
        case ACTION_TYPES.GET_CHARGE :
            return Object.assign({}, state, {chargeAction: action.chargeAction});

        case ACTION_TYPES.GET_CONSUM_INFOR :
            return Object.assign({}, state, {consumInforAction: action.consumInforAction });  
        case ACTION_TYPES.GET_HOME_CONFS :
            return Object.assign({}, state, {homeConfsAction: action.homeConfsAction});             
         case ACTION_TYPES.GET_TAB_SLIDER :
             return Object.assign({}, state, {tabSlider: action.tabSlider});      
        case ACTION_TYPES.GET_BANNERS :
            return Object.assign({}, state, {bannerAction: action.bannerAction});
        case ACTION_TYPES.GET_NO_LOGIN_ERR_MSG :
            return Object.assign({}, state, {getNoLoginErrMsg: action.getNoLoginErrMsg});
        case ACTION_TYPES.GET_CLEAR :
            return {}
        default :
            return state;
    }
}