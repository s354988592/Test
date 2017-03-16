import Fetch from 'react-cmos-fetch';
import {URL_CONFIG} from '../constants/index.jsx';
import {HttpServiceHelper} from '../../../common/http_service_helper.jsx';

export const fecthPackagesRemain = (mobile) =>{
    let url = URL_CONFIG.GET_PACKAGES_REMAIN + '/mobile=' + mobile + '/plan_remain'
    return Fetch.getJSON({url:url,headers:HttpServiceHelper.httpServiceHeader()});
}