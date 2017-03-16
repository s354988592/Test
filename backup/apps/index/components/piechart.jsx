/**
 * @author luobangkun 2017/02/06
 */
import React, { Component } from 'react';
import { render } from 'react-dom';
import echarts from 'echarts';
// 饼图组件
class Piechart extends Component {
    componentDidMount() {
        this.makeEchartOption(this.props.data);
    }
    makeEchartOption = (data) => {
        let myChart = echarts.init(this.refs.dataEcharts)
        var data = data.billMaterial;
        var cost1 = Number(data[0].billEntriesValue);
        var cost2 = Number(data[5].billEntriesValue);
        var cost3 = Number(data[4].billEntriesValue);
        var cost4 = Number(data[2].billEntriesValue);
        var cost5 = Number(data[1].billEntriesValue);
        var cost6 = Number(data[6].billEntriesValue);
        var cost7 = Number(data[3].billEntriesValue);
        var sumCost = cost1 + cost2 + cost3 + cost4 + cost5 + cost6 + cost7;
        var percentage1, percentage2, percentage3, percentage4, percentage5, percentage6, percentage7
        if (sumCost == 0) {
            percentage1 = 0;
            percentage2 = 0;
            percentage3 = 0;
            percentage4 = 0;
            percentage5 = 0;
            percentage6 = 0;
            percentage7 = 0;
        } else {
            percentage1 = (cost1 / sumCost * 100).toFixed(0);
            percentage2 = (cost2 / sumCost * 100).toFixed(0);
            percentage3 = (cost3 / sumCost * 100).toFixed(0);
            percentage4 = (cost4 / sumCost * 100).toFixed(0);
            percentage5 = (cost5 / sumCost * 100).toFixed(0);
            percentage6 = (cost6 / sumCost * 100).toFixed(0);
            percentage7 = (cost7 / sumCost * 100).toFixed(0);
        }
        var objectList = new Array();
        function Persion(name, val) {
            if (val == 0) {
                this.name = "";
                this.val = "";
            } else {
                this.name = name;
                this.val = val;
            }
        }
        objectList.push(new Persion('固定费用', percentage1));
        objectList.push(new Persion('代收费', percentage2));
        objectList.push(new Persion('增值业务费', percentage3));
        objectList.push(new Persion('上网费', percentage4));
        objectList.push(new Persion('语音通信费', percentage5));
        objectList.push(new Persion('其他费用', percentage6));
        objectList.push(new Persion('短彩信', percentage7));
        //按val从小到大排序
        objectList.sort(function (a, b) {
            return b.val - a.val
        });
        var fmt = {};
        var arrval=[];
        var arr = [];
        objectList.forEach(function (e) {
            arrval.push(e.val);
            arr.push(e.name)
            fmt[e.name] = e.val
        }
        )

        var data = [
            { value: arrval[0], name: arr[0] },
            { value: arrval[1], name: arr[1] },
            { value: arrval[2], name: arr[2] },
            { value: arrval[3], name: arr[3] },
            { value: arrval[4], name: arr[4] },
            { value: arrval[5], name: arr[5] },
            { value: arrval[6], name: arr[6] }
        ]
        var data1 = [
            { name: arr[0], icon: 'circle', textStyle: { color: '#5c5c5c' } },
            { name: arr[1], icon: 'circle', textStyle: { color: '#5c5c5c' } },
            { name: arr[2], icon: 'circle', textStyle: { color: '#5c5c5c' } },
            { name: arr[3], icon: 'circle', textStyle: { color: '#5c5c5c' } },
            { name: arr[4], icon: 'circle', textStyle: { color: '#5c5c5c' } },
            { name: arr[5], icon: 'circle', textStyle: { color: '#5c5c5c' } },
            { name: arr[6], icon: 'circle', textStyle: { color: '#5c5c5c' } }
        ]

        myChart.setOption({
            legend: {
                orient: 'vertical',
                x: '54%',//图例X轴位置
                y: "center",//图例Y轴位置
                itemHeight: 6.5,
                itemGap: 10,
                textStyle: {
                    color: '#5c5c5c',// 图例文字颜色
                    fontSize: '13'
                },
                selectedMode: false,
                data: data1,
                formatter: function (name) {
                    return name + '  ' + fmt[name] + "%";
                }
            },
            series: [
                {
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '25%'],
                    center: ['25%', '46%'],//圆心位置
                    itemStyle: {
                        normal: {
                            color: '#fff',
                            opacity: 1
                        },
                        emphasis: {
                            color: '#fff',
                            opacity: 1
                        }
                    },
                    avoidLabelOverlap: false,
                    hoverAnimation: false,
                    data: [
                        { value: 0 }
                    ]
                },
                {
                    name: '费用来源',
                    type: 'pie',
                    radius: ['25%', '55%'],//环形內圆半径和外圆半径
                    center: ['25%', '46%'],//圆心位置
                    avoidLabelOverlap: false,
                    hoverAnimation: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                fontSize: '10',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: data
                }
            ],
            color: ['#009FFF', '#F6BE54', '#d62f98', '#434ad9', '#9dca3d', '#dddddd', '#32c6c6']//自定义饼图比例色块颜色
        })
    }
    componentWillReceiveProps(nextProps) {
        //debugger;
        this.makeEchartOption(nextProps.data);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
    render() {
        var widths = document.body.clientWidth;
        return (
            <div ref="dataEcharts" style={{ width: widths * 0.97, height: "19rem" }}></div>
        );
    }
};
export default Piechart;