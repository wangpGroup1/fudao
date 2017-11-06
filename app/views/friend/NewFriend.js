import React, {Component} from "react";
import {ScrollView, View, ToastAndroid} from "react-native";
import {Actions} from "react-native-router-flux";
import {Container, Content, Header, List, Separator, PullView} from "../../components/index";
import {Left, Body, Right, ListItem, Thumbnail, Text, Button} from "native-base";
import friendStore from "../../mobx/friendStore";
import {observer} from "mobx-react/native";
/*import {fetchNewFriendList} from "../../actions/friend";
import {toast, config} from "../../utils/index";*/

/**
 * 新朋友（加好友申请列表）
 */
@observer
export default class NewFriend extends Component {

	render() {
		let {NewFriendList} =friendStore,
			count = NewFriendList.length;
		return (
			<Container>
				<Header {...this.props}/>
				<Content gray>
					<PullView isRefreshing={false} onRefresh={this._onRefresh.bind(this)}>
						<Separator title="新的朋友"/>
						{
                            count == 0?<View style={{borderBottomWidth:1,borderBottomColor:'#ccc'}}/>:<List containerStyle={styles.list}>
                                {NewFriendList.map((f, i) => (
									<ListItem avatar key={i} style={{borderBottomWidth:0.5,borderBottomColor:'#ccc',paddingBottom:12,paddingTop:8}}>
										<Left>
											<Thumbnail style={{width: 50, height: 50}} square
													   source={{uri:urls.getImage(f.photo, 250, 250)}}/>
										</Left>
										<Body>
										<Text>{f.nickname}</Text>
										<Text note>{f.introduce}</Text>
										</Body>
										<Right style={{justifyContent:'center'}}>
                                            {f.status == 1 ?
												<Button small onPress={() => Actions.agreeFriendApply({friend:f})}>
													<Text>接受</Text>
												</Button> :
												<Text note>已添加</Text>}
										</Right>
									</ListItem>
                                ))}
							</List>
						}


						<View style={{alignItems:'center', padding:15}}>
							<Text>{count == 0 ? '暂时没有新朋友哦~~' : count + '位新好友'}</Text>
						</View>
					</PullView>
				</Content>
			</Container>
		)
	}

	componentDidMount() {
        friendStore.changeMyFriendApplyToready()
		friendStore.fetchNewFriendList()

	}

	_onRefresh() {

	}

}

const styles = {
	iconView: {
		backgroundColor: '#F99D3A',
		marginLeft: 7,
		width: 36,
		height: 36,
		alignItems: 'center',
		justifyContent: 'center'
	},
	icon: {
		fontSize: 24,
		color: '#FFFFFF'
	},
	pad15:{

	}
}

const mapStateToProps = state => ({
	loginUser: state.user.loginUser,
	...state.friend,
});
