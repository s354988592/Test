import React,{Component} from 'react';
import {render} from 'react-dom';
import   '../assets/css/header.less';
import {SessionStorageUtil} from '../common/session_storage';
import { browserHistory } from 'react-router'

// 改变标题
function changeTitle(title) {
    var body = document.getElementsByTagName('body');
    var iframe = document.createElement('iframe');
    iframe.src = './build/assets/img/favicon.ico';
    iframe.style.display = "none";
    document.title = title;
    iframe.onload = function () {
        setTimeout(function () {
            document.body.removeChild(iframe);
        }, 0);
    };
    document.body.appendChild(iframe);
}
// 头部组件
const Header=React.createClass({
    historyBack(){
        // console.log(SessionStorageUtil.get("loginUrl"));
        if (SessionStorageUtil.get("loginUrl")){
            if (SessionStorageUtil.get("loginUrl")=="/login"){
                SessionStorageUtil.remove('loginUrl');
                window.history.go(-2);
                // browserHistory.goBack();
            }else {
                SessionStorageUtil.remove('loginUrl');
                browserHistory.goBack();
            }
        }else {
             SessionStorageUtil.remove('ref');
            browserHistory.goBack();

        }
        //返回函数，返回到上一页

    },
    render(){
        var header;
        if (SessionStorageUtil.get("weixin")=='true'){
            header=<div></div>
           changeTitle(this.props.title)
        }else {
            if(window.navigator.userAgent.indexOf('QQBrowser') !== -1){
                header=<div></div>
                changeTitle(this.props.title)
            }else {
                header=<div className="head-header">
                    <table style={{ width: '100%',height:'3.35rem'}}>
                        <tbody>
                        <tr>
                            <td className="head-history-back head-header-left" onClick={this.historyBack}></td>{/*返回*/}
                            <td className="head-header-center">{this.props.title}</td>{/*头部内容*/}
                            <td className="head-header-right"></td>{/*头部右边部分，暂时没内容*/}
                        </tr>
                        </tbody>
                    </table>
                </div>
            }
        }
        return(
            <div>
                {header}
            </div>
        );
    }
});
export default Header;