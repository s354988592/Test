import React,{Component} from 'react';
import {render} from 'react-dom';
import Layer from 'react-cmos-layer';
import popup2 from '../assets/css/popup2.less'
//点击按钮,按钮消失,变成alert组件,引用这种时必须要有一个text属性;
//text为点击的内容,title为弹窗显示的内容;btnContent是点击按钮让弹窗消失的内容,空格需要自己加
export default class Dialog extends React.Component{
    showAlert(){
        const title = this.props.title;
        this.refs.layer.alert({
        content: <Layercontents title={title}></Layercontents> ,
        btn:this.props.btnContent,
        ok: function () {}
    })
    }
    render(){
        return (
            <div>
                <span onClick={this.showAlert.bind(this)}>{this.props.text}</span>
                <Layer ref='layer'/>
            </div>
        )
    }
}
//弹窗组件的内容(必须用此命名);
class Layercontents extends React.Component{   
    render(){
        return(
        <div style={{textAlign:'center'}}>
            <p className='content2'>{this.props.title}</p>
        </div>
        )
    }    
};
