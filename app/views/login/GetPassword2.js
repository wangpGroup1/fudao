import React, {PureComponent} from "react";
import {Header, Container, Content} from "../../components";
import {View,Text, Button} from "native-base";
import {Actions,ActionConst} from "react-native-router-flux";
import  UserInput from "./components/UserInput"
import  UserButton from "./components/UserButton";
import {checkPwd} from "./components/public";
import userStore from "../../mobx/userStore";

const dismissKeyboard = require('dismissKeyboard');

export default class RebuildPassword extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            ConfirmPassword: '',
            phone: this.props.phone
        }
    }

    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    }

    find() {
        let {phone, password, ConfirmPassword} = this.state;
        if (!checkPwd(password)) {
            tools.showToast("请填入6-12由字母或数字或下划线组成的密码！");
            return;
        }
        if (ConfirmPassword !== password) {
            tools.showToast("两次输入密码不一致");
            return;
        }
        dismissKeyboard();
        request.getJson(urls.apis.USER_RESETPASSWORD, {phone: phone, password: password})
            .then((data) => {
                if (data.ok) {
                    tools.showToast("密码修改成功");
                    userStore.login(phone, password, () => {
                        userStore.fetchLoginUser();
                    });
                    // this.timer = setTimeout(function () {
                    //     Actions.index({type: ActionConst.RESET,});
                    // }, 1000);
                } else {
                    tools.showToast("密码修改失败");
                }
            })
    }

    render() {
        return (
            <Container>
                <Header {...this.props}></Header>
                <Content white padder>
                    <UserInput
                        placeholder="新密码"
                        maxLength={12}
                        iconName="ios-phone-portrait-outline"
                        secureTextEntry={true}
                        onChangeText={(value) => {
                            this.setState({password: value})
                        }}
                    />
                    <UserInput
                        placeholder="重复密码"
                        maxLength={12}
                        iconName="ios-phone-portrait-outline"
                        secureTextEntry={true}
                        onChangeText={(value) => {
                            this.setState({ConfirmPassword: value})
                        }}
                    />
                    <UserButton text="提交" onPress={this.find.bind(this)}/>
                </Content>
            </Container>
        );
    }


}




