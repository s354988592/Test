import React,{Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import titlePanel from '../assets/css/titlepanel.less'
//使用该组件的时候,需要一个title属性来确定你要实现的文本内容;一个show属性值为true显示后面能点击的三个点,如果没有这个show属性,则三个能点击的点不显示;link属性为内部跳转,url属性为a标签的跳转第三方跳转地址;
export default class TitlePanel extends React.Component{
    render(){
                 var content1;
                           if(this.props.show=='true'){
                                content1= <Link className='titlepanel-more' to={this.props.link}><Spot/></Link>
                           }else if(this.props.show =='true' &&this.props.url !=''){
                               content1=<a href={this.props.url}><Spot/></a>
                           }else{
                               content1=<span className='titlepanel-more'></span>;
                           }
        return <div className='titlepanel-back'>
                    <span className='titlepanel-title'>{this.props.title}</span>
                    {content1}
               </div>
    }
}
class Spot extends React.Component{
    render(){
        return <div className='titlepanel-spot'>
                    <span></span>
                    <span></span>
                    <span></span>
               </div>
    }
}