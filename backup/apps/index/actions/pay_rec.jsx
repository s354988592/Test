/**
 * Created by mac on 2017/2/7.
 */

import {ACTION_TYPES,APP_URL_CONFIG} from '../constants/index.jsx';
export const getPayRec = (json) => {
    return {
        type: ACTION_TYPES.GET_PAY_RECS,
        payRecs:json
    }
};