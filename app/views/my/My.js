import React, {PureComponent} from "react";
import {View,ScrollView,TouchableOpacity,RefreshControl} from "react-native";
import {Container, Content, Header,TitleHeader} from "../../components";
import MyPhoto from "./components/MyPhoto";
import MyList from "./components/MyList";

export default class My extends PureComponent {
    state={
        isRefreshing: false
    }

    _onRefresh() {
        this.setState({isRefreshing: true});
        this.refs.list.refresh();
    }

    _onRefreshEnd(){
        alert('aaaa')

        this.setState({isRefreshing: false});
    }


    render() {
        return (
            <Container>
                <TitleHeader {...this.props}/>
                <Content white>
                    <ScrollView
                        contentContainerStyle={{flex: 1}}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this._onRefresh.bind(this)}
                                colors={['#ff0000', '#00ff00', '#0000ff']}
                                progressBackgroundColor="#fff"
                            />
                        }
                    >
                        <MyPhoto/>
                        <MyList
                            ref="list"
                            _onRefreshEnd={()=>this.setState({isRefreshing: false})}
                        />
                    </ScrollView>
                </Content>
            </Container>
        )
    }
}
