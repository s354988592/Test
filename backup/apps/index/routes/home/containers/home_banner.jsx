
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-cmos-slider';
// import {Link} from 'react-router';
// import {getBanners} from '../../../actions/home.jsx';
import {fecthBanners} from '../services/services.jsx';
import {HttpServiceHelper} from '../../../common/http_service_helper.jsx';
import '../css/home_banner.less';
import {CkeckoutToken} from '../../../common/checkout_token.jsx';
import {SessionStorageTool} from '../../../common/session_storage_Tool.jsx';
import {ServerException} from '../../../common/server_exception';
class SliderContainer extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:this.props.data
        }
    }
    componentDidMount() { 
       
    }
    componentWillReceiveProps(nextProps) {
            this.setState({
        data:nextProps.data
        })
    }

    shouldComponentUpdate(nextProps,nextState){
        return true;
    }
    render() {
        return (
            <a  href={this.state.data.bannerPicUrlAddr}>
                 <img src={this.state.data.resources.rsUrlAddr} onClick={(event) => {Log.trackEvent(['banner', 'click', '', ''], event.currentTarget);}}></img>
           </a>
        )
    }
}
class HomeBanner extends Component {
    constructor(props) {
        super(props);  
        this.state={
            homeBannerData:[{"bannerPicUrlAddr":"http://mall.10085.cn/c/online/index.html",
            resources:{"rsUrlAddr":"http://192.168.100.163:29090/image/banner_750x200.png"}
        }]
        };
    }
    componentDidMount() { 
        
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.homeConfsAction==undefined || nextProps.homeConfsAction == null){
              this.setState({
                        homeBannerData:this.state.homeBannerData
              }) 
        }else{
            if(SessionStorageTool.getUserIsExist()){
                CkeckoutToken.checkoutAuthTokenPromise(this.fecthFuc,nextProps.homeConfsAction.belgProvCode);
            }else{
                this.fecthFuc(nextProps.homeConfsAction.belgProvCode)
            }
            
        }
 
    }
    fecthFuc=(belgProvCode)=>{
               fecthBanners(belgProvCode).then(
                    res => {
                        if(res.status=='200'){
                            this.setState({
                            homeBannerData:res.result
                            }) 
                        }else if(res.status=="USER_1021"){
                            ServerException.handleServerException(this.fecthFuc,this.props.homeConfsAction.belgProvCode)
                        }else {
                            this.props.layer.alert({content:HttpServiceHelper.getErrorMsg(res.status)});
                        }
                    },
                    err => {
                       this.props.layerSelf.alert({content: HttpServiceHelper.getErrorMsg(err.status)})
                    }
     ); 
    }
    shouldComponentUpdate(nextProps,nextState){
        return true;
    }
    render() {
        return (
            <div className="home-banner">
                 <Slider class="bannerSlider">
                    {
                   this.state.homeBannerData.map((params,index)=><div key={index} ><SliderContainer data={params}/></div>)
                    }
                </Slider>
            </div>
        )
    }
}
export default connect(
    (state)=>({
         homeConfsAction:state.Home.homeConfsAction
    } 
    )
)(HomeBanner)