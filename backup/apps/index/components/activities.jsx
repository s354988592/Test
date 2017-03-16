import React,{Component} from 'react';
import {render} from 'react-dom';
import '../assets/css/activityList.less'

// 活动排版列表组件模板
export default class Activities extends Component{
    render(){
        var data=this.props.data;
        return (
            <ul className="listUl-3">
                <li>
                    <a href={data.actvConnAddr}>
                        <div className="listImg listLeft">
                        <img src={data.resources.rsPath}/>
                    </div>
                        <div className="listRight">
                            <div className="title1Style">{data.actvTitleNm}</div>
                            <div className="title2Style">{data.subTitleNm}</div>
                        </div>
                    </a>
                </li>
            </ul>
        )
    }
}