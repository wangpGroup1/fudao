import React, {Component} from "react";
import {Alert,ToastAndroid} from "react-native";
import {Actions} from "react-native-router-flux";
import {Container, Content, Header, List, Separator} from "../../../components/index";
import {Text, ListItem, Item, Input,Button,Right} from "native-base";
import userStore from "../../../mobx/userStore";
import {observer} from "mobx-react/native";
import ofthehillStore from "../../../mobx/ofthehillStore"



/**
 * 接受好友申请
 */
@observer
export default class SetSlogan extends Component {

    constructor(props) {
        super(props);

        this.state = {
            friendRemark: ''
        }
    }

    render(){
        return (
            <Container>

                <Header {...this.props} right={
                    <Right>
                        <Button transparent onPress={()=>this._setOk()}>
                            <Text style={{color:'#fff'}}>
                                完成
                            </Text>
                        </Button>
                    </Right>
                }/>

                <Content gray>
                    <List style={{padding: 10}}>
                        <Text note>设置占山诳语</Text>
                        <Item underline success>
                            <Input onChangeText={(friendRemark) => this.setState({friendRemark})}
                                   value={this.state.friendRemark}
                            />
                        </Item>
                    </List>
                </Content>
            </Container>
        );
    }

    _setOk() {
        let {phone} = userStore;

        if(this.state.friendRemark){
            request.getJson(urls.apis.USER_CHANGESLOGAN, {
                phone: phone,
                slogan: this.state.friendRemark,

            }).then(((result) => {

                if (result.ok) {
                    tools.showToast("修改成功");
                    ofthehillStore.fetchUsermine();
                    Actions.pop();
                } else {
                    tools.showToast("发送申请失败，请重试");
                }
            }).bind(this), (error) => {
                alert(JSON.stringify(error));
            });
        }else{

        }



    }

}

