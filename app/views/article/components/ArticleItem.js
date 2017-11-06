import React, {Component} from "react";
import {Actions} from "react-native-router-flux";
import ArticleTextItem from "./ArticleTextItem";
import ArticleSingleImageItem from "./ArticleSingleImageItem";
import ArticleMultiImageItem from "./ArticleMultiImageItem";

export default class ArticleItem extends Component {

    _onPress() {
        let {article, loginUser, onPress} = this.props;

        if (onPress)
            onPress(article);
        else
            Actions.articleDetail({
                articleId: article.id
            })
    }

    _onLongPress() {
        let {article, onLongPress} = this.props;

        if (onLongPress)
            onLongPress(article);
    }

    render() {
        let {article} = this.props;
        /*return <ArticleTextItem
            article={article}
            onPress={this._onPress.bind(this)}
            onLongPress={this._onLongPress.bind(this)}/>*/
        article.imgs = [];
        if (article.img!="无") {
            article.imgs = article.img.split(',')
        }else{
            return <ArticleTextItem
                article={article}
                onPress={this._onPress.bind(this)}
                onLongPress={this._onLongPress.bind(this)}/>
        }

        // 图片个数
        let imgLen = article.imgs.length;
        if (imgLen >= 3) {
            return <ArticleMultiImageItem
                article={article}
                onPress={this._onPress.bind(this)}
                onLongPress={this._onLongPress.bind(this)}/>
        } else {
            return <ArticleSingleImageItem
                article={article}
                onPress={this._onPress.bind(this)}
                onLongPress={this._onLongPress.bind(this)}/>
        }


    }
}