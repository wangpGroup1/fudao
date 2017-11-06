import React, {PureComponent} from "react";
import {StyleSheet, View, Text, Image, ActivityIndicator} from "react-native";

import {Actions} from "react-native-router-flux";
import {Container, Content,Header} from "../../components/index";
import SHeader from "../../components/header/SearchHeader";
import userStore from "../../mobx/userStore";


/**
 * 搜索用户
 */
export default class AddFriend extends PureComponent {

    state = {
        notExist: false,
        value:''
    };

    render() {
        let {notExist,value} = this.state;
        return (
            <Container>
                <Header {...this.props}/>

                <Content white>
                    <View style={{width:'100%',height:80}}>
                        <SHeader placeholder="搜索手机号" onSearch={this._onSearch.bind(this)} style={{marginTop:20}} search={this._onSearch.bind(this,value)} onChangeText={(value)=>this.onChangeText(value)}/>
                    </View>

                    {notExist ? this.renderNoUser() : null }
                    <View style={{width:'100%',height:300,alignItems:'center'}}>

                        <Image
                            source={require('./image/code.png')}
                            style={{width:100,height:100,marginBottom:10}}
                            onStartShouldSetResponder={()=>Actions.barcodescanner()}
                        />
                        <Text>扫描二维码添加好友</Text>
                    </View>
                </Content>
            </Container>
        );
    }

    renderNoUser() {
        tools.showToast("该用户不存在");

    }

    onChangeText(value){
        this.setState({
            value
        })

    }


    // 搜索
    _onSearch(phone) {
        let {loginUser} = userStore;

        if(phone!=loginUser.phone){
            request.getJson(urls.apis.USER_SEARCH, {phone})
                .then(((result) => {

                    if (result.ok) {
                        if (result.obj) {
                            this.setState({
                                notExist: false
                            })
                            Actions.userDetail({
                                userId: result.obj.id
                            })
                        } else {
                            this.setState({
                                notExist: true
                            })
                        }
                    }
                }), (error) => {
                    dispatch(hideLoading());
                });
        }else{
            alert('不能添加自己为好友哦~~');
        }

    }

}

const styles = {
    noUserView: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    }
};