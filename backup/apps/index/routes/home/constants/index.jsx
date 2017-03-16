/**
 * 这里可以放模块内私有的声明常量
 * */
import {APP_SERVER_URL} from '../../../constants/index.jsx';

export const URL_CONFIG = {
    // GET_USER_INFO:'wwww.kengni.com/kengni/kengsini',
    // GET_CITY_LIST:APP_SERVER_URL + 'city.json',
    // GET_CONSUM_INFOR:APP_SERVER_URL+'consum_analysis.json',
    // GET_HOME_CONFS:APP_SERVER_URL+'home_confs.json',
    // GET_ACTIVITY_LIST:APP_SERVER_URL + 'activity_list.json',
    // GET_BANNERS:APP_SERVER_URL + 'banners.json'
    GET_CITY_LIST:APP_SERVER_URL + '/provinces',//省份列表接口
    GET_CONSUM_INFOR:APP_SERVER_URL+'/users',//消费情况
    GET_HOME_CONFS:APP_SERVER_URL+'/home_confs',//获取首页结构接口
    GET_BANNERS:APP_SERVER_URL + '/banners'//获取banner图
    
};


