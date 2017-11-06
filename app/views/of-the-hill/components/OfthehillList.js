import React, {Component} from "react";
import {observer} from "mobx-react/native";
import {ScrollView, ListView, View, Text} from "react-native";
import GiftedListView from "../../activity/components/GiftedListView";
import HillItem from "./HillItem";
import ofthehillStore from "../../../mobx/ofthehillStore"
import activityStore from "../../../mobx/activityStore";

@observer
export default class OfthehillList extends Component {

    _onFetch(page = 1, callback, options) {
        // alert()
        ofthehillStore.fetchuserList(page,callback)
    }

    _renderRowView(rowData,index,aaa) {



        return (
            <HillItem activity={rowData} index={aaa} isPraise={(id,num)=>this.isPraise(id,num)}/>
        )
    }

    render() {

        return (
            <GiftedListView
                rowView={this._renderRowView.bind(this)}
                onFetch={this._onFetch.bind(this)}
                firstLoader={true}
                pagination={true}
                refreshable={true}
                withSections={false}
                enableEmptySections={true}
                locked={true}
                ref="hill"
            />
        )
    }

    isPraise(id,num){
        request.getJson(urls.apis.ACTIVITY_ADDORREMOVEPRAISE, {friendId:id,type:num})
        .then((result) => {
            if(result.ok){
                activityStore.getWeekscore()

                if(num==1){
                    tools.showToast("点赞成功");
                }else{
                    tools.showToast("取消点赞成功");
                }

                ofthehillStore.fetchAll(1,this.refs.hill._postRefresh);
                ofthehillStore.fetchUsermine()
                // this.refs.hill._setPage(1);
            }else{
                tools.showToast("请求出错");
            }
        });
    }


}