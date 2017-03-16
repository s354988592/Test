import React, { Component } from 'react';
import {Link} from 'react-router';


export default  class IndexPage extends Component {

    render() {
        return (
            <div>
                <h1>临时页面，用来显示目录</h1>
                <br />
                <div className='color'><Link to="/home">首页</Link></div>
                <br/>
                <br/>
                <div className='color'><Link to="/login">登录</Link></div>
                <div className='color'><Link to="/activities">全部活动</Link></div>
                <div className='color'><Link to="/bills">账单查询</Link></div>
                <div className='color'><Link to="/bonus_points">积分查询</Link></div>
                <div className='color'><Link to="/charges">话费查询</Link></div>
                <div className='color'><Link to="/packages/remain">套餐余量查询</Link></div>
                <div className='color'><Link to="/pay_records">缴费记录查询</Link></div>
                <div className='color'><Link to="/plans/already">已订购业务查询</Link></div>
                <div className='color'><Link to="/4g">4G套餐</Link></div>
                <div className='color'><Link to="/recharge_page">充值中心</Link></div>
                <br/>
                <br/>
                <div className='color'><Link to="/zzq">已订业务</Link></div>
                <div className='color'><Link to="/paymentRecords">缴费记录</Link></div>
                <div className='color'><Link to="/billquery">账单查询</Link></div>
                <div className='color'><Link to="/phonequery">话费查询</Link></div>
                <div className='color'><Link to="/trafficquery">已用流量查询</Link></div>
                <div className='color'><Link to="/packages/remain">套餐余量查询</Link></div>

            </div>
        )
    }
}
