import React,{Component} from 'react';
 import {render} from 'react-dom';
 import Tab from 'react-cmos-tab';
 import "../assets/css/tab.less";
export default class TabsControl extends React.Component{
    // 设置tab导航的name，以及container,container可以是组件
    constructor(props){
        super(props);
        this.state={ 
            currentIndex : this.props.defaultIndex//动态传递当前选中的下标
        };
    }

    check_tittle_index(index){
        return index===this.state.currentIndex ? "tabs-tittle tabs-active" : "tabs-tittle";
    }

    check_item_index(index){
        return index===this.state.currentIndex ? "tabs-tab-item tabs-show" : "tabs-tab-item";
    }

    render(){
        let _this=this;
        return(
            <div>
                {/*动态生成Tab导航*/}
                <div className="tabs-tittle-wrap">
                    { React.Children.map( this.props.children , (element,index) => {
                        return(
                            /*箭头函数没有自己的this，这里的this继承自外围作用域，即组件本身*/
                            <div onClick={ () => { this.setState({currentIndex : index}) } } className={ this.check_tittle_index(index) }>{ element.props.name }</div>
                            );
                    }) }
                </div>
                {/*Tab内容区域*/}
                <div className="tabs-item-wrap">
                    {React.Children.map(this.props.children,(element,index)=>{
                        return(
                            <div className={ this.check_item_index(index) }>{element.props.container}</div>
                            );
                    })}
                </div>
            </div>
            );
    }
}