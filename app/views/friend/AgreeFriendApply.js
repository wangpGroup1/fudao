import React, {PureComponent} from "react";
import {Alert} from "react-native";
import {Actions} from "react-native-router-flux";
import {Container, Content, Header, List, Separator} from "../../components/index";
import {Text, ListItem, Item, Input,Button,Right} from "native-base";
import friendStore from "../../mobx/friendStore";
/*import {fetchNewFriendList, fetchMyFriendList} from "../actions/friend";
import {request, urls, toast} from "../../utils/index";*/

/**
 * 接受好友申请
 */
export default class AgreeFriendApply extends PureComponent {

	constructor(props) {
		super(props);
		let {friend} = props;
		this.state = {
			friendRemark: friend.nickname
		};
	}

	render(){
		/*let {friend}  = this.props;*/
		return (
			<Container>

				<Header {...this.props} right={
					<Right>
						<Button transparent onPress={()=>this._agree()}>
							<Text style={{color:'#000'}}>
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
					<Separator/>

				</Content>
			</Container>
		);
	}

	_agree() {
		let {friend,from} = this.props;
		let {friendRemark} = this.state;

		if (!friendRemark){
			friendRemark = friend.phone
		}
		if(from=='userDetail'){
            request.getJson(urls.apis.FRIEND_UPDATEFRIENDREMARK, {
                friendId: friend.id,
                friendRemark: friendRemark,
            }).then(((result) => {
                if (result.ok) {
                    // 返回上一页
                    Actions.pop({refresh: {change: !this.props.change}});
                    friendStore.fetchMyFriendList()
                    // 刷新新朋友列表, 我的好友列表
                    //this.refreshFriendList();

                } else {
                    toast.show('发送失败，请重试');
                }
            }).bind(this), (error) => {
                alert(JSON.stringify(error));
            });
		}else{
            request.getJson(urls.apis.FRIEND_AGREEADDFRIEND, {
                id: friend.id,
                friendRemark: friendRemark,
            }).then(((result) => {
                if (result.ok) {
                    // 返回上一页
                    Actions.friend();
                    friendStore.fetchMyFriendList()
                    // 刷新新朋友列表, 我的好友列表
                    //this.refreshFriendList();

                } else {
                    toast.show('发送失败，请重试');
                }
            }).bind(this), (error) => {
                alert(JSON.stringify(error));
            });
		}


	}

	// 刷新新朋友列表, 我的好友列表
	/*refreshFriendList() {
		/!*!// 新朋友
		dispatch(fetchNewFriendList(loginUser.appid));
		// 我的好友
		dispatch(fetchMyFriendList(loginUser.appid));*!/
	}*/
}

const styles = {};

/*
AgreeFriendApply.propTypes = {
	friend: React.PropTypes.object, // 用户ID
}

const mapStateToProps = state => ({
	loginUser: state.user.loginUser
});*/
