import {ACTION_TYPES,APP_URL_CONFIG} from '../constants/index.jsx';
export const getBonusPoints = (json) => {
    return {
        type: ACTION_TYPES.GET_BONUS_POINTS,
        bonusPointsAction:json
    }
};
export const getBonusPointsRecords = (json) => {
    return {
        type: ACTION_TYPES.GET_BONUS_POINTS_RECORDS,
        bonusPointsRecordAction:json
    }
};
