import React, {PureComponent} from "react";
import {observer} from "mobx-react/native";
import {TouchableHighlight, Dimensions, Image,WebView,View} from "react-native";
import userStore from "../../../mobx/userStore";
import {Container, Content} from "../../../components/index";
var Geolocation = require('Geolocation');
var watchID=null;




/**
 * 主页
 */
@observer
export default class PositionGain extends PureComponent {

    state = {
        initialPosition: null,
        lastPosition: null,
    };

    componentWillMount(){
        Geolocation.getCurrentPosition(
            initialPosition  =>{
                    this.setState({initialPosition})
                }, error=> {
                        alert(error.message)
                    },

        );

        watchID = Geolocation.watchPosition((lastPosition) => {
            this.setState({lastPosition});
        });

    }
    componentWillUnmount(){
            Geolocation.clearWatch(watchID);
    }


    render() {

        userStore.lastPosition=this.state.lastPosition;





        this.timerOut = setTimeout(function(){
            if(userStore.lastPosition!=null){
                return (
                    <View>
                        <WebView
                            source={{uri:urls.pages.GRT_ADDRESS+'?x='+userStore.lastPosition.coords.longitude+'&y='+userStore.lastPosition.coords.latitude}}
                            onMessage={(event)=>this.openDetailsBox(event.nativeEvent.data)}
                        />
                    </View>
                )
            }else{
                return (
                    <View>
                        {null}
                    </View>
                )
            }

        },1000)

    }


    openDetailsBox(data){


    }

    componentWillUnmount(){
        this.timerOut&&clearTimeout(this.timerOut)
    }

}

