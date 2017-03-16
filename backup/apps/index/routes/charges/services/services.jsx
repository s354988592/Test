import Fetch from 'react-cmos-fetch';
import {URL_CONFIG} from '../constants/index.jsx';
import {HttpServiceHelper} from '../../../common/http_service_helper.jsx';
export const fecthCharge = (mobile) =>{
    let url = URL_CONFIG.GET_CHARGE + '/mobile=' + mobile + '/fare_balances';
    return Fetch.getJSON({url:url,headers:HttpServiceHelper.httpServiceHeader()});
}

export const fecthHistoryBill = (mobile) =>{
    let url = URL_CONFIG.GET_HISTORY_BILL + '/mobile=' + mobile + '/bill_sums';
    return Fetch.getJSON({url:url,headers:HttpServiceHelper.httpServiceHeader()});
}
export const fetchurl = (mobile,showTitle) =>{
    let url =URL_CONFIG.GET_RECHARGE+"/access"+"?mobile="+mobile+"&showTitle="+showTitle;
    return Fetch.getJSON({url:url,headers:HttpServiceHelper.httpServiceHeader()});
}