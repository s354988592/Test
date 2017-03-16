/***
 * @author:jingaier 2017/1/22
 */
import React, { Component } from 'react';
import { render } from 'react-dom';
import Header from '../../components/header';
import UserInfo from '../../components/user_info';
import './payment-records.less';
import { connect } from 'react-redux';
import { getPayRec } from '../../actions/pay_rec.jsx';
import { fecthPayRec } from './services/services.jsx';
import Fetch from 'react-cmos-fetch';
import { SessionStorageTool } from '../../common/session_storage_Tool.jsx';
import { HttpServiceHelper } from '../../common/http_service_helper.jsx';
import { CkeckoutToken } from '../../common/checkout_token.jsx';
import {ServerException} from '../../common/server_exception';
import { getUserInfo } from '../../actions/user';
//各个子组件
class Userinfo extends Component {
    render() {
        return (
            <div>
                <UserInfo />
                <div className="payment-records-payRec">
                    <span>仅可查询含当月在内近六个月的缴费记录</span>
                </div>
            </div>
        )
    }
}
class PayRec extends Component {
    render() {
        let userData = this.props.data;
        // console.log(111)
        // console.log(userData)
        return (
            <div className="payment-records-inmationForm">
                <InformationForm data={userData} />
            </div>
        )
    }
}
class InformationForm extends Component {
    render() {
        let userData = this.props.data;
        //处理数据--把相同月份归类
        let resultArr = [];
        let tmp = 0;
        userData.forEach(function (items) {//06 06 06 05 05 04 04
            let mouths = items.payDate.substring(4, 6);
            //console.log(mouths);
            if (mouths != tmp) {
                let dayArr = [];
                dayArr.push(items);//[{06}]
                //console.log(dayArr);
                resultArr.push(dayArr);//把小数组放进大数组中
                tmp = mouths;//
            } else {
                resultArr[resultArr.length - 1].push(items);//如果相同，把对象放进最后那个数组中
            }
            if (items.amount >= 1000) {
                items.amount = parseInt(items.amount).toLocaleString();//千位分隔符
            }
        })
        //console.log(resultArr);
        return (
            <div>
                <ul className="payment-records-inforUl">
                    {
                        //map 遍历数据
                        resultArr.map(function (data, index) {
                            return <Collect data={data} key={index} />
                        })
                    }
                </ul>
            </div>
        )
    }
}
class Collect extends Component {
    render() {
        let userData = this.props.data;
        //console.log(userData);
        let getDate = (date) => date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6, 8) + " " + date.substring(8, 10) + ":" + date.substring(10, 12) + ":" + date.substring(12, 14);
        let mouth = userData[0].payDate.substring(4, 6);
        return (
            <div className="payment-records-inforUlDiv">
                <li className="payment-records-firstLi">{mouth}月</li>
                <li>
                    {
                        //再次map遍历；
                        userData.map(function (data, index) {
                            return <Mess data={data} key={index} />
                        })
                    }
                </li>
            </div>
        )
    }
};
//
class Mess extends Component {
    render() {
        var ArrObj = this.props.data;
        // console.log(ArrObj);
        let getDate = (date) => date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6, 8) + " " + date.substring(8, 10) + ":" + date.substring(10, 12) + ":" + date.substring(12, 14);
        let dataTime = getDate(ArrObj.payDate);
        return (
            <div className="payment-records-sPan">
                <div className="payment-records-sPanTop">
                    <span>{ArrObj.channelId}</span>
                    <span>{ArrObj.amount}&nbsp;<i>元</i></span>
                </div>
                <div className="payment-records-sPanBottom">
                    <p>{dataTime}</p>
                    <p>{ArrObj.payTypeName}</p>
                </div>
            </div>
        )
    }
};
export default class PaymentRecords extends Component {
    constructor(props) {
        super(props);
         _cmosq.push(['trackPV', '/pay_records']);
        let tel = SessionStorageTool.getUserInfo().tel;
        //console.log(tel)
        this.state = {
            userMobile: tel,
            // console.log(tel)
            data: {
                "payRecRsp": [
                    {
                        "payDate": "--------------",
                        "amount": "--",
                        "channelId": "--",
                        "payType": "--",
                        "payTypeName": "--"
                    }
                ]
            }

        }
    }
    fecthFuc = () => {
        fecthPayRec(this.state.userMobile).then(
            res => {
                if (res.status == '200' || res.result == null) {
                    var objData = res.result;
                    this.setState({
                        data: objData
                    });
                    this.props.layer.close()
                } else if(res.status=="USER_1021"){
                    ServerException.handleServerException(this.fecthFuc)
                }else {
                    this.props.layer.alert({content:HttpServiceHelper.getErrorMsg(res.status)});
                }

            }
        ).catch((err) => {
            this.props.layer.alert({ content: HttpServiceHelper.getErrorMsg(err.status) })
        });
    }
    componentDidMount() {
       
        this.props.layer.loading("")
        CkeckoutToken.checkoutAuthTokenPromise(this.fecthFuc);

    }
    componentWillReceiveProps(nextProps) {
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
    render() {
        let payData = this.state.data;
        //console.log(payData);
        return (
            <div className="payment-records-containers">
                <Header title="缴费记录" />
                <Userinfo />
                <PayRec data={payData.payRecRsp} />
            </div>
        );
    }
};


