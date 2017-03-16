/***
 * @author:jingaier 2017/2/06
 * name:传入一个有值有文本的数组，值可以是图标，如果传入url，则点击可以跳转
 */
import React,{Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import txt_arry from '../assets/css/txt_arry.less'
//const shareBg1 = require('file!../img/logo.png');
export default class TxtArry extends Component{ 
    
    render(){
    //数据处理，千位符分割；
    let Data = this.props.data;
    // console.log(Data);
    let transform=(obj)=>{
        let arr = [];
        for(var item in obj){
            arr.push('{'+item+":"+obj[item]+'}');
        }
        return arr;
    }
    //console.log(transform(Data));
    let reseve = this.props.reseve || false;
    let border = this.props.border || false;
    var priceArr = [];
    for(let i=0 ;i<Data.length;i++){
        //console.log(Data[i].price);
        if(Data[i].price){
            priceArr.push(Data[i].price);//得到得想要得数据，转为数组
        }
    }
   //console.log(priceArr)
   for(let i=0 ;i<priceArr.length;i++){
        //console.log(priceArr[i]);
        if( parseInt(priceArr[i])>=1000){//大于千位得
             if(priceArr[i].indexOf('.') != -1){//如果有小数，进行分割，转化为千位符之后在拼接小数
                 priceArr[i]=parseInt(priceArr[i]).toLocaleString()+'.'+priceArr[i].substring(priceArr[i].indexOf('.')+1);//千位分隔符  
             }else{
                priceArr[i]=parseInt(priceArr[i]).toLocaleString();//千位分隔符 
             }              
        }else{priceArr[i]}
            Data[i].price =[];
            Data[i].price.push(priceArr[i]); //处理好的数据把原来得数据给覆盖；  
   }
   let txtArryDiv =  border?{width:(100/Data.length)+"%"}:{width:(100/Data.length)+"%",borderRight:'0'} 
        return(
            <div className="txtArryWrap" ref="txtArryWrap" >
                <div className="txtArry">
                    {
                        Data.map(function(data,index){
                                return <div className="txtArryDiv" key={index} style={txtArryDiv}><TxtDiv key={index} data={data} reseve={reseve}/></div>
                        })
                    }  
                </div>              
            </div>
        );
    }
};

class TxtDiv extends Component{
    render(){
        // console.log(this.refs.changesize);
        let Data = this.props.data;
        let reseve = this.props.reseve || false;
        if(typeof Data.unit =='undefined'){
              Data.unit=''  
        }
        if(reseve){
             return (
                <div className="txtArryA" >
                    {/*<Link to={Data.lin}  href={Data.lin}>   */}
                        <span className="Span3">{Data.name}</span>
                        <span className="Span4">{Data.price}&nbsp;<i>{Data.unit}</i></span>
                    {/*</Link> */}
                </div>            
            )
        }else{
            if(typeof Data.price !='undefined'){
               if(Data.price[0].length>=9){
                   // console.log(this.refs.changesize.style);
                   this.refs.changesize.style.fontSize = '1.4rem';
               }
                return (
                        <div className="txtArryA" >
                            <Link to={Data.lin}  href={Data.lin}>   
                                <span className="Span1" ref='changesize'>{Data.price}</span>
                                <span className="Span2">{Data.name}<span>{Data.unit}</span></span>
                            </Link> 
                        </div>            
                    )
            }else{
                return (
                    <div className="txtArryA" > 
                        <Link to={Data.lin}  href={Data.lin}>
                            <span className="Span1"><span className="SpanImg"><img src={Data.src} alt=""/></span></span>
                            <span className="Span2">{Data.name}<span>{Data.unit}</span></span>                   
                        </Link> 
                    </div>            
                )
            }
        }
        
    } 
};

