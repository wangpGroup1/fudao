/**
 * Created by Administrator on 2017/5/16.
 */
import React, {PureComponent} from "react";
import {StyleSheet, View, Image, ActivityIndicator,TextInput,TouchableOpacity} from "react-native";
import { Text} from "native-base";
import {Container, Content,Header} from "../../components/index";

/**
 * 意见反馈
 */
const dismissKeyboard = require('dismissKeyboard');
export default class Feedback extends PureComponent {
    state={
        feed:''
    }
    render() {
        return (
            <Container>
                <Header {...this.props} />
                <Content white padder>
                    <View style={{justifyContent:"center",alignItems:"center"}}>
                        <View style={styles.TextBox}>
                            <TextInput
                                value={this.state.feed}
                                style={{ textAlignVertical:"top",height:160,}}
                                underlineColorAndroid="transparent"
                                placeholder={"您的意见是我们进步的动力！"}
                                multiline={true}
                                numberOfLines={8}
                                onChangeText={(text)=>this.setState({
                                    feed:text
                            })}/>
                        </View>
                        <TouchableOpacity style={styles.btn} onPress={this._onPressButton.bind(this)}>
                            <Text style={styles.text}>提交</Text>
                        </TouchableOpacity>
                    </View>
                </Content>
            </Container>
        );
    }
    _onPressButton(){
        dismissKeyboard();
        let value=this.state.feed;
        request.getJson(urls.apis.FEEDBACK_SUBMIT, {
            content:value
        }).then((result) => {
            if(result.ok){
                tools.showToast("提交成功！")
            }
        });
        this.setState({
            feed:''
        })
    }

}

const styles = {
    TextBox:{
        width:theme.deviceWidth*0.9,
        height:160,
        borderWidth:1,
        borderColor:theme.brandPrimary,
        borderRadius:5
    },
    btn:{
        marginTop:20,
        width:theme.deviceWidth*0.85,
        height:40,
        backgroundColor:theme.brandPrimary,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20
    },
    text:{
        color:'#fff',
        fontSize:theme.DefaultFontSize+2
    }
};
