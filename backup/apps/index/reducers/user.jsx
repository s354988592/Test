/**
 * Created by Zhanglizhao
*/
// ======================================================
// 用户相关reducers配置中心
// ======================================================
// ======================================================
// 此下面的 state会挂到总state下面 state.User={}
// ======================================================
/**
 * Created by mac on 2017/2/7.
 */
import { EDITORUSERID} from '../constants/user';
import {ACTION_TYPES} from '../constants/index.jsx';

export default function User(state = {}, action) {
    switch (action.type) {
       case ACTION_TYPES.USER_LOGOUT:
            return {};
       case ACTION_TYPES.GET_USER_INFO:
            return Object.assign({}, state, {userInfo: action.userInfo});
        default :
            return state;
    }
  }
