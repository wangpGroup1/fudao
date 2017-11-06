import React, {Component} from "react";
import {Modal, View, Image, ListView,WebView,Dimensions} from "react-native";
import {Icon,Button, ListItem, Text} from "native-base";
import {observer} from "mobx-react/native";
import activityStore from "../../../mobx/activityStore";


/**
 * 我的能量场 > 资料填写
 */
@observer
class PayModal extends Component {

    constructor(props) {
        super(props);


        this.state = {
            ...props,
            visible: false,
            text:'{"imgPath":"zixun/1.3.jpg","title":"点一支薰衣草窗前明月光的休息一下吧~","content":"以两手搓热环摸脐周，谁知盘中餐，少用力按摩腹部提拿腹肌，以一手会当临绝顶，一览众山小"}',
            zu:{}
        }
    }

    /**
     * 分组
     */

    pay(){
        let {themeId}=this.props;
        let {videoList}=activityStore;

        request.getJson(urls.apis.ACTIVITY_PAYTHEME,{id:this.state.text.videoId})
        .then((result) => {
            /*if (result.ok) {*/
                videoList=this.state.text;
            if(videoList.index>=1&&this.state.zu.isread){
                activityStore.changVideo(videoList.firstVideo, videoList.videoId, videoList.effect, videoList.iscollection, videoList.isfree,videoList.actmethod,videoList.score,videoList.name,videoList.index,videoList.ispay,videoList.picpath,videoList.effect);
            }else{
                if(videoList.index<1){
                    activityStore.changVideo(videoList.firstVideo, videoList.videoId, videoList.effect, videoList.iscollection, videoList.isfree,videoList.actmethod,videoList.score,videoList.name,videoList.index,videoList.ispay,videoList.picpath,videoList.effect);
                }else{
                    tools.showToast("请先活动第一个动作热热身吧！")

                }
            };

                tools.showToast("购买成功")
                this.hide();

                //activityStore.fetchActivityColumnList_addColection(themeId);
                this.props.onChangeMsg();
            /*} else {
                tools.showToast('您已付款')
            }*/
        });

    }


    render() {
        let {visible} = this.state;

        return (
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={visible}
                onRequestClose={() => this.hide()}
                onLayout={({nativeEvent:e})=>this.layout(e)}
            >
                <View style={styles.opacityView}/>
                <View style={styles.content}>
                    <View style={styles.header}>

                        <View style={{width:25}}>
                            <Button
                                onPress={() => this.hide()}
                                style={styles.closeButton}>
                                <Icon name="close" style={{color:'#FFF', fontSize: 20}}/>
                            </Button>
                        </View>
                    </View>
                    <View style={{flex: 1,marginTop:50}}>
                        <View style={{height:80,alignItems:'center',justifyContent:'center'}}>
                            <Text>这个活动方法是收费哒</Text>
                            <Text>付费后可正常观看哦~</Text>
                        </View>
                        <View style={{height:60,alignItems:'center',backgroundColor:'#e8a900',flexDirection:'row',justifyContent:"center"}}>
                            <Image source={require('../image/fufei.png')} style={{width:30,height:30,marginLeft:20}}/>
                            <Text style={{ fontFamily:'Georgia',fontSize:30,marginLeft:20}}>0.00</Text>
                            <View style={{marginLeft:20}}>
                                <Text style={{color:'#fff'}}>限时折扣</Text>
                                <Text style={{color:'#fff',textDecorationLine:'line-through'}}>原价0.99元</Text>
                            </View>
                        </View>
                        <View style={{height:100,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                            <Button touchableType={'blur'}
                                    onPress={()=>{this.pay()}}
                                    style={{width:150,height:32,borderRadius:16,backgroundColor:'#726585',justifyContent:'center',marginTop:60}}>
                                <Text style={{color:'#fff'}}>确认购买</Text>

                            </Button>
                        </View>
                        <View style={{height:'40%',backgroundColor:'#ccc4d6',position:'absolute',bottom:0,left:0,right:0}}>
                            <View style={{flexDirection:'row',height:100,backgroundColor:'#ccc4d6',borderTopColor:"#000",borderTopWidth:1,borderStyle:'dashed',paddingLeft:12,justifyContent:'center'}}>
                                <View style={{width:250}}>
                                    <View style={{height:60,alignItems:'center',flexDirection:'row'}}>
                                        <Text style={{fontSize:20,color:'#fff'}}>颈椎病</Text>
                                        <Image source={require('../image/fufei.png')} style={{width:30,height:30,marginLeft:10}}/>
                                        <Text style={{ fontFamily:'Georgia',fontSize:30,marginLeft:10}}>0.00</Text>
                                        <View style={{marginLeft:10}}>
                                            <Text style={{color:'#fff'}}>限时折扣</Text>
                                            <Text style={{color:'#fff',textDecorationLine:'line-through'}}>原价0.99元</Text>
                                        </View>
                                    </View>
                                    <View style={{height:40,alignItems:'center',flexDirection:'row'}}>
                                        <Text style={{fontSize:14,color:'#000'}}>购买颈椎病专题，可免费查看该专题所有活动</Text>
                                    </View>
                                </View>
                                <View style={{height:100,justifyContent:'center',alignItems:'center'}}>
                                    <Button disabled={true}
                                        style={{width:50,height:50,alignItems:'center',justifyContent:'center',backgroundColor:'#666',borderRadius:25}}>
                                        <Text style={{fontSize:16,color:'#fff'}}>买</Text>
                                    </Button>
                                </View>


                            </View>
                            <View style={{flexDirection:'row',height:100,backgroundColor:'#ccc4d6',borderTopColor:"#000",borderTopWidth:1,borderStyle:'dashed',paddingLeft:12,justifyContent:'center'}}>
                                <View style={{width:250}}>
                                    <View style={{height:60,alignItems:'center',flexDirection:'row'}}>
                                        <Image source={require('../image/xiguan_03.png')} style={{width:30,height:30}}/>
                                        <Image source={require('../image/fufei.png')} style={{width:30,height:30,marginLeft:10}}/>
                                        <Text style={{ fontFamily:'Georgia',fontSize:30,marginLeft:10}}>0.00</Text>
                                        <View style={{marginLeft:10}}>
                                            <Text style={{color:'#fff'}}>限时折扣</Text>
                                            <Text style={{color:'#fff',textDecorationLine:'line-through'}}>原价0.99元</Text>
                                        </View>
                                    </View>
                                    <View style={{height:40,alignItems:'center',flexDirection:'row'}}>
                                        <Text style={{fontSize:14,color:'#000'}}>升级到{'<'}习惯{'>'}尽享更多主题，还有食、睡、动、静、乐等更多推荐哦～</Text>
                                    </View>
                                </View>
                                <View style={{height:100,justifyContent:'center',alignItems:'center'}}>
                                    <Button disabled={true}
                                        style={{width:50,height:50,alignItems:'center',justifyContent:'center',backgroundColor:'#666',borderRadius:25}}>
                                        <Text style={{fontSize:16,color:'#fff'}}>买</Text>
                                    </Button>
                                </View>


                            </View>
                        </View>

                    </View>

                </View>


            </Modal>
        )
    }



    /**
     * 打开对话框
     * @param data
     */
    show(data,zu) {
        let state = {
            visible: true,
            text: data,
            zu:zu
        };
        this.setState(state);

    }

    /**
     * 关闭对话框
     */
    hide() {
        this.setState({
            visible: false
        })
    }


}


const styles = {
    opacityView: {
        flex: 1,
        backgroundColor: '#6c6c6c',
        opacity: 0.5,
        justifyContent:'center'
    },
    content: {
        position: "absolute",
        backgroundColor: '#FFFFFF',
        top: 30,
        bottom: 30,
        left: 20,
        right: 20,
        borderRadius: 3,
        opacity: 1,
        flex: 1,
        flexDirection: 'column',
    },
    header: {
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 6,
        flexDirection: 'row',
        position: "absolute",
        zIndex:10000

    },
    headerText: {
        fontSize: theme.fontSizeH4
    },
    closeButton: {
        backgroundColor: '#C8C8C8',
        justifyContent: 'center',
        borderRadius: 12,
        width: 24,
        height: 24,
        paddingLeft: 0,
        paddingRight: 0,
    },
};


export default  (PayModal);


