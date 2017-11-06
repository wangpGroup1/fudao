'use strict';
import React, {Component} from 'react';
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    Vibration,
    View
} from 'react-native';
import Camera from 'react-native-camera';
import {Actions} from "react-native-router-flux";
import {Header,Container} from "../../../components/index";

export default class BadInstagramCloneApp extends Component {

    state = {
        barcode: '',
        cameraType: 'back',
        text: '扫码加好友',
        torchMode: 'off',
        type: '',
    };


    render() {
        return (
            <Container>
                <Header {...this.props}/>
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}
                    onBarCodeRead={(res)=>this.barcodeReceived(res)}
                >
                    {/*<Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>*/}
                </Camera>
                <View style={styles.statusBar}>
                    <Text style={styles.statusBarText}>{this.state.text}</Text>
                </View>
            </Container>
        );
    }

    barcodeReceived(e) {

        if (e.data !== this.state.barcode) {
            Vibration.vibrate();
        } else {
            return;
        }
        var phone = `${e.data}`
        request.getJson(urls.apis.USER_SEARCH, {phone})
            .then(((result) => {

                if (result.ok) {
                    if (result.obj) {
                        this.setState({
                            notExist: false
                        })
                        Actions.userDetail({
                            userId: result.obj.id,
                            from:'sao'
                        });

                    } else {
                        this.setState({
                            notExist: true
                        })
                    }
                }
            }), (error) => {
                //dispatch(hideLoading());
            });

        this.setState({
            barcode: e.data,
            text: `好友手机号：${e.data}`,
            type: e.type,
        });
    }


}


const styles = StyleSheet.create({

    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    container: {
        flex: 1,
    },
    statusBar: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'transparent'
    },
    statusBarText: {
        fontSize: 20,
    },
});
