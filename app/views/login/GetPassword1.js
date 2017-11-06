import React, {PureComponent} from "react";
import {Text, Button} from "native-base";
import {Header, Container, Content} from "../../components/";
import {Actions} from "react-native-router-flux";
import  UserInput from "./components/UserInput";
import  UserButton from "./components/UserButton";
import TestButton from "./components/TestButton";
import {checkPhone} from "./components/public";

const dismissKeyboard = require('dismissKeyboard');

export default class Register extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            code: '',
        }
    }

    verify() {
        let phone = this.state.phone;
        if (!checkPhone(phone)) {
            tools.showToast("请填入正确的手机号");
        } else {
            request.getJson(urls.apis.USER_CHECKPHONEREGISTERED, {phone: phone})
                .then((data) => {
                    if (data.ok) {
                        request.getJson(urls.apis.USER_SENDCODE, {phone: phone})
                            .then((data) => {
                                if (data.ok) {
                                    this._testButton._click();
                                    tools.showToast("发送验证码成功");
                                } else {
                                    tools.showToast("发送验证码失败");
                                }
                            })
                    } else {
                        tools.showToast("手机号未注册");
                    }
                })
        }
    }

    find() {
        let {phone, code} = this.state;
        if (!checkPhone(phone)) {
            tools.showToast("请填入正确的手机号");
            return;
        }
        dismissKeyboard();
        request.getJson(urls.apis.USER_CHECKCODE, {phone: phone, code: code})
            .then((data) => {
                if (data.ok) {
                    Actions.getPassword2({phone: phone});
                } else {
                    tools.showToast("验证码错误");
                }
            })
    }

    render() {
        return (
            <Container>
                <Header {...this.props}></Header>
                <Content white padder>
                    <UserInput
                        placeholder="手机号"
                        keyboardType={'numeric'}
                        iconName="ios-phone-portrait-outline"
                        onChangeText={(value) => {
                            this.setState({phone: value})
                        }}
                    />
                    <UserInput
                        placeholder="验证码"
                        keyboardType={'numeric'}
                        iconName="ios-phone-portrait-outline"
                        onChangeText={(value) => {
                            this.setState({code: value})
                        }}
                    >
                        <TestButton
                            ref={(e) => this._testButton = e}
                            onPress={this.verify.bind(this)}
                        />
                    </UserInput>
                    <UserButton text="找回密码" onPress={this.find.bind(this)}/>
                </Content>
            </Container>
        );
    }
}

