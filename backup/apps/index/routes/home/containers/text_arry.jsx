/***
 * @author:jingaier 2017/2/09
 * name:传入一个有值有文本的数组，值可以是图标，如果传入url，则点击可以跳转
 */
import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import TxtArry from '../../../components/txt_arry';
import { SessionStorageTool } from '../../../common/session_storage_Tool.jsx';
import { fetchurl } from '../../charges/services/services.jsx';
import { CkeckoutToken } from '../../../common/checkout_token.jsx';
import { HttpServiceHelper } from '../../../common/http_service_helper.jsx';
import {ServerException} from '../../../common/server_exception';
//import {getConsumInfor} from '../../../actions/home.jsx';


class TextArry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                telfeeBaln: '--',
                telfeeBalnLinkAddr: '/charges',
                uesdTelfee: '--',
                uesdTelfeeLinkAddr: '/charges',
                prstPoint: '--',
                prstPointLinkAddr: '/bonus_points',
                moreTitle: '消费分析',
                moreIcon: 'http://192.168.100.163:29090/image/fee_icon.png',
                moreLink: '/packages/remain'

            },
            params: {
                "mobile": SessionStorageTool.getUserTel(),
                "showtitle": 1
            },
            defaultUrl: ""
        }
        CkeckoutToken.checkoutAuthTokenPromise(this.fecthFuc);
    }
    fecthFuc = () => {
        fetchurl(this.state.params.mobile, this.state.params.showtitle).then(
            res => {
                var url = res.result;
                this.setState({
                    defaultUrl: url
                })
                // this.props.layer.close();
               if(res.status=="USER_1021"){
                    ServerException.handleServerException(this.fecthFuc)
                }
            }).catch(
            (err) => {
                this.props.layer.alert({ content: HttpServiceHelper.getErrorMsg(err.status) })
            });
    }
    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.consumInforAction == undefined || nextProps.consumInforAction == null) {
            this.setState({
                data: this.state.data
            })
        } else {
            this.setState({
                data: nextProps.consumInforAction
            })

        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        //console.log(this.props.consumInforAction)
        let data = this.state.data
        let defaultUrl = this.state.defaultUrl
        let TxtData = [
            { name: "话费余额", price: data.telfeeBaln, lin: '/bearer_page/' + '充话费' + '/' + encodeURIComponent(defaultUrl), unit: '(元)' },
            { name: "已用话费", price: data.uesdTelfee, lin: data.uesdTelfeeLinkAddr, unit: '(元)' },
            { name: "当前积分", price: data.prstPoint, lin: data.prstPointLinkAddr },
            { name: data.moreTitle, src: data.moreIcon, lin: data.moreLink }
        ];
        return (
            <div>
                <TxtArry data={TxtData} border={true} />
            </div>
        )
    }
}
export default connect(
    (state) => (
        {
            consumInforAction: state.Home.consumInforAction
        }
    )
)(TextArry)