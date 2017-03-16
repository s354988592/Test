import Fetch from 'react-cmos-fetch';
import {URL_CONFIG} from '../constants/index.jsx';
import {HttpServiceHelper} from '../../../common/http_service_helper.jsx';
export const fecthPayRec = (mobile) =>{
    let url = URL_CONFIG.GET_PAY_REC + '/mobile=' + mobile + '/payment_records'
    return Fetch.getJSON({url:url,headers:HttpServiceHelper.httpServiceHeader()});
}
