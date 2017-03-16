/**
 * Created by Zhanglizhao
*/
// ========================================================
// 如果你这个是一个复杂的单页面程序请可用此示例。
// 此文件为index.html 入口文件
// ========================================================
import React,{Component} from 'react';
import {render} from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import Store from './store/createStore';
import HistoryRouter from './routes/index';
// ========================================================
// Render 渲染配置
// ========================================================
const MOUNT_NODE = document.getElementById('root');
// ========================================================
// 创建store initialState为初始化的state
// ========================================================
let store=Store();

const history = syncHistoryWithStore(hashHistory, store);
// ========================================================
// 创建一个历史同步导航事件存储
// ========================================================
render(
    <Provider store={store}>
        {HistoryRouter(history)}
    </Provider>
    ,
    MOUNT_NODE
    )