/**
 * Created by Zhanglizhao
*/
import { applyMiddleware, compose, createStore,combineReducers } from 'redux';
import middlewares from '../middlewares/index';
import { browserHistory } from 'react-router';
import Reducer from '../reducers/index';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
const reducer = combineReducers({
  ...Reducer,
  routing: routerReducer
})
// import { updateLocation } from './location';
export default (initialState = {}) => {
  // ======================================================
  // 存储初始化 默认为一个对象
  // ======================================================
  // console.log(initialState);

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middlewares)
  );  
  store.subscribe(() =>{
    // console.log(store.getState());
     //debugger;
   }
 );
  return store
}
