import React, { Component } from 'react';
import { connect } from 'react-redux';
import {changeProvince} from '../../../actions/home.jsx';

const provinceArray = ['北京','郑州','贵州','沈阳']

class SubContainer1 extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let i = 0;
        setInterval(()=>{
            //this.props.dispatch(changeProvince(provinceArray[i++%4])); //这两种写法都行
            this.props.changeProvince(provinceArray[i++%4])
        },2000);
    }

    componentWillReceiveProps(nextProps) {
    }

    shouldComponentUpdate(nextProps,nextState){
        return true;
    }

    render() {
        return (
            <div>
                <h1>这里是子容器1，在这里变化省份名。更新其他子页面</h1>
                <div>{this.props.provinceId}</div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
    provinceId: state.Home.provinceId
    })
    ,{changeProvince}
)(SubContainer1)

