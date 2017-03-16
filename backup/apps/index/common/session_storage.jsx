/**
 * Created by mac on 2017/2/15.
 */
import Storage from 'react-cmos-storage';
// import USER_INFO_KEY from '../constants/index.jsx';

export class SessionStorageUtil {

    static save(key, obj) {
       Storage.saveSession(key, JSON.stringify(obj));
    }
    static get(key) {
        return JSON.parse(Storage.getSession(key));
    }
    static remove(key) {
         Storage.removeSession(key);
    }

}