/**
 * Created by mac on 2017/2/15.
 */
import Storage from 'react-cmos-storage';
import {USER_INFO_KEY,PROVINCE_INFO_KEY} from '../constants/index.jsx';

export const EXPIRED_PREDICTED_SAFE_TIME = 60000;

export class SessionStorageTool {

    static save(key, obj) {
        Storage.saveSession(key, JSON.stringify(obj));
    }
    static get(key) {
        return JSON.parse(Storage.getSession(key));
    }

    //业务封装
    //省份信息
     static getProvinceInfo() {
        return SessionStorageTool.get(PROVINCE_INFO_KEY);
    }

    static saveProvinceInfo(obj) {
        // console.log(obj)
        SessionStorageTool.save(PROVINCE_INFO_KEY,obj);
    }

    static removeProvinceInfo(){
        Storage.removeSession(PROVINCE_INFO_KEY);
    }
    //用户信息
    static getUserInfo() {
        return SessionStorageTool.get(USER_INFO_KEY);
    }


    static saveUserInfo(userInfo) {
        if(userInfo){
            //配置本地过期时间 = 本地时间 + 服务器过期时间 + （本地过期时间与服务器时间偏移量) - 网络误差造成的保险时间
            userInfo.localExpiredDate = new Date().getTime()*2 + userInfo.expiresIn*1000 - userInfo.expiresStartDate*1 - EXPIRED_PREDICTED_SAFE_TIME;
            SessionStorageTool.save(USER_INFO_KEY,userInfo);
            // console.log(userInfo)
        }else{
            // console.log('save userInfo in null..');
        }
    }

    static removeUserInfo(){
        Storage.removeSession(USER_INFO_KEY);
    }

    static getUserIsExist() {
        //如果前台加过期校验 可以放在这里 过期视为不存在
        return !!SessionStorageTool.getUserInfo();
    }
    //判断是否过期
    static checkUserIsNotExpired() {
        let userInfo = SessionStorageTool.getUserInfo();
        return !!userInfo
            &&  userInfo.localExpiredDate > new Date().getTime()
    }
    
    static getUserTel(){
        return SessionStorageTool.getUserIsExist() ? SessionStorageTool.getUserInfo().tel : null;
    }

    static getUserAccessToken() {
        return SessionStorageTool.getUserIsExist() ? SessionStorageTool.getUserInfo().accessToken : null;
    }

    static getUserAuthToken(){
        return SessionStorageTool.getUserIsExist() ? SessionStorageTool.getUserInfo().authToken : null;
    }

    static getUserId() {
        return SessionStorageTool.getUserIsExist() ? SessionStorageTool.getUserInfo().userId : null;
    }

}