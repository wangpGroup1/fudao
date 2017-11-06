import React, {PureComponent} from "react";
import {Modal, View, Image, TouchableHighlight,ScrollView} from "react-native";
import {Text} from "native-base";

/**
 * 图片展示组件
 */
class ImageText extends PureComponent {

	render() {
		let {title, content, image} = this.props;
		return (
			<ScrollView  style={styles.container}>
				<Text style={styles.title}>{title}</Text>
				<Image source={{uri: urls.getImage(image)}} resizeMode='cover' style={styles.image}/>
				<Text style={styles.content}>        {content}</Text>
			</ScrollView>
		)
	}
}

const styles = {
	container: {
		flex: 1,
		flexDirection: 'column',
		marginBottom: 30,
		borderRadius: 10
	},
	title: {
		textAlign: 'center',
		fontSize: theme.DefaultFontSize + 6,
		marginLeft: 30,
		marginRight: 30,
	},
	content: {

		fontSize: theme.DefaultFontSize + 2,
		marginLeft: 30,
		marginRight: 30,
		lineHeight: 28,
	},
	image: {
		marginTop: 20,
		width: 250,
		height: 200,
		justifyContent: 'center',
		alignSelf:'center',
		marginBottom: 30,
	},
};

ImageText.propsTypes = {
	title: React.PropTypes.string,
	content: React.PropTypes.string,
	image: React.PropTypes.string,
}

export default (ImageText);

