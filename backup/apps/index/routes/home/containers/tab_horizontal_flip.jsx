/***
 * @author:jingaier 2017/2/09
 * funcNm:tab 和横向翻页
 */
import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import MySlider from '../../../components/tab_slider';
import TabsControl from '../../../components/tab';
class TabSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,//动态传递当前选中的下标
            configCntt: {
                funcCates: [{
                    "clfcNm": "个人业务",
                    "children": [{
                        "funcNm": "话费查询",
                        "funcIconRsId": "01",
                        "funcIconUrl": "http://www.icosky.com/icon/64/Application/isabi/Time%20Machine.png",
                        "funcLinkAddr": "/charges"
                    }]
                }]
            }
        }
    }
    componentDidMount() {

    }
    componentDidUpdate() {
        console.log("test");
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.homeConfsAction == null || nextProps.homeConfsAction == undefined) {
            this.setState({
                configCntt: this.state.configCntt
            })
        } else {
            this.setState({
                configCntt: nextProps.homeConfsAction.configCntt
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
    render() {
        return (
            <div style={{ backgroundColor: '#fff' }}>
                <div className="tabs-tittle-wrap">
                    {this.state.configCntt.funcCates.map((e, i) => (
                        <div onClick={() => { this.setState({ currentIndex: i }) }} key={i}
                            className={i === this.state.currentIndex ? "tabs-tittle tabs-active" : "tabs-tittle"} >
                            {e.clfcNm}
                        </div>)
                    )}
                </div>
                <MySlider data={this.state.configCntt.funcCates[this.state.currentIndex]}
                    key={this.state.currentIndex} />
            </div>
        )
    }
}
export default connect(
    (state) => (
        { homeConfsAction: state.Home.homeConfsAction }
    )
)(TabSlider)