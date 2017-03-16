import React, { Component } from 'react';
import {Link} from 'react-router';

class BtnClickOutputCmp extends Component {
    render() {
        return (
            <div>
                <button onClick={this.props.clickAction} >对外开放事件</button>
            </div>
        )
    }
}
class BtnClickInputCmp extends Component {
    constructor(props) {
        super(props);
        this.state = {text:'这个是组件内的内容'};
    }
    render() {
        return (
            <div>
                <button onClick={this.props.clickAction.bind(this)} >内部函数事件</button>
            </div>
        )
    }
}

export default class Walk2 extends Component {
    constructor(props) {
        super(props);
        this.state = {text:'这个是组件外的内容'};
    }
    render() {
        return (
            <div>
                <br/>
                <br/>
                <BtnClickOutputCmp clickAction={()=>{alert(this.state.text)}}/>
                <br/>
                <br/>
                <BtnClickInputCmp clickAction={function(){alert(this.state.text)}}/>
            </div>
        )
    }
};


