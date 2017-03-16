
import React,{Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import "../assets/css/sub_service.less";
// import Slider from 'react-cmos-slider';
import {SessionStorageTool} from  "../common/session_storage_Tool.jsx"

//子业务
export default class Subservice extends Component{
    render(){
          return (
            <div className="subserviceWrap">
                
                <ul className="subservice-subservice">
                    {
                    this.props.arr.map(function(value,index){
                        var url,url1;
                        {/*if (!value.funcLinkAddr.startsWith('/')){
                            url = '/bearer_page/' + value.funcNm +'/'+btoa(value.funcLinkAddr)
                        }else
                            url = value.funcLinkAddr ;*/}
                        if (value.funcLinkAddr.startsWith('/')){
                            //debugger;
                            url = value.funcLinkAddr;
                        }else{
                             let params = '?accessToken=' + encodeURIComponent(SessionStorageTool.getUserAccessToken());
                             url1 = value.funcLinkAddr + params;
                             {/*console.log(url1);*/}
                        }
                           
                        return  <Link to={url} href={url1} key={index}  id={value.funcIconRsId} className="subservice-container">
                                    <li className="subservice-business ">
                                        <div className="subservice-bsi-icon-container"><img src={value.funcIconUrl} className="subservice-bsi-icon"></img></div>
                                        <div className="subservice-a" >{value.funcNm}</div>
                                    </li>
                                </Link>
                        })
                    }
                </ul>
            </div>
        )
    }
}