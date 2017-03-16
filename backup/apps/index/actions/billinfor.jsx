import {ACTION_TYPES,APP_URL_CONFIG} from '../constants/index.jsx';
export const getBillInfor = (json)=>{
    return {
        type: ACTION_TYPES.GET_BILL_INFOR,
        billInforAction:json
    }
};