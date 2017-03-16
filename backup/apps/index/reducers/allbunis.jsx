/**
 * Created by mac on 2017/2/7.
 */

import { ACTION_TYPES } from '../constants/index.jsx';

export default function Allbunis(state = {}, action) {

    switch (action.type) {

        case ACTION_TYPES.GET_ALL_BUNIS :
            return Object.assign({}, state, {plansAlreadyAction: action.plansAlreadyAction});
       
       case ACTION_TYPES.GET_UNIS :
            return Object.assign({}, state, {unisAction: action.unisAction});

       case ACTION_TYPES.GET_UNSCRIBE :
            return Object.assign({}, state, {unscribeAction: action.unscribeAction});   
        default :
            return state;
    }
}