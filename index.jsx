// 消费分析
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import Header from '../../components/header';
import UserInfo from '../../components/user_info';
import Titlepanel from '../../components/titlepanel';
import BarChart from '../../components/bar_chart_analysis';
import Piechart from "../../components/piechart";
import Piechart1 from "../../components/piechart1";
import Pulldown from "../../components/pulldown";
import {SessionStorageTool} from '../../common/session_storage_Tool.jsx';
import {HttpServiceHelper} from '../../common/http_service_helper.jsx';
import {CkeckoutToken} from '../../common/checkout_token.jsx';
import {ServerException} from '../../common/server_exception';
import {fecthBillinfor} from "./services/services";
import './index.less';


class BillAnalysis extends Component {
    constructor(props) {
        super(props);
        let stickData = {
            "fareBalanceInfo": {
                "oprTime": "20170314164623",
                "transIdo": "14894811830059803825",
                "realFeeQryRsp": {
                    "curFeeTotal": "0.00",
                    "curFee": "0.00",
                    "realFee": "0.00",
                    "oweFee": "0.00"
                }
            },
            "billSum": {
                "oprTime": "20170314164629",
                "transIdo": "14894811886818690025",
                "billRec": {
                    "historyBillInfo": [
                        {
                            "inBill": "12",
                            "billCycleStartDate": "20161201",
                            "billCycleEndDate": "20161231",
                            "toatlBill": "0.00",
                            "billMaterial": [
                                {
                                    "billEntries": "固定费用",
                                    "billEntriesValue": "0.00",
                                    "thirdBillMaterialInfo": [
                                        {
                                            "thirdItemsName": "语音套餐固定费",
                                            "thirdItemsValue": "0.00"
                                        },
                                        {
                                            "thirdItemsName": "其他业务功能费",
                                            "thirdItemsValue": "0.00"
                                        }
                                    ]
                                },
                                {
                                    "billEntries": "语音通信费",
                                    "billEntriesValue": "0.00",
                                    "thirdBillMaterialInfo": [
                                        {
                                            "thirdItemsName": "本地基本通话费",
                                            "thirdItemsValue": "0.00"
                                        }
                                    ]
                                },
                                {
                                    "billEntries": "上网费",
                                    "billEntriesValue": "0.00",
                                    "thirdBillMaterialInfo": null
                                },
                                {
                                    "billEntries": "短彩信",
                                    "billEntriesValue": "0.00",
                                    "thirdBillMaterialInfo": null
                                },
                                {
                                    "billEntries": "增值业务费",
                                    "billEntriesValue": "0.00",
                                    "thirdBillMaterialInfo": null
                                },
                                {
                                    "billEntries": "代收费",
                                    "billEntriesValue": "0.00",
                                    "thirdBillMaterialInfo": null
                                },
                                {
                                    "billEntries": "其他费用",
                                    "billEntriesValue": "0.00",
                                    "thirdBillMaterialInfo": null
                                }
                            ]
                        },
                        {
                            "inBill": "01",
                            "billCycleStartDate": "20170101",
                            "billCycleEndDate": "20170131",
                            "toatlBill": "0.00",
                            "billMaterial": [
                                {
                                    "billEntries": "固定费用",
                                    "billEntriesValue": "0.00",
                                    "thirdBillMaterialInfo": [
                                        {
                                            "thirdItemsName": "其他业务功能费",
                                            "thirdItemsValue": "0.00"
                                        }
                                    ]
                                },
                                {
                                    "billEntries": "语音通信费",
                                    "billEntriesValue": "0.00",
                                    "thirdBillMaterialInfo": [
                                        {
                                            "thirdItemsName": "一体化语音通话费",
                                            "thirdItemsValue": "0.00"
                                        }
                                    ]
                                },
                                {
                                    "billEntries": "上网费",
                                    "billEntriesValue": "0.00",
                                    "thirdBillMaterialInfo": [
                                        {
                                            "thirdItemsName": "GPRS/3G流量费",
                                            "thirdItemsValue": "0.00"
                                        }
                                    ]
                                },
                                {
                                    "billEntries": "短彩信",
                                    "billEntriesValue": "0.00",
                                    "thirdBillMaterialInfo": [
                                        {
                                            "thirdItemsName": "短信费",
                                            "thirdItemsValue": "0.00"
                                        }
                                    ]
                                },
                                {
                                    "billEntries": "增值业务费",
                                    "billEntriesValue": "0.00",
                                    "thirdBillMaterialInfo": null
                                },
                                {
                                    "billEntries": "代收费",
                                    "billEntriesValue": "0.00",
                                    "thirdBillMaterialInfo": null
                                },
                                {
                                    "billEntries": "其他费用",
                                    "billEntriesValue": "0.00",
                                    "thirdBillMaterialInfo": null
                                }
                            ]
                        },
                        {
                            "inBill": "02",
                            "billCycleStartDate": "20170201",
                            "billCycleEndDate": "20170228",
                            "toatlBill": "0.00",
                            "billMaterial": [
                                {
                                    "billEntries": "固定费用",
                                    "billEntriesValue": "0.00",
                                    "thirdBillMaterialInfo": [
                                        {
                                            "thirdItemsName": "其他业务功能费",
                                            "thirdItemsValue": "0.00"
                                        }
                                    ]
                                },
                                {
                                    "billEntries": "语音通信费",
                                    "billEntriesValue": "0.00",
                                    "thirdBillMaterialInfo": [
                                        {
                                            "thirdItemsName": "一体化语音通话费",
                                            "thirdItemsValue": "0.00"
                                        }
                                    ]
                                },
                                {
                                    "billEntries": "上网费",
                                    "billEntriesValue": "0.00",
                                    "thirdBillMaterialInfo": null
                                },
                                {
                                    "billEntries": "短彩信",
                                    "billEntriesValue": "0.00",
                                    "thirdBillMaterialInfo": null
                                },
                                {
                                    "billEntries": "增值业务费",
                                    "billEntriesValue": "0.00",
                                    "thirdBillMaterialInfo": null
                                },
                                {
                                    "billEntries": "代收费",
                                    "billEntriesValue": "0.00",
                                    "thirdBillMaterialInfo": null
                                },
                                {
                                    "billEntries": "其他费用",
                                    "billEntriesValue": "0.00",
                                    "thirdBillMaterialInfo": null
                                }
                            ]
                        }
                    ]
                }
            }
        };
        console.log('默认数据');
        console.log(stickData);
        this.state = {
            data: stickData
        };
    }

    fecthFuc = ()=> {
        console.log('发起网络请求');
        fecthBillinfor(SessionStorageTool.getUserTel()).then(
            res => {
                console.log(res);
                if (res.status == '200' || res.result == null) {
                    var billData = res.result;
                    this.setState({
                        data: billData
                    });
                    this.props.layer.close()
                } else if (res.status == "USER_1021") {
                    ServerException.handleServerException(this.fecthFuc())
                } else {
                    this.props.layer.alert({content: HttpServiceHelper.getErrorMsg(res.status)})
                }
            }
        ).catch((err)=> {
            this.props.layer.alert({ content: HttpServiceHelper.getErrorMsg(err.status) })
        })
    };

    componentDidMount() {
        console.log("消费分析页面组件挂载");
        this.props.layer.loading("")
        CkeckoutToken.checkoutAuthTokenPromise(this.fecthFuc);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {

        let billAnalyData = this.state.data;
        console.log('render时的数据');
        console.log(billAnalyData);

        let outMenuInfoData = billAnalyData.billSum;
        let historyBillInfo = outMenuInfoData.billRec.historyBillInfo;
        console.log(2222222);
        //var arr =[];
        var arr1 = [];
        historyBillInfo.map((item,index)=>{
            var time=item.billCycleEndDate;
            var timeStr = time.substring(2,4)+'/'+time.substring(4,6);
            arr1.push(timeStr);
        });
        let data = {
            total: 0,
            net_fee: [],
            talk_fee: [],
            msg_fee:[],
            add_fee:[],
            proxy_fee:[],
            other_fee:[],
            start_time: 0,
            end_time: 0
        };
        var datArr = historyBillInfo;
        datArr.forEach( function(ele, index) {
            var bills = ele.billMaterial;
            bills.forEach( function(bill, index) {
                var val = parseInt(bill.billEntriesValue)
                if (bill.billEntries == '固定费用') {
                    data.total += val
                } else if (bill.billEntries == '语音通信费') {
                    data.talk_fee.push({
                        key: ele.billCycleStartDate.substring(0, 6),
                        val: val
                    })
                } else if (bill.billEntries == '上网费') {
                    data.net_fee.push({
                        key: ele.billCycleStartDate.substring(0, 6),
                        val: val
                    })
                }else if (bill.billEntries == '短彩信') {
                    data.msg_fee.push({
                        key: ele.billCycleStartDate.substring(0, 6),
                        val: val
                    })

                }else if (bill.billEntries == '增值业务费') {
                    data.add_fee.push({
                        key: ele.billCycleStartDate.substring(0, 6),
                        val: val
                    })

                }else if (bill.billEntries == '代收费') {
                    data.proxy_fee.push({
                        key: ele.billCycleStartDate.substring(0, 6),
                        val: val
                    })

                }else if (bill.billEntries == '其他费用') {
                    data.other_fee.push({
                        key: ele.billCycleStartDate.substring(0, 6),
                        val: val
                    })

                }
            });
        });
        var nowTime = billAnalyData.fareBalanceInfo.oprTime;
        var  n = parseInt(nowTime.substring(0,4));
        var  y = parseInt(nowTime.substring(4,6))-1;
        let preN,preY;
        if (y-3<=0){
            preN = n-1;
            preY =y-3+12;
        }else {
            preN = n;
            preY =y-3
        }

        console.log(data);

        var talk_arr = [];
        data.talk_fee.map((par,index)=>{
            talk_arr.push(par.val)
        });
        var net_arr = [];
        data.net_fee.map((par,index)=>{
            net_arr.push(par.val)
        });
        let payData = {
            title: '套餐外通话费用',
            contect: [
                {x: arr1[0], y: talk_arr[0]},
                {x: arr1[1], y: talk_arr[1]},
                {x: arr1[2], y: talk_arr[2]}
            ],
            unit: '元'
        };
        let payData1 = {
            title: '套餐外流量费用',
            contect:[
                {x: arr1[0], y: net_arr[0]},
                {x: arr1[1], y: net_arr[1]},
                {x: arr1[2], y: net_arr[2]}
            ],
            unit: '元'
        };
        let outMenuInfoData1 = {
            payData:payData,
            payData1:payData1,
            preN:preN,
            preY:preY,
            n:n,
            y:y
        };

        let BillOfMonthData = {
            preN:preN,
            preY:preY,
            n:n,
            y:y,
            data:[
            {value:data.total},
            {value:0},
            {value:0},
        ]};
        let pieTmpData = [
            data.net_fee,
            data.talk_fee,
            data.msg_fee,
            data.add_fee,
            data.proxy_fee
        ];
        let listTmpData = [0,0,0,0,0];
        pieTmpData.forEach((type,idx)=>{
            type.forEach((item)=>{
                listTmpData[idx] += item.val;
                BillOfMonthData.data[1].value += item.val;
            });
        })
        data.other_fee.forEach(item=>{
            BillOfMonthData.data[2].value += item.val;
        });

        BillOfMonthData.data = BillOfMonthData.data.map(item=>{
            return {value:Math.round(item.value/3).toFixed(2)};
        });
        let thirdItemNamesArray = ['上网费','语音通信费','短彩信','增值业务费','代收费'];
        var billMaterial=[
            {billEntries:"月均套餐和固定费用",billEntriesValue:BillOfMonthData.data[0].value, thirdBillMaterialInfo:null},
            {billEntries:"月均套餐外费用",billEntriesValue:BillOfMonthData.data[1].value, thirdBillMaterialInfo:
                thirdItemNamesArray.map((name,idx)=>{
                    return {thirdItemsName:name,thirdItemsValue:Math.round(listTmpData[idx]/3).toFixed(2)}
                })
            },
            {billEntries:"其他费用",billEntriesValue:BillOfMonthData.data[2].value, thirdBillMaterialInfo:null}
        ];
        console.log(billMaterial);
        let BillDetailData = {
            preN:preN,
            preY:preY,
            n:n,
            y:y,
            billMaterial:billMaterial
        };
        return (
            <div>
                <Header title='消费分析'/>
                <UserInfo />
                <CostInfo data={billAnalyData.fareBalanceInfo}/>
                <OutMenuInfo data={outMenuInfoData1} />
                <BillOfMonth data={BillOfMonthData}/>
                <BillOfMonthDetail data={BillDetailData}/>
                <div className="analysisBottom">
                    <div className="analysisBtn-text">
                        <span>优惠资费推荐</span>
                    </div>
                    <div className="analysisBtn">
                        <Link to="/bill_recommendIn">
                            立即查看
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

}

//
class CostInfo extends Component {
    render() {
        let fareBalanceInfo = this.props.data;
        let realFee = fareBalanceInfo.realFeeQryRsp.realFee;
        let curFee = fareBalanceInfo.realFeeQryRsp.curFee;
        return (
            <div className="billAnalysis-balance">
                <div className="billAnalysis-currentBalance">
                    <div className="billAnalysis-info"><span className="billAnalysis-infoName">本月消费情况 </span>
                    </div>
                </div>
                <div className="billAnalysis-detail clearfix">
                    <div className="billAnalysis-bill">
                        <p>已用话费</p>
                        <p>{realFee}<span className="billAnalysis-unit">元</span></p>
                    </div>
                    <div className="billAnalysis-bill">
                        <div className="billAnalysis-info">
                            <span className="billAnalysis-infoName">可用余额</span>
                        </div>
                        <p>{curFee}<span className="billAnalysis-unit">元</span></p>
                    </div>
                </div>
            </div>
        )
    }
}
class OutMenuInfo extends Component {

    render() {
        let data = this.props.data;
        return (
            <div>
                <div className="titlepanel">
                    <p></p>
                    <p>套餐外消费情况
                        <span className="titlepanel_span">{data.preN+'年'+data.preY+'月'}</span>
                        <span className="titlepanel_span1">至 {data.n+'年'+data.y+'月'}</span>
                        <span></span>
                    </p>
                </div>
                <div>
                    <div className="outMenu_Contain">
                        <BarChart data={data.payData}/>
                    </div>
                    <div className="outMenu_Contain">
                        <BarChart data={data.payData1}/>
                    </div>
                </div>
            </div>
        )
    }
}
class BillOfMonth extends Component {
    render() {
        let data = this.props.data;
        console.log(data);
        return (
            <div>
                <div className="titlepanel">
                    <p></p>
                    <p>月均消费构成
                        <span className="titlepanel_span">{data.preN+'年'+data.preY+'月'}</span>
                        <span className="titlepanel_span1">至 {data.n+'年'+data.y+'月'}</span>
                        <span></span>
                    </p>
                </div>
                <div className="zdcx-pie">
                    <Piechart1 data={data.data}/>
                </div>
            </div>
        )
    }
}

class BillOfMonthDetail extends Component {
    render() {
        let data = this.props.data;
        return (
            <div>
                <div className="titlepanel">
                    <p></p>
                    <p>月均消费明细
                        <span className="titlepanel_span">{data.preN+'年'+data.preY+'月'}</span>
                        <span className="titlepanel_span1">至 {data.n+'年'+data.y+'月'}</span>
                        <span></span>
                    </p>
                </div>
                <div className="pulldown"><Pulldown data={data}/></div>
            </div>
        )
    }
}
export default BillAnalysis







   if (billAnalyData.fareBalanceInfo == null){
            nowTime = billAnalyData.billSum.oprTime;
        }else {
            nowTime = nowTime;
        }
        console.log(nowTime);










