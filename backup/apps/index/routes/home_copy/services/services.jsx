import Fetch from 'react-cmos-fetch';
import {URL_CONFIG} from '../constants/index.jsx';

export const fecthUserInfo = (userId) =>{
    return Fetch.getJSON(URL_CONFIG.GET_USER_INFO,{userId:userId});
}

