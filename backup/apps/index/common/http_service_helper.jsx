import {SessionStorageTool} from './session_storage_Tool.jsx';
export const ERROR_CODE = {
    //前端自定义错误信息提示及//后台报错信息转换
    '001':'请输入正确的手机号码',
    '002':'请输入正确的验证码',
    '003':'获取验证码失败',
    '004':'获取位置信息失败',
    '005':'网络异常',
    '006':'查询不到相关记录',
    '90001':'验证码错误',
    '007':'验证码已发送，请查收',
    'CSF404':'网络异常','CSF405':'网络异常','APP1000':'网络异常',
    'APP1001 ':'网络异常','APP1002':'网络异常','APP1003':'网络异常',
    'APP1004':'网络异常','HOME_CONF1000':'网络异常','HOME_CONF1001':'网络异常',
    'HOME_CONF1003':'网络异常','CITY_CONF1005':'获取城市信息失败','CITY_CONF1006':'获取城市信息失败',
    'ACTIVITY_CATE1000':'网络异常','ACTIVITY_CATE1001':'网络异常','ACTIVITY_CATE1002':'网络异常',
    'ACTIVITY_CATE1003':'网络异常','ACTIVITY_CATE1004':'网络异常','ACTIVITY_1000':'网络异常',
    'ACTIVITY_1001':'网络异常','ACTIVITY_1002':'网络异常','ACTIVITY_1003':'网络异常',
    'ACTIVITY_1004':'网络异常','FUNC_1000':'网络异常','FUNC_1001':'网络异常',
    'FUNC_1002':'网络异常','FUNC_1003':'网络异常','FUNC_1004':'网络异常',
    'FUNC_CATE1000':'网络异常','FUNC_CATE1001':'网络异常','FUNC_CATE1002':'网络异常',
    'FUNC_CATE1003':'网络异常','FUNC_CATE1004':'网络异常','BANNER_1000':'网络异常',
    'BANNER_1001':'网络异常','BANNER_1002':'网络异常','BANNER_1003':'网络异常',
    'BANNER_1004':'网络异常','LOG1000':'网络异常','API_LOG1000':'网络异常',
    'LOGIN_LOG1000':'网络异常','LOGIN_LOG1003':'网络异常','LOGIN_LOG1004':'网络异常',
    'EMP_1004':'网络异常','PROV_1004':'获取省份信息失败','AUTH_1000':'网络异常',
    'AUTH_1003':'网络异常','AUTH_1004':'用户信息错误','USER_1000':'获取用户信息失败',
    'USER_1001':'获取用户信息失败','USER_1002':'获取用户信息失败','USER_1003':'获取用户信息失败',
    'USER_1004':'网络异常','USER_1005':'网络异常','USER_1006':'网络异常',
    'USER_1007':'获取积分信息失败','USER_1008':'获取交易信息失败','USER_1009':'获取缴费信息失败',
    'USER_1010':'网络异常','USER_1011':'获取缴费信息失败','USER_1012':'网络异常',
    'USER_1013':'获取话费信息失败','USER_1014':'退订失败','USER_1015':'业务办理失败',
    'USER_1016':'套餐变更失败','USER_1017':'用户信息错误','USER_1018':'短信验证码错误','USER_1019':'获取验证码失败',
    'VERIFY_CODE_1000':'验证码错误','403':'网络异常','400':'网络异常','404':'网络异常','500':'网络异常','502':'网络异常','USER_1023':'验证码重复发送','GROUP_BUS_1000':'数据请求异常'
        
};
export class HttpServiceHelper {
 static httpServiceHeader = ()=>
{   let headers = new Headers();
   headers.append('Accept', '*/*');
   headers.append('Content-Type', 'application/json');
    if(SessionStorageTool.getUserIsExist()){
    let authToken = SessionStorageTool.getUserInfo().authToken;
    let accessToken = SessionStorageTool.getUserInfo().accessToken;
    headers.append('authToken',authToken);
    headers.append('accessToken',accessToken);
}
    return headers;
}
  static getErrorMsg =(code)=>{
    //   console.log(ERROR_CODE[code])
        return ERROR_CODE[code] == undefined ? '网络异常' : ERROR_CODE[code].toString();
    }
}
