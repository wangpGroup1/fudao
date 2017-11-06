import React, {Component} from "react";
import {observer} from "mobx-react/native";
import {Actions} from "react-native-router-flux";
import {Title, Right, Body, Text, Button, Icon} from "native-base";
import {View, Image, TouchableHighlight, TextInput, Alert, TouchableOpacity, KeyboardAvoidingView,} from "react-native";
import {Container, Header, HeaderIcon, Content} from "../../components/index";
import userStore from "../../mobx/userStore";
import dynamicStore from "../../mobx/dynamicStore";
import moment from './assets/moment';
import styles from "./assets/styles";
import DynamicList from './components/DynamicList';
import DynamicHeader from './components/DynamicHeader';
import DynamicCommon from './components/DynamicCommonDetail'
import DynamicSupport from './components/DynamicSupports';
import DynamicComment from './components/DynamicComments';

/**
 * 动态
 */
@observer
export default class Dynamic extends Component {
    constructor(props) {
        super(props);
        this.first = true;
        this.state = {
            commentShow: false,
            keyboardHeight: 0,
            text: '',
            placehold: '评论',
            commentUser: {}
        }
    }

    componentWillMount() {
        dynamicStore.setAllLoaded()
    }

    componentWillReceiveProps(nextProps) {
        dynamicStore.fetchDynamicList({refresh: true}, this.refs.gifted._postRefresh, this.props.userId);
    }


    render() {
        return (
            <KeyboardAvoidingView behavior='position'>
                <Container>
                    <Header  {...this.props} right={
                        <Right>
                            <Button transparent onPress={this.skipToNew.bind(this)}><Icon
                                name="ios-create-outline" style={{color: '#000'}}/></Button>
                        </Right>
                    }/>
                    <Content white>
                        <DynamicList
                            renderHeader={this._renderHeader.bind(this)}
                            enableEmptySections={true}
                            rowView={this._renderRowView.bind(this)}
                            onFetch={this._onFetch.bind(this)}
                            firstLoader={true}
                            pagination={true}
                            refreshable={true}
                            withSections={false}
                            ref="gifted"
                            key={dynamicStore.dynamicHeadPic}
                        />
                        {this.state.commentShow ? (
                            <View style={{
                                padding: 10,
                                paddingBottom: 30,
                                zIndex: 99,
                                flexDirection: 'row',
                                backgroundColor: '#fff',
                            }}>
                                <TextInput
                                    placeholder={this.state.placehold} autoFocus={true}
                                    onEndEditing={() => {
                                        this.setState({commentShow: false})
                                    }}
                                    onSubmitEditing={this._onSubmitEditing.bind(this)}
                                    style={styles.textInput}
                                    onChangeText={(text) => this.setState({text})}
                                    value={this.state.text}
                                    underlineColorAndroid='transparent'/>
                                <TouchableOpacity style={{
                                    width: 60,
                                    height: 40,
                                    padding: 10,
                                    marginLeft: 10,
                                    backgroundColor: '#786e7f',
                                    borderRadius: 5
                                }} onPress={this._onSendComment.bind(this)}>
                                    <Text style={{color: '#fff', textAlign: 'center'}}>发表</Text>
                                </TouchableOpacity>
                            </View>
                        ) : null}
                    </Content>
                </Container>
            </KeyboardAvoidingView>
        )
    }

    _renderHeader() {
        let {loginUser} = userStore;
        let {userId, phone, photo, remark, picPath} = this.props;
        // if()
        return (
            <DynamicHeader
                user={loginUser}
                id={userId}
                phone={phone}
                photo={photo}
                remark={remark}
                picPath={picPath}
                pic={dynamicStore.dynamicHeadPic}
            />
        )
    }

    _renderRowView(info, sectionID, rowID) {
        let {loginUser} = userStore;

        // var m = '刚刚';
        // if (info.createTime) {
        //     m = moment(info.createTime).fromNow();
        // }
        return (
            <View style={styles.dynamic}>
                <DynamicCommon info={info} newnew={this.props.newnew} from="list"/>
                <View style={styles.showContain}>
                    <View style={styles.timeAndDelete}>
                        <Text style={styles.time}>{info.time}</Text>
                        {info.user && info.user.id == loginUser.id ? (
                            <TouchableOpacity onPress={this._delete.bind(this, info.id)}>
                                <Text style={styles.delete}>删除</Text>
                            </TouchableOpacity>
                        ) : null}
                    </View>
                    {info.show ? (
                        <View style={styles.show}>
                            <Button onPress={this._zan.bind(this, info)} transparent dark style={styles.divid}>
                                {info.flag ? <Text style={styles.showoneText}>取消</Text> :
                                    <Text style={styles.showoneText}>点赞</Text>}
                            </Button>
                            <Text style={styles.showoneText}>|</Text>
                            <Button onPress={this._comment.bind(this, info.id)} transparent dark style={styles.divid}>
                                <Text style={styles.showoneText}>评论</Text>
                            </Button>
                        </View>
                    ) : null}
                    <TouchableHighlight style={styles.showMessage} onPress={this._onMessage.bind(this, info.id)}
                                        underlayColor='#fafafa'>
                        <Image source={require('../../assets/message.png')}
                               style={{width: 18, height: 16, marginTop: 5}}/>
                    </TouchableHighlight>
                </View>
                <DynamicSupport zan={info.praises}/>
                <DynamicComment comments={info.comments}
                                sendComment={(user_comment) => this._comment_at(info.id, user_comment)}/>
            </View>
        )
    }


    _onFetch(page, callback, options, flag) {
        if (options.firstLoad) {
            dynamicStore.setPage(1)
        }
        dynamicStore.fetchDynamicList(options, callback, this.props.userId)
    }

    /*
     * 发表动态
     * */
    skipToNew() {
        dynamicStore.clearImgList();
        Actions.newDynamic()
    }

    _delete(id) {
        Alert.alert('', '确定删除吗?', [
            {text: '取消'},
            {
                text: '删除',
                onPress: () => dynamicStore.del(id, this.refs.gifted._postRefresh, 'list')
            }
        ])
    }

    _onMessage(id) {
        dynamicStore.show(id, this.refs.gifted._postRefresh);
    }

    _zan(info) {
        dynamicStore.zan(info, this.refs.gifted._postRefresh, 'list');
    }

    _onSubmitEditing(event) {
        dynamicStore.addComment(event, this.commentID, this.refs.gifted._postRefresh, 'list');
        this.setState({
            commentShow: false,
        })
    }

    _onSendComment() {
        var event = {
            nativeEvent: {
                text: this.state.text
            }
        }
        if (this.state.placehold == '评论') {
            dynamicStore.addComment(event, this.commentID, this.refs.gifted._postRefresh, 'list');
        } else {
            dynamicStore.addComment(event, this.commentID, this.refs.gifted._postRefresh, 'list',this.state.commentUser);
        }
        this.setState({
            commentShow: false,
        })
    }

    _comment(infoid) {
        this.setState({
            placehold: '评论',
            commentShow: true,
            text: '',
        });
        this.commentID = infoid;
    }


    _comment_at(infoid, user) {
        let {loginUser} = userStore;

        if (user.id == loginUser.id) {
            this.setState({
                placehold: '评论',
                commentShow: true,
                text: '',
            });
        } else {
            this.setState({
                placehold: '回复' + user.friendremark || user.nickname || user.phone || "用户" + JSON.stringify(user.id).substr(1, 4) + ':',
                commentUser:user,
                commentShow: true,
                text: '',
            });
        }

        this.commentID = infoid;
    }

    //
    // _keyboardDidShow(e){
    //     this.setState({
    //         keyboardHeight:e.startCoordinates.height
    //     })
    //
    // }
    //
    // _keyboardDidHide(e){
    //     this.setState({
    //         keyboardHeight:0
    //     })
    // }
    //
    // componentWillUnmount() {
    //     this.keyboardDidShowListener.remove();
    //     this.keyboardDidHideListener.remove();
    // }
    //


}
