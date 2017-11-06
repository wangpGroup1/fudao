import React, {Component} from "react";
import {observer} from "mobx-react/native";
import {Right, Button, Left, Text,Body,Title} from "native-base";
import {Image, View, DeviceEventEmitter, TextInput, TouchableHighlight, TouchableOpacity, Alert} from 'react-native'
import ImagePicker from 'react-native-image-picker';
import {Container, Header, Content} from "../../components/index";
import dynamicStore from "../../mobx/dynamicStore";
import Editor from './components/Editor'
import NewPicture from './components/NewPicture'
import {Actions} from "react-native-router-flux";

/**
 * 动态
 */
@observer
export default class NewDynamic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        }
    }

    render() {
        let {right, imgList,imgUpload,changeImg} = dynamicStore;
        return (
            <Container>
                <Header  {...this.props} right={
                    <Right style={{flex:1}}>
                        <Button transparent onPress={this.send.bind(this)}><Text style={{color:'#000'}}>{right}</Text></Button>
                    </Right>
                } left={
                    <Left  style={{flex:1}}>
                        <Button transparent onPress={()=>Actions.pop()}><Text style={{color:'#000'}}>取消</Text></Button>
                    </Left>
                } />
                <Content white>
                    <Editor
                        placeholder="说点什么吧..."
                        onChangeText={(text) => {
                            this.setState({text: text})
                        }}
                        text={this.state.text}/>
                    <NewPicture
                        changeImg = {changeImg}
                        imgArr={imgList}
                        imgUpload={imgUpload}
                        addImage={this.addImage.bind(this)}
                        delImage={this.delImage.bind(this)}/>
                </Content>
            </Container>
        )
    }

    addImage() {
        const options = {
            title: '选择图片',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '从手机相册选择',
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };
        var source = {};
        ImagePicker.showImagePicker(options, (response) => {
            if (response.uri) {
                dynamicStore.uploadImg(response.uri);
            }
        });
    }

    delImage(i){
        Alert.alert('', '确定删除图片吗?', [
            {text: '取消'},
            {
                text: '删除',
                onPress: () => dynamicStore.delImg(i)
            }
        ])
    }

    send() {
        let {text} =this.state;
        // if (this.state.text||dynamicStore.renderPicture.length!=0) {
        if (text || dynamicStore.imgList.length > 0) {

            dynamicStore.addNewDynamic(text)
        } else {
            Alert.alert('', '内容不能为空~~', [{text: '确定'}])
        }
    }
}

const styles = {
    container: {
        flex: 1,
    },
    content: {
        backgroundColor: '#fff'
    },
    textInput: {
        height: 100,
    },
}