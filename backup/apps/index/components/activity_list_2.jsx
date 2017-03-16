import React,{Component} from 'react';
import {render} from 'react-dom';
import '../assets/css/activityList.less'
// 活动排版列表组件模板2
export default class ActivityList2 extends Component{
    render(){
        var data=this.props.data;
        return (
            <ul className="listUl">
                <li>
                    <a href={data.actvConnAddr}>
                        <div className="listLeft">
                            <div className="title1Style">{data.actvTitleNm}</div>
                            <div className="title2Style">{data.subTitleNm}</div>
                        </div>
                        <div className="listImg listRight">
                            <img src={data.actvPicUrl}/>
                        </div>
                    </a>
                </li>
            </ul>
        )
    }
}