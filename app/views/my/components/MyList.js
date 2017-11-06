import React, {PureComponent} from "react";
import {Actions} from "react-native-router-flux";
import {DeviceEventEmitter} from "react-native";
import {SeparatorArea} from "../../../components";

import {Body, Icon, Left, ListItem, Right, Text, View} from "native-base";
import dynamicStore from '../../../mobx/dynamicStore'


const Item = props => {
    if (props.flag) {

    }


    return (
        <ListItem
            icon
            style={[{
                backgroundColor: '#E3E7F3',
                marginLeft: 0,
                paddingLeft: 15,
            }, props.bordered ? {borderBottomWidth: 1} : {borderBottomWidth: 0}]}
            onPress={props.router ? () => Actions[props.router]() : null}>
            <Left>
                <Icon name={props.icon}/>
            </Left>
            <Body style={{borderBottomWidth: 0}}>
            <View>
                <Text>{props.text}</Text>
                {props.flag ? <View style={{
                    width: 8,
                    height: 8,
                    borderRadius: 10,
                    backgroundColor: 'red',
                    position: 'absolute',
                    top: -2,
                    left: 30
                }}/> : null}
            </View>

            </Body>
            <Right style={{borderBottomWidth: 0}}>
                <Icon name="ios-arrow-forward"/>
            </Right>
        </ListItem>
    );
}

export default class MyList extends PureComponent {
    state = {
        dot_dynamic: false,
        dot_friend: false
    }

    componentDidMount() {
        var that = this
        this.subscription = DeviceEventEmitter.addListener('noticeName', function () {
            that.setState({
                dot_dynamic: false
            })
        });
        this.subscription_f = DeviceEventEmitter.addListener('noticeName_f', function () {
            that.setState({
                dot_friend: false
            })
        });

    }

    componentWillMount() {
        this.refresh();
    }

    render() {

        return (
            <View>
                <Item icon="ios-aperture-outline" text="圈子" router="dynamic" bordered flag={this.state.dot_dynamic}/>
                <Item icon="ios-contacts-outline" text="好友" router="friend" flag={this.state.dot_friend}/>
                <SeparatorArea style={{height: 20}}/>
                <Item icon="ios-star-outline" text="收藏" router="collection" bordered/>
                <Item icon="ios-create-outline" text="意见反馈" router="feedback"/>
                <SeparatorArea style={{height: 20}}/>
                <Item icon="ios-information-circle-outline" text="关于活·动" router="about"/>
            </View>
        )
    }

    refresh() {
        var {realm} = dynamicStore;
        var realm_dynamic = Array.prototype.slice.call(realm.objects('Dynamic').sorted('createTime'), 0).reverse();
        request.getJson(urls.apis.DYNAMIC_GETMYDYNAMICSLIST, {
            page: 1,
            pageSize: 1
        }).then((res) => {
            if (res.obj.list.length > 0) {
                if (!realm_dynamic[0]||(res.obj.list[0].id != realm_dynamic[0].id && !this.state.dot_dynamic&&res.obj.list[0].createTime>realm_dynamic[0].createTime)) {
                    this.setState({dot_dynamic: true})
                }
            }
            request.getJson(urls.apis.FRIENDAPI_GETMYFRIENDAPPLYISNOTREADY)
                .then((result) => {
                    if (result.ok) {
                        if (result.obj > 0) {
                            this.setState({dot_friend: true})
                        }
                    } else {
                        tools.showToast("请求出错！")
                    }
                    this.props._onRefreshEnd();
                });
        })
    }

    componentWillUnmount() {
        this.subscription.remove();
    }
}
