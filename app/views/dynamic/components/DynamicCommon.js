import React, {Component} from "react";
import {Text} from "native-base";
import {View, Image, TouchableHighlight,TouchableOpacity} from "react-native";
import DynamicImage from './DynamicImage';
import {Actions} from "react-native-router-flux";
import dynamicStore from "../../../mobx/dynamicStore";
import userStore from "../../../mobx/userStore";

/**
 * 动态公共部分
 */
export default class DynamicCommon extends Component {
    render() {
        let {info} = this.props;
        if (!info.user) {
            return null;
        }
        var arr_pic = info.path.split(',');
        if(info.content.length>20){
            var content = info.content.substring(0,20)+'......';
        }else{
            var content = info.content;
        }
        return (
            <View style={styles.dynamicCommon}>
                <TouchableOpacity activeOpacity={1} onPress={()=>userStore.loginUser.id!=info.user.id?Actions.friendMessage({userId: info.user.id}):null}>
                    <Image source={{uri: urls.getImage(info.user.photo,500,500)}} style={styles.dynamicTouxiang}/>
                </TouchableOpacity>
                <TouchableHighlight style={styles.dynamicDetail} underlayColor='#fafafa'
                                    onPress={this._skipToDetail.bind(this)}>
                    <View>
                        <Text
                            style={styles.dynamicName}>{info.user.friendremark||p.user.nickname||info.user.phone || "用户" + JSON.stringify(info.user.id).substr(1, 4)}</Text>
                        <View style={styles.dynamicContain}>
                            {info.path?<Image source={{uri: urls.getImage(arr_pic[0], 600, 600)}} style={styles.msgImage}/>:null}
                            <Text style={styles.dynamicContent}>{content}</Text>
                            {/*<DynamicImage imagePath={info.path}/>*/}
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    _skipToDetail() {
        let {info} = this.props;
        dynamicStore.dynamicDetail(info);
        Actions.dynamicDetail()
        // const {dispatch} = this.props;
        // dispatch(skipToDetail(this.props.info, this.props.newnew));
    }

}

const styles = {
    dynamicCommon: {
        flexDirection: 'row',
    },
    dynamicDetail: {
        flex: 1,
        marginTop: 10,
    },
    dynamicTouxiang: {
        width: 50,
        height: 50,
        marginRight: 12,
        borderRadius: 50,
        overflow: 'hidden',
        borderColor: '#CECECE',
        borderWidth: 0.5,
    },
    dynamicName: {
        color: '#786e7f',
        fontSize: theme.DefaultFontSize,
    },
    dynamicContent: {
        color: '#282828',
        fontSize: theme.DefaultFontSize,
        flex:1,
        padding:4,
        paddingTop:8,
    },
    dynamicContain:{
        marginTop: 6,
        padding:10,
        backgroundColor:'#f3f3f5',
        flexDirection:'row'
    },
    msgImage:{
        width:60,
        height:60
    }
};

DynamicCommon.propsTypes = {
    info: React.PropTypes.object,
};
DynamicCommon.defaultProps = {
    info: {},
};

