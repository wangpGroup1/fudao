import React, {Component} from "react";
import {View, Image, Text,ScrollView,WebView,Dimensions,Platform} from "react-native";
import {Actions} from "react-native-router-flux";

import {observer} from "mobx-react/native";
import {Container, Content} from "../../../components/index";
import { List, ListItem, Left, Body, Right, Thumbnail,Button,Icon,Header} from 'native-base';
import Parabola from 'react-native-smart-parabola'
import CircleProgress from '../../consult/components/CircleProgress'
import activityStore from "../../../mobx/activityStore";
import VideoS from './VideoSolve'
let {width: deviceWidth, height: deviceHeight} = Dimensions.get('window')
let contentTop = Platform.OS == 'ios' ? 64 : 56

/**
 * 活动
 */
@observer
export default class ActivityTop extends Component {
    constructor(props) {
        super(props);
        this.state={
            collect:false,
            isTrigger: false,
            start: {x:0,y:0},
            end: {x:0,y:0},
            filepath:'',
            showScore:false,
        }
        this._startPositions = {}
        this._endPositions = {}


    }

    componentWillMount(){
        activityStore.fetchActivityColumnList()
    }

    _onEnd(){
        this._renderVideo()
        let {videoId}=activityStore;
        request.getJson(urls.apis.ACTIVITY_ADDACTSCORE,{actId:videoId})
        .then((result) => {
            if (result.ok) {
                this.setState({
                    showScore:true
                })

            } else {
                tools.showToast("请求出错！")
            }
        });

    }
    _renderVideo(){
        let {activityColumnList,firstVideo,videoId}=activityStore;
        return(
            <VideoS
                video={firstVideo}
                onEnd={this._onEnd.bind(this)}
            />
        )
    }



    render() {
        let {title,video} = this.props;
        let requ=this.state.collect?require('../image/heart.png'):require('../image/nullheart.png');


        let col=this.state.showScore?'#fff':'#ccc'






        return (


                <View>

                        <View style={{backgroundColor:'#fff',flex:1,height:268}}>
                            <View style={{width:'100%',height:'100%',flexDirection:'row',justifyContent:'center',flex:1,position:'absolute',top:0}}>
                                <View style={{width:402,height:268}}>

                                    <VideoS
                                        video={video}
                                        onEnd={this._onEnd.bind(this)}
                                    />

                                </View>

                            </View>
                            <View style={{padding:10}}>
                                <Text style={{fontSize:26,paddingLeft:20,color:'#000'}}>
                                    3/10
                                </Text>
                            </View>
                            <View  onLayout={this._onLayoutCart1}
                                   style={{width:60,height:60,position:'absolute',top:70,right:10}}>
                                <CircleProgress totalNum={100}
                                                progress={70}
                                                radius={24}
                                                baseWidth={4}
                                                progressWidth={5}
                                >
                                    <Text>70</Text>
                                </CircleProgress>


                            </View>
                            <Button transparent onPress={()=>{this.setState({collect:!this.state.collect, isTrigger: false})}}
                                    style={{width:45,
                                        height:45,
                                        position:'absolute',
                                        top:130,
                                        right:24,
                                        borderRadius:30,
                                        borderColor:'#b5b5b5',
                                        borderWidth:1,
                                        justifyContent:'center',
                                        alignItems:'center'
                                    }}>
                                <Image source={requ} style={{width:22,height:20}}/>
                            </Button>


                        </View>
                        <View style={{width:'100%',flexDirection:'row',justifyContent:'center',marginTop:30}}>
                            <Button disabled={this.state.showScore?false:true}
                                    onLayout={ this._onLayout1.bind(this, 'key-1') }
                                    onPress={this._onPressHandler_1.bind(this, 'key-1')}
                                    touchableType={'blur'}
                                    style={{width:82,height:32,borderRadius:16,backgroundColor:'#726585',justifyContent:'center'}}>
                                <Text style={{color:col}}>完成</Text>
                                {this.state.showScore?(<View style={{position: 'absolute',
                                    width: 20,
                                    height: 20,
                                    borderRadius: 10,
                                    backgroundColor: '#fff',
                                    borderColor:'#817c88',
                                    borderWidth:1,
                                    top:0,
                                    right:0,
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}>
                                    <Text style={{color:'red'}}>+5</Text>
                                </View>):(null)}


                            </Button>

                        </View>

                        <View style={{flexDirection:'row',marginTop:20,marginBottom:20}}>
                            <View style={{width:'26%'}}>
                                <Text style={{textAlign:'right'}}>
                                    原理：
                                </Text>
                            </View>

                            <View style={{width:'66%'}}>
                                <Text style={{lineHeight:20}}>
                                    腰部的拧转，使整个脊柱充分旋转，可增强腰部的肌肉力量。
                                    <Text style={{fontSize:8,color:'#8b6ab3'}}>展开全文∨</Text>
                                </Text>

                            </View>
                        </View>

                    <Parabola
                        isTrigger={this.state.isTrigger}
                        rate={0.9}
                        start={this.state.start}
                        end={this.state.end}
                        renderParabola={this._renderParabola}
                    />



                </View>

        )

    }
    _onLayout1 = (key, e) => {

        let {x, y} = e.nativeEvent.layout
        console.log(`x: ${x}, y: ${y}, dw: ${deviceWidth}, dh: ${deviceHeight}, contentTop: ${contentTop}`)
        this._startPositions[ key ] = {
            start: {
                x: x + 80,
                y: y + 300,
            },

        }
    }
    _onLayoutCart1 = (e) => {
        let {x, y} = e.nativeEvent.layout
        this._endPositions[ 'cart-1' ] = {
            x: x + 16,
            y: y + 35,
        }
    }
    _onPressHandler_1 (key, e) {

        let startPositions = this._startPositions[ key ]

        startPositions.end = this._endPositions[ 'cart-1' ]

        let {start, end} = startPositions


        this.setState({
            showScore:false,
            isTrigger: true,
            start,
            end,
        })
    }
    _renderParabola = ({index, translateX, translateY}) => {

        return (
            <View
                key={`'parabola-ball-'${index}`}
                style={[
                    {position: 'absolute',},    //Don't forget to set this
                    {width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff',borderColor:'#817c88',borderWidth:1},
                    {transform: [{translateX}, {translateY}]},
                ]}
            >
                <Text style={{color:'red'}}>+5</Text>
            </View>

        )
    }


}


const styles = {
    listItem:{backgroundColor:'#fff',marginRight:10,marginLeft:10,marginBottom:10,flex:1},
    leftView:{width:70,height:70,flexDirection:'row',justifyContent:'center'},
    circleView:{width:60,height:60,borderRadius:30,backgroundColor:'#e5e5e5',alignItems:'center',justifyContent:'center'}

};