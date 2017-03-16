/**
 * Created by Zhanglizhao
*/
// ======================================================
// 示例逛一逛，如果你不需要redux，那么你可以用下面的方式写你的页面
// ======================================================
import React, { Component } from 'react';
import {Link} from 'react-router';
import TabsControl from '../../components/tab';
import MySlider from '../../components/tab_slider';
let objType=[
    {dataName:"个人业务",datas: [
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"套餐余量1",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"流量余量1",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"话费查询1",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"套餐余量1",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"流量余量1",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"话费查询1",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"套餐余量1",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"流量余量1",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"流量余量2",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"套餐余量2",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"流量余量2",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"话费查询2",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"套餐余量2",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"流量余量2",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"话费查询2",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"套餐余量2",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"流量余量3",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"流量余量3",url:"http://baidu.com"},
    ]},
 {dataName:"家庭宽带",datas: [
 {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"家庭宽带1",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"家庭宽带1",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"家庭宽带1",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"家庭宽带1",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"家庭宽带1",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"家庭宽带1",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"家庭宽带1",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"家庭宽带1",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"家庭宽带2",url:"http://baidu.com"},
	{src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"家庭宽带2",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"家庭宽带2",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"家庭宽带2",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"家庭宽带2",url:"http://baidu.com"},
	{src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"家庭宽带2",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"家庭宽带2",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"家庭宽带2",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"家庭宽带3",url:"http://baidu.com"}
]},
    {dataName:"政企服务",datas: [
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"政企服务1",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"政企服务1",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"政企服务1",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"政企服务1",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"政企服务1",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"政企服务1",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"政企服务1",url:"http://baidu.com"},
	  {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"政企服务1",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"政企服务2",url:"http://baidu.com"},
	  {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"政企服务2",url:"http://baidu.com"},
    {src:"https://m.baidu.com/static/index/icon/w_icon2.png",name:"政企服务2",url:"http://baidu.com"}
]}
]
export default class Walk extends Component{
	render(){
		return(
			<div>
                <h1>这是逛一逛页</h1>
				<br/>
				<div><Link to="/">去首页</Link></div>
				  <TabsControl data={objType} defaultIndex={0}>
                    {
						//遍历数组tab导航，并设置导航name，tab显示内容
                            objType.map(function (params,index) {
                          return  <div container={<MySlider data={objType[index]}/>} name={params.dataName} key={index}></div>;
                      })
                      }
                </TabsControl>
            </div>
		)
	}
};

