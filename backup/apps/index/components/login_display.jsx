/**
 * @author luobangkun 2017/02/08
 */
import React,{Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import   '../assets/css/login_display.less';
// 未登录组件
class Logindisplay extends Component{
render(){
    var widths=document.body.clientWidth;
    return (
        <div>
        <div className="noshowbf" style={{height:widths*0.54}}>
            <p>立即登录尊享更多服务</p>
             <a href="#/login" className="bottomButtonlg">
               立即登录
            </a>
        </div>
        </div>
    )
}
};
export default Logindisplay;