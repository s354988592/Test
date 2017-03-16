import Fetch from 'react-cmos-fetch';
import {URL_CONFIG} from '../constants/index.jsx';
import {HttpServiceHelper} from '../../../common/http_service_helper.jsx';
export const fecthUserLogin= (userMobile,code) =>{
    let url = URL_CONFIG.GET_USER_LOGIN;
    return Fetch.postJSON({url:url,body:'{"mobile":"'+userMobile+'","verifyCode":"'+code+'"}',headers:HttpServiceHelper.httpServiceHeader()});
}
export const fecthUsers= (mobile) =>{
    let url = URL_CONFIG.GET_USERS+'/mobile='+mobile;
    return Fetch.getJSON({url:url,headers:HttpServiceHelper.httpServiceHeader()});
}
export const fecthUsersmobile= (userMobile) =>{
    let url = URL_CONFIG.GET_USER_MOBILE+'/mobile=' + userMobile;
    return Fetch.postJSON({url:url,headers:HttpServiceHelper.httpServiceHeader()});
}