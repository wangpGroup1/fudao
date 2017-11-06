import React, {Component} from "react";
import {StyleSheet, View, ListView, RefreshControl,Alert,ToastAndroid} from "react-native";
import {Actions} from "react-native-router-flux";
import {observer} from "mobx-react/native";
import Loading from "./Loading";
import NoList from "./NoList";
import LoadFooter from "./LoadFooter";
import ArticleItem from "../../article/components/ArticleItem";
import CollectionListStore from "../../../mobx/collectionListStore";

@observer
export default class CollectionList extends Component {

    state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
    }
    componentDidMount() {
        CollectionListStore.fetchCollectionList_articl();
    }
    _onRefresh  () {
        //下拉
        CollectionListStore.isRefreshing_a = true;
        CollectionListStore.fetchCollectionList_articl();
    }
    _onEndReach() {
        if (CollectionListStore.isLastPage_a) {
            return null;
        }
        CollectionListStore.page_a++;
        CollectionListStore.fetchCollectionList_articl();
    }
    _renderRow(rowData) {
        return (
            <ArticleItem article={rowData} onPress={() =>this.onPress(rowData)} onLongPress={() =>this.longPress(rowData)} />
        )
    }
    longPress(rowData) {
        Alert.alert('操作提示', '您确定要取消该收藏吗?', [
            {text: '取消'},
            {text: '删除', onPress: () => this.removeMyCollection(rowData)},
        ])
    }
    onPress(rowData){
        Actions.articleDetail({
            articleId: rowData.articleId
        })
    }

    removeMyCollection(rowData) {
        request.getJson(urls.apis.COLLECTIONAPI_DELETEMYCOLLECTION, {
            id: rowData.id
        }).then((result) => {
            if(result.ok){
                ToastAndroid.show('删除成功',ToastAndroid.SHORT);
                CollectionListStore.fetchCollectionList_articl()
            }


        });
    }
    _renderFooter() {
        return (
			<LoadFooter isEnd={CollectionListStore.isLastPage_a}/>
        )
    }

    render() {
        const {isRefreshing_a, isFetching_a, collectionList_articl,isNoResult_a} = CollectionListStore;
        return (
			<View style={styles.listView}>
                {!isFetching_a &&
				<ListView
					dataSource={this.state.dataSource.cloneWithRows(collectionList_articl.slice(0))}
					renderRow={this._renderRow.bind(this)}
					renderFooter={this._renderFooter}
					enableEmptySections
					initialListSize={3}
					onScroll={this._onScroll}
					onEndReached={this._onEndReach}
					onEndReachedThreshold={30}
					refreshControl={
						<RefreshControl
							refreshing={isRefreshing_a}
							onRefresh={this._onRefresh}
							colors={['rgb(217, 51, 58)']}
						/>
                    }
				/>
                }
				<NoList isShow={isNoResult_a}/>
			</View>
        )
    }

}
const styles = StyleSheet.create({
    listView: {
        flex: 1,
    }
})