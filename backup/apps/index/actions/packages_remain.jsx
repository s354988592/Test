import {ACTION_TYPES,APP_URL_CONFIG} from '../constants/index.jsx';

export const getPackagesRemain = (json) => {
    return {
        type: ACTION_TYPES.GET_PACKAGES_REMAIN,
        packagesRemain:json
    }
};