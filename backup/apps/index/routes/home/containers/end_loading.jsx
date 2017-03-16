import React, { Component } from 'react';
const endLoadingStyle ={
    height: '4.17rem',
    lineHeight: '7rem',
    width: '100%',
    textAlign:'center',
    fontSize:'1.2rem',
    margin:'0',
    padding:'0'
}
class EndLoading extends Component {
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
        return (
            <div style={endLoadingStyle}>
                    已经到底啦
            </div>
        )
    }
}
export default EndLoading

