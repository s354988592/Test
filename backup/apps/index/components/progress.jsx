import React,{Component} from 'react';
import {render} from 'react-dom';
import '../assets/css/progress.less';

// 进度条组件 需要传入一个控制进度条多少的数值=得到的剩余量/总量（保留小数点后两位）×100
export default class Progress extends Component{
    constructor(props){
        super(props);
        this.state={
                width:"0%",
        }
    }
    componentDidMount() {
        setTimeout(()=>this.setState({width:this.props.progress+'%'}),100)
    }
    componentWillReceiveProps(nextProps) {
        setTimeout(()=>this.setState({width:this.props.progress+'%'}),100)

    }
    render(){
        var residueBg;//储存背景颜色变量
        var residueB=this.props.progress;//获取控制进度条多少的数值
        var transition='2s width ease';
        if(residueB>50){
            residueBg="#009FFF"
        }else if (20<residueB<=50){
            residueBg="#FF9900";
         }
        if (residueB<=20){
            transition='.5s width ease'
            residueBg="#F7192A"
        }
        residueB=residueB+"%";//加百分号为了控制宽度
        const  style1={
            width:this.state.width,
            backgroundColor:residueBg,
            transition: transition
        };//进度条设置宽度、背景颜色样式
        return(
            <div className="progress">
                <div className="progress-content" style={style1}></div>
            </div>
        )
    }
}