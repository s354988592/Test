import React,{Component} from 'react';
import {render} from 'react-dom';
import Layer from 'react-cmos-layer';
import popup from '../assets/css/popup.less'
//该组件写在要点击的按钮内部;AlertCmp为弹窗组件的内容;添加三个属性值即可,
//title为要点击的的内容,title1为弹窗组件的具体标题,content为具体内容;clickXction是为当点击确定按钮以后留的后续处理事件;cancel和ok是调整确认和取消按钮的位置;clickactions为右边按钮要处理的事件;clickXction为左边按钮要处理的思维逻辑;不用的可以不写;空格需要自己加上&#12288;最好
export default class AlertCmp extends React.Component{
    showAlert(){
       this.refs.layer.confirm({
        content: <Layercontent title2={this.props.title1} content2={this.props.content}/>,
        btn:['<Cancel p={this.props.cancel}/>',<Ok span={this.props.ok}/>],
        //cancel是右边的即上面的取消按钮;
        cancel:this.props.clickactions,
        //ok相反
        ok: this.props.clickXction
    })
    }
    render(){
        return (
            <div>
                <span onClick={this.showAlert.bind(this)}>{this.props.title}</span>
                <Layer ref='layer'/>
            </div>
        )
    }
}
//自己的弹窗组件上的内容

class Layercontent extends React.Component{
    render(){
        return(
        <div style={{textAlign:'center',fontSize:'2.0rem'}}>
            <p>{this.props.title2}</p>
            <span style={{color:'#5c5c5c'}}>{this.props.content2}</span>
        </div>
        )
    }    
};
class Cancel extends React.Component{
    render(){
        return(
            <p style={{color:'#0167cc'}}>{this.props.p}</p>
        )
    }
}
class Ok extends React.Component{
    render(){
        return(
            <p style={{color:'#ffffff'}}>{this.props.span}</p>
        )
    }
}