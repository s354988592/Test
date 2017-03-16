import { ACTION_TYPES } from '../constants/index.jsx';

export default function BillInfor(state = {}, action) {
    switch (action.type) {
        case ACTION_TYPES.GET_BILL_INFOR :
            return Object.assign({}, state, {billInforAction: action.billInforAction});
        default :
            return state;
    }
}