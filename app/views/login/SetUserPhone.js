import React, {PureComponent} from "react";
import {View,Text} from "native-base";
import {Container, Content,Header} from "../../components";
import {Actions} from "react-native-router-flux";
import UserButton from "./components/UserButton";
import UserInput from "./components/UserInput";
import TestButton from "./components/TestButton";
import {checkPhone,checkPwd} from "./components/public";
import userStore from "../../mobx/userStore";

const dismissKeyboard = require('dismissKeyboard');

export default class SetUserPhone extends PureComponent {

    constructor() {
        super()
        this.state = {
            phone: '',
            code: '',
        }
    }
    verify() {
        let { phone } = this.state;
        if (!checkPhone(phone)) {
            tools.showToast("请填入正确的手机号");
        }else{
            request.getJson(urls.apis.USER_SENDCODE, {phone: phone})
                .then((data) => {
                    if (data.ok) {
                        this._testButton._click();
                        tools.showToast("发送验证码成功");
                    } else {
                        tools.showToast("发送验证码失败");
                    }
                })
        }
    }
    bindPhone() {
        let {phone,code} = this.state;
        let {username,token} = this.props
        if (!checkPhone(phone)) {
            tools.showToast("请输入正确的用户名");
            return;
        }

        dismissKeyboard();
        request.getJson(urls.apis.USER_CHECKCODE, {phone: phone, code: code})
            .then(data => {
                if (data.ok) {
                    request.getJson(urls.apis.USER_SETUSERPHONE, {phone: phone, username: username})
                        .then(res => {
                            if(res.ok){
                                tools.showToast("绑定成功");
                                userStore.otherLogin(res.obj,() => {
                                    userStore.fetchLoginUser();
                                });
                            }else {
                                tools.showToast("绑定失败");
                            }
                        })
                } else {
                    tools.showToast("验证码错误");
                }
            })
    }

    render() {

        return (
            <Container>
                <Header {...this.props}/>
                <Content white padder>
                    <UserInput
                        placeholder="手机号"
                        maxLength={11}
                        iconName="ios-phone-portrait-outline"
                        keyboardType={'numeric'}
                        onChangeText={(value) => {
                            this.setState({phone: value})
                        }}
                    />
                    <UserInput
                        placeholder="验证码"
                        maxLength={6}
                        iconName="ios-phone-portrait-outline"
                        keyboardType={'numeric'}
                        onChangeText={(value) => {
                            this.setState({code: value})
                        }}
                    >
                        <TestButton
                            ref={(e) => this._testButton = e}
                            onPress={this.verify.bind(this)}
                        />
                    </UserInput>
                    <UserButton text="完成" onPress={this.bindPhone.bind(this)}/>
                </Content>
            </Container>
        );
    }
}

const styles = {
    textBox: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        color: theme.brandPrimary,
        textDecorationLine: 'underline'
    },
};
