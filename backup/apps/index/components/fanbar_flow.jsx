/**
 * @author luobangkun 2017/02/06
 */
import React,{Component} from 'react';
import {render} from 'react-dom';
import echarts from 'echarts';
import {Link} from 'react-router';
import   '../assets/css/fanbar_flow.less';
function getNumberWithUnit(number, dot) {
    let unitArray = ['TB', 'GB', 'MB', 'KB'];
    let i = unitArray.length-1;
    function formatFloat(src, pos) {
        return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
    }
    return {
        number:(function privateCalculate(n) {
                if (n > 1024) {
                    i--;
                    return privateCalculate(formatFloat(n/1024,dot));
                } else {
                    return n;
                }
            })(number),
        unit:unitArray[i]
    };
}
function prefixInteger(num, n) {
            return (Array(n).join(0) + num).slice(-n);
        }
class Fanbarflow extends Component{
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
			"center":['53%','50%'],//圆心位置
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
			"center":['53%','50%'],//圆心位置
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
        if(data.remainMbdt=="--"&&data.usedMbdt=="--"){
                clearTimeout(timer);
                myChart.setOption(option, true);
        }else{
            var arrll_residue=Number(data.remainMbdt);
            var arrll_user=Number(data.usedMbdt);
            var arrll_all = arrll_residue+ arrll_user;
            var s=arrll_residue/arrll_all*100;
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
		 var widths=document.documentElement.clientWidth;
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
		var i=data1.remainMbdt;
        var i1=data1.usedMbdt;
        var residue;
        var switching_unit;
        var arrll_user;
        var switching_unit1
        if(i=="--"&&i1=="--"){
            residue=i;
            switching_unit="MB";
            arrll_user=i1;
            switching_unit1="MB";
        }else{
             residue=(getNumberWithUnit(i,2).number*1).toFixed(2);
		    switching_unit=getNumberWithUnit(i,2).unit;
            arrll_user=(getNumberWithUnit(i1,2).number*1).toFixed(2);
            switching_unit1=getNumberWithUnit(i1,2).unit;
        }
        // var i=1060045600;
        // var i1=1200000;
        var remainMbdtLinkAddr=this.props.data.remainMbdtLinkAddr;
         return(
             <Link to={remainMbdtLinkAddr} className="linkleft" style={{width:widths*0.485,height:widths*0.4}}>
			 <div ref="dataEcharts" style={{width:"100%",height:widths*0.4}} className="echartleft"></div>
			 <div className="fanbartitle" style={{height:widths*0.4}}>
			 	<p className="fanbarp1" style={{marginTop:topp1}}>剩余流量</p>
				 <p className="fanbarp2" style={{marginTop:topp2}}>{residue}</p>
			 	<p className="fanbarp3" style={{marginTop:topp3}}>{switching_unit}</p>
				 <p className="fanbarp4" style={{marginTop:topp4}}>已用&nbsp;{arrll_user}&nbsp;{switching_unit1}</p>
			 </div>
              </Link>
        );
     }
}
export default Fanbarflow;
