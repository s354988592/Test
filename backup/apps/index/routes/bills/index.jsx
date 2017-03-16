/**
 * 账单查询
 * */

import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import echarts from 'echarts';
import Header from "../../components/header";
import Piechart from "../../components/piechart";
import Pulldown from "../../components/pulldown";
import UserInfo from "../../components/user_info";
import TitlePanel from "../../components/titlepanel";
import { SessionStorageTool } from '../../common/session_storage_Tool.jsx';
import { getBillInfor } from '../../actions/billinfor.jsx';
import { fecthBillinfor } from './services/services.jsx';
import { preMonthDate } from '../../common/get_time.jsx';
import { HttpServiceHelper } from '../../common/http_service_helper.jsx';
import './index.less';
import {ServerException} from '../../common/server_exception';
import { CkeckoutToken } from '../../common/checkout_token.jsx';
var telephone1;
// 判断有没有手机号
class BillPage extends Component {
    constructor(props) {
        super(props);
        _cmosq.push(['trackPV', '/bills']);
        this.state = {
            params: {
                "userMobile": "13888888888",
                "beginMonth": " 201605",
                "endMonth": "201605"
            },
            billinforarr: {
                "inBill": "3",
                "billCycleStartDate": "20170301",
                "billCycleEndDate": "20170331",
                "toatlBill": "0",
                "billMaterial": [{
                    "billEntries": "固定费用",
                    "billEntriesValue": "0",
                },
                {
                    "billEntries": "语音通信费",
                    "billEntriesValue": "0",
                },
                {
                    "billEntries": "上网费",
                    "billEntriesValue": "0"
                },
                {
                    "billEntries": "短彩信",
                    "billEntriesValue": "0",
                },
                {
                    "billEntries": "增值业务费",
                    "billEntriesValue": "0",
                },
                {
                    "billEntries": "代收费",
                    "billEntriesValue": "0",
                },
                {
                    "billEntries": "其他费用",
                    "billEntriesValue": "0",
                }]
            },
            billinfor: {
                "billRec": {
                    "historyBillInfo": [{
                        "inBill": "9",
                        "billCycleStartDate": "20160901",
                        "billCycleEndDate": "20160930",
                        "toatlBill": "0",
                        "billMaterial": [{
                            "billEntries": "固定费用",
                            "billEntriesValue": "0",
                        },
                        {
                            "billEntries": "语音通信费",
                            "billEntriesValue": "0",
                        },
                        {
                            "billEntries": "上网费",
                            "billEntriesValue": "0"

                        },
                        {
                            "billEntries": "短彩信",
                            "billEntriesValue": "0",
                        },
                        {
                            "billEntries": "增值业务费",
                            "billEntriesValue": "0",
                        },
                        {
                            "billEntries": "代收费",
                            "billEntriesValue": "0",
                        },
                        {
                            "billEntries": "其他费用",
                            "billEntriesValue": "0",
                        }]
                    }
                    ]
                }
            }

        }
        CkeckoutToken.checkoutAuthTokenPromise(this.fecthFuc);

    }
    fecthFuc = () => {
        fecthBillinfor(SessionStorageTool.getUserTel()).then(
            res => {
                if (res.status == '200') {
                    this.props.dispatch(getBillInfor(res.result))
                    this.props.layer.close();
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
         
        this.props.layer.loading("");
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.billInforAction == undefined || nextProps.billInforAction == null) {
            this.setState({
                billinfor: this.state.billinfor
            });
        } else {
            this.setState({
                billinfor: nextProps.billInforAction
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        let data = this.state.billinfor.billRec.historyBillInfo.slice(-6);
        var startdate = data[0].billCycleStartDate;
        let l = data.length;
        let month = preMonthDate(startdate);
        for (var i = 0; i < 6 - l; i++) {
            this.state.billinforarr.inBill = month.beginDate.substr(4, 2) * 1;
            this.state.billinforarr.billCycleStartDate = month.beginDate;
            this.state.billinforarr.billCycleEndDate = month.endDate;
            data.unshift(Object.assign({}, this.state.billinforarr));
            month = preMonthDate(month.beginDate);
        }
        return (
            <Body data={data} />
        )
    }
}
//用户信息数据
class Body extends Component {
    render() {
        let data = this.props.data;
        return (
            <div>
                <Header title="账单查询" />
                <div className="zdcxTelephone"><UserInfo /></div>
                <TabComponent data={data} />
            </div>
        )
    }
}
// 显示含当月在内的最近6个月份，默认状态下当前月份处于选中状态
class TabComponent extends Component {
    render() {
        var array = this.props.data;
        return (
            <div className="zdcxIntotal">
                <TabsControl data={array}>
                    {
                        array.map((arr, index) => {
                            return <div name={arr.inBill} billdatas={arr.toatlBill} key={index}><Listbill /></div>;
                        })
                    }
                </TabsControl>
            </div>

        )
    }
}
class TabsControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: this.props.data.length - 1
        };
    }
    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            currentIndex: nextProps.data.length - 1
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
    check_tittle_index(index) {
        return index === this.state.currentIndex ? "zdcxTab_tittle zdcxActive" : "zdcxTab_tittle";
    }

    check_item_index(index) {
        return index === this.state.currentIndex ? "zdcxTab_item zdcxShow" : "zdcxTab_item";
    }
    render() {
        var data = this.props.data;
        let children = this.props.children;
        return (
            <div>
                <div className="zdcxbg">
                    {React.Children.map(children, (element, index) => {
                        return (
                            <div className={this.check_item_index(index)}>
                                <Title data={data[index]} />
                            </div>
                        );
                    })}
                    {/*动态生成Tab导航*/}
                    <div className="zdcxTab_tittle_wrap">
                        {React.Children.map(children, (element, index) => {
                            return (
                                /*箭头函数没有自己的this，这里的this继承自外围作用域，即组件本身*/
                                <div onClick={() => { this.setState({ currentIndex: index }) } } className={this.check_tittle_index(index)}>
                                    <div className="titlep">
                                        <p>{(element.props.name) * 1}
                                            <span>月</span>
                                        </p>
                                        <p>{element.props.billdatas}
                                            <span>元</span>
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/*Tab内容区域*/}
                <div className="zdcxTab_item_wrap">
                    {React.Children.map(children, (element, index) => {
                        return (
                            <div className={this.check_item_index(index)}>
                                <Listbill data={data[index]} />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
class Title extends Component {
    render() {
        var data = this.props.data;
        var begindate = data.billCycleStartDate;
        var enddate = data.billCycleEndDate;
        var begindata1 = begindate.substr(0, 4) + '-' + begindate.substr(4, 2) + '-' + begindate.substr(6, 2);
        var enddate1 = enddate.substr(0, 4) + '-' + enddate.substr(4, 2) + '-' + enddate.substr(6, 2);
        return (
            <div>
                <div className="total_bill">
                    <div className="total_bill_div">
                        <span>{(data.inBill) * 1}</span>
                        月消费账单总额
                </div>
                    <div className="total_bill_div1">
                        <span className="total_bill_span">{begindata1}</span>
                        <span>至</span>
                        <span>{enddate1}</span>
                    </div>
                </div>
                <div className="bill_number">{data.toatlBill}
                    <span className="bill_number_span">元</span>
                </div>
            </div>

        )
    }
}
// 显示各科目的占比数据，并通过科目名称左侧的色块与饼状图相对应，科目占比从多到少按照从上至下的顺序排列
class Listbill extends Component {
    render() {
        var data = this.props.data;
        var begindate = data.billCycleStartDate;
        var enddate = data.billCycleEndDate;
        var begindata1 = begindate.substr(0, 4) + '-' + begindate.substr(4, 2) + '-' + begindate.substr(6, 2);
        var enddate1 = enddate.substr(0, 4) + '-' + enddate.substr(4, 2) + '-' + enddate.substr(6, 2);
        return (
            <div className="zdcxConsume">
                <div className="zdcxTitle">
                    <div className="zdcxTitle_div">
                        {(data.inBill) * 1}
                        <span>月消费分析图</span>
                    </div>
                    <div className="zdcxTitle_span">
                        <span>{begindata1}</span>
                        <span>至</span>
                        <span>{enddate1}</span>
                    </div>
                </div>
                <div className="zdcxpie">
                    <Piechart data={data} />
                </div>
                <div className="titlepanel">
                    <p></p>
                    <p>账单明细
            <span className="titlepanel_span">{begindata1}</span>
                        <span className="titlepanel_span1">至</span>
                        <span>{enddate1}</span>
                    </p>
                </div>
                <div className="pulldown"><Pulldown data={data} /></div>
            </div>
        )
    }
}
export default connect(
    (state) => ({
        billInforAction: state.BillInfor.billInforAction
    })
)(BillPage)