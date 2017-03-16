/**
 * Created by Zhanglizhao
 */
// ======================================================
// 示例用户中心
// ======================================================
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import {userLogin,changeProvince} from '../../actions/home.jsx';
import HomeHeader from './containers/home_header.jsx';
import TextArry from './containers/text_arry';
import Tips from './containers/tips_s';
import TabSlider from './containers/tab_horizontal_flip';
import Fanbarfb from './containers/fan_bars';
import HomeBanner from './containers/home_banner';
import Loggedstate from './containers/logged_state';
import {SessionStorageTool} from '../../common/session_storage_Tool.jsx';
import ActivityListModule from './containers/activity_list_module';
import PullOnLoading from './containers/pull_on_loading';
import EndLoading from './containers/end_loading';
import {SessionStorageUtil} from '../../common/session_storage.jsx';
import NoLoginMessage from './containers/no_login_err_msg.jsx';
import {CkeckoutToken} from '../../common/checkout_token.jsx';
import {HttpServiceHelper} from '../../common/http_service_helper.jsx';
import {NavigatorLocation} from '../../common/navigator_location.jsx';
import {getHomeConfs} from '../../actions/home.jsx';
import {fecthHomeConfs,fecthHomeConfsLongLat} from './services/services.jsx';
// 判断是不是微信内置浏览器
function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}
const getRandom = ()=>Math.round(Math.random()*100);
const p ={"id":8,"name":"贵州","code":"1520000","abb":"黔"}


class HomePage extends Component {
    constructor(props) {
        super(props);
         _cmosq.push(['trackPV', '/home']);
        this.state = {
            isLogin : SessionStorageTool.getUserIsExist(),
            noLoginErrMsg:false
        }
            if (!SessionStorageTool.getUserIsExist()) {
            if (NavigatorLocation.geolocationIsExist()&&NavigatorLocation.getCurrentPositionIsExist()) {
                NavigatorLocation.getLocation().then(
                        res=> {
                        if (res.success) {
                        
                            let longitude = res.result.coords.longitude;
                            let latitude = res.result.coords.latitude;
                            fecthHomeConfsLongLat(longitude, latitude).then(
                                    res => {
                                        if(res.status=='200'){
                                        this.setState({
                                            noLoginErrMsg:this.state.noLoginErrMsg
                                        })
                                     
                                         SessionStorageTool.saveProvinceInfo(res.result.belgProvCode);
                                        this.props.dispatch(getHomeConfs(res.result));
                                        this.props.layer.close();
                                 }else if(res.status=='-4'){
                                       this.setState({
                                            noLoginErrMsg:!this.state.noLoginErrMsg
                                        })
                                        this.props.layer.close();
                                   }
                                  
                                }
                            ).catch((err)=>{
                                this.props.layer.alert({content: HttpServiceHelper.getErrorMsg(err.status)})
                            });
                        } else {
                         
                            let province = " ";
                            fecthHomeConfs(province).then(
                                    res => {
                                        if(res.status=='200'){
                                        SessionStorageTool.saveProvinceInfo(res.result.belgProvCode);
                                    this.props.dispatch(getHomeConfs(res.result));
                                    this.props.layer.close();
                                        }else{
                                            this.props.layer.alert({content: HttpServiceHelper.getErrorMsg(res.status)})
                                        }
                                }
                            ).catch((err)=> {
                                   this.props.layer.alert({content: HttpServiceHelper.getErrorMsg(err.status)})
                                });
                        }

                    }
                ).catch((err)=> {
                 
                       this.props.layer.alert({content: HttpServiceHelper.getErrorMsg(err.status)})
                    });
            }
        } else {
     CkeckoutToken.checkoutAuthTokenPromise(this.fecthFuc);
        }
    }
        fecthFuc=()=>{
             fecthHomeConfs(SessionStorageTool.getUserInfo().belgProvCode).then(
                    res => {
                            if(res.status=='200'){
                                  this.setState({
                                            noLoginErrMsg:this.state.noLoginErrMsg
                                        })
                                       
                                        this.props.dispatch(getHomeConfs(res.result));
                                        this.props.layer.close();
                             }else if(res.status=='-4'){
                                 // console.log(res.status)
                                   this.setState({
                                            noLoginErrMsg:!this.state.noLoginErrMsg
                                        })
                                        
                                        this.props.layer.close();
                             }
                }
            ).catch((err)=> {
                    this.props.layer.alert({content: HttpServiceHelper.getErrorMsg(err.status)})
                });
    }
    componentDidMount() {
        this.props.layer.loading("");
        if(isWeiXin()){
            SessionStorageUtil.save('weixin','true')
        }else {
            SessionStorageUtil.save('weixin','false')
        }
    }
    componentWillReceiveProps(nextProps) {
       this.setState({
               noLoginErrMsg:nextProps.getNoLoginErrMsg
           })
      
    }
    shouldComponentUpdate(nextProps,nextState){
       return true
    }
    checkShows=()=>{
        return this.state.isLogin==false ? <Loggedstate/> : <div><Fanbarfb layerSelf={this.props.layer}/><TextArry/>
        </div>
    }

      
    checkShow=()=>{
        return this.state.noLoginErrMsg==true ? <div>
                <HomeHeader layerSelf={this.props.layer}/>
                <NoLoginMessage/>
            </div> : <div>
                <HomeHeader layerSelf={this.props.layer}/>
                {this.checkShows()}
                <HomeBanner layerSelf={this.props.layer}/>
                <TabSlider/>
                <Tips/>
                <ActivityListModule/>
                <PullOnLoading/>
                <EndLoading/>
                 </div>
    }
 
    render() {
        return (
            <div>{this.checkShow()}</div>
        )
    }
};


export default connect(
   (state) => (
    {
        getNoLoginErrMsg:state.Home.getNoLoginErrMsg
       
    })
)(HomePage)