//noinspection JSAnnotator
import React, {PureComponent} from "react";
import {Text} from "native-base";
import {View, Image, DeviceEventEmitter, TouchableHighlight} from "react-native";
import {Actions} from "react-native-router-flux";
import {theme} from "../../../utils/";

/**
 * 我的情绪
 */
export default class Headline extends PureComponent {

	render() {
		return (
			<View style={styles.view}>
				<View style={styles.imageView}>
					<Image source={require('../assets/headline.png')} style={styles.image}/>
				</View>
				<View style={styles.content}>
					<View style={styles.textLine}>
						<View style={styles.typeBorder}>
							<Text style={styles.type}>热评</Text>
						</View>
						<TouchableHighlight onPress={()=>Actions['about']()} underlayColor='#fafafa'>
							<Text style={styles.text}>
								学会三点让您摆脱血压高！
							</Text>
						</TouchableHighlight>
					</View>
					<View style={styles.textLine}>
						<View style={styles.typeBorder}>
							<Text style={styles.type}>经典</Text>
						</View>
						<TouchableHighlight onPress={()=>Actions['about']()} underlayColor='#fafafa'>
							<Text style={styles.text}>
								学会三点让您摆脱血压高！
							</Text>
						</TouchableHighlight>
					</View>
				</View>
			</View>
		)
	}

}

const styles = {
	view: {
		flexDirection: 'row',
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 14,
		paddingRight: 14,
		borderBottomColor: '#ddd',
		borderBottomWidth: 1,
		overflow: 'hidden'

	},
	imageView: {
		borderRightColor: '#ddd',
		borderRightWidth: 0.5,
		marginRight: 16,
	},
	image: {
		width: 60,
		height: 66,
		marginRight: 14,
	},
	content: {
		flex: 1,
	},
	textLine: {
		flexDirection: 'row',
		marginTop: 8,

	},
	typeBorder: {
		borderColor: '#FF3D20',
		borderWidth: 1,
		marginRight: 6,
	},
	type: {
		color: '#FF3D20',
		paddingBottom: 2,
		paddingTop: 2,
		paddingRight: 4,
		paddingLeft: 4,
	},
	text: {
		fontSize: theme.DefaultFontSize + 1,
		color: '#000',
		fontWeight: '600',
		paddingTop: 2,
	}
}