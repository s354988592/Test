/**
 * 充值页
 * */
import React, { Component } from 'react';
import Header from '../../components/header';
import './index.less';
class Rechargepage extends Component {
    constructor(props) {
        super(props);
         _cmosq.push(['trackPV', '/bearer_page']);
    }
     changedFrameWidth=()=>{
    var ifm=this.refs.frames;
    var div11=this.refs.div1;
    var div22=this.refs.div2;
    if(document.documentElement.offsetWidth<=320){
        ifm.width=335;
    }else{
        ifm.width=document.documentElement.offsetWidth;
    }
    div11.style.width=document.documentElement.clientWidth;
    div22.style.width=document.documentElement.clientWidth;
     // console.log(ifm);
    // console.log(div11);
    // console.log(div22);
}
    componentDidMount() {
        
         this.props.layer.loading("");
        setTimeout(()=>{
            this.props.layer.close();
        },1000);
             window.onresize=this.changedFrameWidth();

    }

    componentWillReceiveProps(nextProps) {
    }

    shouldComponentUpdate(nextProps,nextState){
        return true;
    }

    render() {
        var widths=document.body.scrollWidth;
        var marginLeft;
        var heights=document.body.scrollHeight;
        // console.log(heights);
        if(widths<=320){
            marginLeft=-1.7;
        }else{
            marginLeft=0;
        }
        let url = this.props.params.url;
        // console.log(url);
        let title = this.props.params.title;
        return (
            <div ref="div1">
                <Header title={title}/>
                <div className="fram" ref="div2">
                <iframe src={url} scrolling="auto" align="center"  ref="frames" style={{height:heights,marginLeft:marginLeft+"%"}}></iframe>
                </div>
            </div>
        )
    }
}

export default Rechargepage ;

