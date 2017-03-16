import { ACTION_TYPES } from '../constants/index.jsx';

export default function Home(state = {}, action) {

    switch (action.type) {
        case ACTION_TYPES.GET_CHARGE :
            return Object.assign({}, state, {chargeAction: action.chargeAction}); 

        case ACTION_TYPES.GET_HISTORY_BILL :
            return Object.assign({}, state, {historyBillAction: action.historyBillAction});
                   
        default :
            return state;
    }
}