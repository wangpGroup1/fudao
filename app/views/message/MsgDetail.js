import React, {Component} from "react";
import {View, Dimensions} from "react-native";
import {Text, Thumbnail} from "native-base";
import {Container, Content, Header, GiftedListView} from "../../components/index";
var width = Dimensions.get('window').width;

export default class MessageDetail extends Component {

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
		callback([1, 2, 3, 4, 5, 6, 7], {
			allLoaded: true
		})
	}

	renderRowView(rowData, sectionID, rowID) {
		let time = new Date('2017/4/3');
		// let time = new Date('2017/4/3');
		let nowTime = new Date();
		let dateDiffer = Math.floor((nowTime.getTime() - time.getTime()) / (24 * 3600 * 1000))
		if (dateDiffer > 1) {
			let arr = time.toLocaleDateString().split('/')
			var showTime = time.getFullYear() + '年' + arr[0] + '月' + arr[1] + '日'
		} else {
			var showTime = time.toLocaleTimeString().split(':')[0] + ':' + time.toLocaleTimeString().split(':')[1]
		}

		return (
			<View style={styles.oneRow}>
				<View style={styles.timeView}>
					<Text style={styles.timeText}>{showTime}</Text>
				</View>
				<View style={styles.item}>
					<View style={{flex:1}}>
						<View style={{ flexDirection:'row',height:20,marginBottom:5}}>
							<Text style={{color:'#0F82D7'}}>牛牛快跑</Text>
							<Text style={styles.title}>给你分享了一个链接</Text>
						</View>
						<View style={{ flexDirection:'row',alignItems:'center',flex:1,}}>
							<View style={styles.imgBox}>
								<Thumbnail square source={require('./assets/laoniandaxue.jpg')} style={styles.img}/>
							</View>
							<View style={{marginLeft:10,flex:1}}>
								<Text style={styles.doc}> 高血压病是指在静息状态下动脉收缩压和/或舒张压增高(>=140/90mmHg)......</Text>
							</View>
						</View>
					</View>
				</View>
			</View>

		)
	}

	renderPaginationAllLoadedView() {
		return (null)
	}
}
const styles = {
	oneRow: {
		flexDirection: 'column',
		alignItems: 'center'
	},
	item: {
		margin: 14,
		marginBottom: 0,
		marginLeft: 23,
		borderRadius: 10,
		borderColor: "#fff",
		borderWidth: 1,
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	img: {
		width: 80,
		height: 60,
		resizeMode: 'contain'
	},
	doc: {
		fontSize: theme.DefaultFontSize - 1,
		color: "#6A6A6A"
	},
	title: {
		fontSize: theme.DefaultFontSize,
		color: "#363636",
		marginLeft: 10
	},
	timeText: {
		textAlign: 'center',
		// marginTop:10,
		fontSize: 14,
		color: '#fff'
	},
	timeView: {
		backgroundColor: '#BFBFBF',
		borderRadius: 4,
		// width:70,
		paddingRight: 8,
		paddingLeft: 8,
		marginTop: 16,
	}

}
