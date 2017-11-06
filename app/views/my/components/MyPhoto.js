import React, {Component} from "react";
import {TouchableOpacity, Image} from "react-native";
import {Thumbnail, Text, View,Icon} from "native-base";
import ImagePicker from "react-native-image-picker";
import {observer} from "mobx-react/native";
import userStore from "../../../mobx/userStore";
import {Actions} from "react-native-router-flux";

const photoOptions = {
    title: '请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    quality: 0.75,
    allowsEditing: true,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
}
const defaultPhoto = require('../../../assets/avatar.jpg');

@observer
export default class MyPhoto extends Component {

    cameraAction = () => {
        ImagePicker.showImagePicker(photoOptions, (response) => {
            if (response && response.fileName && response.uri) {
                userStore.updateUserPhoto(response.uri, response.fileName);
            }
        })
    }

    render() {
        const {loginUser} = userStore;
         // alert(JSON.stringify(loginUser))
        return (
            <TouchableOpacity style={styles.myCover} onPress={() => Actions.myInfo()} activeOpacity={1}>
                <Image style={styles.myPhoto} source={loginUser.photo ? {uri: urls.getImage(loginUser.photo,300,300)} : defaultPhoto}/>
                <View style={styles.myInfo}>
                    <View>
                        <Text style={styles.myName}>{loginUser.nickname || loginUser.username}</Text>
                        {/*<Text style={[styles.myName,{marginTop: 10}]}>等级：100</Text>*/}
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={require('../../../assets/ewm.png')} style={{width: 28,height: 28,marginRight: 10}}/>
                        <Icon name="ios-arrow-forward" style={{color: '#666'}}/>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


}

const styles = {
    myCover: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E3E7F3',
        padding: 15,
        marginTop: 20,
        marginBottom: 30
    },
    myPhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    myInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 15
    },
    myName: {
        fontSize: 16,
        color: '#666'
    }
};