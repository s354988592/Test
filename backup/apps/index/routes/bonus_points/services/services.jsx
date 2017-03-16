import Fetch from 'react-cmos-fetch';
import {URL_CONFIG} from '../constants/index.jsx';
import {HttpServiceHelper} from '../../../common/http_service_helper.jsx';
export const fecthBonusPoints = (userMobile) =>{
    let url = URL_CONFIG.GET_BONUS_POINTS+'/mobile='+userMobile+'/point';
    return Fetch.getJSON({url:url,headers:HttpServiceHelper.httpServiceHeader()});
}
export const fecthBonusPointsRecords = (userMobile) =>{
    let url = URL_CONFIG.GET_BONUS_POINTS_RECORD+'/mobile='+userMobile+'/point_records';
    return Fetch.getJSON({url:url,headers:HttpServiceHelper.httpServiceHeader()});
}
