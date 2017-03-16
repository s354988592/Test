/**
 * @author gaoyongtao 2017/02/06
 */
import React,{Component} from 'react';
import {render} from 'react-dom';
import { connect } from 'react-redux';
import "../assets/css/user_info.css";
import {SessionStorageTool} from '../common/session_storage_Tool.jsx';
import {telephoneSubstr} from '../common/telephone_substr';
// 用户信息手机号和省份
// 判断有没有手机号
class UserInfo extends Component{
      constructor(props){
        super(props);
        this.state={
            tel:"",
            belgProvNm:""
        };
    }


    componentDidMount() {
          if(SessionStorageTool.getUserIsExist()){
           this.setState({
            tel:SessionStorageTool.getUserInfo().tel,
            belgProvNm:SessionStorageTool.getUserInfo().belgProvName
        })
        }
    }

    componentWillReceiveProps(nextProps) {
     
    }

    shouldComponentUpdate(nextProps,nextState){
        return true;
    }
 
    render(){

        return(
            <div className="userinfo-container">
                <span className="userinfo-telephone">{telephoneSubstr(this.state.tel)}</span>{/*手机号码*/}
                <span className="userinfo-address">{this.state.belgProvNm}</span>{/*归属地细分至省*/}
            </div>
        );
    }
};
export default connect(
       (state) => (
    {
    })
)(UserInfo);