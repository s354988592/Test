import React,{Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import '../assets/css/activityList.less';

// 活动排版列表组件模板4
const judgeValue=(value)=>{
    if (value==undefined){
        return value="";
    }else{
        return value;
    }
};
export default class ActivityList4 extends Component{
    render(){
        var data=this.props.data;
        return (
            <ul className="listUl-4">
              <Link to="/4g/listPage">
                <li>
                    <div className="listImg listLeft">
                        <img src={judgeValue(data.url)}/>
                    </div>
                    <div className="listRight">
                        <div className="title1Style">{judgeValue(data.busiType)}</div>
                        <div className="title2Style">{judgeValue(data.busiDetail)}</div>
                    </div>
                    <div >                       
                        <img className="more" src={require('../assets/img/more.png')} />                       
                     </div>  
                </li>
              </Link>
            </ul>
        )
    }
}