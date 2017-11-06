import React, {Component} from "react";
import {Header, Left, Right, Body, Title} from "native-base";

export default class TitleHeader extends Component {

	render() {
		return (
			<Header style={{backgroundColor:theme.contentBgColor}} noShadow>
				<Left style={{flex:1}}/>
				<Body style={{flex:1,alignItems: 'center'}}>
					<Title style={{color: theme.toolbarTextColor}}>{this.props.title}</Title>
				</Body>
				<Right style={{flex:1}}/>
			</Header>
		)
	}
};
