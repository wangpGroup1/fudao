import React, {Component} from "react";
import {Alert, ToastAndroid, Image, TouchableOpacity} from "react-native";
import {Actions} from "react-native-router-flux";
import {Container, Header, Content, List, Separator} from "../../components/index";
import {Body, Left, Right, ListItem, Text, Button, Thumbnail, Icon, View, Title} from "native-base";
import {observer} from "mobx-react/native";
import friendStore from "../../mobx/friendStore";
import dynamicStore from "../../mobx/dynamicStore";

/**
 * 用户详情
 */
@observer
export default class FriendMessage extends Component {

    state = {
        user: {},
        scores: 0,
        imgArr: []
    }

    componentWillMount() {
        this.fetchDataAll();
    }

    componentWillReceiveProps(nextProps) {
        this.fetchDataAll();
    }


    render() {
        let {user, scores, imgArr} = this.state;
        let {userId} = this.props;
        return (
            <Container >
                <Header {...this.props} center={
                    <Body style={{flex: 1, alignItems: 'center'}}>
                    <Title style={{color: theme.toolbarTextColor}}>{user.friend_remark}</Title>
                    </Body>
                }/>
                <Content white>
                    <List style={styles.mar}>
                        <View style={styles.leftViewTop}>
                            <Image style={{width: 60, height: 60}} source={{uri: urls.getImage(user.photo, 250, 250)}}/>
                        </View>
                        <View style={{borderBottomWidth: 0}}>
                            <Text style={{flex: 1}}>
                                {user.friend_remark}
                            </Text>
                            <Text note style={{flex: 1}}>
                                登录号：{user.username}
                            </Text>
                        </View>
                    </List>
                    <List style={styles.mar}>
                        <View style={styles.leftView}>
                            <Text>个性签名：</Text>
                        </View>
                        <Text>{user.signname}</Text>
                    </List>
                    <List style={styles.mar}>
                        <View style={styles.leftView}>
                            <Text>    活力值：</Text>
                        </View>
                        <Text>{scores}分</Text>
                    </List>
                    <TouchableOpacity style={styles.mar}
                                      onPress={this.goCircle.bind(this, userId, user.phone, user.photo, user.friend_remark)}>
                        <View style={styles.leftView}>
                            <Text style={{lineHeight: 40}}>        圈子：</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            {imgArr[0] ? <Image style={{width: 60, height: 60, marginRight: 10}}
                                                source={{uri: urls.getImage(imgArr[0], 600, 600)}}/> :
                                <Text style={{lineHeight: 40}}>暂无图片</Text>}
                            {imgArr[1] ? <Image style={{width: 60, height: 60, marginRight: 10}}
                                                source={{uri: urls.getImage(imgArr[1], 600, 600)}}/> : null}
                            {imgArr[2] ? <Image style={{width: 60, height: 60}}
                                                source={{uri: urls.getImage(imgArr[2], 600, 600)}}/> : null}
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Icon style={{lineHeight: 40}} name="ios-arrow-forward"/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mar} onPress={()=>Actions.agreeFriendApply({friend:{nickname:user.friend_remark,phone:user.phone,id:user.id},from:'userDetail',change:this.props.change,title:'修改备注'})}>
                        <Text style={{paddingTop:5,paddingLeft:10}}>修改备注</Text>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Icon  name="ios-arrow-forward"/>
                        </View>
                    </TouchableOpacity>
                    {/*<Button block style={styles.button} onPress={this._sendMsg.bind(this)}>*/}
                    {/*<Text>发消息</Text>*/}
                    {/*</Button>*/}
                    <Button bordered block style={styles.buttonBor} onPress={this._deleteFriend.bind(this)}>
                        <Text style={styles.btnText}>删除好友</Text>
                    </Button>
                </Content>
            </Container>
        );
    }

    //
    // componentDidMount() {
    //     let {dispatch, userId} = this.props;
    //
    //     // 获取用户信息
    //     //dispatch(showLoading());
    //     request.getJson(urls.apis.USER_DETAIL, {
    //         userId
    //     }).then((result) => {
    //         dispatch(hideLoading());
    //         if (result.success) {
    //             let user = Object.assign({}, {
    //                 ...result.obj.acountInfo,
    //                 ...result.obj.userInformation,
    //             })
    //             this.setState({
    //                 user
    //             })
    //         } else {
    //             tools.showToast('获取用户信息失败', ToastAndroid.SHORT);
    //         }
    //     }, (error) => {
    //         dispatch(hideLoading());
    //     });
    //
    // }

    // 发消息
    _sendMsg() {


    }


    fetchDataAll(){
        //USER_GETUSER
        let {userId} = this.props;
        //好友信息
        request.getJson(urls.apis.FRIEND_GETFRIEND, {
            friendId: userId,
        }).then(((result) => {
            if (result.ok) {
                this.setState({
                    user: result.obj
                })

            } else {
                tools.showToast("发送申请失败，请重试");
            }
        }).bind(this));
        //活力值
        request.getJson(urls.apis.ACTIVITYAPI_GETTHISWEEKTOTALLSCORE, {
            userId: userId,
        }).then(((result) => {
            if (result.ok) {
                this.setState({
                    scores: result.obj.weekScore
                })

            } else {
                tools.showToast("发送申请失败，请重试");
            }
        }).bind(this));
        //圈子
        request.getJson(urls.apis.DYNAMIC_GETMYDYNAMICSLIST, {
            page: 1,
            pageSize: 20,
            userId: userId
        }).then(((result) => {
            if (result.ok) {
                let arr_pic = []
                for (var i = 0; i < result.obj.list.length; i++) {
                    if (result.obj.list[i].path != '') {
                        arr_pic = arr_pic.concat(result.obj.list[i].path.split(','))
                        if (arr_pic.length > 2) {
                            break;
                        }
                    }
                }
                this.setState({
                    imgArr: arr_pic
                })
            } else {
                tools.showToast("发送申请失败，请重试");
            }
        }).bind(this));
    }

    // 删除好友
    _deleteFriend() {
        let {user} = this.state;
        Alert.alert("删除好友", '您确定要删除好友' + user.username + '吗？', [{
            text: '取消'
        }, {
            text: '确定', onPress: () => this.deleteFriend()
        }])
    }

    deleteFriend() {
        let {user} = this.state;


        // 获取用户信息
        //dispatch(showLoading());
        request.getJson(urls.apis.FRIEND_DELETEMYFRIEND, {
            friendId: user.id
        }).then((result) => {
            if (result.ok) {
                tools.showToast("删除成功", ToastAndroid.SHORT);
                friendStore.fetchMyFriendList()
                Actions.pop()
                let {friendNickMap} = friendStore
                delete friendNickMap[user.id];


                var {realm} = dynamicStore;

                realm.write(() => {
                    var delDynamic = realm.objects('Dynamic').filtered('user.id="' + user.id + '"');
                    realm.delete(delDynamic)
                });
            } else {
                tools.showToast("删除失败");


            }
        }, (error) => {
            dispatch(hideLoading());
        });
    }

    goCircle(id, phone, photo, remark) {
        dynamicStore.fetchPhoto(id, phone,'user',{userId: id, phone, photo, remark,from:'user'});
    }

}

const styles = {
    button: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 30
    },
    buttonBor: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        borderColor: '#726585',
        borderWidth: 1
    },
    manIcon: {
        fontSize: 15,
        color: '#50A1F2'
    },
    womanIcon: {
        fontSize: 15,
        color: '#EF7155'
    },
    bgWhite: {
        backgroundColor: '#fff'
    },
    mar1: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        backgroundColor: '#e3e7f3',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 10,
    },
    mar: {
        flexDirection: 'row',
        marginTop: 20,
        backgroundColor: '#e3e7f3',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    btnText: {
        color: '#726585'
    },
    leftView: {
        width: 80,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    leftViewTop: {
        width: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        marginRight: 10
    }

};

FriendMessage.propTypes = {
    userId: React.PropTypes.string, // 用户ID
}

FriendMessage.defaultProps = {
    userId: '867200022156895,86720002215690328312757'
}


