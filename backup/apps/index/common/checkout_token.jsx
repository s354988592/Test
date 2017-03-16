/**
 * Created by mac on 2017/2/15.
 */
import { SessionStorageTool } from './session_storage_Tool.jsx';
import Fetch from 'react-cmos-fetch';
import { APP_SERVER_URL } from '../constants/index.jsx';
import { getUserInfo } from '../actions/user';
import { hashHistory } from 'react-router';
export class CkeckoutToken {
    static fecthAuthToken = (userInfo) => {
        let url = APP_SERVER_URL + '/auth/refresh?authToken='+userInfo.authToken;
        return Fetch.getJSON({ url: url});
    }
    static goLogin=()=>{
         SessionStorageTool.removeUserInfo();
         hashHistory.push('/login');
    }
    static checkoutAuthToken(callBack) {
        return new Promise((resolve, reject) => {
            if (!SessionStorageTool.checkUserIsNotExpired()) {
                let userInfo = SessionStorageTool.getUserInfo();
                if(!userInfo.authToken){
                    CkeckoutToken.goLogin();
                }else {
                    CkeckoutToken.fecthAuthToken(userInfo).then(
                        (res) => resolve(res)
                    ).catch(
                        (err) => {}
                    );
                }

            }else{
                resolve(false)
            }

        });
    }
    static checkoutAuthTokenPromise(callBack,valA,valB, valC, valD, valE){
        CkeckoutToken.checkoutAuthToken(callBack).then((resolve)=>{
        if(resolve == false){
           callBack(valA,valB, valC, valD, valE);
        }else if(resolve.status=='200'){
            let userInfo = SessionStorageTool.getUserInfo();
            Object.assign(resolve.result,{belgProvCode:userInfo.belgProvCode,belgProvName:userInfo.belgProvName,tel:userInfo.tel});
            SessionStorageTool.saveUserInfo(resolve.result);
            callBack(valA,valB, valC, valD, valE);
        }else{
           CkeckoutToken.goLogin();
        }
      
     }
        )
    }

}