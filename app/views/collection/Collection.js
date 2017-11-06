import React, {PureComponent} from "react";
import {Container, Content, Header} from "../../components";
import ScrollableTabView from "react-native-scrollable-tab-view";
import SubTabBar from "./components/SubTabBar";
import CollectionList from "./components/CollectionList";
import MovementList from "./components/MovementList";


export default class Collection extends PureComponent {

    render() {
        return (
            <Container>
                <Header {...this.props}/>
                <Content gray>
                    <ScrollableTabView
                        renderTabBar={() => (<SubTabBar subTabNames={['资讯文章','场景动作']}/>)}
                        tabBarPosition='top'
                        scrollWithoutAnimation={false}
                    >
                        <CollectionList/>
                        <MovementList/>
                    </ScrollableTabView>
                </Content>
            </Container>
        )
    }
}