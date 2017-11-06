/**
 * Created by Administrator on 2017/10/23.
 */
import React, {Component} from "react";
import {Text,  Thumbnail,ListItem,Left,Body,Right,Button} from "native-base";
import {View,Image} from "react-native";
import {observer} from "mobx-react/native";
import activityStore from "../../../mobx/activityStore"
@observer
export default class activityItem extends Component {



    render() {

        let {activity,index,changVideo} = this.props;


        return (

            <ListItem avatar style={styles.listItem} key={index} onPress={() => {
                changVideo(activity.videopath, activity.id, activity.remarks, activity.iscollection, activity.isfree,activity.actmethod,activity.score,activity.name,index,activity.ispay,activity.picpath,activity.effect)
            }}>
                <Left>
                    <View style={styles.leftView}>
                        <Image source={{uri: urls.apis.IMAGE + '?filePath=' + activity.picpath}}
                               style={{width: 70, height: 70}}/>
                        <Image source={require('../image/play.png')} style={{
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
                    }}>{activity.onepositison}</Text>
                    <Text style={{fontSize: 20, color: '#000'}}>{activity.name.length>5?(activity.name.substring(0,5)+'...'):activity.name}</Text>
                    <Text style={{fontSize: 14,marginLeft:10,color:'#666'}}>{activity.score}分</Text>
                </View>
                <Text style={{fontSize: 10}}>{this.substr(activity.remarks)}</Text>
                </Body>
                <Right style={{flexDirection: 'column', justifyContent: 'center',borderColor:'transparent'}}>
                    <View
                        style={[styles.circleView, {backgroundColor: activity.isread ? '#cccccc' : '#726585'}]}>
                        {activity.isread ? (<Text>已打卡</Text>) : (<Text style={{color: '#fff'}}>打卡</Text>)}
                    </View>
                </Right>
                {activity.isfree == 1 && activity.ispay==false? (<Image source={require('../image/daler.png')} style={{
                    width: 20,
                    height: 20,
                    position: 'absolute',
                    right: 0,
                    top: 0
                }}/>) : (null)}
                {activity.ispay==true? (<Image source={require('../image/yipay.png')} style={{
                    width: 20,
                    height: 20,
                    position: 'absolute',
                    right: 0,
                    top: 0
                }}/>) : (null)}
            </ListItem>
        )
    }
    substr(effect){
        let str='';
        str=effect
        return str.substring(0,12)

    }

}
const styles = {
    listItem: {backgroundColor: '#fff', marginRight: 10, marginLeft: 10, marginBottom: 10, flex: 1},
    leftView: {width: 70, height: 70, flexDirection: 'row', justifyContent: 'center'},
    circleView: {width: 50, height: 50, borderRadius: 30, alignItems: 'center', justifyContent: 'center'}

};




