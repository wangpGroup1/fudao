import React, {Component} from "react";
import {Text,  Thumbnail,ListItem,Left,Body,Right,Button} from "native-base";
import {View,Image} from "react-native";
import {observer} from "mobx-react/native";
import ofthehillStore from "../../../mobx/ofthehillStore"
@observer
export default class HillItem extends Component {

    render() {

        let {activity,index,isPraise} = this.props;
        index=parseInt(index)+1;

        return (

            <ListItem avatar  style={styles.listView}>
                <Left>
                    <Thumbnail source={{uri:urls.getImage(activity.photo,500,500)}} />
                </Left>
                <Body style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View>
                        <Text>{activity.nickname?activity.nickname:activity.username}</Text>
                        <Text note>第{index}名</Text>
                    </View>
                    <Text style={styles.colorFont}>{activity.score} 分</Text>

                </Body>
                <Right style={{flexDirection:'column',justifyContent:'center'}}>


                    <Button transparent
                            onPress={()=>{activity.ispraise?isPraise(activity.id,2):isPraise(activity.id,1)}}
                            style={{height:38,flexDirection:'column',justifyContent:'center',width:20,alignItems:'center'}}>
                        <Text note style={{textAlign:'center',width:20,marginLeft:20}}>{activity.topraise}</Text>
                        {activity.ispraise?(<Image source={require('../image/heart.png')}
                                          style={styles.heartImage} >
                        </Image>):(<Image source={require('../image/nullheart.png')}
                                         style={styles.heartImage} >
                        </Image>)}
                    </Button>

                </Right>
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
    colorFont:{
        color:'#e76200',
        fontSize:26
    },
    listView:{
        marginBottom:10,
        marginLeft:0,
        backgroundColor:'#f4f4f4',
        paddingLeft:10
    },
    item: {
        marginLeft: 0,
        padding: 10,
    },
    row2: {
        marginTop: 10,
        marginBottom: 10
    },
    title: {
        fontSize: 14,
    },
    from: {
        fontSize: 12,
        color: '#AAAAAA'
    },
    timeDiff: {
        fontSize: 12,
        color: '#AAAAAA',
        marginLeft: 15
    },
    heartImage:{
        width:20,
        height:18,
        marginLeft:20
    }
};

