import React, {Component} from "react";
import {ScrollView, ListView, View, Text,TouchableOpacity,RefreshControl} from "react-native";
import GiftedListView from "../../../components/GiftedListView";
import ArticleItem from "./ArticleItem";
import articleStore from "../../../mobx/articleStore";

export default class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            a:1,
            isRefreshing:false
        }
       /* this.idArr=[]*/
    }

    componentWillMount() {
        articleStore._fetchArticleColumnList(this.state.a)
    }

    _onFetch(page = 1, callback, options) {
        request.getJson(urls.apis.ARTICLEAPI_GETARTICLELIST, {page})
            .then((result) => {
              if (page === result.obj.pageCount) {
                    callback(result.obj.list, {
                        allLoaded: true
                    });
                } else {
                    callback(result.obj.list);
                }
            });
    }
    _renderRow(){
        let {articleColumnList} = articleStore;
       /* let {list1}=this.state;*/
        var list = articleColumnList.map((item,index)=>{
            return (
                <ArticleItem key={index} article={item}/>
            )
        });
        return (
            <View>
                <View>{list}</View>
                <TouchableOpacity onPress={this.change.bind(this)} style={{paddingBottom:50}}>
                    <Text style={{textAlign:'center',marginTop:10}}>换一组</Text>
                </TouchableOpacity>
            </View>

        )
    }

    change(){
        let {a} = this.state;
        a++;

        articleStore._fetchArticleColumnList(a);

            this.setState({
                a:a,
                isRefreshing:false
            })
    }
    render() {
         let {articleColumnList} = articleStore;
        return (
            <ScrollView ref="list"  refreshControl={
                <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={this.change.bind(this,this.state.a)}
                    colors={['#ff0000', '#00ff00', '#0000ff']}
                    progressBackgroundColor="#fff"
                />
            }>
                {articleColumnList?this._renderRow():null}
            </ScrollView>
        )
        /*<GiftedListView
         rowView={this._renderRowView.bind(this)}
         onFetch={this._onFetch.bind(this)}
         firstLoader={true}
         pagination={true}
         refreshable={true}
         withSections={false}
         enableEmptySections={true}
         locked={true}
         />*/

    }


}