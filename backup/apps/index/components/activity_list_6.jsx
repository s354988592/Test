import React,{Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import '../assets/css/activityList.less';

// 活动排版列表组件模板6
const judgeValue=(value)=>{
    if (value==undefined){
        return value="";
    }else{
        return value;
    }
};
export default class ActivityList6 extends Component{
    render(){
        var data=this.props.data;
        return (
            <ul className="listUl-6">
                <li>
                    <div className="listRow">
                        <div className="titleStyle">{judgeValue(data.title)}</div>
                    </div>
                    <div className="listSecRow">
                        <div className="titleSecStyle">{judgeValue(data.title1)}</div>
                        <div className="titleSecDetail">{judgeValue(data.title2)}</div>
                    </div>
                   <div className="listSecRow">
                        <div className="titleSecStyle">{judgeValue(data.title1)}</div>
                        <div className="titleSecDetail">{judgeValue(data.title2)}</div>
                    </div>
                </li>
            </ul>
        )
    }
}