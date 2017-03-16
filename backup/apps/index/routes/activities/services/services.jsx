import Fetch from 'react-cmos-fetch';
import {URL_CONFIG} from '../constants/index.jsx';
import {HttpServiceHelper} from '../../../common/http_service_helper.jsx';

export const fecthActivities = (province) =>{
        let url = URL_CONFIG.GET_ACTIVITIES+'/activities'+'/province='+province
    return Fetch.getJSON({url:url,header:HttpServiceHelper.httpServiceHeader()});
}

