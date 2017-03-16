/**
 * 话费查询
 * */

import React, { Component } from 'react';
import Header  from '../../components/header';
import UserInfo  from '../../components/user_info';
import BarChart  from '../../components/bar_chart';
import Titlepanel  from '../../components/titlepanel';
import BottomButton  from '../../components/bottom_button';
import Popup  from '../../components/popup';
import  './charge.less';


class ChargePage extends Component {
    
    constructor(props) {
        super(props);
     this.state={
     //个人信息数据
       data:{
         tel:"13213123412",
         address:"贵州"
        },
     //面板数据
       containerData:{
           balance:"878.65",
           used:"100.23",
           account:"788.42"
       },
     //柱状图数据
       barData:{
          title:{text:"话费"},
          barColor:"#0167CC",
          xAxis:{data:["08月","09月","10月","11月","12月","01月"]},
          yAxis:{yColor:"red",yFontSize:"24"},
          series:{name:"ss",data:[80,90,100,70,60,50]},
          emphasis:{barcolor:"#0167CC"},
          unit:"元"}
        };
    }
    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    shouldComponentUpdate(nextProps,nextState){
        return true;
    }

    render() {
        return (
            <div>
                <Header title="话费查询"/>
                <UserInfo data={this.state.data}/>
                <Titlepanel title="近六个月话费使用情况"/>
                <div className="charge-pq-balance">
                   <p>当前可用余额</p>
                   <p>{this.state.containerData.balance}（元）<span className="charge-tip"></span></p>

                   <Popup content="当前可用余额指xxxxxx"/>
                </div>
                <div className="charge-pq-detail clearfix">
                   <div className="charge-pq-left">
                      <p>已用话费</p>
                      <p>{this.state.containerData.used}（元）</p>
                   </div>
                   <div className="charge-pq-right">
                      <p>账户总余额</p>
                      <p>{this.state.containerData.account}（元）</p>
                   </div>
                   <Popup content="账户总余额指xxxxxxxxxxxxxxxxxxxxxxxxxxx"/>
               </div>
                <BarChart  data={this.state.barData}/>
                <BottomButton url="#" content="冲话费"/>
            </div>
        )
    }
}

export default ChargePage;