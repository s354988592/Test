import React, { Component } from 'react';
import Layer from 'react-cmos-layer';

export default class Main extends Component{
	getLayerFun(){
		//layer 方法映射
		return {
			alert:(param)=>{this.layer.alert({...param})},
			tips :(param)=>{this.layer.tips({...param})},
			confirm :(param)=>{this.layer.confirm ({...param})},
			bottomConfirm :(param)=>{this.layer.bottomConfirm ({...param})},
			loading:(param)=>{this.layer.loading(param)},
			close:()=>{this.layer.close()},
			page:(param)=>{this.layer.page({...param})}
		}
	}
	//遍历所有子组件
	mapChildren() {
		return React.Children.map(this.props.children, child => {
			return React.cloneElement(child, {
				//把Layer组件的方法赋值给每个子组件，这样每个子组件的props下就有layer属性
				layer: this.getLayerFun()
			})

		})

	}
	render(){
		return(
			<div>
				<Layer ref={(layer)=>(this.layer=layer)}></Layer>
				{this.mapChildren()}
			</div>
		)
	}
};
