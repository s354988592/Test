/**
 * @author luobangkun 2017/02/08
 */
import React,{Component} from 'react';
import {render} from 'react-dom';
import   '../assets/css/pulldown.less';
// 下拉组件
class Pulldown extends Component{
render(){
    var data = this.props.data.billMaterial;
    return (
        <div>
        <Details data={data}/>
        </div>
    )
}
};
class Details extends Component{
    render(){
        var array=this.props.data;
        
        return(
            <div className="zdcxBill_details">
                <ul>
                    {
                        array.map((arr,index)=>{
                            return <List data={arr} key={index} i={index}/>
                        })
                    }    
                </ul>
            </div>
        )
    }
}
class List extends Component{
    constructor(){
        super();
        this.state={
            showList:false,
            defaultState:false
        };
    }
    clickShow(e){
        this.setState({
            showList:!this.state.showList,
            defaultState:!this.state.defaultState
        })
    }
    render(){
        var data=this.props.data;
        var contentShow;

        if(this.state.showList==true && data.thirdBillMaterialInfo!=undefined){
            contentShow=<Listshow data={data}/>
        }
        if(data.thirdBillMaterialInfo!=undefined){
             return(
            <li>
                <div className={this.state.defaultState == false ? "zdcxCost_data1":"zdcxCost_data1_no"}>
                    <div className="zdcxData_left">
                        <p>{data.billEntries}</p>
                        <p>{data.billEntriesValue}
                        <span>&nbsp;&nbsp;元</span>
                        </p>
                    </div>
                    <div  
                    className={this.state.defaultState == false ? "zdcxData_right_pulldown":"zdcxData_right_updown"}
                    onClick={this.clickShow.bind(this)} ref="arrow"></div>
                </div>
                {contentShow}
            </li>
        )
        }else{
             return(
            <li>
                <div className="zdcxCost_data1">
                    <div className="zdcxData_left">
                        <p>{data.billEntries}</p>
                        <p>{data.billEntriesValue}
                        <span>&nbsp;&nbsp;元</span>
                        </p>
                    </div>
                </div>
                {contentShow}
            </li>
        )
        }
    }
}
// 点击“展开”图标，则展开该科目的详细数据
class Listshow extends Component{
    render(){
        var data=this.props.data.thirdBillMaterialInfo;
        return(
        <div className="zdcxList1">
            {
                data.map(function(arr,index){
                return <div key={index}>
                        <p>{arr.thirdItemsName}</p>
                        <p>{arr.thirdItemsValue}
                        <span>&nbsp;元</span>
                        </p>
                    </div>
            })
        }     
            </div>
    )
    }  
}
export default Pulldown;