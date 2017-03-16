import React, { Component } from 'react';
import { connect } from 'react-redux';

class SubContainer2 extends Component {
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
                <h1>SubContainer2</h1>
            </div>
        )
    }
}

export default connect()(SubContainer2)

