import React, {Component} from "react";
import {View, Image, TouchableOpacity} from "react-native";
import {Button, Text} from "native-base";
import {Container, Content} from "../../components";
import {Actions, ActionConst} from "react-native-router-flux";
import {observer} from "mobx-react/native";
import userStore from "../../mobx/userStore";
import UserButton from "./components/UserButton";
import * as Wechat from 'react-native-wechat';
import * as QQAPI from 'react-native-qq';
import * as WeiboAPI from 'react-native-weibo';
let resolveAssetSource = require('resolveAssetSource');
@observer
export default class Start extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    componentWillMount() {

        if (userStore.isLogin) {
            if(userStore.loginUser.sex){
                Actions.index({
                    type: ActionConst.REPLACE
                });
            }
        }
    }

    wxLogin() {
        let scope = 'snsapi_userinfo';
        let state = 'wechat_sdk_demo';
        Wechat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    Wechat.shareToTimeline({
                        type: 'news',
                        title: '福道健康环',
                        description: '福道健康环',
                        webpageUrl: 'www.baidu.com',
                        imageUrl: resolveAssetSource(require('../../assets/pyq.png')).uri
                    }).then(res => {
                        console.log(res)
                    })
                } else {
                    tools.showToast("没有安装微信软件，请您安装微信之后再试");
                }
            });
        // Wechat.isWXAppInstalled()
        //     .then((isInstalled) => {
        //         if (isInstalled) {
        //             Wechat.sendAuthRequest(scope, state)
        //                 .then(responseCode => {
        //                     console.log(responseCode)
        //                     // this.getAccessToken(responseCode.code);
        //                 })
        //             // .catch(err => {
        //             //     alert('登录授权发生错误：', err.message, [
        //             //         {text: '确定'}
        //             //     ]);
        //             // })
        //         } else {
        //             alert('没有安装微信')
        //         }
        //     })
    }

    qqLogin() {
        let scope = 'get_simple_userinfo';
        let url;
        QQAPI.login(scope)
            .then(res => {
                console.log({
                    access_token: "CFA4801ACEA19D218687BC2D1C8543EC",
                    errCode: 0,
                    expires_in: 1505370037958,
                    oauth_consumer_key: "1106338651",
                    openid: "5444E7A9E072532A8079B3F0231F6799"
                })
                url = 'https://graph.qq.com/user/get_user_info?access_token=' + res.access_token + '&oauth_consumer_key=' + res.oauth_consumer_key + '&openid=' + res.openid;
                request.getJson(url)
                    .then((res1) => {
                        console.log({
                            city: "墨尔本",
                            figureurl: "http://qzapp.qlogo.cn/qzapp/1106338651/5444E7A9E072532A8079B3F0231F6799/30",
                            figureurl_1: "http://qzapp.qlogo.cn/qzapp/1106338651/5444E7A9E072532A8079B3F0231F6799/50",
                            figureurl_2: "http://qzapp.qlogo.cn/qzapp/1106338651/5444E7A9E072532A8079B3F0231F6799/100",
                            figureurl_qq_1: "http://q.qlogo.cn/qqapp/1106338651/5444E7A9E072532A8079B3F0231F6799/40",
                            figureurl_qq_2: "http://q.qlogo.cn/qqapp/1106338651/5444E7A9E072532A8079B3F0231F6799/100",
                            gender: "男",
                            is_lost: 0,
                            is_yellow_vip: "0",
                            is_yellow_year_vip: "0",
                            level: "0",
                            msg: "",
                            nickname: "ZhaN",
                            province: "维多利亚",
                            ret: 0,
                            vip: "0",
                            year: "1992",
                            yellow_vip_level: "0",
                        })
                        request.postJson(urls.apis.USER_OTHERPORTYLOGIN, {
                            username: res.openid,
                            sex: res1.gender === '男' ? 1 : 2,
                            birthday: tools.dateFormat(new Date(res1.year, 1, 1),'yyyy-MM-dd'),
                            photo: res1.figureurl_qq_2,
                            nickname:  res1.nickname
                        }).then((res2) => {
                            if(res2.ok){
                               if(res2.obj.isPhoneExict){
                                   userStore.otherLogin(res2.obj.message,() => {
                                       userStore.fetchLoginUser();
                                   });
                               } else {
                                   Actions.setUserPhone({username: res.openid,token: res2.obj.message});
                               }
                            }
                        })
                    })
            })
    }

    wbLogin() {
        let url;
        WeiboAPI.login()
            .then(res => {
                url = 'https://api.weibo.com/2/users/show.json?access_token=' + res.accessToken + '&uid=' + res.userID;
                // console.log({
                //     accessToken: "2.00udoWOG0y9F3e7a76904d7cbvYnkC",
                //     errCode: 0,
                //     expirationDate: 1663064368338,
                //     refreshToken: "2.00udoWOG0y9F3ea6576aeaebQenAPD",
                //     type: "WBAuthorizeResponse",
                //     userID: "5711486866",
                // })
                request.getJson(url)
                    .then((res1) => {
                        request.postJson(urls.apis.USER_OTHERPORTYLOGIN, {
                            username: res.userID,
                            sex: res1.gender === 'm' ? 1 : 2,
                            birthday: tools.dateFormat(new Date(),'yyyy-MM-dd'),
                            photo: res1.avatar_large,
                            nickname:  res1.screen_name
                        }).then((res2) => {
                            if(res2.ok){
                                if(res2.obj.isPhoneExict){
                                    userStore.otherLogin(res2.obj.message,() => {
                                        userStore.fetchLoginUser();
                                    });
                                } else {
                                    Actions.setUserPhone({username: res.openid,token: res2.obj.message});
                                }
                            }
                        })
                    });
            })
    }

    render() {
            return (
                <Container>
                    <Content gray>
                        <View style={styles.box}>
                            <Image style={styles.logo} source={require('../../assets/ic_launcher.png')}/>
                        </View>
                        <View style={{flexDirection: 'row',justifyContent: 'space-around'}}>
                            <UserButton icon underline text="注册" onPress={() => Actions.register()} buttonStyle={{width: 150}}/>
                            <UserButton icon underline text="登录" onPress={() => Actions.login()} buttonStyle={{width: 150}}/>
                        </View>
                        <View style={styles.box}>
                            <Text style={{marginTop: 30}}>----</Text>
                            <Text style={{marginTop: 30}}>其他登录方式</Text>
                        </View>
                        <View style={styles.imgBox}>
                            <TouchableOpacity activeOpacity={1} onPress={this.wxLogin.bind(this)} disabled>
                                <Image style={styles.img} source={require('../../assets/weixin1.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} onPress={this.qqLogin.bind(this)}>
                                <Image style={styles.img} source={require('../../assets/qq.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} onPress={this.wbLogin.bind(this)}>
                                <Image style={styles.img} source={require('../../assets/weibo1.png')}/>
                            </TouchableOpacity>
                        </View>
                    </Content>
                </Container>
            )
        }


}
const styles = {
    viewButton: {
        backgroundColor: 'pink',
        marginTop: 120,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    btn: {
        width: 100,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.24)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#fff',
        fontSize: theme.DefaultFontSize + 2
    },
    logo: {
        marginTop: 40,
        width: 140,
        height: 140,
        borderRadius: 20,
    },
    box: {justifyContent: 'center', alignItems: 'center'},
    imgBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30
    },
    img: {
        width: 50,
        height: 50
    }
};
