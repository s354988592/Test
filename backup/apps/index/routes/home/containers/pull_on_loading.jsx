import React, { Component } from 'react';
import { connect } from 'react-redux';
import "../css/pull_on_loading.less"
class PullOnLoading extends Component {
    constructor(props) {
        super(props); 
        this.state={
            defaultStyle:'pull-on-loading'
        }    
    }
    componentDidMount() {  
         window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    
    componentWillReceiveProps(nextProps) {
         
    }
    shouldComponentUpdate(nextProps,nextState){
        return true;
    }
    handleScroll = (e) => {
        if(window.pageYOffset>40 ) {
             this.state.defaultStyle.indexOf('pull-on-loading-none') == -1 && this.setState({
                defaultStyle: 'pull-on-loading pull-on-loading-none'
            })
        } else {
            this.state.defaultStyle.indexOf('pull-on-loading-none') >= 0 && this.setState({
                defaultStyle:'pull-on-loading'
            })
        }
    }

    render() {
        return (
            <div className={this.state.defaultStyle}>
                <div className="pull-on-loading-content">上拉发现更多</div>
            </div>
        )
    }
}
export default connect(

)(PullOnLoading)