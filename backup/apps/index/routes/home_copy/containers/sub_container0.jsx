import React, { Component } from 'react';
import { connect } from 'react-redux';

class SubContainer0 extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        return (
            <div>
                <h1>这里是子容器0，只从store里取 用户信息</h1>
                <div>{JSON.stringify(this.props.userInfo)}</div>
            </div>
        )
    }
}

export default connect(
    (state)=>({
        userInfo: state.Home.userInfo
    })
)(SubContainer0)

