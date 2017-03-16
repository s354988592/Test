/**
 * Created by Zhanglizhao
*/
// ======================================================
// Reducer配置中心，你可以在这里配置你的Reducer
// ======================================================
import User from './user';//用户中心 reducer
import Home from './home';
import PayRec from './pay_rec';
import LoginInfo from './logininfo';
import Allbunis from './allbunis';
import Bonuspoints from './bonuspoints';
import PackagesRemain from './packages_remain';
import BillInfor from './bill_infor';
import Activities from './activities';


import Charge from './charge';
export default{
    User,
    Home,
    PackagesRemain,
    PayRec,
    BillInfor,
    Allbunis,
    Bonuspoints,
    Activities,
    Charge,
    LoginInfo,
    // getusermobile,


}