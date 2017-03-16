import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import '../assets/css/bottom-button.less';

// button按钮组件 需要传入一个内容content  一个点击的url url
export default class Button extends Component {
    render() {
        let url1;
        // console.log(this.props.url);
        if (!this.props.url.startsWith('/')) {
            url1 = '/bearer_page/' + this.props.content + '/' + encodeURIComponent(this.props.url)
        } else {
            url1 = this.props.url;
        }
        // console.log(111)
        // console.log(encodeURIComponent(encodeURIComponent(this.props.url)));
        // console.log(333)
        // console.log(encodeURIComponent(this.props.url));
        //  url = '/bearer_page/' + this.props.content +'/'+btoa(this.props.url)

        return (
            <Link to={url1}>
                <div className="bottomButton">{this.props.content}</div>
            </Link>
        )
    }
}