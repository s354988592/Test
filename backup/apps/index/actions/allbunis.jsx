import {ACTION_TYPES,APP_URL_CONFIG} from '../constants/index.jsx';
export const allBunis = (json) => {
    return {
        type: ACTION_TYPES.GET_ALL_BUNIS,
        plansAlreadyAction:json
    }
};
export const unis = (json) => {
    return {
        type: ACTION_TYPES.GET_UNIS,
        unisAction:json
    }
};
export const unscribe = (json) => {
    return {
        type: ACTION_TYPES.GET_UNSCRIBE,
        unscribeAction:json
    }
};
