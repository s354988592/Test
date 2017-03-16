import React,{Component} from 'react';
import {render} from 'react-dom';

import ActivityList from '../../../components/activity_list'
import ActivityList2 from '../../../components/activity_list_2'
import ActivityList3 from '../../../components/activity_list_3'
import ActivityList5 from '../../../components/activity_list_5'
import  '../css/activity_list_module.less'
import Titlepanel from "../../../components/titlepanel"
import {connect} from "react-redux"
// import Fetch from 'react-cmos-fetch';
// 活动列表

 function judge(obj){
    　　for(var i in obj){//如果不为空，则会执行到这一步，返回true
         　　　　return true;
         　　}
    　　 return false;
     }
 class ActivityListModule extends Component{
    constructor(props){
        super(props);
        this.state={
            configCntt:{
             templates: [{
                 template: {
                     title: "最新热门活动",
                     code: "temp1",
                     link: "xxxx",
                     children: [
                         {
                             actvTitleNm: "4g活动",
                             subTitleNm: "--",
                             actvPicRsid: "--",
                             actvPicUrl: "http://192.168.100.163:29090/image/guizhoumaotai_200x200.png",
                             actvConnAddr: "http://211.138.24.191:20913/busimall/release/module/index.html?shopId=201701041035036138656559&share=01"
                         },
                         {
                             actvTitleNm: "4g活动",
                             subTitleNm: "--",
                             actvPicRsid: "--",
                             actvPicUrl: "http://192.168.100.163:29090/image/guizhoulong_110x110.png",
                             actvConnAddr: "http://211.138.24.191:20913/busimall/release/module/index.html?shopId=201701031633330708648897&share=01"
                         },
                         {
                             actvTitleNm: "4g活动",
                             subTitleNm: "--",
                             actvPicRsid: "--",
                             actvPicUrl: "http://192.168.100.163:29090/image/guizhoulong_110x110.png",
                             actvConnAddr: "http://211.138.24.191:20913/busimall/release/module/index.html?shopId=201701031633330708648897&share=01"
                         }
                     ]
                 }
             }
             ]
            }
        }
    }
     componentDidMount() {

     }
     componentWillReceiveProps(nextProps) {
         if(nextProps.homeConfsAction==null || nextProps.homeConfsAction==undefined){
            this.setState({
            configCntt: this.state.configCntt
            // configCntt:JSON.parse(nextProps.homeConfsAction.configCntt)
        })
         }else{
              this.setState({
            configCntt: nextProps.homeConfsAction.configCntt
            // configCntt:JSON.parse(nextProps.homeConfsAction.configCntt)
        })
         }
      
    }
    shouldComponentUpdate(nextProps,nextState){
        return true;
    }
    render() {
       var arr={
                 template: {
                     title: "最新热门活动",
                     code: "temp1",
                     link: "",
                     children: [
                         {
                             actvTitleNm: "4g活动",
                             subTitleNm: "--",
                             actvPicRsid: "--",
                             actvPicUrl: "http://192.168.100.163:29090/image/guizhoumaotai_200x200.png",
                             actvConnAddr: "http://211.138.24.191:20913/busimall/release/module/index.html?shopId=201701041035036138656559&share=01"
                         },
                         {
                             actvTitleNm: "4g活动",
                             subTitleNm: "--",
                             actvPicRsid: "--",
                             actvPicUrl: "http://192.168.100.163:29090/image/guizhoulong_110x110.png",
                             actvConnAddr: "http://211.138.24.191:20913/busimall/release/module/index.html?shopId=201701031633330708648897&share=01"
                         },
                         {
                             actvTitleNm: "4g活动",
                             subTitleNm: "--",
                             actvPicRsid: "--",
                             actvPicUrl: "http://192.168.100.163:29090/image/guizhoulong_110x110.png",
                             actvConnAddr: "http://211.138.24.191:20913/busimall/release/module/index.html?shopId=201701031633330708648897&share=01"
                         }
                     ]
                 }
             }
        // console.log(this.state.configCntt.templates)
        return(
            <div>
                {
                    this.state.configCntt.templates.map((data, index)=> {
                        return (
                            <div className="activity-list" key={index}>
                                <Titlepanel title={data.template.title} link="/activities" show="true"/>

                                <div className="activity-list-content">
                                    <ActivityDispatch data={data}/>
                                </div>
                            </div>
                        )

                    })
                }
                
            </div>
        )
    }

}
// 活动列表模板1
class ActivityDispatch extends Component {
    render() {
        let data = this.props.data;
        switch (data.template.code) {
            case "temp1":
                return ( <Activity data={data}/> )
            case "temp2":
                return ( <Activity2 data={data}/> )
            case "temp3":
                return ( <Activity3 data={data}/> )
            case "temp4":
                return ( <Activity4 data={data}/> )
            case "temp5":
                return ( <Activity5 data={data}/> )
        }
    }
}


// 活动列表模板1
class Activity extends Component{
    render(){
        var arr=this.props.data;
        return(
            <div className="activity-list1-content clearfix">
                <div className="activity-list1-left">
                    <ActivityList data={arr.template.children[0]} />
                </div>
                <div  className="activity-list1-right">
                    <div className="activity-list1-list">
                        <ActivityList2 data={arr.template.children[1]} />
                    </div>
                    <div className="activity-list1-list no-border">
                        <ActivityList2 data={arr.template.children[2]} />
                    </div>
                </div>
            </div>
        )
    }
}
// 活动列表模板2
class Activity2 extends Component{
    render(){
        var arr=this.props.data;
        return(
            <div className="activity-list2-content clearfix">
                <div className="activity-list2-left">
                    <div className="activity-list2-left-top">
                        <ActivityList3 data={arr.template.children[0]} />
                    </div>
                    <div className="activity-list2-left-top no-border">
                        <ActivityList3 data={arr.template.children[1]}/>
                    </div>
                </div>
                <div className="activity-list2-right"style={{}}>
                    <ActivityList data={arr.template.children[2]} />
                </div>
            </div>
        )
    }
}
// 活动列表模板3
class Activity3 extends Component{
    render(){
        var arr=this.props.data;
        return(
            <div className="activity-list3-content clearfix">
                {
                    arr.template.children.map((data,index)=> {
                    var noborder;
                    if (index == 2) {
                        noborder = 'none'
                    }
                    if (index <= 2) {
                        return (
                            <div className="activity-list3-list" style={{borderRight: noborder}} key={index}>
                                <ActivityList5 data={data}/>
                            </div>
                        )
                    }
                })
            }
            </div>
        )
    }
}
// 活动列表模板4
class Activity4 extends Component{
    render(){
        var arr=this.props.data;
        return(
            <div className="activity-list4-content clearfix">{
                arr.template.children.map((data,index)=>{
                    var onborder;
                    if(index==2 || index==3){
                        onborder = 'none'
                    }
                    if (index <= 3) {
                        return(
                            <div className="activity-list4-list" style={{borderBottom: onborder}}  key={index}>
                                <ActivityList3 data={data} />
                            </div>
                        )
                    }

                })
            }
            </div>
        )
    }
}
// 活动列表模板5
class Activity5 extends Component{
    render(){
        var arr=this.props.data;
        return(
            <div className="activity-list5-content clearfix">{
                arr.template.children.map((data,index)=>{
                    if (index <= 3) {
                        return(
                            <div className="activity-list5-list"  key={index}>
                                <ActivityList3 data={data} />
                            </div>
                        )
                    }

                })
            }
            </div>
        )
    }
}

export default connect(
    (state) => (
    {
        homeConfsAction: state.Home.homeConfsAction
    })
)(ActivityListModule)

