import React, {Component} from "react";
import {observer} from "mobx-react/native";
import {Container, TitleHeader, Content, Loading} from "../../components";
import ScrollableTabView from "react-native-scrollable-tab-view";
import ScrollableTabBar from "../../components/ScrollableTabBar";
import ArticleList from "./components/ArticleList";
import articleStore from "../../mobx/articleStore";

@observer
export default class Article extends Component {



    render() {
        const {isFetching} = articleStore;
        return (
            <Container>
                <TitleHeader {...this.props}/>
                <Content white style={{paddingBottom: 50}}>
                    <ArticleList />
                    <Loading isShow={isFetching}/>
                </Content>
            </Container>
        )
    }
}
const styles = {
    tabView: {
        flex: 1,
        flexGrow: 1,
    }
};
