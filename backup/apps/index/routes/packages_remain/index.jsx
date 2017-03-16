/**
 * Created by Administrator on 2017-1-20.
 */
import React,{Component} from 'react';
import {render} from 'react-dom';
import { connect } from 'react-redux';
import Header from '../../components/header';
import BottomButton from '../../components/bottom_button';
import Progress from '../../components/progress';
import Titlepanel from "../../components/titlepanel";
import TxtArry from "../../components/txt_arry";
import UserInfo from "../../components/user_info";
import {SessionStorageTool} from '../../common/session_storage_Tool.jsx';
import {fecthPackagesRemain} from './services/services';
import {getPackagesRemain} from '../../actions/packages_remain';
import Popup from '../../components/popup';
import {HttpServiceHelper} from '../../common/http_service_helper.jsx';
import './meal.less';
import {CkeckoutToken} from '../../common/checkout_token.jsx';
import {ServerException} from '../../common/server_exception';
import {getUserInfo} from '../../actions/user';
 function judge(obj){
    　　for(var i in obj){//如果不为空，则会执行到这一步，返回true
         　　　　return true;
         　　}
    　　 return false;
     }
function getNumberWithUnit(number, dot) {
    let unitArray = ['TB', 'GB', 'MB', 'KB'];
    let i = unitArray.length-1;
    function formatFloat(src, pos) {
        return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
    }
    return {
        number:(function privateCalculate(n) {
                if (n > 1024) {
                    i--;
                    return privateCalculate(formatFloat(n/1024,dot));
                } else {
                    return n;
                }
            })(number),
        unit:unitArray[i]
    };
}
//默认导出的最外层整个web组件
class PackageRemainPage extends Component{
    constructor(props){
        super(props);
         _cmosq.push(['trackPV', '/packages_remain']);
    }
    componentDidMount() {
        
        this.props.layer.loading("");
    CkeckoutToken.checkoutAuthTokenPromise(this.fecthFuc);
     
    }
    fecthFuc=()=>{
           fecthPackagesRemain(SessionStorageTool.getUserTel()).then(
            res => {
                if(res.status=='200'){
                     this.props.dispatch(getPackagesRemain(res.result));
                this.props.layer.close();
                }else if(res.status=="USER_1021"){
                    ServerException.handleServerException(this.fecthFuc)
                }else {
                  this.props.layer.alert({content:HttpServiceHelper.getErrorMsg(res.status)});
                }
            }
        ).catch((err)=>{
            this.props.layer.alert({content: HttpServiceHelper.getErrorMsg(err.status)})
        });
    }
    render(){
        var content ,titleName,planRemain=this.props.packagesRemain.planRemain;
        let array= {yuYin:[],message:[],flow:[],caixin:[]};
        // for (let j=0;j<planRemain.length;j++){
        //     for (let i=0;i<planRemain[j].resourcesInfo.length;i++){
        //         switch (planRemain[j].resourcesInfo[i].resourcesCode){
        //             case "01":
        //                 array.yuYin.push(planRemain[j].resourcesInfo[i]);
        //                 break;
        //             case "02":
        //                 array.meassge.push(planRemain[j].resourcesInfo[i]);
        //                 break;
        //             case "03":
        //                 array.caixin.push(planRemain[j].resourcesInfo[i]);
        //                 break;
        //             case "04":
        //                 array.flow.push(planRemain[j].resourcesInfo[i]);
        //                 break;
        //         }
        //     }
        // }
        planRemain.forEach((planRemainItem)=>{
            planRemainItem.resourcesInfo
            && planRemainItem.resourcesInfo.forEach((resourcesInfoItem)=>{
                resourcesInfoItem.secResourcesInfo.forEach((e)=>{
                    e.parentTitle = planRemainItem.planName;
                    switch (resourcesInfoItem.resourcesCode){
                        case "01":
                            array.yuYin.push(e);
                            break;
                        case "02":
                            array.message.push(e);
                            break;
                        case "03":
                            array.caixin.push(e);
                            break;
                        case "04":
                            array.flow.push(e);
                            break;
                    }
                })
            })
        })
        if( judge(this.props.packagesRemain.planRemain)){
            content=<Content data={this.props.packagesRemain.planRemain} data2={array} titleName={titleName}/>
        }else{
            content="";
        }
        return (
            <div className="test">
                <Header title="套餐余量查询"/>
                <UserInfo />
                {content}
                
            </div>
        )
    }
}

//内容组件
class Content extends Component{
    render(){
        var content={unit:"",data:[]};
        var array=this.props.data;
        var myArray=this.props.data2;
        for(var b in myArray){
            if (judge(myArray[b])){
                content.data.push(myArray[b])
            }else {

            }
        }
        return(
            <div>
                <ul className="content">
                    {
                        content.data.map((arr,index) =>{
                    return <Card data={arr} key={index} i={index}/>
                    })
                    }
                </ul>
            </div>

        )
    }
}

//三个卡片组件
class  Card extends Component{
    render(){
        var data=this.props.data;//获取组件的data数据
        var unit,unit1,unit2;//单位
        var totalRes=0,usedRes=0,residue=0,titleName;
        // 获得总量
        for(var i=0;i<data.length;i++){
                totalRes=totalRes*1+data[i].resourcesLeftInfo.totalRes*1;
                usedRes=usedRes*1+data[i].resourcesLeftInfo.usedRes*1;
                residue=totalRes-usedRes;//得到的剩余数
        }
        // 判断单位
            switch (data[0].resourcesLeftInfo.unit){//为每个卡片设置不同的单位
                case "分钟" :
                    titleName="语音";
                    unit="分钟";
                    unit1="分钟";
                    unit2="分钟";
                    break;
                case "KB" :
                    titleName="流量";
                    let v = getNumberWithUnit(residue,2);
                    unit = v.unit;
                    residue = v.number;
                    unit1=getNumberWithUnit(usedRes,2).unit;
                    unit2=getNumberWithUnit(totalRes,2).unit;
                    usedRes=getNumberWithUnit(usedRes,2).number;
                    totalRes=getNumberWithUnit(totalRes,2).number;
                    break;
                case "条数":
                    titleName="短信";
                    unit="条";
                    unit1="条";
                    unit2="条";
                    break;
                case "03":
                    titleName="彩信";
                    unit="条";
                    unit1="条";
                    unit2="条";
                    break;
            }
        let TxtData=[
            {name:'剩余',price:residue+'',lin:'/pay_records',unit:unit},
            {name:'已用',price:usedRes+'',url:'http://baidu.com',unit:unit1},
            {name:'总量',price:totalRes+'',lin:'/pay_records',unit:unit2},
        ];

        return(
            <li className="content-list">
                <div className="tab-list1">
                    <Titlepanel title={titleName}/>
                </div>
                <div className="tab-list1">
                    <TxtArry data={TxtData} reseve={true}/>
                </div>
                <div className="packages_dataShow">
                    {
                       data.map((data,index)=>{
                                      return <Cardshow data={data} key={index} />
                        })
                    }
                </div>
            </li>
        )
    }
}

// 展开收起切换组件
class Cardshow extends Component{
    render(){
        var data=this.props.data;
        var residueB,remainResUnit,totalResUnit,usedResUnit;
        remainResUnit=data.resourcesLeftInfo.unit;
        totalResUnit=data.resourcesLeftInfo.unit;
        if (data.resourcesLeftInfo.remainRes&&data.resourcesLeftInfo.totalRes){
             residueB=(data.resourcesLeftInfo.remainRes/data.resourcesLeftInfo.totalRes).toFixed(2)*100;//剩余量百分比的值
            switch (data.resourcesLeftInfo.unit){
                case "KB":
                    remainResUnit=getNumberWithUnit(data.resourcesLeftInfo.totalRes,2).unit;
                    totalResUnit=getNumberWithUnit(data.resourcesLeftInfo.totalRes,2).unit;
                    data.resourcesLeftInfo.totalRes=getNumberWithUnit(data.resourcesLeftInfo.totalRes,2).number;
                    data.resourcesLeftInfo.remainRes=getNumberWithUnit(data.resourcesLeftInfo.remainRes,2).number;
                    break;
            }
        }
        return(
                <div className="tab-list2">
                    <div>
                        <p ref="ref1" className="title2">{data.parentTitle}<span>-</span>{data.secResourcesName}</p>
                        <Progress progress={residueB}/>
                        <div className="progressData">
                            <div className="m-left">剩余&nbsp;{data.resourcesLeftInfo.remainRes}&nbsp;{remainResUnit}</div>
                            <div className="m-right">共&nbsp;{data.resourcesLeftInfo.totalRes}&nbsp;{totalResUnit}</div>
                        </div>
                    </div>
                </div>
        )
    }
}
export default connect(
    (state) => (
    {
        packagesRemain:state.PackagesRemain.packagesRemain || {planRemain:[
            {planName:"4G飞享套餐-158元A套餐",
                planId:"",
                validDate:"20170101",
                resourcesInfo:
                    [
                        {resourcesCode:"01",
                            isMultiTerm:null,
                            secResourcesInfo: [{
                                secResourcesName:"",
                                resourcesLeftInfo: {totalRes:"",usedRes:"",remainRes:"",unit:"",validDate:""}}]
                        },
                        {resourcesCode:"04",
                            isMultiTerm:"1",
                            secResourcesInfo:[
                                {secResourcesName:"4g国内流量",
                                resourcesLeftInfo:{totalRes:"",usedRes:"",remainRes:"0",unit:"KB",validDate:""}
                            },
                                {
                                    secResourcesName: "4g国内流量上月结转流量",
                                    resourcesLeftInfo: {
                                        totalRes: "",
                                        usedRes: "",
                                        remainRes: "",
                                        unit: "KB",
                                        validDate: ""
                                    }
                                }]}
                    ]},
        ]}
    })
)(PackageRemainPage)
// 渲染组件到真实DOM上