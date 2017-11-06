import React, {Component} from "react";
import {View, Image, Text, ScrollView, WebView, Dimensions, Platform,TouchableOpacity} from "react-native";
import {Actions} from "react-native-router-flux";

import {observer} from "mobx-react/native";
import {Container, Content} from "../../components/index";
import {List, ListItem, Left, Body, Right, Thumbnail, Button, Icon, Header} from 'native-base';
import Parabola from 'react-native-smart-parabola'
import CircleProgress from '../consult/components/CircleProgress'
import VideoPlayer from './components/VideoPlayer'
import activityStore from "../../mobx/activityStore";
import VideoS from './components/VideoSolve'
import PayModal from "../activity/components/PayModal";

let {width: deviceWidth, height: deviceHeight} = Dimensions.get('window')
let contentTop = Platform.OS == 'ios' ? 64 : 56

/**
 * 活动
 */
@observer
export default class Activity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collect: activityStore.videoList.iscollection,
            isTrigger: false,
            start: {x: 0, y: 0},
            end: {x: 0, y: 0},
            filepath: '',
            showScore: false,
            suofang: false,
            video: activityStore.videoList.firstVideo,
            addscore:activityStore.videoList.score,
            showpic:true
        }
        this._startPositions = {}
        this._endPositions = {}


    }

    componentWillMount() {
        let {themeId} = this.props;
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
        })
    }


    changVideo(path, id, remarks, isC, isfree,actmethod,score,name,index,ispay,picpath,effect) {
        let {videoList} = activityStore;
        let {themeId} = this.props;
        if (isfree == 1&&!ispay) {
            let videoList={
                firstVideo : path,
                videoId : id,
                remarks : remarks,
                actmethod : actmethod,
                score:score,
                iscollection : isC,
                isfree : isfree,
                name : name,
                index : index,
                ispay : ispay,
                picpath:picpath,
                effect:effect
            }
            this.openDetailsBox(videoList);
            //activityStore.fetchActivityColumnList_addColection(themeId)

        }else{
            activityStore.changVideo(path, id, remarks, isC, isfree,actmethod,score,name,index,ispay,picpath,effect);
        }
        this.refs.list.scrollTo([0, 0]);
        this.setState({
            showScore: false,
            isTrigger: false,
            showpic:true,
            collect: videoList.isCollection,
            addscore:score,
        })
    }

    _onEnd() {
        let {themeId} = this.props;
        activityStore.fetchActivityColumnList_addColection(themeId);
        this.setState({
            showpic:true,
            showScore: true
        })



    }

    substr(remarks) {
        let str = '';
        str = remarks
        return str.substring(0, 15) + '...'

    }

    isCollection() {
        let {themeId} = this.props;
        let {videoList} = activityStore;
        videoList.iscollection = true;
        this.setState({isTrigger: false})
        request.getJson(urls.apis.COLLECTIONAPI_ADDMYCOLLECTION, {sourceId:videoList.videoId, type: 2})
        .then((result) => {
            if (result.ok) {
                activityStore.fetchActivityColumnList_addColection(themeId)
                tools.showToast('已收藏')
            } else {
                tools.showToast('请求出错！')
            }
        });



    }
    noCollection(){
        let {themeId} = this.props;

        let {videoList} = activityStore;
        videoList.iscollection = false;
        this.setState({isTrigger: false})
        request.getJson(urls.apis.COLLECTIONAPI_DELETEMYCOLLECTIONBYSOURCEID, {sourceId: videoList.videoId,type:2})
        .then((result) => {
            if (result.ok) {
                activityStore.fetchActivityColumnList_addColection(themeId)
                tools.showToast('已取消')

            } else {
                tools.showToast('请求出错！')
            }
        });

    }

    openDetailsBox(data) {
        this._PayModal.show(data);

    }


    render() {
        let {title,themeId} = this.props;


        let chahe = title == '活动' ? '选择场合' : '更多场合';
        let {activityColumnList, videoList,isFetching,listLength,score} = activityStore;
        let sco=score;
        if(sco>700){
            sco=700
        }

        let requ = videoList.iscollection ? require('./image/heart.png') : require('./image/nullheart.png');
        let col = this.state.showScore ? '#fff' : '#ccc';


        return (
            <Container>
                <Header style={{backgroundColor: '#e3e7f3'}}>
                    <Left>
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon name="ios-arrow-back" style={{color: '#000'}}/>
                        </Button>
                    </Left>
                    <Text style={{marginLeft:-70,color:'#000',fontSize:18,marginTop:12}}>
                        {title}
                    </Text>
                    <Right>
                        <Button style={{
                            flexDirection: 'row',
                            width: 120,
                            height: 30,
                            backgroundColor: '#726585',
                            borderBottomLeftRadius: 15,
                            borderTopLeftRadius: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: -10
                        }} onPress={() => Actions.index({page: 1})}>
                            <Text style={{color: '#fff'}}>{chahe}</Text>
                            <Image source={require('./image/jia.png')}
                                   style={{width: 21.5, height: 22, marginLeft: 10}}/>
                        </Button>
                    </Right>

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
                                    <Image source={{uri: urls.apis.IMAGE + '?filePath=' + videoList.picpath}} style={{width:180,height:180}}/>
                                    <Image source={require('./image/play.png')} style={{width:60,height:60,position:'absolute',top:100,left:150}} >
                                        <TouchableOpacity onPress={()=>{this.setState({showpic:false,isTrigger: false})}} style={{flex:1}}></TouchableOpacity>
                                    </Image>
                                </View>):(<View style={{width: 402, height: 268}}>
                                        <VideoPlayer
                                            source={{uri: urls.apis.VIDEO + '?filePath=' + videoList.firstVideo}}
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
                                            flag={videoList.firstVideo}
                                        />

                                    </View>
                                )}


                            </View>
                            <Text style={{fontSize: 20, color: '#000',marginTop:10,textAlign:'center'}}>
                                {videoList.name}
                            </Text>
                            <View style={{padding: 10,position:'absolute'}}>

                                <Text style={{fontSize: 26, paddingLeft: 20, color: '#000'}}>
                                    { videoList.index+ 1}/{listLength}
                                </Text>


                            </View>
                            <View onLayout={this._onLayoutCart1}
                                  style={{width: 60, height: 60, position: 'absolute', top: 70, right: 10}}>
                                <CircleProgress totalNum={700}
                                                progress={sco}
                                                radius={24}
                                                baseWidth={4}
                                                progressWidth={5}
                                >
                                    <Text>{score}</Text>
                                </CircleProgress>


                            </View>
                            <Button transparent onPress={()=>{activityStore.videoList.iscollection?this.noCollection():this.isCollection()} }
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
                                    <Text style={{color: 'red', fontSize: 8}}>{videoList.score}</Text>
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
                                    {this.state.suofang ? videoList.effect : this.substr(videoList.effect)}
                                </Text>
                                {this.state.suofang ?null: <Text style={{fontSize: 10, color: '#8b6ab3',textAlign:'right'}} onPress={() => {
                                    this.setState({suofang: !this.state.suofang, isTrigger: false})
                                }}>
                                    展开全文∨
                                </Text>}

                            </View>
                        </View>
                        {this.state.suofang ? (
                            <View style={{flexDirection: 'row', marginBottom: 20}}>
                                <View style={{width: '22%'}}>
                                    <Text style={{textAlign: 'right'}}>
                                        方法：
                                    </Text>
                                </View>
                                <View style={{width: '70%'}}>
                                    <Text style={{lineHeight: 20}}>
                                        {videoList.actmethod.split('        ').join('')}
                                    </Text>
                                    {this.state.suofang ?<Text style={{fontSize: 10, color: '#8b6ab3',textAlign:'right'}} onPress={() => {
                                        this.setState({suofang: !this.state.suofang, isTrigger: false})
                                    }}>
                                        收起全文∧
                                    </Text>: null}
                                </View>
                            </View>
                        ): null}

                        { activityColumnList.map((k, i) => (
                            <ListItem avatar style={styles.listItem} key={i} onPress={() => {
                                this.changVideo(k.videopath, k.id, k.remarks, k.iscollection, k.isfree,k.actmethod,k.score,k.name,i,k.ispay,k.picpath,k.effect)
                            }}>
                                <Left>
                                    <View style={styles.leftView}>
                                        <Image source={{uri: urls.apis.IMAGE + '?filePath=' + k.picpath}}
                                               style={{width: 70, height: 70}}/>
                                        <Image source={require('./image/play.png')} style={{
                                            width: 20,
                                            height: 20,
                                            position: 'absolute',
                                            top: 25,
                                            left: 25
                                        }}/>
                                    </View>
                                </Left>
                                <Body>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{
                                        fontSize: 14,
                                        color: '#fff',
                                        backgroundColor: '#d2d2d2',
                                        marginRight: 10
                                    }}>{k.onepositison}</Text>
                                    <Text style={{fontSize: 20, color: '#000'}}>{k.name.length>5?(k.name.substring(0,5)+'...'):k.name}</Text>
                                    <Text style={{fontSize: 14,marginLeft:10,color:'#666'}}>{k.score}分</Text>
                                </View>
                                <Text style={{fontSize: 10}}>{this.substr(k.remarks)}</Text>
                                </Body>
                                <Right style={{flexDirection: 'column', justifyContent: 'center',borderColor:'transparent'}}>
                                    <View
                                        style={[styles.circleView, {backgroundColor: k.isread ? '#cccccc' : '#726585'}]}>
                                        {k.isread ? (<Text>已打卡</Text>) : (<Text style={{color: '#fff'}}>打卡</Text>)}
                                    </View>
                                </Right>
                                {k.isfree == 1 && k.ispay==false? (<Image source={require('./image/daler.png')} style={{
                                    width: 20,
                                    height: 20,
                                    position: 'absolute',
                                    right: 0,
                                    top: 0
                                }}/>) : (null)}
                                {k.ispay==true? (<Image source={require('./image/yipay.png')} style={{
                                    width: 20,
                                    height: 20,
                                    position: 'absolute',
                                    right: 0,
                                    top: 0
                                }}/>) : (null)}
                            </ListItem>
                        ))
                        }


                    </ScrollView>

                    <Parabola
                        isTrigger={this.state.isTrigger}
                        rate={0.9}
                        start={this.state.start}
                        end={this.state.end}
                        renderParabola={this._renderParabola}
                    />


                    <PayModal ref={(e) => this._PayModal = e} themeId={themeId} />
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

        let {videoList} = activityStore;
        request.getJson(urls.apis.ACTIVITY_ADDACTSCORE, {actId: videoList.videoId})
        .then((result) => {
            if (result.ok) {
                activityStore.getActNum();
                activityStore.getWeekscore();

            } else {
                tools.showToast('请求出错！')
            }
        });
        let startPositions = this._startPositions[key]

        startPositions.end = this._endPositions['cart-1']

        let {start, end} = startPositions


        this.setState({
            showScore: false,
            isTrigger: true,
            start,
            end,
        })








        //activityStore.getWeekscore()
    }

    _renderParabola = ({index, translateX, translateY}) => {
        let {videoList} = activityStore;


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
                <Text style={{color: 'red', fontSize: 8}}>{videoList.score}</Text>
            </View>

        )
    }


}


const styles = {
    listItem: {backgroundColor: '#fff', marginRight: 10, marginLeft: 10, marginBottom: 10, flex: 1},
    leftView: {width: 70, height: 70, flexDirection: 'row', justifyContent: 'center'},
    circleView: {width: 50, height: 50, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}

};