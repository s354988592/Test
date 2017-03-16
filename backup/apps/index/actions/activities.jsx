import {ACTION_TYPES,APP_URL_CONFIG} from '../constants/index.jsx';
export const getActivities = (json)=>{
    return {
        type: ACTION_TYPES.GET_ACTIVITIES,
        activitiesAction:json
    }
};