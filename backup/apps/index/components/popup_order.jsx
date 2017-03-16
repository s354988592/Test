import React,{Component} from 'react';
import {render} from 'react-dom';
import Layer from 'react-cmos-layer';
import '../assets/css/popup_order.less'
//点击按钮,按钮消失,变成alert组件,引用这种时必须要有一个text属性;
//text为点击的内容,title为弹窗显示的内容;
export default class PopupOrder extends React.Component{
    showAlert(){
        this.refs.layer.alert({
        content: <Layercontents data={this.props.data}></Layercontents> ,
        btn: '确定',
        ok: function () {
        }
    })
    }
    render(){
        return (
        <div className="order-4g-package-container">
            <p className="order-4g-package-container-title" onClick={this.showAlert.bind(this)}>当前主餐单 <span className="order-4g-package-container-name">{this.props.data.curPlanName}</span></p>
              <div  className="detail" onClick={this.showAlert.bind(this)}>
              <p>本月</p>
              <p className="order-4g-package-detail">已用流量<span className="detail-content">1.78G</span></p>
              <p className="order-4g-package-detail">已用通话<span className="detail-content">67分钟</span></p>
              </div>
              <Layer ref='layer'/>
          </div>
        )
    }
}
//弹窗组件的内容(必须用此命名);
class Layercontents extends React.Component{   
    render(){
        return(
        <div >
            <p className='popupOrder-Title'>{this.props.data.curPlanName}</p>
            <p className='popupOrder-SecTitle'>月功能费</p>
            <p className='popupOrder-SecDetail'>>{this.props.data.cost}</p>
            <p className='popupOrder-SecTitle'>包含</p>
            <p className='popupOrder-SecDetail'>>{this.props.data.contain}</p>
            <p className='popupOrder-SecTitle'>超出套餐后资费：</p>
            <p className='popupOrder-SecDetail'>>{this.props.data.overCost}</p>
        </div>
        )
    }    
};
