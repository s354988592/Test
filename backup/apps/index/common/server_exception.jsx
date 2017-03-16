import {CkeckoutToken} from './checkout_token'
import {SessionStorageTool} from './session_storage_Tool'
export class ServerException{
    static handleServerException(callBack){
            ServerException.serverAuthTokenPromise(callBack)
    }
    static serverAuthToken(callBack) {
        return new Promise((resolve, reject) => {
                let userInfo = SessionStorageTool.getUserInfo();
                if(!userInfo.authToken){
                    CkeckoutToken.goLogin();
                }else {
                    // console.log("有"+userInfo.authToken);
                    CkeckoutToken.fecthAuthToken(userInfo).then(
                        (res) => resolve(res)
                    ).catch(
                        (err) => {}
                    );
                }
        });
    }
    static serverAuthTokenPromise(callBack,valA,valB, valC, valD, valE){
        // console.log("进入");
        ServerException.serverAuthToken(callBack).then((resolve)=>{
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