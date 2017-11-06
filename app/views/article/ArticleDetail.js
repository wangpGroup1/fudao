import React, {PureComponent} from "react";
import {Container, Content, Header, WebView} from "../../components";

export default class ArticleDetail extends PureComponent {

	render() {
		let {articleId} = this.props;
		return (
			<Container>
				<Header {...this.props}/>
				<Content white>
					<WebView uri={urls.pages.ARTICLE_GETARTICLE + '?id=' + articleId}/>
				</Content>
			</Container>
		)
	}
}
