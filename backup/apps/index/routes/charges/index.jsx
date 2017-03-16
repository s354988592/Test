/**
 * 话费查询
 * */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/header';
import UserInfo from '../../components/user_info';
import Dialog from '../../components/popup2';
import Titlepanel from '../../components/titlepanel';
import BarChartH from '../../components/bar_chart';
import BottomButton from '../../components/bottom_button';
import {SessionStorageTool} from '../../common/session_storage_Tool.jsx';
import {getCharge,getHistoryBill} from '../../actions/charge';
import {HttpServiceHelper} from '../../common/http_service_helper.jsx';
import {fecthCharge,fecthHistoryBill,fetchurl} from './services/services.jsx'
import {ServerException} from '../../common/server_exception';
import './css/index.less';
import {CkeckoutToken} from '../../common/checkout_token.jsx';
class ChargePage extends Component {
    constructor(props) {
        super(props);
        _cmosq.push(['trackPV', '/charges']);
        this.state = {
            params: {
                "mobile": SessionStorageTool.getUserTel(),
                "showtitle":1
            },
            defaultUrl:"",
            data:{
                realFeeQryRsp:{
                    curFee:"--",
                    curFeeTotal:"--",
                    oweFee:"0.00",
                    realFee:"--"
                }
            },
            data1: {
            oprTime: "", 
            billRec: {
                historyBillInfo: []
            }
        },
        }
    //   {
    //                 "inBill": "", billCycleStartDate: ""
    //             }
   CkeckoutToken.checkoutAuthTokenPromise(this.fecthFuc);
    }
    fecthFuc=()=>{
         fecthHistoryBill(this.state.params.mobile).then(
               res => {
                    if(res.status=='200'){
                    this.props.dispatch(getHistoryBill(res.result));
                    this.props.layer.close();
                }else if(res.status=="USER_1021"){
                        ServerException.handleServerException(this.fecthFuc)
                    }else {
                        this.props.layer.alert({content:HttpServiceHelper.getErrorMsg(res.status)});
                    }
            }
            ).catch((err)=>{
                this.props.layer.alert({content:HttpServiceHelper.getErrorMsg(err.status)})
            }

            );
          fecthCharge(this.state.params.mobile).then(
                res => {
                    if(res.status=='200'){
            
                       this.props.dispatch(getCharge(res.result));
                        // this.props.layer.close();
                    }else if(res.status=="USER_1021"){
                        ServerException.handleServerException(this.fecthFuc)
                    }else {
                        this.props.layer.alert({content:HttpServiceHelper.getErrorMsg(res.status)});
                    }
              
            }).catch((err)=>{
               this.props.layer.alert({content:HttpServiceHelper.getErrorMsg(err.status)})
            }
            );
       
              fetchurl(this.state.params.mobile,this.state.params.showtitle).then(
                res => {
                var url=res.result;
                this.setState({
                    defaultUrl:url
                })
                // this.props.layer.close();
            }).catch(
            (err)=>{
                this.props.layer.alert({content:HttpServiceHelper.getErrorMsg(err.status)})
            });
    }
    componentDidMount() {
        
        this.props.layer.loading("");
        if (this.state.data.provinceCode != "" && this.state.data1.oprTime != "") {
            this.props.layer.close()
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.historyBillAction==undefined||nextProps.historyBillAction==null ||nextProps.chargeAction==undefined||nextProps.chargeAction==null){
            this.setState({
                data:nextProps.data,
                data1:nextProps.data1
            })
        }else{
            this.setState({
                data:nextProps.chargeAction,
                data1:nextProps.historyBillAction
            })
        }
       

    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }


    render() {
        
        let chartDate = this.state.data1.billRec.historyBillInfo;
        let arr = this.state.data.realFeeQryRsp;
        chartDate = chartDate.map((item, index)=> {
            var year = item.billCycleStartDate
            return {x: year.substr(2, 2) + '/' + item.inBill, y: item.toatlBill}

        })
        let chartDates;
        if (chartDate.length > 6) {
            chartDates = chartDate.splice(-6)
        } else {
            chartDates = chartDate;
        }
        let payData = {
            contect: chartDates,
            unit: '元'
        }
        return (
            <div>
                <Header title='话费查询'/>
                <UserInfo />
                <CallInfo arr={arr}/>

                <div style={{borderBottom:"1px solid #E4E4E4",backgroundColor:"#fff",marginTop:"0.83rem"}}>
                    <Titlepanel title="近6个月话费使用情况"/>
                </div>
                <BarChartH data={payData}/>

            <div style={{marginTop:"8rem"}}>
                    <BottomButton url={this.state.defaultUrl} content="充话费"/>
                </div>
            </div>
        )
    }
}
class CallInfo extends Component {
    render() {
        return (
            <div className="charge-balance">
                <div className="charge-currentBalance">
                    <div className="charge-info"><span className="charge-infoName">当前可用余额 </span>

                        <div className="charge-layer">
                            <Dialog text="?" btnContent="知道了" title="当前用户可用于消费的余额，包括但不限于现金账户、专项返还账户、预存款账户"/>
                        </div>
                    </div>
                    <p>{this.props.arr.curFee}<span className="charge-unit">元</span></p>
                </div>
                <div className="charge-detail clearfix">
                    <div className="charge-bill">
                        <p>当月已用话费</p>

                        <p>{this.props.arr.realFee}<span className="charge-unit">元</span></p>
                    </div>
                    <div className="charge-bill">
                        <div className="charge-info">
                            <span className="charge-infoName">账户总余额 </span>

                            <div className="charge-layer">
                                <Dialog text="?" btnContent="知道了" title="当前账户总余额，包括但不限于预存款余额、分月返回、协议款、专项款等总额"/>
                            </div>
                        </div>
                        <p>{this.props.arr.curFeeTotal}<span className="charge-unit">元</span></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    (state)=>(
    {
        historyBillAction: state.Charge.historyBillAction||{oprTime: "", 
            billRec: {
                historyBillInfo: []
        }},
        chargeAction: state.Charge.chargeAction||{realFeeQryRsp:{
                    curFee:"--",
                    curFeeTotal:"--",
                    oweFee:"0.00",
                    realFee:"--"
        }}
    }
    )
)(ChargePage);

