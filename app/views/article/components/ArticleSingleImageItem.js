import React, {Component} from "react";
import {Grid, Item, Text, Row, Col, Thumbnail} from "native-base";

export default class ArticleSingleImageItem extends Component {

    render() {
        let {article, onPress, onLongPress} = this.props;

        // 多图分隔显示第一张
        let imgs = article.img.split(',');

        return (
            <Item
                style={styles.item}
                onPress={() => onPress && onPress(article)}
                onLongPress={() => onLongPress && onLongPress(article)}>
                <Grid>
                    <Row>
                        <Col>
                            <Text style={styles.title}>{article.title}</Text>
                            <Row style={{marginTop: 15}}>
                                <Text style={styles.from}>来自：{article.source}</Text>
                            </Row>
                        </Col>

                        <Thumbnail square source={{uri: urls.apis.IMAGE + '?filePath=' + imgs[0]}} style={{width: 110, height: 70}}/>

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
        color: '#AAAAAA'
    },
    timeDiff: {
        fontSize: 12,
        color: '#AAAAAA',
        marginLeft: 15
    }
};

ArticleSingleImageItem.propTypes = {
    article: React.PropTypes.object,
    onPress: React.PropTypes.func,
    onLongPress: React.PropTypes.func,
}
