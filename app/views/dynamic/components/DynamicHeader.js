import React, {Component} from "react";
import {Text} from "native-base";
import {View, Image, TouchableOpacity,Dimensions} from "react-native";
import styles from "../assets/styles";
import ImagePicker from "react-native-image-picker";
import dynamicStore from "../../../mobx/dynamicStore";
import userStore from "../../../mobx/userStore";

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


/**
 * 动态头部
 */
export default class DynamicHeader extends Component {
    componentWillMount() {
        let {user,id,phone} = this.props;
        if(!id){
            dynamicStore.fetchPhoto(user.id, user.phone);
        }else{
            // dynamicStore.fetchPhoto(id, phone);
        }
    }

    render() {
        let {user,pic,photo,remark,picPath} = this.props;
        let {loginUser} = userStore;
        return (
            <View>
                <TouchableOpacity style={styles.content1} activeOpacity={1} onPress={this.cameraAction}>
                    <Image
                        source={pic&&picPath!='none'?{uri: urls.getImage(picPath?picPath:pic, Dimensions.get('window').width * 3, 700)}:require('../assets/bj.jpg')}
                        style={styles.bgImg}/>
                </TouchableOpacity>
                <View style={styles.person}>
                    <Text style={styles.colorfff}>{remark?remark:(loginUser.nickname || loginUser.username)}</Text>
                </View>
                <View style={styles.touxiangView}>
                    <Image source={{uri: urls.getImage(photo?photo:user.photo, 700, 500)}} style={styles.touxiang}/>
                </View>
            </View>
        )
    }

    cameraAction = () => {
        let {id} = this.props;
        if (!id) {
            ImagePicker.showImagePicker(photoOptions, (response) => {
                if (response && response.fileName && response.uri) {
                    dynamicStore.updateDynamicPhoto(response.uri, response.fileName);
                }
            })
        }
    }


}

DynamicHeader.propTypes = {
    article: React.PropTypes.object, // 资讯
    onPress: React.PropTypes.func,
    onLongPress: React.PropTypes.func,
}
