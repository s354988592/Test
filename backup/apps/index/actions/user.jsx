/**
 * Created by Zhanglizhao
*/
// ======================================================
// 用户相关行为配置中心
// ======================================================

import { EDITORUSERID} from '../constants/user';
import { ACTION_TYPES } from '../constants/index.jsx';
//行为--改变用户id
export function editorUserId(id) {
  return {
    type: EDITORUSERID,
    id:id
  }
}
export const getUserInfo = (json) => {
    return {  
        type: ACTION_TYPES.GET_USER_INFO,
        userInfo:json
    }
};