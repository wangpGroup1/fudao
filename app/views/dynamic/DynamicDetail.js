import React, {Component} from "react";
import {observer} from "mobx-react/native";
import {Left, Right, Body, Text, Button, Icon} from "native-base";
import {
    Platform,
    View,
    Image,
    ScrollView,
    TouchableHighlight,
    TouchableOpacity,
    TextInput,
    NetInfo,
    Alert,
    KeyboardAvoidingView
} from "react-native";
import styles from "./assets/styles";
import moment from './assets/moment.js'
import {Actions} from "react-native-router-flux";
import InputBoard from './components/InputBoard';
import DynamicComment from './components/DynamicComments';
import DynamicSupport from './components/DynamicSupports';
import DynamicCommonDetail from './components/DynamicCommonDetail'
import {Container, Header, Content} from "../../components/index";
import dynamicStore from "../../mobx/dynamicStore";
import userStore from "../../mobx/userStore";


/**
 * 动态
 */
@observer
export default class DynamicDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentShow: false,
            show: false,
            text:'',
            placehold: '评论',
        }
    }

    render() {
        let {loginUser} = userStore;
        let {info} = dynamicStore;
        return (
                <Container>

                    <Header  {...this.props} left={
                        <Left>
                            <Button transparent onPress={() => Actions.pop({refresh: {newnew: !this.props.newnew}})}>
                                <Icon name="ios-arrow-back"
                                      style={{fontSize: theme.toolbarIconSize, color: theme.toolbarIconColor}}/>
                            </Button>
                        </Left>
                    }/>
                    <Content white>
                        <View style={styles.dynamic}>
                            <DynamicCommonDetail info={info} newnew={this.props.newnew}/>
                            <View style={styles.showContain}>
                                <View style={styles.timeAndDelete}>
                                    <Text style={styles.time}>{info.time}</Text>
                                    {info.user && info.user.id == loginUser.id ? (
                                        <TouchableOpacity onPress={this._delete.bind(this, info.id)}>
                                            <Text style={styles.delete}>删除</Text>
                                        </TouchableOpacity>
                                    ) : null}
                                </View>
                                {this.state.show ? (
                                    <View style={styles.show}>
                                        <Button onPress={this._zan.bind(this, info)} transparent dark
                                                style={styles.divid}>
                                            {info.flag ? <Text style={styles.showoneText}>取消</Text> :
                                                <Text style={styles.showoneText}>点赞</Text>}
                                        </Button>
                                        <Text style={styles.showoneText}>|</Text>
                                        <Button onPress={this._comment.bind(this, info.id)} transparent dark
                                                style={styles.divid}>
                                            <Text style={styles.showoneText}>评论</Text>
                                        </Button>
                                    </View>
                                ) : null}
                                <TouchableHighlight style={styles.showMessage}
                                                    onPress={this._onMessage.bind(this, info.id)}
                                                    underlayColor='#fafafa'>
                                    <Image source={require('../../assets/message.png')}
                                           style={{width: 18, height: 16, marginTop: 5}}/>
                                </TouchableHighlight>
                            </View>
                            <DynamicSupport zan={info.praises}/>
                            <DynamicComment comments={info.comments} sendComment={(user_comment) => this._comment_at(info.id, user_comment)}/>
                        </View>
                        {this.state.commentShow ? (
                            <View style={{padding: 10,zIndex: 99,flexDirection: 'row',backgroundColor: '#fff',position:'absolute',bottom:0,right:0}}>
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
                                <TouchableOpacity style={{width:60,height:40,padding:10,marginLeft:10,backgroundColor:'#786e7f',borderRadius:5}} onPress={this._onSendComment.bind(this)}>
                                    <Text style={{color:'#fff',textAlign:'center'}}>发表</Text>
                                </TouchableOpacity>
                                <InputBoard spaceHeight={44}/>
                            </View>
                        ) : null}
                    </Content>
                </Container>
        )
    }

    _onMessage(id) {
        this.setState({
            show: !this.state.show
        })
    }

    _zan() {
        dynamicStore.zan(dynamicStore.info, () => {
        }, "detail")
        this.setState({
            show: false
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

    _comment_at(infoid,user){
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


    _onSubmitEditing(event) {
        dynamicStore.addComment(event, this.commentID, () => {
        }, 'detail');
        this.setState({
            commentShow: false,
            show: false
        })
    }

    _onSendComment() {
        var event = {
            nativeEvent:{
                text:this.state.text
            }
        }
        if (this.state.placehold == '评论') {
            dynamicStore.addComment(event, this.commentID, () => {
            }, 'detail');
        } else {
            dynamicStore.addComment(event, this.commentID, () => {
            }, 'detail',this.state.commentUser);
        }
        this.setState({
            commentShow: false,
            show: false
        })
    }


    _delete(id) {
        Alert.alert('', '确定删除吗?', [
            {text: '取消'},
            {
                text: '删除',
                onPress: () => dynamicStore.del(id, () => {
                }, 'detail')
            }
        ])
    }


}
