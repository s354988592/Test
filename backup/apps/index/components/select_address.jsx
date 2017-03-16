/**
 * @author gaoyongtao 2017/02/06
 */
import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import Layer from 'react-cmos-layer';
import { hashHistory } from 'react-router';
import { SessionStorageTool } from '../common/session_storage_Tool';
import { userLogout, getHomeConfs, getNoLoginErrMsg, getClear } from '../actions/home';
import { fecthHomeConfs, fecthLogout } from '../routes/home/services/services.jsx';
import { telephoneSubstr } from '../common/telephone_substr'
import "../assets/css/select_address.css";
import { HttpServiceHelper } from '../common/http_service_helper.jsx';
// 选择省份组件
const LogOutContent = () => <div className="log-out-content">确认要退出当前账号吗？</div>
class SelectAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultState: false,//默认状态为false地区选择为隐藏状态
            selected: "",//默认key，可传动态值
            selectedText: "选择地区"//默认label，可传动态值
        };

    }
    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        // 组件初始化时不调用，有props修改的时候才调用
        if (nextProps.homeConfsAction == undefined || nextProps.homeConfsAction == null) {
            this.setState(
                {
                    selected: this.state.selected,
                    selectedText: this.state.selectedText
                })
        } else {
            this.setState(
                {
                    selected: nextProps.homeConfsAction.belgProvCode,//默认key，可传动态值
                    selectedText: nextProps.homeConfsAction.belgProvName//默认label，可传动态值
                }
            )
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
    componentDidUpdate() {
        // 组件更新完成后调用
    }
    checkLiIndex(e) {
        return e == this.state.selected ? "selAdd-provinceList-li selAdd-liActive" : "selAdd-provinceList-li";//点击函数，点击当前添加active
    }
    changeDefaultState() {
        this.setState({
            defaultState: !this.state.defaultState,//点击选择地区修改默认状态值
        })
    }
    checkLogin(e) {
        return e == true ?
            <td className="selAdd-check-login-container">
                <span className="selAdd-selectProvince">{SessionStorageTool.getUserInfo().belgProvName}</span>
                <span className="selAdd-isLogin" onClick={this.logOut.bind(this)}>{telephoneSubstr(SessionStorageTool.getUserInfo().tel)}</span>
            </td> :
            <td className="selAdd-check-login-container">
                <span className={this.state.defaultState == true ? "selAdd-selectProvince selAdd-selectIconUp" : "selAdd-selectProvince selAdd-selectIconDown"}
                    onClick={this.changeDefaultState.bind(this)} >{this.state.selectedText}</span>
                <span className="selAdd-isLogin"></span>
            </td>
    }
    logOut() {
        this.refs.logOut.confirm({
            content: <LogOutContent />,
            btn: ["确认", '取消'],
            ok: () => {
                // console.log(SessionStorageTool.getUserInfo())
                let accessToken = SessionStorageTool.getUserInfo().accessToken
                let authToken =  SessionStorageTool.getUserInfo().authToken
                fecthLogout(authToken,accessToken).then(
                    res => {
                        // console.log(res);
                        this.props.userLogout();
                        SessionStorageTool.removeUserInfo();
                        this.props.getClear();
                        hashHistory.push('/login');
                    }).catch((err) => {
                        this.props.layerSelf.alert({ content: HttpServiceHelper.getErrorMsg(err.status) })
                    })

            },

            cancel: this.refs.logOut.close()
        })
    }
    render() {
        return (
            <div className="selAdd-selectAddress">
                <table style={{ width: '100%' }}>
                    <tbody>
                    <tr>
                        <td className="selAdd-logo">
                       <img className="selAdd-logo-icon" src='http://192.168.100.163:29090/image/logo.png'/></td>
                        {/*修改三角箭头*/}
                        {this.checkLogin(SessionStorageTool.getUserIsExist())}
                    </tr>

                    </tbody>
                </table>
                <div className={this.state.defaultState == true ? "selAdd-provinceContainerActive" : "selAdd-provinceContainer"}
                    onClick={this.changeDefaultState.bind(this)}>
                    <ul className="selAdd-provinceList">
                        {

                            this.props.cityList.map((params, index) => {//遍历所有地区
                                return <li value={params.provCode} key={index} className={this.checkLiIndex(params.provCode)}
                                    onClick={() => {
                                        this.props.layerSelf.loading("");
                                        this.setState({//点击选择地区
                                            defaultState: !this.state.defaultState,
                                            selected: params.provCode,
                                            selectedText: params.provNm
                                        });
                                        fecthHomeConfs(params.provCode).then(
                                            res => {
                                                if (res.status == '200') {
                                                    this.props.getNoLoginErrMsg(false);
                                                    SessionStorageTool.saveProvinceInfo(res.result.belgProvCode);
                                                    this.props.getHomeConfs(res.result);
                                                    this.props.layerSelf.close();
                                                } else if (res.status == '-4') {
                                                    this.props.getNoLoginErrMsg(true);
                                                    this.props.layerSelf.close();
                                                    {/*return;*/ }
                                                }
                                            },
                                            err => this.props.layerSelf.alert({ content: HttpServiceHelper.getErrorMsg(err.status) })
                                        )
                                    } }>{params.provNm}</li>;
                            })
                        }

                    </ul>
                </div>
                <div className="selAdd-log-out"> <Layer ref='logOut' /></div>

            </div>
        );
    }
};
export default connect(
    (state) => (
        {
            homeConfsAction: state.Home.homeConfsAction

        }), { userLogout, getHomeConfs, getNoLoginErrMsg, getClear }
)(SelectAddress);


