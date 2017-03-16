import { ACTION_TYPES } from '../constants/index.jsx';

export default function PayRec(state = {}, action) {

    switch (action.type) {
        case ACTION_TYPES.GET_PAY_RECS :
            return Object.assign({}, state, {payRecsAction: action.payRecs});
        default :
            return state;
    }
}