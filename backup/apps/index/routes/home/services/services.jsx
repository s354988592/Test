import Fetch from 'react-cmos-fetch';
import {URL_CONFIG} from '../constants/index.jsx';
import {HttpServiceHelper} from '../../../common/http_service_helper.jsx';
import {APP_SERVER_URL} from '../../../constants/index.jsx';
export const fecthUserInfo = (userId) =>{
    return Fetch.getJSON(URL_CONFIG.GET_USER_INFO,{userId:userId});
}
export const fecthCityList = () =>{
    return Fetch.getJSON({url:URL_CONFIG.GET_CITY_LIST,headers:HttpServiceHelper.httpServiceHeader()});
}
// export const fecthActivityList = () =>{
//     return Fetch.getJSON(URL_CONFIG.GET_ACTIVITY_LIST);
// }
export const fecthConsumInfor = (mobile) => {
    let url = URL_CONFIG.GET_CONSUM_INFOR + '/mobile=' + mobile + '/fee_situation'
    return Fetch.getJSON({url:url,headers:HttpServiceHelper.httpServiceHeader()});
}
export const fecthHomeConfs = (province) => {
    let url = URL_CONFIG.GET_HOME_CONFS +'/province=' + province
    // console.log(url)
    return Fetch.getJSON({url:url,headers:HttpServiceHelper.httpServiceHeader()});
}
export const fecthHomeConfsLongLat = (longitude,latitude) => {
    let url = URL_CONFIG.GET_HOME_CONFS + '/longitude=' + longitude + '/latitude='+latitude
    return Fetch.getJSON({url:url,headers:HttpServiceHelper.httpServiceHeader()});
}
export const fecthBanners= (province) => {
    let url = URL_CONFIG.GET_BANNERS +'/province=' + province
    return Fetch.getJSON( {url:url,headers:HttpServiceHelper.httpServiceHeader()});

}
export const fecthLogout= (authToken,accessToken) => {
    let url = APP_SERVER_URL +'/users/logout'
    return Fetch.postJSON( {url:url,body:'{"authToken":"'+authToken+'","accessToken":"'+accessToken+'"}',headers:HttpServiceHelper.httpServiceHeader()});

}