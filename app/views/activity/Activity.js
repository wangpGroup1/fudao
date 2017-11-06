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

import userStore from "../../mobx/userStore";
import VideoS from './components/VideoSolve'
import PayModal from "../activity/components/PayModal";
import GiftedListView from "./components/GiftedListView";

let {width: deviceWidth, height: deviceHeight} = Dimensions.get('window')
let contentTop = Platform.OS == 'ios' ? 64 : 56
let duan = Platform.OS == 'ios'

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

            addscore:activityStore.videoList.score,
            showpic:true,
            refresh:false
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
        activityStore.allscore();
        activityStore.fetchActivityFirst(themeId);


        let {videoList} = activityStore;
        this.setState({

            collect: videoList.iscollection,
        })
    }




    _onEnd() {

        this.setState({
            showpic:true,
            showScore: true
        })



    }

    substr(description) {
        let str = '';
        str = description;
        if(str.length>15){
            return str.substring(0, 15) + '...'
        }else{
            return str
        }


    }

    isCollection() {
        let {themeId} = this.props;
        let {videoList} = activityStore;
            videoList.iscollection = true;
            this.setState({isTrigger: false})
            request.getJson(urls.apis.COLLECTIONAPI_ADDMYCOLLECTION, {sourceId:videoList.videoId, type: 2})
                .then((result) => {
                    if (result.ok) {
                        activityStore.fetchActivityColumnList_addColection(themeId,this.refs.hill._postRefresh)
                        tools.showToast("已收藏")
                    } else {
                        tools.showToast("请求出错！")
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
                       activityStore.fetchActivityColumnList_addColection(themeId,this.refs.hill._postRefresh)
                        tools.showToast("已取消")

                    } else {
                        tools.showToast("请求出错！")
                    }
                });

    }

    openDetailsBox(data,zu) {
        this._PayModal.show(data,zu);

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
                            width: 96,
                            height: 25,
                            backgroundColor: '#726585',
                            borderBottomLeftRadius: 15,
                            borderTopLeftRadius: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: -10
                        }} onPress={() => Actions.index({page: 1})}>
                            <Text style={{color: '#fff',fontSize:12}}>{chahe}</Text>
                            <Image source={require('./image/jia.png')}
                                   style={{width: 15, height: 15, marginLeft: 10}}/>
                        </Button>
                    </Right>

                </Header>
                <Content delay>



                    <ScrollView ref="list" style={{height: '84%', backgroundColor: '#ebeef6'}}>
                        <View style={{backgroundColor: '#fff', height: 268}}>
                            <View style={{
                                width: '100%',
                                height: '100%',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                flex: 1,
                                position: 'absolute',
                                top: 0,
                                overflow:'hidden'
                            }}>
                                {/*<WebView source={{uri:urls.pages.VIDEO+'?token='+userStore.token+'&videopath='+videoList.firstVideo+'&picpath='+videoList.picpath}}/>*/}
                                {this.state.showpic?(<View style={{width:402,height:268,alignItems:'center',justifyContent:'center'}}>
                                    <Image source={{uri: urls.apis.IMAGE + '?filePath=' + videoList.picpath}} style={{width:180,height:180}}/>
                                    <Image source={require('./image/play.png')} style={{width:60,height:60,position:'absolute',top:100,left:150}} >
                                        <TouchableOpacity onPress={()=>{this.setState({showpic:false,isTrigger: false})}} style={{flex:1}}></TouchableOpacity>
                                    </Image>
                                </View>):(<View style={{width: 402, height: 268}}>
                                        {/*<VideoS isEmotion={false}

                                         video={videoList.firstVideo}
                                         onEnd={this._onEnd.bind(this)}/>*/}


                                        <VideoPlayer
                                            source={{uri: urls.apis.VIDEONEW + '?filePath=' + videoList.firstVideo+'&authorization='+userStore.token}}

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
                            <View style={{backgroundColor:'transparent'}}>
                                <Text style={{fontSize: 20, color: '#000',marginTop:10,textAlign:'center'}}>
                                    {videoList.name}
                                </Text>
                            </View>

                            <View style={{padding: 10,position:'absolute',backgroundColor:'transparent'}}>

                                <Text style={{fontSize: 24, paddingLeft: 24, color: '#000'}}>
                                    { parseInt(videoList.index)+ 1}/{listLength}
                                </Text>


                            </View>
                            <View onLayout={this._onLayoutCart1}
                                  style={{width: 40, height: 40, position: 'absolute', top: 70, right: 20}}>
                                <CircleProgress totalNum={700}
                                                progress={sco}
                                                radius={20}
                                                baseWidth={4}
                                                progressWidth={5}
                                >
                                    <Text>{score}</Text>
                                </CircleProgress>


                            </View>
                            <Button transparent onPress={()=>{activityStore.videoList.iscollection?this.noCollection():this.isCollection()} }
                                    style={{
                                        width: 36,
                                        height: 36,
                                        position: 'absolute',
                                        top: 120,
                                        right: 23,
                                        borderRadius: 30,
                                        borderColor: '#b5b5b5',
                                        borderWidth: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                <Image source={requ} style={{width: 16, height: 15}}/>
                            </Button>
                        </View>
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'center',
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
                                <Text style={{color: col,fontSize:15}}>完成</Text>
                                {this.state.showScore ? (<View style={{
                                    position: 'absolute',
                                    width: 14,
                                    height: 14,
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
                            <View style={{width: '22%',paddingTop:4}}>
                                <Text style={{textAlign: 'right',fontSize:12}}>
                                    原理：
                                </Text>
                            </View>

                            <View style={{width: '70%'}}>
                                <Text style={{lineHeight: 20,fontSize:12}}>
                                    {this.state.suofang ? videoList.principle : this.substr(videoList.principle)}
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
                                <View style={{width: '22%',paddingTop:4}}>
                                    <Text style={{textAlign: 'right',fontSize:12}}>
                                        方法：
                                    </Text>
                                </View>
                                <View style={{width: '70%'}}>
                                    <Text style={{lineHeight: 20,fontSize:12}}>
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

                        <GiftedListView
                            rowView={this._renderRowView.bind(this)}
                            onFetch={this._onFetch.bind(this)}
                            firstLoader={true}
                            pagination={true}
                            refreshable={true}
                            withSections={false}
                            enableEmptySections={true}
                            locked={true}
                            ref="hill"

                        />

                    </ScrollView>

                    <Parabola
                        isTrigger={this.state.isTrigger}
                        rate={0.9}
                        start={this.state.start}
                        end={this.state.end}
                        renderParabola={this._renderParabola}
                    />


                    <PayModal ref={(e) => this._PayModal = e} themeId={themeId} onChangeMsg={this.postMsg.bind(this)}/>
                </Content>
            </Container>
        )

    }
    postMsg(){
        let{themeId}=this.props;
        activityStore.fetchActivityAllList(themeId,1,this.refs.hill._postRefresh);
    }
    _onFetch(page = 1, callback, ) {


        let{themeId}=this.props;
        activityStore.fetchActivityList(themeId,page,callback)
    }

    _renderRowView(rowData,index,aaa) {
        let {listLength} = activityStore;
        let bColor='';
        if(rowData.sortnum>1&&rowData.sortnum<4){
            bColor='#fdffe3';
        }else if(rowData.sortnum==4){
            bColor='#cccccc';
        }else{
            bColor='#fff';
        }



        return (
            <ListItem avatar style={[styles.listItem,{backgroundColor:bColor,}]} key={aaa} onPress={() => {
                this.changVideo(rowData,aaa)
            }}>
                <Left>
                    <View style={styles.leftView}>
                        <Image source={{uri: urls.apis.IMAGE + '?filePath=' + rowData.picpath}}
                               style={{width: 62, height: 62}}/>
                        <Image source={require('./image/play.png')} style={{
                            width: 29,
                            height: 29,
                            position: 'absolute',
                            top: 16,
                            left: 16
                        }}/>
                    </View>
                </Left>
                <Body style={{borderBottomWidth:0}}>
                    <View style={{flexDirection: 'row', alignItems: 'center',marginBottom:8}}>
                        <Text style={{
                            fontSize: 12,
                            color: '#fff',
                            backgroundColor: '#d2d2d2',
                            marginRight: 10
                        }}>{rowData.onepositison}</Text>
                        <Text style={{fontSize: 16, color: '#000'}}>{/*{rowData.name.length>5?(rowData.name.substring(0,5)+'...'):rowData.name}*/}{rowData.name}</Text>
                        <Text style={{fontSize: 12,marginLeft:10,color:'#666'}}>{rowData.score}分</Text>
                    </View>
                    <Text style={{fontSize: 8}}>{this.substr(rowData.description)}</Text>
                </Body>
                <Right style={{flexDirection: 'column', justifyContent: 'center',borderColor:'transparent'}}>
                    <View
                        style={[styles.circleView, {backgroundColor: rowData.isread ? '#cccccc' : '#726585'}]}>
                        {rowData.isread ? (<Text style={{fontSize:10}}>已打卡</Text>) : (<Text style={{color: '#fff',fontSize:10}}>打卡</Text>)}
                    </View>
                </Right>
                {rowData.isfree == 1 && rowData.ispay==false? (<Image source={require('./image/daler.png')} style={{
                    width: 14,
                    height: 14,
                    position: 'absolute',
                    right: 0,
                    top: 0
                }}/>) : (null)}
                {rowData.ispay==true? (<Image source={require('./image/yipay.png')} style={{
                    width: 14,
                    height: 14,
                    position: 'absolute',
                    right: 0,
                    top: 0
                }}/>) : (null)}
            </ListItem>
        )
    }

    changVideo(rowData,index) {

        let {videoList,firstZu} = activityStore;
        let {themeId} = this.props;
        if (rowData.isfree == 1&&!rowData.ispay&&rowData.sortnum!=4) {
            let videoList={
                firstVideo : rowData.videopath,
                videoId : rowData.id,
                description : rowData.description,
                actmethod : rowData.actmethod,
                score:rowData.score,
                iscollection : rowData.iscollection,
                isfree : rowData.isfree,
                name : rowData.name,
                index : index,
                ispay : rowData.ispay,
                picpath:rowData.picpath,
                principle:rowData.principle
            }
            this.openDetailsBox(videoList,firstZu);
            //activityStore.fetchActivityColumnList_addColection(themeId)

        }else{
            if(index>=1&&firstZu.isread&&rowData.sortnum!=4){
                activityStore.changVideo(rowData.videopath, rowData.id, rowData.description, rowData.iscollection, rowData.isfree,rowData.actmethod,rowData.score,rowData.name,index,rowData.ispay,rowData.picpath,rowData.principle);
            }else{
                if(index<1){
                    activityStore.changVideo(rowData.videopath, rowData.id, rowData.description, rowData.iscollection, rowData.isfree,rowData.actmethod,rowData.score,rowData.name,index,rowData.ispay,rowData.picpath,rowData.principle);
                }else{
                    if(rowData.sortnum==4){
                        tools.showToast(""+rowData.remarks+"")
                    }else{
                        tools.showToast("请先活动第一个动作热热身吧！")
                    }


                }
            };

        }
        this.refs.list.scrollTo([0, 0]);
        this.setState({
            showScore: false,
            isTrigger: false,
            showpic:true,
            collect: videoList.isCollection,
            addscore:rowData.score,
        })
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


        this.setState({
            showScore: false,
            isTrigger: true,
            refresh:true,
            start,
            end,
        })


        let {videoList} = activityStore;
        let {themeId} = this.props;


        request.getJson(urls.apis.ACTIVITY_ADDACTSCORE, {actId: videoList.videoId,themeId:themeId})
        .then((result) => {
            if (result.ok) {

                activityStore.getActNum();
                activityStore.getWeekscore();
                activityStore.fetchActivityAllList(themeId,1,this.refs.hill._postRefresh);
                activityStore.fetchActivityFirst(themeId)

            } else {
                tools.showToast("请求出错！")
            }
        });









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
                        width: 14,
                        height: 14,
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
    listItem: { marginRight: 10, marginLeft: 10, marginBottom: 10, flex: 1},
    leftView: {width: 62, height: 62, flexDirection: 'row', justifyContent: 'center',margin:4},
    circleView: {width: 35, height: 35, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}

};