import React, {PureComponent} from "react";
import {Container, Header, Content, WebView} from "../../components";

export default class UserAgreement extends PureComponent {

	render() {
		return (
			<Container>
				<Header {...this.props}/>
				<Content white>
					<WebView uri={urls.pages.PROTOCOL}/>
				</Content>
			</Container>
		)
	}
}
