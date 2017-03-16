import React, { Component } from 'react';
import { connect } from 'react-redux';
import {changeProvince} from '../../../actions/home.jsx';
import {getCityList} from '../../../actions/home.jsx';
import {fecthCityList} from '../services/services.jsx';
import {SessionStorageTool} from '../../../common/session_storage_Tool.jsx';
// import {NavigatorLocation} from '../../../common/navigator_location.jsx';
import SelectAddress from '../../../components/select_address';
import {HttpServiceHelper} from '../../../common/http_service_helper.jsx';
// import {CkeckoutToken} from '../../../common/checkout_token.jsx';
class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityList: []
        }
        if (!SessionStorageTool.getUserIsExist()) {
            fecthCityList().then(
                    res => {
                        if(res.status=='200'){
                             this.props.dispatch(getCityList(res.result));
                        }else{
                             this.props.layerSelf.alert({content: HttpServiceHelper.getErrorMsg(res.status)})
                        }
                   
                }
            ).catch((err)=> {
                    this.props.layerSelf.alert({content: HttpServiceHelper.getErrorMsg(err.status)})
                });
    }
    }
    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.cityListAction == undefined || nextProps.cityListAction == null) {
            this.setState({
                cityList: this.state.cityList
            })
        } else {
            this.setState({
                cityList: nextProps.cityListAction
            })
        }


    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        return (
            <div>
                <SelectAddress cityList={this.state.cityList} layerSelf={this.props.layerSelf}/>

            </div>
        )
    }
}
export default connect(
    (state) => (
    {
        cityListAction: state.Home.cityListAction
    })
)(HomeHeader)