/***
 * @author:jingaier 2017/2/10
 * name:小喇叭，打广告
 */
import React,{Component} from 'react';
import {render} from 'react-dom';
import '../assets/css/tips.less';
import Slider from 'react-cmos-slider'

export default class Tips extends Component{ 
       componentDidMount(){
       }

    render(){
        let Data = this.props.data
        // console.log(Data.iconUrl)
        const settings = {
            dots: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            vertical: true,
            beforeChange: function (currentSlide, nextSlide) {
                // console.log('before change', currentSlide, nextSlide);
            },
            afterChange: function (currentSlide) {
                // console.log('after change', currentSlide);
            },
        };
        return(
            <div className="tipsWrap">
                {/*<div className="hotTitle">{Data.title}</div>*/}
                <div className="hotTitleIcon"><img src={Data.iconUrl} alt=""/></div>
                <Slider {...settings}>
                   {
                 Data.children.map((params,index)=>{
                     
                    return <a className="hotContext" key={index} href={params.actvConnAddr}>
                                <span><b>【</b>{params.actvTitleNm}<b>】</b></span>
                                <span>{params.subTitleNm}</span>
                            </a>
                    })
                    }
                </Slider>
            </div>
        )
    }
}