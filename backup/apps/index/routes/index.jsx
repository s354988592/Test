﻿/**
 * Created by Zhanglizhao
 */
// ======================================================
// 路由配置中心，你可以在这里配置你的路由
// ======================================================
import React, { Component } from 'react';
import { Router, Route, hashHistory,IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
// ======================================================
//以下为页面模块引用
// ======================================================
import Home from './home/index';
import Login from './login/index';
import AppLogin from './app_login/index';
import {getRef} from '../actions/home'
import IndexPage from './index/index.jsx';
import ActivityListPage from './activities/index.jsx';
import BillPage from './bills/index.jsx';
import BonusPointPage from './bonus_points/index.jsx';
import ChargePage from './charges/index.jsx';
import PackageRemainPage from './packages_remain/index.jsx';
import PayRecordsPage from './pay_records/index.jsx';
import PlanPage from './plans_already/index.jsx';
import Rechargepage from './bearer_page/index.jsx';
import BillAnalysis from './bill_analysis/index.jsx';
import Main from './main/index.jsx'
import '../../../assets/common/global.css';
import Storage from 'react-cmos-storage';
import {SessionStorageTool} from '../common/session_storage_Tool.jsx';
import {SessionStorageUtil} from '../common/session_storage.jsx'
function onEnter(ref, replace) {
	/*在此处写拦截判断 replace可实现路由的重定向*/
	// console.log(ref.location.pathname);
	window.scrollTo(0,0);//各个子页面置顶
	//console.log(ref.location.pathname);
	if (!SessionStorageTool.getUserIsExist()){
		SessionStorageUtil.save("ref",ref.location.pathname);
		    replace('/login');
	}else{
		// console.log(2222);
	}
}
export  default(history) => {
	return (
		<Router history={history}>
			<Route path="/" components={Main}>
				{/*<IndexRoute component={IndexPage}/>*/}
				<IndexRoute component={Home}/>
				<Route path="home" component={Home}/>
					{/*请将用户相关页面路由放到此次*/}
					{/*<IndexRoute component={Home}/>*/}
				<Route path="login" component={Login}/>
				<Route path="app_login" component={AppLogin}/>
				<Route path="activities" component={ActivityListPage}/>
				<Route onEnter={onEnter.bind(this)}>
					<Route path="bills" component={BillPage}/>
					<Route path="bonus_points" component={BonusPointPage}/>
					<Route path="charges" component={ChargePage}/>
					<Route path="packages/remain" component={PackageRemainPage} />
					<Route path="pay_records" component={PayRecordsPage}/>
					<Route path="plans_already" component={PlanPage}/>
					<Route path="recharge_page/:title/:url" component={Rechargepage}/>
					<Route path="bearer_page/:title/:url" component={Rechargepage}/>
					<Route path="bill_analysis" component={BillAnalysis}/>
				 </Route>
				</Route>
		</Router>
	)
}

