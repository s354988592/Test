/***
 * @author:jingaier 2017/2/06
 * name:柱状图组件
 * config:使用传数据只需传标题，单位，X，Y轴得值；
 * 例如：let paydata = {
    title:'近六个月话费使用情况',
    contect:[
        {x:'16/09',y:'6'},
        {x:'16/10',y:'4'},
        {x:'16/11',y:'7'},
        {x:'16/12',y:'2'},
        {x:'17/01',y:'8'},
        {x:'17/02',y:'16'}
    ],
    unit:'元'
}
*如要改变配置，按图文提示即可
 */
import React,{Component} from 'react';
import {render} from 'react-dom';
import echarts from 'echarts';
export default class BarChartH extends Component {
       
     componentDidMount(){
         var barChart = echarts.init(this.refs.contChart);     
         var data = this.props.data;  //从父组件获得data值 
        // console.log(data.contect);
         var  Xaxis=[];
         var Series =[];
         data.contect.map(function(item,index){//把X轴，Y轴 数据分别push进相应得数组中
             // console.log(item.x);
                Xaxis.push(item.x);
                Series.push(item.y);
                return [Xaxis,Series];
         })
         barChart.setOption({
            color:['#b2e2ff'],//修改柱形颜色
            title: { 
                text: data.title,//标题
                backgroundColor:'#fff',//标题背景
                textStyle:{//标题属性
                    fontSize:18,
                    color:'#3398DB'                   
                },
                x:'center'//设置标题位置
            },  
            backgroundColor:'#fff',//设置背景颜色
            xAxis:[ 
                
                {
                    axisTick: {//x轴刻度线配置
                    show: false,
                    lineStyle:{
                        color:'0',
                        length:0
                    }
                },
                data: Xaxis,
                axisLine: {//设置X轴颜色
                    show:false,
                    lineStyle: {
                        color: 0
                    }
                },
                axisLabel:{ //调整X轴的lable
                   interval:0,//x轴信息全部显示                  
                    textStyle:{
                        color:"#999999", //刻度颜色
                        fontSize:12// X轴字体大小
                    }
                }
            }],
            yAxis: [
                {
                type : 'value', 
                axisTick: {//去掉Y轴刻度线
                    show: false
                },
                splitLine : {//背景分割线配置
                    show:false,
                    lineStyle: {
                        color: '#483d8b',
                        type: 'dashed',
                        width: 1

                    }

                },
                axisLine: {//设置Y轴颜色
                    show:false,
                    lineStyle: {
                        color: 0
                    }
                },
                axisLabel:{ //调整y轴的lable
                    show:false,
                    textStyle:{
                        color:"#999999", //刻度颜色
                        fontSize:20// Y轴字体大小
                    },
                    formatter : '{value}' 
                }
            }],
            series: [{
                name: '用量',
                type: 'bar',
                data:Series,
                barWidth : "36rem",//控制柱状的宽度
                itemStyle:{
                    emphasis:{
                       color:'#009fff',//点击之后柱子变色
                       label : {//数据显示在柱形顶部  
                            show : true,
                            position : 'top',
                            formatter : '{c}'+data.unit,//{a}是name {b}是x轴得量 
                            textStyle:{
                                color:'#009fff',// 修改柱状顶部数据颜色   
                                fontSize:12// 修改柱状顶部数据字体大小    
                            }
                        }            
                    }
                }
            }]
            
        });
        //默认最近一个月高亮
        barChart.dispatchAction({
            type: 'highlight',
            seriesIndex:0,
            dataIndex:Xaxis.length-1
        })
        //点击之后变化
         barChart.on('click', (e)=>{
             if(e.dataIndex !=Xaxis.length-1){
                 barChart.dispatchAction({
                     type: 'downplay',//取消高亮
                     seriesIndex:0,
                     dataIndex:Xaxis.length-1
                 });
             }
         });
    }
    render() {      
        return (
            <div id="contChart" ref="contChart" style={{width:"100%",height:"40vh"}}></div>
        )
    }
};