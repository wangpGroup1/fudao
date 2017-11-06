import React, {PureComponent} from "react";
import {Actions} from "react-native-router-flux";
import {Header, Left, Right, Body, Button, Icon, Title} from "native-base";

export default class Header_ extends PureComponent {

	render() {
		let {back, menu, left, center, right, title} = this.props;

		if (!left) {
            left = (
				<Left style={{flex:1}}>
					<Button transparent onPress={() => Actions.pop()}>
						<Icon name="ios-arrow-back" style={{fontSize: theme.toolbarIconSize, color: theme.toolbarIconColor}}/>
					</Button>
				</Left>
            );
		}

		if (!center) {
			if (title)
				center = (
					<Body style={{flex:1,alignItems: 'center'}}>
						<Title style={{color: theme.toolbarTextColor}}>{title}</Title>
					</Body>
				)
		}

		if (!right) {
			right = <Right style={{flex:1}}/>
		}

		return (
			<Header style={{backgroundColor:theme.contentBgColor}} noShadow>
				{left}
				{center}
				{right}
			</Header>
		)

	}
}


Header_.propTypes = {
	back: React.PropTypes.bool,// 返回按钮
	menu: React.PropTypes.bool, // 有菜单按钮
	title: React.PropTypes.string, // 标题
	left: React.PropTypes.any, // left
	body: React.PropTypes.any, // body
	right: React.PropTypes.any, // right
}

Header_.defaultProps = {
	back: false,
	menu: false,
	title: '',
	left: null,
	body: null,
	right: null
}
