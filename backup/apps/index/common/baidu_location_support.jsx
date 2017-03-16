/**
 * Created by mac on 2017/2/16.
 */
import Fetch from 'react-cmos-fetch';

export class BaiduLocationSupport {

    static getBaiduLocationInfoByLatLng(lng,lat) {
        return Fetch.getJSON(BaiduLocationSupport.getSupportUrl(lng,lat));
        //let headers = new Headers();
        //headers.append('Accept', '*/*');
        //headers.append('dataType', 'jsonp');
        //headers.append('X-Request-With', null);
        //headers.append("Content-Type", "application/x-www-form-urlencoded");
        //return Fetch.getJSON({url:BaiduLocationSupport.getSupportUrl(lng,lat),headers:headers});
    }

    static getSupportUrl(lat,lng){
        return `http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&`
            + `callback=renderReverse&location=${lat},${lng}&output=json&pois=0`;
    }
}