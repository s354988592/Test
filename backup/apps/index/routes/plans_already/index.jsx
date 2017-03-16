/**
 * 已订购业务查询
 * */
import React, { Component } from 'react';
import Header from '../../components/header';
import UserInfo from '../../components/user_info';
import List from '../../components/list';
import Dialog from '../../components/popup2';
import TabsControl from '../../components/tab';
import './plans_already.less';
import { connect } from 'react-redux';
import { allBunis, unis, unscribe } from '../../actions/allbunis';
import { fecthAllBunis, fecthUnis, fetchUnscribe } from './services/services.jsx';
import Fetch from 'react-cmos-fetch';
import { SessionStorageTool } from '../../common/session_storage_Tool.jsx';
import { CkeckoutToken } from '../../common/checkout_token.jsx';
import { getUserInfo } from '../../actions/user';
import { HttpServiceHelper } from '../../common/http_service_helper.jsx';
import { ServerException } from '../../common/server_exception';
class PlanPage extends Component {
    constructor(props) {
        super(props);
        _cmosq.push(['trackPV', '/plans_already']);
        this.state = {
            data1: {
                "busiInfoList": [{
                    "busiType": "01",
                    "busiInfo": [{
                        "bunessType": "01",
                        "bunessCode": "",
                        "busiName": "",
                        "busiFee": "",
                        "orderTime": "321",
                        "validDate": "20160321",
                        "expireDate": "20991231",
                        "feeType": ""
                    }]
                }
                ]
            },
            data2: {
                "uniQryRecList": [{
                    prodInfo: [{
                        bizCode: null,
                        bunessCode: "PIXBPA117",
                        bunessFree: null,
                        bunessName: "来电提醒",
                        bunessType: "01",
                        deadTime: "29991231",
                        feeType: "包月",
                        orderingTime: "20140905",
                        spId: null,
                        startTime: "20140905"
                    }]
                }
                ]
            }
        }
        CkeckoutToken.checkoutAuthTokenPromise(this.fecthFuc);

    }
    fecthFuc = () => {
        var unOrderMap = new Map();
        var biz = { name: "dwde" }
        var spid = { name: "dwde" }
        fecthUnis(SessionStorageTool.getUserTel()).then(
            res => {
                if (res.status == '200' && res.result && res.result.uniQryRecList == null) {
                    fecthAllBunis(SessionStorageTool.getUserTel()).then(
                        response => {
                            let _allBunis = response.result;
                            this.props.dispatch(allBunis(_allBunis));
                            this.props.layer.close();
                        }
                    ).catch((err) => {
                       this.props.layer.alert({ content: '网络异常' });
                    })
                    if (res.status == "USER_1021") {
                        ServerException.handleServerException(this.fecthFuc())
                    }
                } else if (res.result && res.result.uniQryRecList) {
                    let unOrders = res.result.uniQryRecList;
                    unOrders.forEach((e) => {
                        if (e.prodInfo) {
                            e.prodInfo.forEach((item) => {
                                if (item.bunessType == '01') {
                                    unOrderMap.set(item.bunessCode, { productType: e.productType, bizCode: item.bizCode, spId: item.spId, bunessCode: item.bunessCode, productId: item.productId })
                                } else if (item.bunessType == '02') {
                                    unOrderMap.set(biz, { productType: e.productType, bunessCode: item.bunessCode, spId: item.spId, bizCode: item.bizCode, productId: item.productId, name: item.bunessName })
                                    unOrderMap.set(spid, { productType: e.productType, bunessCode: item.bunessCode, spId: item.spId, bizCode: item.bizCode, productId: item.productId, name: item.bunessName })
                                }
                            })
                        }
                    })
                    fecthAllBunis(SessionStorageTool.getUserTel()).then(
                        response => {
                            let _allBunis = response.result;
                            if (response.result && response.result.busiInfoList) {
                                _allBunis.busiInfoList.forEach((e) => {
                                    if (e.busiInfo) {
                                        e.busiInfo.forEach((item) => {
                                            if (item.bunessType == '01') {
                                                let o = unOrderMap.get(item.bunessCode)
                                                item.isCanUnOrder = (o == null);
                                                item.unOrder = o;
                                            } else if (item.bunessType == '02') {
                                                if (unOrderMap.get(biz).name == item.busiName && unOrderMap.get(spid).name == item.busiName) {
                                                    let o = unOrderMap.get(biz) || unOrderMap.get(spid)
                                                    item.isCanUnOrder = (o == null);
                                                    item.unOrder = o;
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                            this.props.dispatch(allBunis(_allBunis));
                            this.props.layer.close();
                        }).catch((err) => {
                            this.props.layer.alert({ content: '网络异常' });
                        });
                    if (res.status == "USER_1021") {
                        ServerException.handleServerException(this.fecthFuc())
                    }
                }
            }).catch((err) => {
                this.props.layer.alert({ content: '网络异常' });
            });
    }
    componentDidMount() {
        
        this.props.layer.loading("")
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.plansAlreadyAction == undefined || nextProps.plansAlreadyAction == null) {
            this.setState({ data1: this.state.data1 });
        } else {
            this.setState({ data1: nextProps.plansAlreadyAction })
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
    render() {
        var objType = this.state.data1.busiInfoList;
        return (
            <div>
                <Header title='已订业务' />
                <UserInfo />
                <div className='xxx'>
                    <TabsControl data={objType} defaultIndex={0}>
                        {
                            //遍历数组tab导航，并设置导航name，tab显示内容
                            objType.map((params, index) => {
                                return <div container={params.busiInfo.map((data, index) => {
                                    var truecontent = data.busiName;
                                    return (
                                        <List content={data}
                                            contents={'尊敬的用户,要退订' + truecontent + "业务吗?"}
                                            key={index}
                                            sure='确&nbsp;&nbsp;&nbsp;认'
                                            del='取&nbsp;&nbsp;&nbsp;消'
                                            text='退&nbsp;&nbsp;订'
                                            clickAction={() => {
                                                let unOrder1 = data.unOrder;
                                                let productType = unOrder1.productType;
                                                let bunessCode = unOrder1.bunessCode;
                                                let spId = unOrder1.spId;
                                                let bizCode = unOrder1.bizCode;
                                                let tel = SessionStorageTool.getUserTel();
                                                const fecthFucs = (tel, productType, bunessCode, spId, bizCode) => {
                                                    fetchUnscribe(tel, productType, bunessCode, spId, bizCode).then(
                                                        res => {
                                                            this.fecthFuc();
                                                        }).catch((err) => {
                                                            this.props.layer.alert({ content: '网络异常' });
                                                        })
                                                }
                                                CkeckoutToken.checkoutAuthTokenPromise(fecthFucs, tel, productType, bunessCode, spId, bizCode);
                                            } }></List>
                                    )
                                })} name={params.busiType} key={index}></div>;
                            })
                        }
                    </TabsControl>
                </div>
            </div>
        )
    }
}
export default connect(
    (state) => (
        { plansAlreadyAction: state.Allbunis.plansAlreadyAction }
    )
)(PlanPage);