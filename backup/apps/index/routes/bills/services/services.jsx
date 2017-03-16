import Fetch from 'react-cmos-fetch';
import {URL_CONFIG} from '../constants/index.jsx';
import {HttpServiceHelper} from '../../../common/http_service_helper.jsx';
export const fecthBillinfor = (mobile) =>{
     let url = URL_CONFIG.GET_BILL_INFOR + '/mobile=' + mobile + '/bill_sums'
    return Fetch.getJSON({url:url,headers:HttpServiceHelper.httpServiceHeader()});
}