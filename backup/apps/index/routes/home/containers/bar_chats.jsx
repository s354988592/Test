/***
 * @author:jingaier 2017/2/09
 * name:传入一个有值有文本的数组，值可以是图标，如果传入url，则点击可以跳转
 */
import React,{Component} from 'react';
import {render} from 'react-dom';
import { connect } from 'react-redux';
import BarChartH from '../../../components/bar_chart.jsx';
//BarChart数据
let payData = {
    title:'近六个月话费使用情况',
    contect:[
        {x:'16/09',y:'6'},
        {x:'16/10',y:'4'},
        {x:'16/11',y:'7'},
        {x:'16/12',y:'2'},
        {x:'17/01',y:'8'},
        {x:'17/02',y:'16'}
    ],
    unit:'元'
}

class BarCharts extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    shouldComponentUpdate(nextProps,nextState){
        return true;
    }

    render() {
        return (
            <div>
                <BarChartH data={payData}/>
            </div>
        )
    }
}
export default connect()(BarCharts)