/**
 * Created by mac on 2017/2/7.
 */

import { ACTION_TYPES } from '../constants/index.jsx';

export default function Bonuspoints(state = {}, action) {
    switch (action.type) {
        case ACTION_TYPES.GET_BONUS_POINTS :
            return Object.assign({}, state, {bonusPointsAction: action.bonusPointsAction});     
                    
        case ACTION_TYPES.GET_BONUS_POINTS_RECORDS:
            return Object.assign({}, state, {bonusPointsRecordAction: action.bonusPointsRecordAction});    
        default :
            return state;
    }
}