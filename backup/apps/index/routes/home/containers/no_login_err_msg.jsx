import React, { Component } from 'react';
import Fanbarfb from './fan_bars';
import TextArry from './text_arry';
import {SessionStorageTool} from '../../../common/session_storage_Tool.jsx';
const noMessageStyle ={
    width: '100%',
    height: '10rem',
    lineHeight: '10rem',
    textAlign: 'center',
    fontSize: '1.8rem',
    color: '#666'
}
class NoLoginMessage extends Component {
    constructor(props) {
        super(props);     
    }
    componentDidMount() {  
    }

    componentWillReceiveProps(nextProps) {
    }

    shouldComponentUpdate(nextProps,nextState){
        return true;
    }
 

    render() {
        var widths=document.body.clientWidth;
        return (
            <div>
                {
                  SessionStorageTool.getUserIsExist() == true ? <div>
                        <Fanbarfb layerSelf={this.props.layer}/>
                        <TextArry/>
                        </div>
                    : <div className="noshowbf" style={{height:widths*0.54}}></div>
                }
               
                <div style={noMessageStyle}>该省份暂未开放、敬请期待</div>    
            </div>
        )
    }
}
export default NoLoginMessage

