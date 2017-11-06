import React, {Component} from "react";
import {Grid, Item, Text, Row, Col, Thumbnail} from "native-base";

export default class ArticleMultiImageItem extends Component {

    render() {

        let {article, onPress, onLongPress} = this.props;
        return (
            <Item style={styles.item}
                  onPress={() => onPress && onPress(article)}
                  onLongPress={() => onLongPress && onLongPress(article)}>
                <Grid>
                    <Text style={styles.title}>{article.title}</Text>
                    <Row style={styles.row2}>
                        {
                            [0, 1, 2].map((i) => (
                                <Col key={i}>
                                    <Thumbnail
                                        square
                                        source={{uri: urls.apis.IMAGE + '?filePath=' + article.imgs[i]}}
                                        style={{width: (theme.deviceWidth - 20) / 3, height: 70}}
                                    />
                                </Col>
                            ))
                        }
                    </Row>
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
        marginLeft: 0,
        padding: 10,
    },
    row2: {
        marginTop: 10,
        marginBottom: 10
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

ArticleMultiImageItem.propTypes = {
    article: React.PropTypes.object,
    onPress: React.PropTypes.func,
    onLongPress: React.PropTypes.func,
}
