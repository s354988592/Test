import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import Fetch from 'react-cmos-fetch';
import { getUserInfo } from '../../actions/user';
import { fecthUserLogin, fecthUsers, fecthUsersmobile } from './services/services';
import { HttpServiceHelper } from '../../common/http_service_helper.jsx';
import Header from '../../components/header';
import { SessionStorageTool } from '../../common/session_storage_Tool.jsx';
import { SessionStorageUtil } from '../../common/session_storage.jsx';
import { CryptoJsUtil } from '../../common/cryptoUtil';
import { InputWithDelCmp, InputWithDelAndWithSpaceCmp, CodeBtnCmp } from '../login/index.jsx';
import './login3.less';
class AppLoginPage extends Component {
    constructor(props) {
        super(props);
        _cmosq.push(['trackPV', '/app_login']);
        this.state = {
            loginBtnIsDisabled: true
        }
        if (location.href.indexOf('goBack') > -1) {
            // console.log("跳了没")
            window.history.go(-1);
        }
    }

    //获取验证码事件
    getCodeAction = (e) => {
        let tel = this.phoneInput.state.value;
        if (!this.checkTel(tel)) {
            return false;
        }
        //通过手机号获取验证码，也不知道是不是这个接口
        fecthUsersmobile(tel).then(
            res => {
                if (res.status == "200") {
                    this.toastMsg(HttpServiceHelper.getErrorMsg('007'))//验证码已发送，请查收
                } else {
                    this.toastMsg(HttpServiceHelper.getErrorMsg(res.status))//验证码已发送，请查收
                }
            },
            err => this.alertMsg(HttpServiceHelper.getErrorMsg('003'))
            // this.alertMsg(HttpServiceHelper.getErrorMsg(err.status))
            //获取验证码失败
        );
        return true;
    };

    componentDidMount() {
        
        this.codeBtn.getCodeBtn.disabled = true;
        this.setLoginBtnDisabled();//？为何放在这个生命周期
    }

    onTelInputChange = (value) => {
        this.codeBtn.getCodeBtn.disabled = value.length < 11 || this.codeBtn.state.countDowning;
        this.setLoginBtnDisabled();
    };
    onCodeInputChange = (value) => {
        this.setLoginBtnDisabled();
    };
    setLoginBtnDisabled = () => {
        let tel = this.phoneInput.state.value;
        let code = this.codeInput.state.value;
        this.loginBtn.disabled = (tel.length < 11 || code.length < 6)
    };

    checkTel = (tel) => {
        if (!(/^1[34578]\d{9}$/.test(tel))) {
            this.alertMsg(HttpServiceHelper.getErrorMsg('001'));//请输入正确的手机号码
            return false;
        }
        return true;
    };

    alertMsg = (txt) => {
        this.props.layer.alert({ content: txt, btn: "确   定" });
    };

    toastMsg = (txt) => {
        this.props.layer.tips({
            content: txt,
            time: 4,
            close: function () {
            }
        })
    };


    render() {
        return <div className='app-login-page'>
            <Header title='登录' />
            <div className='login-back-blue'>
                <div className='login-logo'></div>
            </div>
            <div className='login-row'>
                <InputWithDelAndWithSpaceCmp
                    maxLength='13'
                    inputClass='login-input login-phone-input'
                    autoFocus={true}
                    placeholder='请输入手机号码'
                    ref={(e) => this.phoneInput = e}
                    inputOnChange={this.onTelInputChange}
                    />
                <div className='login-line'></div>
            </div>
            <div className='login-row'>
                <InputWithDelCmp
                    maxLength='6'
                    inputClass='login-input login-code-input'
                    placeholder='请输入6位短信验证码'
                    ref={(e) => this.codeInput = e}
                    inputOnChange={this.onCodeInputChange}
                    />
                <CodeBtnCmp
                    clickAction={this.getCodeAction}
                    inputClass='login-code-btn'
                    ref={(e) => this.codeBtn = e}
                    />
            </div>
            <div className='login-row'>
                <input type="button"
                    className='login-button'
                    onClick={this.loginAction} value="登  录"
                    ref={(e) => this.loginBtn = e}
                    />

            </div>
        </div>

    }

    //登录事件
    loginAction = (e) => {
        let tel = this.phoneInput.state.value;
        let code = this.codeInput.state.value;
        let crycode = CryptoJsUtil.Encrypt(code);
        let crytel = CryptoJsUtil.Encrypt(tel);
        if (!this.checkTel(tel)) {
            this.alertMsg(HttpServiceHelper.getErrorMsg('001'));//请输入正确的手机号码
            return;
        }
        if (code.length < 6) {
            this.alertMsg(HttpServiceHelper.getErrorMsg('002'));//请输入正确的验证码
            return;
        }
        let rurl = this.props.location.query.rurl;
        if (!rurl || rurl === '') {
            // console.log(rurl)
            // console.log("跳转地址未知");
            return;
        }
        // 通过手机号和验证码 登录
        this.props.layer.loading("");
        fecthUserLogin(crytel,crycode).then(
            res => {
                var userInfo = res.result;
                if (res.status != 200 || userInfo == null) {
                    this.alertMsg(HttpServiceHelper.getErrorMsg(res.status));
                    return;
                } else {
                    if (rurl) {
                        userInfo.tel = userInfo.userAcct;
                        //存储在缓存中
                        history.replaceState('', '', '#/app_login?goBack=true');
                        SessionStorageTool.saveUserInfo(userInfo);
                        // console.log(location)
                        // console.log(userInfo)
                        //获取用户省份
                        this.getUserProv(userInfo,rurl);                  
                    }
                }
            }).catch((err) => {
                // console.log(err);
                this.props.layer.close();
                this.alertMsg("网络异常");
            });
    };

    getUserProv = (userInfo,rurl) => {
        //通过手机号获取用户省份信息
        fecthUsers(userInfo.tel).then(
            response => {
                if (!response.result) {
                    this.alertMsg("获取用户归属地信息失败");
                    return;
                }
                userInfo.belgProvCode = response.result.belgProvCode;
                userInfo.belgProvName = response.result.belgProvName;
                //console.log(data);
                //存储在缓存中
                SessionStorageTool.saveUserInfo(userInfo);
                //存储在store中;
                this.props.dispatch(getUserInfo(userInfo));
               location.href = atob(rurl) + '?accessToken=' + encodeURIComponent(userInfo.accessToken);
                //跳转
                this.props.layer.close();
                if (SessionStorageUtil.get("ref")) {
                    SessionStorageUtil.save("loginUrl", this.props.router.location.pathname);
                    this.props.router.push(SessionStorageUtil.get("ref"));
                    SessionStorageUtil.remove('ref');
                } else {
                    this.props.router.push('/home')
                }
            }).catch((err) => {
                // console.log(err);
                this.alertMsg("获取用户归属地信息失败")

            });
    }
}
export default connect()(AppLoginPage);