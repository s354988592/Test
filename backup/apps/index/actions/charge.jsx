
import {ACTION_TYPES,APP_URL_CONFIG} from '../constants/index.jsx';
export const getCharge = (json)=>{
    return {
        type: ACTION_TYPES.GET_CHARGE,
        chargeAction:json
    }
};
export const getHistoryBill = (json) => {
    return {
        type: ACTION_TYPES.GET_HISTORY_BILL,
        historyBillAction:json
    }
};