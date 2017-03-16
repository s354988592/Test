import Fetch from 'react-cmos-fetch';
import {URL_CONFIG} from '../contants/index.jsx';
import {HttpServiceHelper} from '../../../common/http_service_helper.jsx';
export const fecthBillinfor = (mobile) =>{
     let url = URL_CONFIG.GET_BILL_ANAYSIS + '/mobile=' + mobile + '/analysis_situation';
    return Fetch.getJSON({url:url,headers:HttpServiceHelper.httpServiceHeader()});
}