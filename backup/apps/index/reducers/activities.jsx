/**
 * Created by mac on 2017/2/7.
 */

import { ACTION_TYPES } from '../constants/index.jsx';

export default function Activities(state = {}, action) {

    switch (action.type) {

        case ACTION_TYPES.GET_ACTIVITIES :
            return Object.assign({}, state, {activitiesAction: action.activitiesAction});
       
        default :
            return state;
    }
}