import React, {PureComponent} from "react";
import {View,Text} from "native-base";
import {Container, Content,Header} from "../../components";
import {Actions} from "react-native-router-flux";
import UserButton from "./components/UserButton";
import UserInput from "./components/UserInput";
import {checkPhone,checkPwd} from "./components/public";
import userStore from "../../mobx/userStore";

const dismissKeyboard = require('dismissKeyboard');

export default class Login extends PureComponent {

    constructor() {
        super()
        this.state = {
            phone: '',
            password: '',
        }
    }
  /*  componentWillMount() {
        /!*alert(userStore.isLogin +'////'+ userStore.loginUser.sex)
         if (userStore.isLogin && userStore.loginUser.sex) {
         Actions.index({type: ActionConst.RESET});
         }*!/

        if (userStore.isLogin) {
            if(userStore.loginUser.sex){
                Actions.index({
                    type: ActionConst.REPLACE
                });
            }
        }
    }*/
    login() {
        let {phone, password} = this.state;
        if (!checkPhone(phone)) {
            tools.showToast("请输入正确的用户名");
            return;
        }
        if (!checkPwd(password)) {
            tools.showToast("请填入6-12由字母或数字或下划线组成的密码！");
            return;
        }
        dismissKeyboard();
        userStore.login(phone, password, () => {
            userStore.fetchLoginUser();
        });
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
                        placeholder="密码"
                        maxLength={12}
                        iconName="ios-lock-outline"
                        secureTextEntry={true}
                        onChangeText={(value) => {
                            this.setState({password: value})
                        }}
                    />
                    <UserButton text="登录" onPress={this.login.bind(this)}/>
                    <View style={styles.textBox}>
                        <Text style={styles.text} onPress={() => Actions.register()}>注册账号</Text>
                        <Text style={styles.text} onPress={() => Actions.getPassword1()}>忘记密码</Text>
                    </View>
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
