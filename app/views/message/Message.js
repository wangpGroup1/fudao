import React, {Component} from "react";
import {Container, Content, Header, GiftedListView} from "../../components/index";
import {Actions} from "react-native-router-flux";
import SystemMessage from "./components/SystemMessage";

var system = [
	{
		avatar: require('./assets/mag-org.png'),
		title: '互动消息',
		tip: '牛牛快跑给您分享了一个链接',
		flag: false,
	},
	{
		avatar: require('./assets/msg1.png'),
		title: '系统消息',
		tip: '福道健康有新版本了，快来更新ba!',
		flag: true,
	},
	{
		avatar: require('./assets/msg3.png'),
		title: '福福1',
		tip: '吃饭时间到，快来看看福福给您准备了...',
		flag: false,
	},
	{
		avatar: require('./assets/touxiang1.jpg'),
		title: '福福2',
		tip: '我赞了你哦！',
		flag: true,
	},
	{
		avatar: require('./assets/touxiang2.jpg'),
		title: '秦莞',
		tip: '我打开了你得分享，快来跟我聊聊吧',
		flag: true,
	},
	{
		avatar: require('./assets/touxiang3.jpg'),
		title: '福鼎荣归',
		tip: '吃饭时间到，快来看看福福给您准备了...',
		flag: true,
	}
];

export default class Message extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list_Message: system,
		}
	}

	render() {
		return (
			<Container delay>
				<Header {...this.props}/>
				<Content gray>
					<GiftedListView
						enableEmptySections={true}
						rowView={this.renderRowView.bind(this)}
						onFetch={this.onFetch.bind(this)}
						refreshable={false}
						firstLoader={true}
						withSections={false}
						paginationAllLoadedView={this.renderPaginationAllLoadedView}
						ref='questions'
					/>
				</Content>
			</Container>
		)
	}

	onFetch(page = 1, callback, options) {
		callback(this.state.list_Message, {
			allLoaded: true
		})
	}

	renderRowView(rowData, sectionID, rowID) {
		return (
			<SystemMessage
				style={rowID==3?{marginTop:16}:{}}
				avatar={rowData.avatar}
				title={rowData.title}
				tip={rowData.tip}
				flag={rowData.flag}
				_onSkipTo={(title)=>rowID<3?Actions['msgDetail']({title:'系统'}):Actions['chat']({title:'聊天',userchat:title ,messageid:rowID})
          }
			/>
		)
	}

	renderPaginationAllLoadedView() {
		return (null)
	}

}
const styles = {}
