import React, {Component} from "react";
import {Grid, Item, Text, Row} from "native-base";

export default class ArticleTextItem extends Component {

    render() {
        let {article, onPress, onLongPress} = this.props;
        return (
            <Item
                style={styles.item}
                onPress={() => onPress && onPress(article)}
                onLongPress={() => onLongPress && onLongPress(article)}>
                <Grid>
                    <Text style={styles.title}>{article.title}</Text>
                    <Row>
                        <Text style={styles.from}>来自：{article.source}</Text>
                    </Row>
                </Grid>
            </Item>
        )
    }
}
const styles = {
    item: {
        padding: 10,
    },
    title: {
        fontSize: 14,
    },
    from: {
        fontSize: 12,
        color: '#AAAAAA',
        marginTop:10
    },
    timeDiff: {
        fontSize: 12,
        color: '#AAAAAA',
        marginLeft: 15
    }
};

ArticleTextItem.propTypes = {
    article: React.PropTypes.object, // 资讯
    onPress: React.PropTypes.func,
    onLongPress: React.PropTypes.func,
}
