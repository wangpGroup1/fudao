/**
 * Created by Administrator on 2017/3/9.
 */

import React, {PureComponent} from "react";
import {Actions} from "react-native-router-flux";
import {Thumbnail, Text} from "native-base";
import {View, Image, TouchableOpacity, TouchableHighlight, ToastAndroid, DatePickerAndroid,Dimensions,Modal} from "react-native";

var width=Dimensions.get('window').width;
var height=Dimensions.get('window').height;
/**
 * 女生选择
 */


export default  class WomanChoose extends PureComponent {
    constructor(props) {
        super(props);
        this.state={
            show: false,
            jieduan1:''
        }
    }
    render() {
        return (
            <Modal
                transparent
                visible={this.state.show}
                onRequestClose={() => {}}
            >
                    <View style={styles.bigBox}>
                        <View style={styles.box}>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={this.choose.bind(this,'未孕阶段')}>
                                <View style={styles.photo}>
                                    <View  style={styles.left} >
                                        <Thumbnail style={styles.touxiang} size={80} source={require('../assets/w.png')}/>
                                    </View>
                                    <Text>未孕阶段</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={this.choose.bind(this,'已育阶段')}>
                                <View style={styles.photo}>
                                    <View  style={styles.left} >
                                        <Thumbnail style={styles.touxiang} size={80} source={require('../assets/w.png')}/>
                                    </View>
                                    <Text>已育阶段</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={this.choose.bind(this,'未产阶段')}>
                                <View style={styles.photo}>
                                    <View  style={styles.left} >
                                        <Thumbnail style={styles.touxiang} size={80} source={require('../assets/w.png')}/>
                                    </View>
                                    <Text>未产阶段</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={this.choose.bind(this,'待产阶段')}>
                                <View  style={styles.photo}>
                                    <View  style={styles.left} >
                                        <Thumbnail style={styles.touxiang} size={80} source={require('../assets/w.png')}/>
                                    </View>
                                    <Text>待产阶段</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={this.choose.bind(this,'已产阶段')}>
                                <View  style={styles.photo}>
                                    <View  style={styles.left} >
                                        <Thumbnail style={styles.touxiang} size={80} source={require('../assets/w.png')}/>
                                    </View>
                                    <Text>已产阶段</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
        )
    }
    choose(text){
        this.setState({
            show: false,
        })
        this.props.onPress(text)
    }
    show() {
        this.setState({
            show: true,
        })
    }
}

const styles = {
    bigBox:{
        width:width,
        height:height,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.5)',
    },
    box:{
        backgroundColor:'#fff',
        width:width*0.8,
        height:height*0.8,
        paddingLeft:30,
        borderRadius:10
    },
    photo:{
        height:100,
        flexDirection:'row',
        alignItems:'center'

    },
    left:{
      width:100,
    },
    touxiang:{
        width:80,
        height:80,
        borderRadius:40,
    },
};


