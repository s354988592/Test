/**
 * @author luobangkun 2017/02/06
 */
import React,{Component} from 'react';
import {render} from 'react-dom';
import echarts from 'echarts';
import {Link} from 'react-router';
import   '../assets/css/fanbar_flow.less';
function prefixInteger(num, n) {
            return (Array(n).join(0) + num).slice(-n);
        }
class Fanbarbill extends Component{
	 componentDidMount(){
         this.makeEchartOption(this.props.data);
    }
    makeEchartOption = (data)=>{
    let myChart = echarts.init(this.refs.dataEcharts)
	var option = {
    series: [ 
        {
            "name": ' ',
            "type": 'pie',
            "radius": ['68%', '76%'],
			center:['47%','50%'],//圆心位置
            "avoidLabelOverlap": false,
            "startAngle": 225,
            "color": ["#3495e4", "transparent"],
            "hoverAnimation": false,
            "legendHoverLink": false,
            "label": {
                "normal": {
                    "show": false,
                    "position": 'center'
                },
                "emphasis": {
                    "show": true,
                    "textStyle": {
                        "fontSize": '10',
                        "fontWeight": 'bold'
                    }
                }
            },
            "labelLine": {
                "normal": {
                    "show": false
                }
            },
            "data": [{
                "value": 75,
                "name": '1'
            }, {
                "value": 25,
                "name": '2'
            }]
        }, 
      {
            "name": '',
            "type": 'pie',
            "radius": ['68%', '76%'],
			center:['47%','50%'],//圆心位置
            "avoidLabelOverlap": false,
            "startAngle": 225,
            "color": ["#fff", "transparent"],
            "hoverAnimation": false,
            "legendHoverLink": false,
            "clockwise": true,
            "itemStyle":{
                "normal":{
                    "borderColor":"transparent",
                    "borderWidth":"20"
                },
                "emphasis":{
                    "borderColor":"transparent",
                    "borderWidth":"20"
                }
            }
            ,
            "z":10,
            "label": {
                "normal": {
                    "show": false,
                    "position": 'center'
                },
                "emphasis": {
                    "show": true,
                    "textStyle": {
                        "fontSize": '30',
                        "fontWeight": 'bold'
                    }
                }
            },
            "labelLine": {
                "normal": {
                    "show": false
                }
            },
            "data": [{
                // "value": (100 - value1) * 266 / 360,
                "name": ''
            }, {
                // "value": 100 - (100 - value1) * 266 / 360,
                "name": ''
            }
            ]
        }

    ]
};

	var timer = setTimeout(function() {
        if(data.remainCnvst=="--" && data.usedCnvst=="--"){
            clearTimeout(timer);
             myChart.setOption(option, true);
        }else{
            var arrhf_residue=Number(data.remainCnvst);
            var arrhf_user=Number(data.usedCnvst);
            var arrhf_all = arrhf_residue+ arrhf_user;
            var s=arrhf_residue/arrhf_all*100;
            var value_ =s * 270 / 360;
            option.series[1].data[0].value = value_;
            option.series[1].data[1].value = 100 - value_;
            myChart.setOption(option, true);
        }
	}, 500);
    }
    componentWillReceiveProps(nextProps) {
        //debugger;
        this.makeEchartOption(nextProps.data);
    }

    shouldComponentUpdate(nextProps,nextState){
        return true;
    }
     render(){
		 var widths=document.body.clientWidth;
		var topp1,topp2,topp3,topp4;
		if(widths<=320){
			topp1=widths*0.11;
			topp2=widths*0.026;
			topp3=widths*0.02;
			topp4=widths*0.031;
		}else if(widths>320&&widths<480){
			topp1=widths*0.11;
			topp2=widths*0.022;
			topp3=widths*0.019;
			topp4=widths*0.05;
		}else if(widths==480){
			topp1=widths*0.12;
			topp2=widths*0.029;
			topp3=widths*0.03;
			topp4=widths*0.055;
		}else if(widths>480&&widths<=736){
			topp1=widths*0.12;
			topp2=widths*0.018;
			topp3=widths*0.018;
			topp4=widths*0.05;
		}else if(widths>736&&widths<=768){
			topp1=widths*0.12;
			topp2=widths*0.018;
			topp3=widths*0.018;
			topp4=widths*0.05;
		}else if(widths>768&&widths<1366){
			topp1=widths*0.12;
			topp2=widths*0.03;
			topp3=widths*0.03;
			topp4=widths*0.06;
		}else if(widths==1366){
			topp1=widths*0.11;
			topp2=widths*0.05;
			topp3=widths*0.05;
			topp4=widths*0.06;
		}
		var data1=this.props.data;
		var i=data1.remainCnvst;
		var residue;
        if(i=="--"){
            residue=i;
            var arrhf_user=data1.usedCnvst;
        }else{
                if(i*1>1000){
                residue= Math.floor(i/1000) + ',' + prefixInteger(i%1000,3)
            }else{
                residue=(i*1).toFixed(2);
            }
            var arrhf_user=(Number(data1.usedCnvst)).toFixed(2);
        }
		var remainCnvstLinkAdder=this.props.data.remainCnvstLinkAdder;
         return(
             <Link to={remainCnvstLinkAdder} className="linkright" style={{width:widths*0.485,height:widths*0.4}}>
			 <div ref="dataEcharts" style={{width:"100%",height:widths*0.4}} className="echartright"></div>
			 <div className="fanbartitle1" style={{height:widths*0.4}}>
			 	<p className="fanbarp11" style={{marginTop:topp1}}>剩余通话</p>
				 <p className="fanbarp22" style={{marginTop:topp2}}>{residue}</p>
			 	<p className="fanbarp33" style={{marginTop:topp3}}>分钟</p>
				 <p className="fanbarp44" style={{marginTop:topp4}}>已用&nbsp;{arrhf_user}&nbsp;分钟</p>
			 </div>
              </Link>
        );
     }
}
export default Fanbarbill;