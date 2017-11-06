import React, {Component} from "react";
import {Alert,ToastAndroid,Image} from "react-native";
import {Actions} from "react-native-router-flux";
import {Container, Header, Content, List, Separator} from "../../components/index";
import {Body, Left, Right, ListItem, Text, Button, Thumbnail, Icon, View} from "native-base";
import {observer} from "mobx-react/native";
/*import {showLoading, hideLoading} from "../../actions/loading";
import {fetchMyFriendList} from "../../actions/friend";
import {request, urls, toast} from "../../utils/index";*/
import friendStore from "../../mobx/friendStore";

/**
 * 用户详情
 */
@observer
export default class UserDetail extends Component {

	state = {
		user: {}
	}
	componentWillMount(){
		//USER_GETUSER
		let {userId} = this.props;
		request.getJson(urls.apis.USER_GETUSER, {
			id: userId,

		}).then(((result) => {
			if (result.ok) {
				this.setState({
					user:result.obj
				})

			} else {
				tools.showToast("发送申请失败，请重试");

			}
		}).bind(this), (error) => {
			alert(JSON.stringify(error));
		});
	}

	render() {
		let {user}  = this.state;

		let {userId,from} = this.props;
		return (
			<Container>
				<Header {...this.props} left={
					<Left>
						<Button transparent onPress={() => from=='sao'?Actions.pop({popNum: 2}):Actions.pop()}>
							<Icon name="ios-arrow-back" style={{color:'#000'}}/>
						</Button>
					</Left>
				}/>

				<Content gray>{user ?
					<View>
						<Separator/>
						<List>
							<ListItem avatar last>
								<Left>
									<Thumbnail square source={{uri: urls.getImage(user.photo, 250, 250)}} style={{width:50,height:50}}/>
								</Left>
								<Body style={{borderBottomWidth:0}}>
								<Text>
									{/*{friendNickMap[user.appid] || user.title}*/}
									&nbsp;
									{/*{user.sex == '1' ? <Icon name="ios-man" style={styles.manIcon}/> :
										<Icon name="ios-woman" style={styles.womanIcon}/>}*/}
									昵称：{user.nickname}
								</Text>
								<Text note style={{paddingBottom: 20}}>
									{/*{friendNickMap[user.appid] ? '昵称：' + user.title : ''}*/}
									账号：{user.username}
								</Text>
								</Body>
								<Right style={{borderBottomWidth:0}}>
								</Right>
							</ListItem>
						</List>
						<Separator/>
						{/*<List>*/}
							{/*<ListItem last onPress={() => Actions.remarkSet({userId: user.id})} style={{borderBottomWidth:0}}>*/}
								{/*<Body style={{borderBottomWidth:0}}>*/}
								{/*<Text>设置备注</Text>*/}
								{/*</Body>*/}
								{/*<Right style={{borderBottomWidth:0}}>*/}
									{/*<Icon name="ios-arrow-forward"/>*/}
								{/*</Right>*/}
							{/*</ListItem>*/}
						{/*</List>*/}
						<Separator/>
						{this.renderButtons()}
					</View> : null}
				</Content>
			</Container>
		);
	}

	renderButtons() {
		let {friendNickMap} = friendStore,

			{user} = this.state;
		console.log(friendNickMap)

		if (friendNickMap[user.id]) {// 好友
			return (
				<Button danger block style={styles.button} onPress={this._deleteFriend.bind(this)}>
					<Text>删除该好友</Text>
				</Button>
			);
		} else {// 陌生人
			return (
				<Button block style={styles.button} onPress={this._addFriend.bind(this)}>
					<Text>添加到我的好友</Text>
				</Button>
			)
		}
	}

	componentDidMount() {
		let {dispatch, userId} = this.props;

		// 获取用户信息
		//dispatch(showLoading());
		request.getJson(urls.apis.USER_DETAIL, {
			userId
		}).then((result) => {
			dispatch(hideLoading());
			if (result.success) {
				let user = Object.assign({}, {
					...result.obj.acountInfo,
					...result.obj.userInformation,
				})
				this.setState({
					user
				})
			} else {
				tools.showToast("获取用户信息失败");
			}
		}, (error) => {
			dispatch(hideLoading());
		});

	}

	// 添加好友
	_addFriend() {

		let {user} = this.state;



		// 跳转到添加好友申请页面
		Actions.friendApply({
			friend: user
		})
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
			friendId:user.id
		}).then((result) => {
			if (result.ok) {
				tools.showToast("删除成功");
				friendStore.fetchMyFriendList()
				Actions.pop()
				let {friendNickMap} = friendStore
				delete friendNickMap[user.id]
			} else {
				tools.showToast("删除失败");


			}
		}, (error) => {
			dispatch(hideLoading());
		});
	}

}

const styles = {
	button: {
		marginLeft: 15,
		marginRight: 15
	},
	manIcon: {
		fontSize: 15,
		color: '#50A1F2'
	},
	womanIcon: {
		fontSize: 15,
		color: '#EF7155'
	},

};

UserDetail.propTypes = {
	userId: React.PropTypes.string, // 用户ID
}

UserDetail.defaultProps = {
	userId: '867200022156895,86720002215690328312757'
}


