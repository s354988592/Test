/***
 * @author:luobangkun 2017/2/09
 * name:传入一个有值有文本的数组，值可以是图标，如果传入url，则点击可以跳转
 */
import React,{Component} from 'react';
import {render} from 'react-dom';
import { connect } from 'react-redux';
import Logindisplay from '../../../components/login_display.jsx';
class Loggedstate extends Component {
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
                <Logindisplay/>
            </div>
        )
    }
}
export default connect()(Loggedstate)