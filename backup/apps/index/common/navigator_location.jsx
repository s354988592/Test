/**
 * Created by tonghy on 2017/2/14.
 * 通过浏览器获取省份
 * 用法:
 * import {NavigatorLocation} from '../../common/navigator_location.jsx';
 *
     NavigatorLocation.geolocationIsExist()
     && NavigatorLocation.getLocation()
     .then((res)=>{
        console.log(res);
    });
 *
 */
import Layer from 'react-cmos-layer';
import {HttpServiceHelper} from './http_service_helper.jsx';
import Main from '../routes/main/index.jsx';
export class NavigatorLocation {
    static config = {
        // 指示浏览器获取高精度的位置，默认为false
        enableHighAcuracy: false,
        // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
        timeout: 2000,
        // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
        maximumAge: 3000
    }
    static getLocation() {
        return new Promise(
            (resolve, reject)=> {
                navigator.geolocation.getCurrentPosition(
                    (pos)=> resolve({success:true,result:pos}),
                    (err)=> {
                        NavigatorLocation.defaultFailedHandle(err);
                        resolve({success:false,result:err})
                    },
                    NavigatorLocation.config
                );
            });
    }

    static geolocationIsExist(){
        return !!navigator.geolocation;
    }
       static getCurrentPositionIsExist(){
        return !!navigator.geolocation.getCurrentPosition;
    }
    static defaultFailedHandle(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                // console.log("用户拒绝对获取地理位置的请求。");
                break;
            case error.POSITION_UNAVAILABLE:
                // console.log("位置信息是不可用的。");

                break;
            case error.TIMEOUT:
                // console.log("请求用户地理位置超时。");

                break;
            case error.UNKNOWN_ERROR:
            // 未知错误显示网络异常
            //     console.log("未知错误。");
                //  NavigatorLocation.alertMessage(HttpServiceHelper.getErrorMsg('005'));
                break;
        }
    }
}
