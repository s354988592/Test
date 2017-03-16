/***
 * @author:jingaier 2017/2/10
 * name:tips 小喇叭，推广
 */
import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import Tips from '../../../components/tips';
class Tip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommend: {
                "title": "热门活动",
                "iconUrl": "http://192.168.100.163:29090/image/hotTitleIcon.png",
                "children": [
                    {
                        "actvTitleNm": "4g活动",
                        "subTitleNm": "----",
                        "actvPicRsid": "----",
                        "actvPicUrl": "--",
                        "actvConnAddr": "--"
                    }
                ]
            },
        }
    }
    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.homeConfsAction == null || nextProps.homeConfsAction == undefined) {
            this.setState({
                recommend: this.state.recommend
            })
        } else {
            this.setState({
                recommend: nextProps.homeConfsAction.configCntt.recommend
            })
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        return (
            <div>
                <Tips data={this.state.recommend} />
            </div>
        )
    }
}
export default connect(
    (state) => (
        { homeConfsAction: state.Home.homeConfsAction }
    )
)(Tip)