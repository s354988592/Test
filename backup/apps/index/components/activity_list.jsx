import React,{Component} from 'react';
import {render} from 'react-dom';
import '../assets/css/activityList.less'
// 需要传入图片的url、标题1、标题2
// 活动排版列表组件模板1
export default class ActivityList extends Component{
    render(){
        var data=this.props.data;
        var url='url('+data.actvPicUrl+')';
        return (
            <a href={data.actvConnAddr}>
                <div className="listContainer">
                    <div className="listImg">
                        <img src={data.actvPicUrl}/>
                    </div>
                    <div className="title1Style">{data.actvTitleNm}</div>
                    <div className="title2Style">{data.subTitleNm}</div>
                </div>
            </a>
        )
    }
}