import { ACTION_TYPES } from '../constants/index.jsx';

export default function PackagesRemain(state = {}, action) {
    switch (action.type) {
        case ACTION_TYPES.GET_PACKAGES_REMAIN :
            return Object.assign({}, state, {packagesRemain: action.packagesRemain});
        default :
            return state;
    }
}