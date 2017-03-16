import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { getUserInfo } from '../../actions/user';
import { fecthUserLogin, fecthUsers, fecthUsersmobile } from './services/services';
import { HttpServiceHelper } from '../../common/http_service_helper.jsx';
import Header from '../../components/header';
import {CryptoJsUtil} from '../../common/cryptoUtil';
import { SessionStorageTool } from '../../common/session_storage_Tool.jsx';
import { SessionStorageUtil } from '../../common/session_storage.jsx';
import './login.less';
//带删除按钮的输入框组件
export class InputWithDelCmp extends Component {
    constructor(props) {
        super(props);
        _cmosq.push(['trackPV', '/login']);
        this.state = {
            value: ''
        };
        // if (location.href.indexOf('goBack') > -1) {
        //     // console.log("跳了没")
        //     window.history.go(-1);
        // }
    }

    delBtnOnClick = (event) => {
        this.inputRef.value = '';
        this.btnRef.style.display = 'none';
        this.inputRef.focus();
    };
    inputOnChange = (event) => {
        this.inputRef.value = this.inputRef.value.replace(/\D/g, '');
        if (this.inputRef.value.length) {
            this.btnRef.style.display = 'block';
        } else {
            this.btnRef.style.display = 'none';
        }
        this.state.value = this.inputRef.value;
        this.props.inputOnChange(this.inputRef.value);
    };

    render() {
        let inputClass = this.props.inputClass || '';
        let inputMaxLength = this.props.maxLength || 11;
        let inputType = this.props.type || 'tel';
        let inputPlaceholder = this.props.placeholder || '';
        let autoFocus = this.props.autoFocus || false;
        return <div className={inputClass}>
            <input type={inputType}
                maxLength={inputMaxLength}
                autoFocus={autoFocus}
                placeholder={inputPlaceholder}
                ref={(input) => this.inputRef = input}
                onChange={this.inputOnChange}
                onBlur={(e) => { setTimeout(() => { this.btnRef && (this.btnRef.style.display = 'none') }, 50) } }
                onFocus={() => {
                    this.inputRef && this.inputRef.value.length
                        && (this.btnRef.style.display = 'block')
                }
                }
                />
            <img src={require('../../assets/img/delete.png')}
                onClick={this.delBtnOnClick}
                ref={(btn) => this.btnRef = btn}
                style={{ display: 'none' }}
                />
        </div>
    }
}
InputWithDelCmp.propTypes = {
    inputClass: PropTypes.string.isRequired,
    maxLength: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    inputOnChange: PropTypes.func
};
//这个是输入框带 xxx xxxxx xxxxx 空格的
export class InputWithDelAndWithSpaceCmp extends InputWithDelCmp {
    inputValueBak = '';
    inputValueFormat = (inputNumberText) => {
        let n = inputNumberText.substr(0, 3)
            + ' ' + inputNumberText.substr(3, 4)
            + ' ' + inputNumberText.substr(7, 4)
        return n.trim();
    }

    inputOnChange = (event) => {
        setTimeout(()=>{
            let pos = this.inputRef.selectionEnd;
            this.inputRef.value = this.inputRef.value.replace(/\D|\s/g, '');
            this.state.value = this.inputRef.value;
            this.inputRef.value = this.inputValueFormat(this.inputRef.value);
            let offset = this.inputRef.value.length - this.inputValueBak.length;
            this.inputRef.value.charAt(pos - 1) == ' ' && (offset > 0 ? pos++ : pos--);
            this.inputRef.setSelectionRange(pos, pos);
            this.inputValueBak = this.inputRef.value;
            if (this.inputRef.value.length) {
                this.btnRef.style.display = 'block';
            } else {
                this.btnRef.style.display = 'none';
            }
            this.props.inputOnChange(this.state.value);
        },20);
    };
}

//带倒计时的获取验证码组件
export class CodeBtnCmp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            btnText: "获取验证码",
            countDowning:false
        };
    }
    getValidateCodeBtnAction = (e) => {
        if (this.props.clickAction(e)) {
            this.state.countDowning = true;
            this.count = 60;
            this.setState({ btnText: --this.count + 's 后获取' });
            this.timer = setInterval(() => {
                this.setState({ btnText: --this.count + 's 后获取' });
                if (this.count <= 0) {
                    this.setState({ btnText: '重新获取',countDowning:false });
                    clearInterval(this.timer);
                }
            }, 1000);
        }
    };

    componentWillUnmount() {
        
        clearInterval(this.timer);
    }

    render() {
        return <div className={this.props.inputClass}>
            <button
                onClick={this.getValidateCodeBtnAction}
                ref={(e) => this.getCodeBtn = e}
                disabled={this.state.countDowning}
                >{this.state.btnText}
            </button>
        </div>
    }
}
CodeBtnCmp.propTypes = {
    clickAction: PropTypes.func,
    inputClass: PropTypes.string
};
class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginBtnIsDisabled: true
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
                // console.log('获取验证码');
                // console.log(res);
                if (res.status == "200") {
                    this.toastMsg(HttpServiceHelper.getErrorMsg('007'))//验证码已发送，请查收
                } else {
                    // console.log(res.status)
                    this.toastMsg(HttpServiceHelper.getErrorMsg(res.status))
                }
            },
            err => this.alertMsg(HttpServiceHelper.getErrorMsg('003'))
        );
        return true;
    };

    componentDidMount() {
        this.codeBtn.getCodeBtn.disabled =  true;
        this.props.layer.close();
        this.setLoginBtnDisabled();
    }

    onTelInputChange = (value) => {
        this.codeBtn.getCodeBtn.disabled =  value.length < 11 || this.codeBtn.state.countDowning;
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
        return <div className='login-page'>
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
        // 通过手机号和验证码 登录
        this.props.layer.loading("");
        fecthUserLogin(crytel, crycode).then(
            res => {
                // console.log(res);
                var userInfo = res.result;
                if (res.status != 200 || userInfo == null) {
                    this.alertMsg(HttpServiceHelper.getErrorMsg(res.status));
                    return;
                } else {
                    userInfo.tel = userInfo.userAcct;
                    //存储在缓存中
                    SessionStorageTool.saveUserInfo(userInfo);
                    //获取用户省份
                    this.getUserProv(userInfo);
                }
            }).catch((err) => {
                // console.log(err);
                this.props.layer.close();
                this.alertMsg("网络异常");
            });
    };

    getUserProv = (userInfo) => {
        //通过手机号获取用户省份信息
        fecthUsers(userInfo.tel).then(
            response => {
                // console.log(response)
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
                //跳转
                this.props.layer.close();
                if (SessionStorageUtil.get("ref")) {
                    // history.replaceState('', '', '#/login?goBack=true');
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

export default connect()(LoginPage);
