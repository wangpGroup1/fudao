import React, {PureComponent} from "react";
import {ActivityIndicator, View, Text, StyleSheet} from "react-native";

export default class LoadFooter extends PureComponent {

	render() {
		let {isEnd} = this.props;
		if (isEnd) {
			return (
				<View style={styles.loadingContainer}>
					<Text style={styles.title}>全部加载完毕</Text>
				</View>
			)
		} else {
			return (
				<View style={styles.loadingContainer}>
					<ActivityIndicator />
					<Text style={styles.title}>加载更多</Text>
				</View>
			)
		}
	}
}

LoadFooter.propTypes = {
	isEnd: React.PropTypes.bool
}

const styles = StyleSheet.create({
	loadingContainer: {
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row'
	},
	title: {
		fontSize: 14,
		marginLeft: 5,
		color: 'gray'
	}
})