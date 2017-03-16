/***
 * @author:luobangkun 2017/2/09
 * name:传入一个有值有文本的数组，值可以是图标，如果传入url，则点击可以跳转
 */
import React,{Component} from 'react';
import {render} from 'react-dom';
import { connect } from 'react-redux';
import Fanbarflow from '../../../components/fanbar_flow.jsx';
import Fanbarbill from '../../../components/fanbar_bill.jsx';
import {SessionStorageTool} from '../../../common/session_storage_Tool.jsx';
import {getConsumInfor} from '../../../actions/home.jsx';
import {fecthConsumInfor} from '../services/services.jsx';
import {HttpServiceHelper} from '../../../common/http_service_helper.jsx';
import   '../css/fan_bar.less';
import {ServerException} from '../../../common/server_exception';
import {CkeckoutToken} from '../../../common/checkout_token.jsx';
var telephone;
// 判断有没有手机号
class Fanbarfb extends Component {
    constructor(props) {
        super(props);
        this.state={
             consume:{
                usedMbdt:"--",
		        remainMbdt:"--",
                usedCnvst:"--",
		        remainCnvst:"--"
             }
        }
        if(SessionStorageTool.getUserIsExist()){
           
            CkeckoutToken.checkoutAuthTokenPromise(this.fecthFuc);
        }
    
}
    fecthFuc=()=>{
         fecthConsumInfor(SessionStorageTool.getUserTel()).then(
            res => {
                if(res.status=='200'){
                    this.props.dispatch(getConsumInfor(res.result));
                }else if(res.status=="USER_1021"){
                    ServerException.handleServerException(this.fecthFuc)
                }else {
                    this.props.layer.alert({content:HttpServiceHelper.getErrorMsg(res.status)});
                }
            }
        ).catch((err)=>{
                this.props.layerSelf.alert({content: HttpServiceHelper.getErrorMsg(err.status)})
             });
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.consumInforAction==undefined ||nextProps.consumInforAction==null){
         this.setState({
          consume:this.state.consume
      });
        }else{
            this.setState({
                consume:nextProps.consumInforAction
      });
        }
    }

    shouldComponentUpdate(nextProps,nextState){
        return true;
    }
    render() {
        var widths=document.body.clientWidth;
        return (
            <div className="fanbar" style={{height:widths*0.4}}>
                <Fanbarflow data={this.state.consume}/>
                <Fanbarbill data={this.state.consume}/>
            </div>
        )
    }
}
export default connect(
     (state)=>(
        {
            consumInforAction:state.Home.consumInforAction    
        }
    )
)(Fanbarfb)