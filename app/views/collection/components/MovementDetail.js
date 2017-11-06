import React, {Component} from "react";
import {View, Image, Text, ScrollView, WebView, Dimensions, Platform,TouchableOpacity} from "react-native";
import {Actions} from "react-native-router-flux";

import {observer} from "mobx-react/native";
import {Container, Content} from "../../../components/index";
import {List, ListItem, Left, Body, Right, Thumbnail, Button, Icon, Header} from 'native-base';
import Parabola from 'react-native-smart-parabola'
import CircleProgress from '../../consult/components/CircleProgress'
import VideoPlayer from '../../activity/components/VideoPlayer'
import activityStore from "../../../mobx/activityStore";
import VideoS from '../../activity/components/VideoSolve'


let {width: deviceWidth, height: deviceHeight} = Dimensions.get('window')
let contentTop = Platform.OS == 'ios' ? 64 : 56

/**
 * 活动
 */
@observer
export default class MovementDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collection:true,
            isTrigger: false,
            start: {x: 0, y: 0},
            end: {x: 0, y: 0},
            filepath: '',
            showScore: false,
            suofang: false,
            video:'',
            showpic:true,
            act:{}
        }
        this._startPositions = {}
        this._endPositions = {}


    }

    componentWillMount() {
        request.getJson(urls.apis.ACTIVITY_GETONEACTTIVITY, {actId:this.props.id})
            .then((result) => {
                if (result.ok) {
                    this.setState({
                        act:result.obj.activity,
                        collection:result.obj.activity.iscollection
                    })

                } else {
                    tools.showToast("请求出错！")
                }
            });

        request.getJson(urls.apis.ACTIVITY_GETTHISWEEKTOTALSCORE)
            .then((result) => {
                if (result.ok) {
                    this.setState({
                        z_score: result.obj.weekScore
                    })
                } else {
                    tools.showToast("请求出错！")
                }
            });
        /*let {themeId} = this.props;
        if(themeId){
            activityStore.fetchThemeColumnList(themeId)
        }else{
            activityStore.fetchActivityColumnList()
        }
        activityStore.allscore()

        let {videoList} = activityStore;
        this.setState({
            video: videoList.firstVideo,
            collect: videoList.iscollection,
        })*/
    }


    _onEnd() {
        this.setState({
            showScore: true,
            showpic:true,
        })
        request.getJson(urls.apis.ACTIVITY_ADDACTSCORE, {actId:this.state.act.id})
            .then((result) => {
                if (result.ok) {
                   // activityStore.getActNum()



                } else {
                    tools.showToast("请求出错！")
                }
            });

    }

    substr(remarks) {
        let str = '';
        str = remarks
        return str.substring(0, 15) + '...'

    }

    isCollection() {
        this.setState({isTrigger: false})
        request.getJson(urls.apis.COLLECTIONAPI_ADDMYCOLLECTION, {sourceId:this.state.act.id, type: 2})
            .then((result) => {
                if (result.ok) {
                    this.setState({collection: true})
                    tools.showToast("已收藏")
                } else {
                    tools.showToast("请求出错！")
                }
            });



    }
    noCollection(){
        this.setState({isTrigger: false})
        request.getJson(urls.apis.COLLECTIONAPI_DELETEMYCOLLECTIONBYSOURCEID, {sourceId:this.state.act.id,type:2})
            .then((result) => {
                if (result.ok) {
                    this.setState({collection: false})
                    tools.showToast("已取消")

                } else {
                    tools.showToast("请求出错！")
                }
            });

    }

    render() {
        let {title} = this.props;
        let {act,
            collection,
            isTrigger,
            showScore,
            suofang,
            showpic}=this.state;
       // let {activityColumnList, videoList,isFetching,listLength} = activityStore;
        let sco=this.state.z_score;
        if(sco>700){
            sco=700
        }
        let requ = collection ? require('../image/heart.png') : require('../image/nullheart.png');
        let col = this.state.showScore ? '#fff' : '#ccc';


        return (
            <Container>
                <Header style={{backgroundColor: '#e3e7f3'}}>
                    <Left>
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon name="ios-arrow-back" style={{color: '#000'}}/>
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{marginLeft:-70,color:'#000',fontSize:18,marginTop:8}}>
                            活动主题
                        </Text>
                    </Body>

                </Header>
                <Content delay>
                    <ScrollView ref="list" style={{height: '84%', backgroundColor: '#ebeef6'}}>
                        <View style={{backgroundColor: '#fff', flex: 1, height: 268}}>
                            <View style={{
                                width: '100%',
                                height: '100%',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                flex: 1,
                                position: 'absolute',
                                top: 0
                            }}>
                                {this.state.showpic?(<View style={{width:402,height:268,alignItems:'center',justifyContent:'center'}}>
                                    <Image source={{uri: urls.apis.IMAGE + '?filePath=' + act.picpath}} style={{width:180,height:180}}/>
                                    <Image source={require('../image/play.png')} style={{width:60,height:60,position:'absolute',top:100,left:150}} >
                                        <TouchableOpacity onPress={()=>{this.setState({showpic:false})}} style={{flex:1}}></TouchableOpacity>
                                    </Image>
                                </View>):(<View style={{width: 402, height: 268}}>
                                        <VideoPlayer
                                            source={{uri: urls.apis.IMAGE + '?filePath=' + act.videopath}}
                                            seekColor={ '#000' }
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                bottom: 0,
                                                right: 0,
                                                backgroundColor:'#fff'
                                            }}
                                            resizeMode='cover'
                                            rate={0}
                                            onEnd={this._onEnd.bind(this)}
                                            flag={act.videoPath}
                                        />

                                    </View>
                                )}


                            </View>
                            <Text style={{fontSize: 20, color: '#000',marginTop:10,textAlign:'center'}}>
                                {act.name}
                            </Text>
                            <View onLayout={this._onLayoutCart1}
                                  style={{width: 60, height: 60, position: 'absolute', top: 70, right: 10}}>
                                <CircleProgress totalNum={700}
                                                progress={sco}
                                                radius={24}
                                                baseWidth={4}
                                                progressWidth={5}
                                >
                                    <Text>{this.state.z_score}</Text>
                                </CircleProgress>


                            </View>
                            <Button transparent onPress={()=>{collection?this.noCollection():this.isCollection()} }
                                    style={{
                                        width: 45,
                                        height: 45,
                                        position: 'absolute',
                                        top: 130,
                                        right: 24,
                                        borderRadius: 30,
                                        borderColor: '#b5b5b5',
                                        borderWidth: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                <Image source={requ} style={{width: 22, height: 20}}/>
                            </Button>
                        </View>
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            flex: 1,
                            marginTop: 30
                        }}>
                            <Button disabled={this.state.showScore ? false : true}
                                    onLayout={ this._onLayout1.bind(this, 'key-1') }
                                    onPress={this._onPressHandler_1.bind(this, 'key-1')}
                                    touchableType={'blur'}
                                    style={{
                                        width: 82,
                                        height: 32,
                                        borderRadius: 16,
                                        backgroundColor: this.state.showScore ? '#726585' : '#666',
                                        justifyContent: 'center'
                                    }}>
                                <Text style={{color: col}}>完成</Text>
                                {this.state.showScore ? (<View style={{
                                    position: 'absolute',
                                    width: 20,
                                    height: 20,
                                    borderRadius: 10,
                                    backgroundColor: '#fff',
                                    borderColor: '#817c88',
                                    borderWidth: 1,
                                    top: 0,
                                    right: 0,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{color: 'red', fontSize: 8}}>{act.score}</Text>
                                </View>) : (null)}


                            </Button>

                        </View>

                        <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 10}}>
                            <View style={{width: '22%'}}>
                                <Text style={{textAlign: 'right'}}>
                                    原理：
                                </Text>
                            </View>

                            <View style={{width: '70%'}}>
                                <Text style={{lineHeight: 20}}>
                                    {act.effect}
                                </Text>



                            </View>
                        </View>
                        <View style={{flexDirection: 'row', marginBottom: 20}}>
                                <View style={{width: '22%'}}>
                                    <Text style={{textAlign: 'right'}}>
                                        方法：
                                    </Text>
                                </View>
                                <View style={{width: '70%'}}>
                                    <Text style={{lineHeight: 20}}>
                                        {act.actmethod}
                                    </Text>
                                </View>
                            </View>
                    </ScrollView>

                    <Parabola
                        isTrigger={this.state.isTrigger}
                        rate={0.9}
                        start={this.state.start}
                        end={this.state.end}
                        renderParabola={this._renderParabola}
                    />
                </Content>
            </Container>
        )

    }

    _onLayout1 = (key, e) => {

        let {x, y} = e.nativeEvent.layout
        console.log(`x: ${x}, y: ${y}, dw: ${deviceWidth}, dh: ${deviceHeight}, contentTop: ${contentTop}`)
        this._startPositions[key] = {
            start: {
                x: x + 80,
                y: y + 300,
            },

        }
    }
    _onLayoutCart1 = (e) => {
        let {x, y} = e.nativeEvent.layout
        this._endPositions['cart-1'] = {
            x: x + 16,
            y: y + 35,
        }
    }

    _onPressHandler_1(key, e) {
        let startPositions = this._startPositions[key]
        startPositions.end = this._endPositions['cart-1']
        let {start, end} = startPositions
        request.getJson(urls.apis.ACTIVITY_GETTHISWEEKTOTALSCORE)
            .then((result) => {
                this.setState({
                    z_score:result.obj.weekScore,
                    showScore: false,
                    isTrigger: true,
                    start,
                    end,
                })
            });
    }

    _renderParabola = ({index, translateX, translateY}) => {
        return (
            <View
                key={`'parabola-ball-'${index}`}
                style={[
                    {position: 'absolute',},    //Don't forget to set this
                    {
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: '#fff',
                        borderColor: '#817c88',
                        borderWidth: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    },
                    {transform: [{translateX}, {translateY}]},
                ]}
            >
                <Text style={{color: 'red', fontSize: 8}}>{this.state.act.score}</Text>
            </View>

        )
    }


}


const styles = {
    listItem: {backgroundColor: '#fff', marginRight: 10, marginLeft: 10, marginBottom: 10, flex: 1},
    leftView: {width: 70, height: 70, flexDirection: 'row', justifyContent: 'center'},
    circleView: {width: 50, height: 50, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}

};
