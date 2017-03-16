/**
 * 积分查询
 * */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/header';
import UserInfo from '../../components/user_info';
import TitlePanel from '../../components/titlepanel';
import Button from '../../components/bottom_button';
import { getBonusPoints, getBonusPointsRecords } from '../../actions/bonuspoints';
import { fecthBonusPoints, fecthBonusPointsRecords } from './services/services.jsx';
import './bonuspoints.less';
import Fetch from 'react-cmos-fetch';
import { SessionStorageTool } from '../../common/session_storage_Tool.jsx';
import { HttpServiceHelper } from '../../common/http_service_helper.jsx';
import { ServerException } from '../../common/server_exception';
import { CkeckoutToken } from '../../common/checkout_token.jsx';
//数字三位一个逗号
function format_number(n) {
    var b = parseInt(n).toString();
    var len = b.length;
    if (len <= 3) {
        return b;
    }
    var r = len % 3;
    return r > 0 ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : b.slice(r, len).match(/\d{3}/g).join(",");
}
//修改时间格式
function getDate(date) {
    return date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2) + " " + date.substr(8, 2) + ":" + date.substr(10, 2) + ":" + date.substr(12, 2);
}
class BonusPointPage extends Component {
    constructor(props) {
        super(props);
        _cmosq.push(['trackPV', '/bonus_points']);
        this.state = {
            allpoint: {
                "qryInfoRsp": { "brand": "01", "pointValue": "--", "brandName": '--' },
            },
            pointrecord: {
                pointQryRec: [{
                    "cousTime": "--",
                    "cousPonit": "--",
                    "ponitType": "1",
                    "opType": "6",
                    "contentDesc": "积分转入"
                }]
            }
        }
        CkeckoutToken.checkoutAuthTokenPromise(this.fecthFuc);
    }
    fecthFuc = () => {
        fecthBonusPoints(SessionStorageTool.getUserTel()).then(
            res => {
                if (res.status == '200') {
                    // console.log('请求全部积分数据')
                    this.props.dispatch(getBonusPoints(res.result))
                } else if (res.status == "USER_1021") {
                    ServerException.handleServerException(this.fecthFuc)
                } else {
                    this.props.layer.alert({ content: HttpServiceHelper.getErrorMsg(res.status) });
                }
            }
        ).catch((err) => {
            this.props.layer.alert({ content: HttpServiceHelper.getErrorMsg(err.status) })
        });
        fecthBonusPointsRecords(SessionStorageTool.getUserTel()).then(
            response => {
                // console.log(response)
                if (response.status == '200' && response.result.pointQryRec == null) {
                    // console.log('无积分交易')
                    this.props.layer.alert({ content: HttpServiceHelper.getErrorMsg('006') });
                } else if (response.status == '200' && response.result.pointQryRec != null) {
                    // console.log('正常交易')
                    this.props.dispatch(getBonusPointsRecords(response.result))
                    this.props.layer.close();
                } else if (response.status == "USER_1021") {
                    ServerException.handleServerException(this.fecthFuc())
                } else {
                    this.props.layer.alert({ content: HttpServiceHelper.getErrorMsg(res.status) });
                }
            }
        ).catch((err) => {
            this.props.layer.alert({ content: HttpServiceHelper.getErrorMsg(err.status) })
        });
    }
    componentDidMount() {
        _cmosq.push(['trackPV', '/bonus_points']);
        this.props.layer.loading("")
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.bonusPointsAction == undefined || nextProps.bonusPointsAction == null) && (nextProps.bonusPointsRecordAction == undefined || nextProps.bonusPointsRecordAction == null)) {
            this.setState({
                allpoint: this.state.allpoint,
                pointrecord: this.state.pointrecord
            });
        } else if ((nextProps.bonusPointsAction != undefined || nextProps.bonusPointsAction != null) && (nextProps.bonusPointsRecordAction == undefined || nextProps.bonusPointsRecordAction == null)) {
            this.setState({
                allpoint: nextProps.bonusPointsAction,
                pointrecord: this.state.pointrecord
            });
        } else {
            this.setState({
                allpoint: nextProps.bonusPointsAction,
                pointrecord: nextProps.bonusPointsRecordAction
            })
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        return (
            <div>
                <Header title='积分查询' />
                <UserInfo />
                <Brand pointnows='当前可用积分' brand='用户品牌' points={this.state.allpoint.qryInfoRsp}></Brand>
                <Checkpoints title='仅可查询含当月在内近六个月的积分兑换记录' />
                <TitlePanel title='积分兑换记录' />
                <div style={{ width: '100%', height: '1px', background: '#e4e4e4' }}></div>
                <Checkpc data={this.state.pointrecord.pointQryRec} />
                <div className="bonus-points-bottom">
                    <Button url="http://m.jf.10086.cn/" content="积分兑换" />
                </div>
            </div>
        )
    }
}

class Brand extends Component {
    render() {
        let point = this.props.points.pointValue;
        let brandName = this.props.points.brandName;
        if (point == '--') {
            point = point
        } else {
            point = format_number(point)
        }
        return <div className='bonus-points-content'>
            <div className='bonus-points-pointsnow'>
                <p>{this.props.pointnows}</p>
                <p className='bonus-points-pointsnowColor'>{point}</p>
            </div>
            <div className='bonus-points-line'></div>
            <div className='bonus-points-pointsnow'>
                <p>{this.props.brand}</p>
                <p>{brandName}</p>
            </div>
        </div>
    }
}
class Checkpoints extends Component {
    render() {
        return <div>
            <span className='bonus-points-check'>{this.props.title}</span>
        </div>
    }
}
class Checkpc extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        return <ul style={{ width: '100%', background: 'white' }} className='bonus-points_first'>
            {
                this.props.data.map((data, index) => {
                    let cousPonit = data.cousPonit;
                    if (cousPonit == '--') {
                        cousPonit = cousPonit
                    } else {
                        cousPonit = format_number(cousPonit)
                    }
                    return <li className='bonus-points-content2' key={index}>
                        <p>{getDate(data.cousTime)}</p>
                        <p>{cousPonit}</p>
                    </li>
                })
            }
        </ul>
    }
}
export default connect(
    (state) => (
        {
            bonusPointsAction: state.Bonuspoints.bonusPointsAction,
            bonusPointsRecordAction: state.Bonuspoints.bonusPointsRecordAction
        }
    )
)(BonusPointPage);

Brand.propTypes = {
    points: React.PropTypes.object
};

Checkpoints.propTypes = {
    title: React.PropTypes.string
};

UserInfo.propTypes = {
    data: React.PropTypes.object
}