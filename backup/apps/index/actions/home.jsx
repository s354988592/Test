/**
 * Created by mac on 2017/2/7.
 */

import {ACTION_TYPES,APP_URL_CONFIG} from '../constants/index.jsx';
export const userLogin = (userId) => {
    return {
        type: ACTION_TYPES.USER_LOGIN,
        userId:userId
    }
};

export const changeProvince = (json) => {
    return {
        type: ACTION_TYPES.CHANGE_PROVINCE,
        provinceId:json
    }
};

// export const getUserInfo = (json) => {
//     return {
//         type: ACTION_TYPES.GET_USER_INFO,
//         userInfo:json
//     }
// };

export const getProvinceInfo = (json) => {
    return {
        type: ACTION_TYPES.GET_PROVINCE_INFO,
        provinceInfo:json
    }
};
export const getPackagesRemain = (json) => {
    return {
        type: ACTION_TYPES.GET_PACKAGES_REMAIN,
        packagesRemain:json
    }
};
export const getActivityList = (json) => {
    return {
        type: ACTION_TYPES.GET_ACTIVITY_LIST,
        activityList:json
    }
};
export const getProvinceByIp = ()=>{
    return {
        type: ACTION_TYPES.GET_PROVINCE_BY_IP,
        provinceId:"北京"
    }
};

export const userLogout = () => {
    return {
        type: ACTION_TYPES.USER_LOGOUT
    }
};

export const getCityList = (json) => {
    return {
        type: ACTION_TYPES.GET_CITY_LIST,
        cityListAction:json
    }
};
export const getConsumInfor = (json) => {
    return {
        type: ACTION_TYPES.GET_CONSUM_INFOR,
        consumInforAction:json
    }
};
export const getTabSlider = (json) => {
    return {
        type: ACTION_TYPES.GET_TAB_SLIDER,
        tabSlider:json
    }
};
export const getHomeConfs = (json) => {
    return {
        type: ACTION_TYPES.GET_HOME_CONFS,
        homeConfsAction:json
    }
};

export const getBanners = (json) => {
    return {
        type: ACTION_TYPES.GET_BANNERS,
        bannerAction:json
    }
};
export const getNoLoginErrMsg = (json) => {
    return {
        type: ACTION_TYPES.GET_NO_LOGIN_ERR_MSG,
        getNoLoginErrMsg:json
    }
};

export const getClear = () => {
    return {
        type: ACTION_TYPES.GET_CLEAR
        
    }
};