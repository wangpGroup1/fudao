import React, {Component} from "react";
import {
    ScrollView,
    View,
    ToastAndroid,
    TouchableWithoutFeedback,
    Modal,
    ListView,
    Image,
    DeviceEventEmitter
} from "react-native";
import {observer} from "mobx-react/native";
import {Actions} from "react-native-router-flux";
import {Container, Content, Header, List, PullView, Loading} from "../../components/index";
import {Left, Body, Right, ListItem, Button, Icon, Text} from "native-base";
import FriendList from "./components/FriendList";
import friendStore from "../../mobx/friendStore";

/*import {fetchMyFriendList} from "../../actions/friend";
 import {toast} from "../../utils/index";*/

/**
 * 好友列表
 */
@observer
export default class Friend extends Component {
    state = {
        visible: false,
    }

    componentDidMount() {
        friendStore.hasNewFriendFun();
        friendStore.fetchMyFriendList();
    }

    render() {
        let {visible} = this.state;
        const {isFetching, MyFriendList,hasNewFriend} = friendStore;
        return (
            <Container>
                <Header {...this.props} right={
                    <Right>
                        <Button transparent onPress={() => Actions.addFriend()}><Image
                            source={require('./image/addFriend.png')} style={{width: 22, height: 20,}}/></Button>
                    </Right>
                } left={<Left style={{flex: 1}}>
                    <Button transparent onPress={this.pop}>
                        <Icon name="ios-arrow-back"
                              style={{fontSize: theme.toolbarIconSize, color: theme.toolbarIconColor}}/>
                    </Button>
                </Left>}/>
                <Content gray delay>


                    <PullView isRefreshing={false} onRefresh={this._onRefresh.bind(this)}>
                        <List>
                            <ListItem icon last style={{height: 55, borderBottomWidth: 0}}
                                      onPress={() => Actions.newFriend()}>
                                <Left>
                                    <View style={{width:43,height:46,}}>
                                        <View style={styles.iconView}>
                                            <Icon name="person-add" style={styles.icon}/>
                                        </View>
                                        {hasNewFriend?<View style={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: 10,
                                            backgroundColor: 'red',
                                            position: 'absolute',
                                            top: 0,
                                            right: 0
                                        }}/>:null}

                                    </View>
                                </Left>
                                <Body>
                                <Text>新朋友</Text>
                                </Body>
                                <Right>
                                </Right>
                            </ListItem>
                        </List>
                        <FriendList list={MyFriendList}/>
                    </PullView>


                </Content>
            </Container>
        )
    }

    phone() {
        Actions.searchUser()
        this.hide();
    }

    scanner() {
        Actions.barcodescanner()
        this.hide();
    }


    _onRefresh() {
        friendStore.hasNewFriendFun();
        friendStore.fetchMyFriendList();
        ToastAndroid.show('刷新成功', ToastAndroid.SHORT);
    }

    show() {
        this.setState({
            visible: true,
        })
    }

    /**
     * 关闭对话框
     */
    hide() {
        this.setState({
            visible: false
        })
    }

    pop() {
        Actions.index({page: 4})

    }

}

const styles = {
    iconView: {
        backgroundColor: '#F99D3A',
        marginLeft: 0,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:3,
    },
    icon: {
        fontSize: 24,
        color: '#FFFFFF'
    },
    opacityView: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,.0)"
    }
}

const mapStateToProps = state => ({
    loginUser: state.user.loginUser,
    ...state.friend,
});
