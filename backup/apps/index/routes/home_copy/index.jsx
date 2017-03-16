/**
 * Created by Zhanglizhao
 */
// ======================================================
// 示例用户中心
// ======================================================
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
class Home extends Component{
	render(){
		return(
			<div>
				<h1>这是首页</h1>
				<br/>
				<div>当前id为:{this.props.userId}</div>
				<br/>
				<div><Link to="/login">去登录页修改id</Link></div>
				<div className='color'><Link to="/walk">去逛一逛页面</Link></div>
				<div className='color'><Link to="/zzq">已订业务</Link></div>
				<div className='color'><Link to="/paymentRecords">缴费记录</Link></div>
				<div className='color'><Link to="/billquery">账单查询</Link></div>
				<div className='color'><Link to="/phonequery">话费查询</Link></div>
				<div className='color'><Link to="/trafficquery">已用流量查询</Link></div>
				<div className='color'><Link to="/packages_remain">套餐余量查询</Link></div>
			</div>
		)
	}
};

import {userLogin,getUserInfo} from '../../actions/home.jsx';
import {fecthUserInfo} from './services/services.jsx'

import SubContainer0 from './containers/sub_container0.jsx';
import SubContainer1 from './containers/sub_container1.jsx';
import SubContainer2 from './containers/sub_container2.jsx';

const getDefaultProvince = ()=>"北京";
const getRandom = ()=>Math.round(Math.random()*100);
class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin : !!props.userId,
            userInfo:{a:1,b:2},
            provinceId:'北京',
            provinceInfo:{c:3,b:4}
        }
    }

    componentDidMount() {
        //debugger;
        let mockUserId = '13499999999'
        this.props.dispatch(userLogin(mockUserId));
        setInterval(()=>{
            fecthUserInfo(mockUserId).then(
                    res => {
                        //正常这么整
                        //this.props.dispatch(getUserInfo(res.body))
                        alert('不可能');
                    },
                    //失败了模拟家数据
                    err => this.props.dispatch(getUserInfo({a:getRandom(),b:getRandom()}))
            );
        },5000)
    }

    componentWillReceiveProps(nextProps) {
        //console.log(this.state)
        //debugger;
    }
    shouldComponentUpdate(nextProps,nextState){
        //debugger;
        return true;
    }

    render() {
        const uid = this.props.userId;
        const pid = this.props.provinceId;
        const uInfo = JSON.stringify(this.props.userInfo);
        return (
            <div>
                <h1>这是首页</h1>
                <div>{uid}</div>
                <div>{pid}</div>
                <div>{uInfo}</div>
                <br/><br/><div>下面是几个容器组件，这里什么都不传，让其和store联动</div>
                <br/><SubContainer0 />
                <br/><SubContainer1 />
                <br/><SubContainer2 />
            </div>
        )
    }
}
;


export default connect(
    (state) => (
    {
        userId: state.Home.userId,
        provinceId: state.Home.provinceId,
        isLogin:state.Home.isLogin,
        userInfo:state.Home.userInfo
    })
)(HomePage)