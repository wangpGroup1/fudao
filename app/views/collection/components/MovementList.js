/*import React, {PureComponent} from "react";
import {StyleSheet, View, ListView, RefreshControl,Alert,ToastAndroid,Image,Text,ScrollView} from "react-native";
import { List, ListItem, Left, Body, Right, Thumbnail,Button,Icon,Header} from 'native-base';


export default class MovementList extends PureComponent {



    render() {

        /!*{
            "createTime": 1506060041000,
            "id": "88443AF519364635B7A72C087C616C2A",
            "type": "2",
            "article": {
            "videoPath": "/video/activity/toujingqianfu.mp4",
                "principle": "头颈运动可以放松颈部肌肉、缓解颈椎压力。",
                "actMethod": "下巴尽量往胸部贴，尽量慢一点，闭上眼睛，感受肩颈后部的拉伸，做到自己的极限，停留5秒，再慢慢恢复原状。建议每天活动3次，每次活动20下。",
                "effect": "多活动头颈部能帮助放松肌肉，缓解疲劳，减轻颈椎压力。",
                "name": "头颈前俯运动",
                "twoPosition": "颈",
                "proverb": "动头颈，向胸贴，松肌肉，舒颈椎。",
                "attention": "动作要缓慢，力度要适度。",
                "id": "6AC556E71C324FFA87A2976643A23C1D",
                "onePosition": "颈"
        }
        },*!/

        const listArr=[
            {
                name:'鹿奔运动',
                theory:'原理：腰部的拧转，使整个脊柱充分旋转，可增强腰部的肌肉力量。',
                part:'全身',
            },
            {
                name:'手指运动',
                theory:'原理：腰部的拧转，使整个脊柱充分旋转，可增强腰部的肌肉力量。',
                part:'全身',
            },
            {
                name:'头部运动',
                theory:'原理：腰部的拧转，使整个脊柱充分旋转，可增强腰部的肌肉力量。',
                part:'全身',
            },
            {
                name:'腰部运动',
                theory:'原理：腰部的拧转，使整个脊柱充分旋转，可增强腰部的肌肉力量。',
                part:'全身',
            },
        ]

        return (
            <ScrollView style={styles.listView}>
                {
                    listArr.map((k,i)=>(
                        <ListItem avatar style={styles.listItem} key={i}>
                            <Left>
                                <View style={styles.leftView}>
                                    <View style={{width:22,height:70}}>
                                        <Image source={require('../image/xiaolvren.png')} style={{width:22,height:70}}/>
                                        <Image source={require('../image/play.png')} style={{width:20,height:20,position:'absolute',top:25}}/>
                                    </View>
                                </View>
                            </Left>
                            <Body>
                            <Text style={{fontSize:24,color:'#000'}}>{k.name}</Text>
                            <Text style={{fontSize:8}}>{k.theory}</Text>
                            </Body>
                            <Right style={{flexDirection:'column',justifyContent:'center'}}>
                                <View style={styles.circleView}>
                                    <Text>{k.part}</Text>
                                </View>
                            </Right>
                        </ListItem>
                    ))
                }

            </ScrollView>
        )
    }


}
const styles = {
    listItem:{backgroundColor:'#fff',marginRight:0,marginLeft:0,marginBottom:10,marginTop:10,paddingTop:20,paddingBottom:20},
    leftView:{width:70,height:70,flexDirection:'row',justifyContent:'center'},
    circleView:{width:60,height:60,borderRadius:30,backgroundColor:'#e5e5e5',alignItems:'center',justifyContent:'center'}
}*/

import React, {Component} from "react";
import {Actions} from "react-native-router-flux";
import {StyleSheet, View, ListView, RefreshControl,Alert,ToastAndroid,Image,Text} from "react-native";
import { List, ListItem, Left, Body, Right, Thumbnail,Button,Icon,Header} from 'native-base';

import {observer} from "mobx-react/native";
import Loading from "./Loading";
import NoList from "./NoList";
import LoadFooter from "./LoadFooter";
import CollectionListStore from "../../../mobx/collectionListStore";

@observer
export default class MovementList extends Component {

    state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
    }
    componentDidMount() {
        CollectionListStore.fetchCollectionList_theme()
    }
    _onRefresh = () => {
        CollectionListStore.isRefreshing_t = true
        CollectionListStore.fetchCollectionList_theme()
    }
    _onEndReach() {
        if (CollectionListStore.isLastPage_t) {
            return null
        }
        CollectionListStore.page_t++;
        CollectionListStore.fetchCollectionList_theme();
    }
    _renderRow(rowData) {
        return (
        <ListItem avatar style={styles.listItem} onPress={() =>this.onPress(rowData)} onLongPress={() =>this.longPress(rowData)}>
            <Left  style={{width:70}}>
                <View style={styles.leftView}>
                    <View style={{width:70}}>
                        <Image source={{uri:urls.apis.IMAGE + '?filePath='+ rowData.picPath}} style={{width:70,height:70,resizeMode:'contain'}}/>
                        <Image source={require('../image/play.png')} style={{width:20,height:20,position:'absolute',top:25,left:25}}/>
                    </View>
                </View>
            </Left>
            <Body>
             <Text style={{fontSize:20,color:'#000'}}>{rowData.name}</Text>
            <Text style={{fontSize:8}}>{rowData.principle}</Text>
            </Body>
            <Right style={{flexDirection:'column',justifyContent:'center',borderColor:'transparent'}}>
                <View style={styles.circleView}>
                    <Text>{rowData.onePosition}</Text>
                </View>
            </Right>
        </ListItem>
        )
    }
    longPress(rowData) {
        Alert.alert('操作提示', '您确定要取消该收藏吗?', [
            {text: '取消'},
            {text: '删除', onPress: () => this.removeMyCollection(rowData)},
        ])
    }
    onPress(rowData){
        Actions.movementDetail({title:rowData.title,id:rowData.actId})
    }
    removeMyCollection(rowData) {
        request.getJson(urls.apis.COLLECTIONAPI_DELETEMYCOLLECTION, {
            id: rowData.id
        }).then((result) => {
            if(result.ok){
                ToastAndroid.show('删除成功',ToastAndroid.SHORT);
                CollectionListStore.fetchCollectionList_theme()
            }


        });
    }
    _renderFooter() {
        return (
            <LoadFooter isEnd={CollectionListStore.isLastPage_t}/>
        )
    }
    render() {
        const {isRefreshing_t, isFetching_t, collectionList_theme,isNoResult_t} = CollectionListStore
        return (
            <View style={styles.listView}>
                {!isFetching_t &&
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(collectionList_theme.slice(0))}
                    renderRow={this._renderRow.bind(this)}
                    renderFooter={this._renderFooter}
                    enableEmptySections
                    initialListSize={3}
                    onScroll={this._onScroll}
                    onEndReached={this._onEndReach}
                    onEndReachedThreshold={30}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing_t}
                            onRefresh={this._onRefresh}
                            colors={['rgb(217, 51, 58)']}
                        />
                    }
                />
                }
               <NoList isShow={isNoResult_t}/>
            </View>
        )
    }

}
const styles = {
    listView: {
        flex: 1,
    },
    listItem:{backgroundColor:'#fff',marginRight:0,marginLeft:0,marginTop:5,paddingTop:20,paddingBottom:20},
    leftView:{width:70,height:70,flexDirection:'row',justifyContent:'center',marginLeft:5},
    circleView:{width:60,height:60,borderRadius:30,backgroundColor:'#e5e5e5',alignItems:'center',justifyContent:'center'}
}

