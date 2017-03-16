import React,{Component} from 'react';
import {render} from 'react-dom';
import list from '../assets/css/list.less';
import Layer from 'react-cmos-layer';
//引入List以后要有<p>标签content属性和<span>标签time属性;clicktion为要触发的事件
function getDate(date){
        return date.substr(0,4)+"-"+date.substr(4,2)+"-"+date.substr(6,2);
    }
export default class List extends React.Component{ 
        alert(){
          this.refs.layer.confirm({
                        content: <Layercontent title={this.props.title1} content={this.props.contents}/>,
                        btn:[this.props.sure,this.props.del],
                        ok:  this.props.clickAction,
                        cancel:function () {}
        })
        }
        render(){
            var data=this.props.content;
            var display="none";
            if(!data.isCanUnOrder && data.unOrder){
                display="block"
            }else{
                display="none"
            }
            return (
                 <div className='list'>
                        <div className="liststyle">
                        <span className='listcontetn'>{data.busiName}</span><br/>
                        <span className='usetimes'>生效时间:&nbsp;{getDate(data.validDate)}</span>
                        <span className='unusetimes'>失效时间:&nbsp;{getDate(data.expireDate)}</span>
                        <button 
                                type="submit" 
                                className='unsubscribe' 
                                style={{display:display}}
                                onClick={this.alert.bind(this)}
                        >{this.props.text}</button>
                        </div>
                        
                        <Layer ref='layer'/>
                 </div>
            )          
        }
}
class Layercontent extends React.Component{
    render(){
        return(
        <div style={{textAlign:'center'}}>
            <p>{this.props.title}</p>
            <span style={{color:'#5c5c5c'}}>{this.props.content}</span>
        </div>
        )
    }    
};