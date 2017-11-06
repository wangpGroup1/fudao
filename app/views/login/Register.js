import React, {PureComponent} from "react";
import {TouchableOpacity} from 'react-native'
import {View, Text, Button} from "native-base";
import {Container, Content, Header} from "../../components";
import {Actions, ActionConst} from "react-native-router-flux";
import  UserInput from "./components/UserInput"
import UserButton from "./components/UserButton";
import TestButton from "./components/TestButton";
import {checkPhone,checkPwd} from "./components/public";
import userStore from "../../mobx/userStore";

const dismissKeyboard = require('dismissKeyboard');

export default class Register extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
            confirmPassword: '',
            code: '',
        }
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    verify() {
        let { phone, password, confirmPassword,  } = this.state;
        if (!checkPhone(phone)) {
            tools.showToast("请填入正确的手机号");
        }else if(!checkPwd(password)){
            tools.showToast("请填入6-12由字母或数字或下划线组成的密码！");
        } else if (confirmPassword !== password) {
            tools.showToast("两次输入密码不一致");
        }else{
            request.getJson(urls.apis.USER_CHECKPHONEREGISTERED, {phone: phone})
                .then((data) => {
                    if (data.message != "用户已注册") {
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
                        tools.showToast("手机号已注册");
                    }
                })
        }
    }

    register() {
        let {phone, password, confirmPassword, code} = this.state;
            dismissKeyboard();
            request.getJson(urls.apis.USER_CHECKCODE, {phone: phone, code: code})
                .then((data) => {
                    if (data.ok) {
                        if (confirmPassword !== password) {
                            tools.showToast("两次输入密码不一致");
                        }else{
                            request.getJson(urls.apis.USER_REGISTER, {phone: phone, password: password})
                                .then((data) => {
                                    if (data.ok) {
                                        tools.showToast("注册成功");
                                        this.timer = setTimeout(function () {
                                            Actions.startInformation({
                                                phone:phone,
                                                password:password,
                                            })
                                        }, 1000);
                                        /*this.timer = setTimeout(function () {
                                            userStore.login(phone, password, () => {
                                                userStore.fetchLoginUser();
                                            });
                                        }, 1000);*/
                                    } else {
                                        tools.showToast("注册失败");
                                    }
                                })
                        }

                    } else {
                        tools.showToast("验证码错误");
                    }
                })
        }

    render() {
        return (
            <Container>
                <Header {...this.props}/>
                <Content white padder style={{justifyContent: 'space-between'}}>
                    <View>
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
                            placeholder="密码"
                            maxLength={12}
                            iconName="ios-lock-outline"
                            secureTextEntry={true}
                            onChangeText={(value) => {
                                this.setState({password: value})
                            }}
                        />
                        <UserInput
                            placeholder="确认密码"
                            maxLength={12}
                            iconName="ios-lock-outline"
                            secureTextEntry={true}
                            onChangeText={(value) => {
                                this.setState({confirmPassword: value})
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
                        <UserButton text="注册" onPress={this.register.bind(this)}/>
                    </View>
                    <TouchableOpacity onPress={() => Actions.userAgreement()}>
                        <Text style={styles.item}>点击注册代表您已同意</Text>
                        <Text style={styles.item}>《活·动使用协议和隐私条款》</Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        );
    }
}

const styles = {
    item: {
        textAlign: 'center',
        color: theme.brandPrimary
    }
};


