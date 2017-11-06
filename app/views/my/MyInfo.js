import React, {Component} from "react";

import {Alert, Image, ScrollView, Text, TextInput, TouchableOpacity} from "react-native";
import {ActionConst, Actions} from "react-native-router-flux";
import {Header} from "../../components";
import {Body, Button, Icon, Left, ListItem, Right, View} from "native-base";
import ImagePicker from "react-native-image-picker";
import {observer} from "mobx-react/native";
import userStore from "../../mobx/userStore";
import QRCode from "react-native-qrcode";
import DatePicker from "react-native-datepicker";
import dynamicStore from "../../mobx/dynamicStore";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import WomanChoose from "../login/components/WomanChoose";

const photoOptions = {
    title: '请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    quality: 1,
    allowsEditing: true,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
}
const defaultPhoto = require('../../assets/avatar.jpg');

@observer
export default class MyInfo extends Component {

    constructor() {
        super()
        this.state = {
            date: userStore.loginUser.birthday,
            sexPickerVisible: false,
            sex: userStore.loginUser.sex === 1 ? '男' : '女',
            nickname: userStore.loginUser.nickname,
            signname: userStore.loginUser.signname,
            crowdname: userStore.loginUser.crowdname,
        }
    }

    cameraAction = () => {
        ImagePicker.showImagePicker(photoOptions, (response) => {
            if (response && response.fileName && response.uri) {
                userStore.updateUserPhoto(response.uri, response.fileName);
            }
        })
    }

    quitAlert() {
        let {realm} = dynamicStore;
        Alert.alert('提示信息', '确定要退出吗？', [
            {text: '取消'},
            {
                text: '确定', onPress: () => {
                realm.write(() => {
                    let Dynamic = realm.objects('Dynamic');
                    realm.delete(Dynamic);
                });
                this.quit()
            }
            },
        ])
    }

    quit() {
        userStore.logout();
        Actions.start({type: ActionConst.RESET});
    }

    onSexPress() {
        this.refs.sexPicker.show()
    }

    commit() {
        request.postJson(urls.apis.USER_SETUSERBASEINFO, {
            phone: userStore.loginUser.phone,
            sex: userStore.loginUser.sex,
            birthday: this.state.date,
            nickname: this.state.nickname,
            signname: this.state.signname,
            crowd: this.state.crowdname
        }).then(res => {
            // alert(JSON.stringify(res))
            if (res.ok) {
                tools.showToast("保存成功")
                request.getJson(urls.apis.USER_GETLOGINUSER)
                    .then((data) => {
                        if (data.ok) {
                            userStore.loginUser = data.obj
                            Actions.pop()
                        }
                    });
            }
        })
    }

    _jieduan(text) {
        this.setState({
            crowdname: text
        })
    }

    changeSex(sex) {
        this._modal.show();
    }

    render() {
        const {loginUser} = userStore;
        return (

            <KeyboardAwareScrollView style={{flex:1,backgroundColor: '#fff'}}>

                    <Header {...this.props} right={
                        <Right style={{marginRight: 5}}>
                            <Text style={{fontSize: 16, color: '#333'}} onPress={this.commit.bind(this)}>保存</Text>
                        </Right>
                    }/>
                    <ScrollView
                        contentContainerStyle={{backgroundColor: '#fff'}}
                    >
                        <View style={{height: 120, justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity activeOpacity={1} onPress={this.cameraAction}>
                                <Image style={styles.myPhoto}
                                       source={loginUser.photo ? {uri: urls.getImage(loginUser.photo, 300, 300)} : defaultPhoto}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.row}>
                            <Text>昵称</Text>
                            <TextInput
                                style={{textAlign: 'right', flex: 1, padding: 0}}
                                underlineColorAndroid='transparent'
                                maxLength={12}
                                placeholder={loginUser.nickname || loginUser.username}
                                onChangeText={(value) => {
                                    this.setState({nickname: value})
                                }}
                            />
                        </View>
                        <View style={styles.row}>
                            <Text>性别</Text>
                            <Text>{loginUser.sex === 1 ? '男' : '女'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text>出生日期</Text>
                            <DatePicker
                                style={{width: 100}}
                                date={this.state.date}
                                showIcon={false}
                                mode="date"
                                placeholder={loginUser.birthday}
                                format="YYYY-MM-DD"
                                confirmBtnText="确定"
                                cancelBtnText="取消"
                                customStyles={{
                                    dateInput: {borderWidth: 0, flexDirection: 'row', justifyContent: 'flex-end'},
                                    dateText: {color: "#666", fontSize: 16},
                                    placeholderText: {color: "#666", fontSize: 16}
                                }}
                                onDateChange={(date) => {
                                    this.setState({date: date})
                                }}
                            />
                        </View>
                        {
                            loginUser.sex === 1 ? null :
                                <View style={styles.row}>
                                    <Text>我的状态</Text>
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={this.changeSex.bind(this, 2)}
                                    >
                                        <Text>{this.state.crowdname}</Text>
                                    </TouchableOpacity>
                                </View>
                        }
                        <View style={styles.row}>
                            <Text>个性签名</Text>
                            <TextInput
                                style={{textAlign: 'right', flex: 1, padding: 0}}
                                underlineColorAndroid='transparent'
                                maxLength={120}
                                placeholder={loginUser.signname || ''}
                                onChangeText={(value) => {
                                    this.setState({signname: value})
                                }}
                            />
                        </View>
                        <View style={{backgroundColor: '#E3E7F3', marginLeft: 0, paddingLeft: 15, paddingTop: 10}}>
                            <Text>我的二维码</Text>
                        </View>
                        <View style={{
                            backgroundColor: '#E3E7F3',
                            paddingTop: 10,
                            paddingBottom: 10,
                            alignItems: 'center'
                        }}>
                            <View style={{
                                width: 120,
                                height: 120,
                                backgroundColor: '#fff',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <QRCode
                                    value={userStore.phone}
                                    size={100}
                                    bgColor='purple'
                                    fgColor='white'/>
                            </View>
                        </View>

                        <View style={{
                            flexDirection: "row",
                            justifyContent: 'center',
                        }}>
                            <Button style={{
                                width: 180,
                                height: 40,
                                marginTop: 10,
                                marginBottom: 10,
                                backgroundColor: '#726585',
                                justifyContent: 'center'
                            }}
                                    onPress={this.quitAlert.bind(this)}>
                                <Text style={{color: '#fff'}}>退出登录</Text>
                            </Button>
                        </View>
                    </ScrollView>
                    <WomanChoose ref={(e) => this._modal = e} onPress={this._jieduan.bind(this)}/>


            </KeyboardAwareScrollView>
        )
    }
}

const styles = {
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#E3E7F3',
        paddingLeft: 15,
        paddingRight: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    myCover: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E3E7F3',
        padding: 15,
        marginTop: 15,
        marginBottom: 30
    },
    myPhoto: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    myInfo: {
        marginLeft: 15
    },
    myName: {
        fontSize: 16,
    }
};
