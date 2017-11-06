import React, {PureComponent} from "react";
import {StyleSheet, View} from "react-native";

export default class List extends PureComponent {

	render() {
		let {children, style} = this.props;
		let listStyle = Object.assign({}, styles.list, style || {});
		return (
			<View style={listStyle}>
				{children}
			</View>
		)
	}

}


const styles = {
	list: {
		paddingTop:5,
		paddingBottom:5,
		paddingLeft:10,
		backgroundColor: '#FFFFFF',
		borderTopWidth: theme.borderWidth,
		borderBottomWidth: theme.borderWidth,
		borderColor: '#cbd2d9',
	}
}

List.propTypes = {
	style: React.PropTypes.object
}