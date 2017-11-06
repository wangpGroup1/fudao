import React, {PureComponent} from "react";
import {ScrollView, View} from "react-native";
import {Actions} from "react-native-router-flux";
import {List} from "../../../components/index";
import {Left, Right, Body, ListItem, Icon, Text, Thumbnail} from "native-base";
import Separator from "../../../components/Separator";
import groupBy from "lodash/groupBy";


const groups = ["*", 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

/**
 * 好友列表
 */
class FriendList extends PureComponent {

	render() {
		let {list} = this.props,
			count = list.length;

		// 按首字母分组
		let listGroupBy = groupBy(list, (friend) => {
			console.log(list)

			let firstChar = tools.getFirstChar(friend.friendremark).toUpperCase();
			if (groups.find((g) => g == firstChar))
				return firstChar;
			return groups[0]
		})

		return (
			<View>
				{groups.map((g) => this.renderGroup(listGroupBy, g))}
				<View style={{alignItems:'center', padding:15}}>
					<Text>{count == 0 ? '没有好友' : count + '位好友'}</Text>
				</View>
			</View>
		)
	}

	renderGroup(listGroupBy, group) {
		let {friendNickMap} = this.props;

		if (listGroupBy.hasOwnProperty(group)) {
			let friendList = listGroupBy[group];
			return (
				<View key={group}>
					<Separator title={group}/>
					<List containerStyle={styles.list}>
						{friendList.map((f, i) => (
							<ListItem style={{borderBottomWidth:0.5,borderBottomColor:'#ccc',paddingBottom:12,paddingTop:8}} avatar  key={i} onPress={() => Actions.friendMessage({userId: f.id})}>
								<Left>
									<Thumbnail style={{width: 50, height: 50}} square
											   source={{uri:urls.getImage(f.photo, 250, 250)}}/>
								</Left>
								<Body  style={{borderBottomWidth:0}}>
								<Text>{f.friendremark}</Text>
								<Text note>{f.phone}</Text>
								</Body>
								<Right style={{justifyContent:'center',borderBottomWidth:0}}>
									<Icon name="ios-arrow-forward"/>
								</Right>
							</ListItem>
						))}
					</List>
				</View>
			)
		}
		return null;
	}
}

const styles = {
	list: {
		marginTop: 0,
		paddingLeft: 15,
		borderTopWidth: 0,
		borderBottomWidth: 0,
	},
	listItem: {},
	lastListItem: {
		borderBottomWidth: 0
	},
}

export default (FriendList);
