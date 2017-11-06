import React, {PureComponent} from "react";
import {Alert,ToastAndroid} from "react-native";
import {Actions} from "react-native-router-flux";
import {Container, Content, Header, List, Separator} from "../../components/index";
import {Text, ListItem, Item, Input,Button,Right} from "native-base";
import friendStore from "../../mobx/friendStore";


/**
 * 接受好友申请
 */
export default class RmarkSet extends PureComponent {

    constructor(props) {
        super(props);
        let {userId} = props;
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
                        <Text note>为好友设置备注</Text>
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
        let {userId} = this.props;
        //FRIEND_UPDATEFRIENDREMARK
        if(this.state.friendRemark){
            request.getJson(urls.apis.FRIEND_UPDATEFRIENDREMARK, {
                friendId: userId,
                friendRemark: this.state.friendRemark,

            }).then(((result) => {

                if (result.ok) {
                    tools.showToast("修改成功");
                    friendStore.fetchMyFriendList()
                    Actions.friend();
                } else {
                    tools.showToast("发送申请失败，请重试");
                }
            }).bind(this), (error) => {
                alert(JSON.stringify(error));
            });
        }else{
            friendStore.fetchMyFriendList()
            Actions.friend();
        }



    }

}

