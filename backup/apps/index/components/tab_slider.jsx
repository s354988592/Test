import React, { Component } from 'react';
import { render } from 'react-dom';
import Slider from 'react-cmos-slider';
import Subservice from './sub_service';

const chunk = (arr, num) => {
  //拆分数组函数，arr单条数组，num每个小数组的长度
  num = num * 1 || 1;
  let ret = [];
  arr.forEach(function (item, i) {
    if (i % num === 0) {
      ret.push([]);
    }
    ret[ret.length - 1].push(item);
  });
  return ret;
};
var width=document.body.clientWidth;
export default class MySlider extends Component {
  constructor(props) {
    super(props);
    this.state={
      transform:"-"+width+"px",
    }
  }
  componentDidMount() {
    setTimeout(()=>this.setState({transform:"0px"}),100);
  }
  render() {
    let source = (this.props.data || {}).children || [];
    let arry = chunk(source, 8);
    let dots, infinite;
    if (arry.length == 1) {
      dots = false;
      infinite = false;
    } else {
      dots = true;
      infinite = true;
    }

    let tabContent={
    opacity: "1",
    transform: "translate3d("+this.state.transform+", 0px, 0px)",
    width:"auto",
    transition: "transform .8s ease"
    }
    return (
        <div style={tabContent}>
            <Slider autoplay={false} infinite={infinite} dots={dots} class="tabSlider">
              {
                arry.map((value, index) => <div key={index} ><Subservice arr={arry[index]}></Subservice></div>)
              }
            </Slider>
      </div>
    );
  }
}
