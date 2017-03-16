import  Fetch from 'react-cmos-fetch';
import {URL_CONFIG} from '../constants/index.jsx';
import {HttpServiceHelper} from '../../../common/http_service_helper.jsx';
export const fecthAllBunis = (userMobile) =>{
    let url = URL_CONFIG.GET_ALL_BUNIS+'/mobile='+userMobile+'/all_busis';
    return Fetch.getJSON({url:url,headers:HttpServiceHelper.httpServiceHeader()});
}
export const fecthUnis = (userMobile) =>{
    let url = URL_CONFIG.GET_UNIS+'/mobile='+userMobile+'/unis';
    return Fetch.getJSON({url:url,headers:HttpServiceHelper.httpServiceHeader()});
}
export const fetchUnscribe = (userMobile,productType,productId,spId,bizCode) =>{    
    let url = URL_CONFIG.GET_UNSCRIBE+'/unican';
    var body;
    if(productType=='01'){
        body = '{"userMobile":"'+userMobile+'","productType":"'+productType+'","productId":"'+ productId+'"}'
        }
    if(productType=='02'){
        body = '{"userMobile":"'+userMobile+'","productType":"'+productType+'","spId":"'+spId+'","bizCode":"'+bizCode+'"}';
    }

    return Fetch.postJSON({url:url,body:body,headers:HttpServiceHelper.httpServiceHeader()});
}

