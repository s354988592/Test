/**
 * 全部活动
 * */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/header';
import UserInfo from '../../components/user_info';
import Titlepanel from '../../components/titlepanel';
import Activities from '../../components/activities';
import {getActivities} from '../../actions/activities';
import {fecthActivities} from './services/services.jsx';
import {SessionStorageTool} from '../../common/session_storage_Tool';
import {HttpServiceHelper} from '../../common/http_service_helper.jsx';
import './css/index.less';
 function resultArr(obj){
            let activitiesData = obj.result;
                    let resultArr = [];
                    let tmp=null;
                    activitiesData.forEach(function(items){
                    let clfcId =items.clfcId; 
                    if(clfcId!=tmp && items.tbActivityCates!=null && items.resources != null){
                    let dayArr = [];
                    dayArr.push(items);
                    resultArr.push(dayArr);//把小数组放进大数组中
                    tmp = clfcId;
                }else{
                    if(items.tbActivityCates!=null && items.resources != null){
                            resultArr[resultArr.length-1].push(items);//如果相同，把对象放进最后那个数组中
                    }
                    
                }
            })
            return resultArr;
     }
class ActivityListPage extends Component {
    constructor(props) {
        super(props);
        _cmosq.push(['trackPV', '/activities']);
        this.state={
            activities:[
      [{
      "id": 1,
      "actvTitleNm": "4g活动",
      "subTitleNm": "订购不一样的套餐，享受不一样的人生",
      "actvPicRsId": "4",
      "actvConnAddr": "",
      "actvDesc": "4G套餐",
      "clfcId": 1,
      "tbActivityCates": {
        "clfcId": 1,
        "clfcNm": "4g套餐",
        "clfcDesc": "套餐"
      },
      "resources": {
        "rsId": "4",
        "rsTypeCd": "1",
        "rsPath": "https://m.baidu.com/static/index/icon/w_icon2.png",
        "rsNm": "activity",
        "rsUrlAddr": "https://m.baidu.com/static/index/icon/w_icon2.png"
      }
    }]
  ]
        };
      if(SessionStorageTool.getUserIsExist()){
       
     fecthActivities(SessionStorageTool.getUserInfo().belgProvCode).then(
                    res => {
                        if(res.status=='200'){
                         this.props.dispatch(getActivities(resultArr(res)))
                         this.props.layer.close();
                        }else{
                            this.props.layer.alert({content: HttpServiceHelper.getErrorMsg(res.status)})
                        }
                    }
      ).catch((err)=>{

           this.props.layer.alert({content: HttpServiceHelper.getErrorMsg(err.status)})

         });
    }else{
        fecthActivities(SessionStorageTool.getProvinceInfo()).then(

                    res => {
                        if(res.status=='200'){
                         this.props.dispatch(getActivities(resultArr(res)))
                         this.props.layer.close();
                        }else{
                           this.props.layer.alert({content: HttpServiceHelper.getErrorMsg(res.status)})
                        }
                    }
      ).catch((err)=>{
                this.props.layer.alert({content: HttpServiceHelper.getErrorMsg(err.status)})
            });
    }
    }

    componentDidMount() {
    
    this.props.layer.loading("");
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.activitiesAction==undefined || nextProps.activitiesAction==null){
         this.setState({
          activities:this.state.activities
      });
        }else{
                   this.setState({
          activities:nextProps.activitiesAction
      });
        }
       
    }

    shouldComponentUpdate(nextProps,nextState){
        return true;
    }
    checkShow(e){
        return e==true ? "userInfoShow" : "userInfoNone"
    }
    render() {  
        return (
            <div className="activities">
                <Header title='全部活动'/>
                <div className={this.checkShow(SessionStorageTool.getUserIsExist())}>
                   <UserInfo/>     
                </div>
                   <Activity activity={this.state.activities} />
            </div>
        )
    }
}
//活动内容
class Activity extends Component{
     render() {
        return (  
              <div className="activity-list-bgColor">
                    {
                        this.props.activity.map((arr,index)=> {
                            return <div key={index}>
                                    <div style={{borderBottom:"1px solid #E4E4E4"}}>
                                      <Titlepanel title={arr[0].tbActivityCates.clfcNm}/>
                                    </div>
                                      {arr.map((value,index)=> {
                                         return <div className="activity-list-lists" key={index} ><Activities data={value} /></div>

                                         })
                                      }
                                 </div> 
                        })
                    }
                </div>           
        )
    }
}

export default connect (
    (state)=>(
        {
            activitiesAction:state.Activities.activitiesAction
        }
    )
)(ActivityListPage);