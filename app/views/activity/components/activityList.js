import React, {Component} from "react";
import {observer} from "mobx-react/native";
import {ScrollView, ListView, View, Text} from "react-native";
import GiftedListView from "../../../components/GiftedListView";
import ActivityItem from "./activityItem";
import activityStore from "../../../mobx/activityStore";

@observer
export default class activityList extends Component {

    _onFetch(page = 1, callback, options) {
        let{themeId}=this.props;
        activityStore.fetchActivityList(themeId,page,callback)
    }

    _renderRowView(rowData,index,aaa) {
        let{themeId}=this.props;




        return (
            <ActivityItem activity={rowData} index={aaa} themeId={themeId} changVideo={(path, id, remarks, isC, isfree,actmethod,score,name,index,ispay,picpath,effect)=>this.changVideo(path, id, remarks, isC, isfree,actmethod,score,name,index,ispay,picpath,effect)}/>
        )
    }
    componentWillUpdate(){
        let {resh,themeId}=this.props;
        if(resh){
            activityStore.fetchActivityAllList(themeId,1,this.refs.hill._postRefresh)
        }
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


    changVideo(path, id, remarks, isC, isfree,actmethod,score,name,index,ispay,picpath,effect) {
        let {videoList} = activityStore;
        let {themeId,onChangeMsg} = this.props;
        onChangeMsg();
        if (isfree == 1&&!ispay) {
            let videoList={
                firstVideo : path,
                videoId : id,
                remarks : remarks,
                actmethod : actmethod,
                score:score,
                iscollection : isC,
                isfree : isfree,
                name : name,
                index : index,
                ispay : ispay,
                picpath:picpath,
                effect:effect
            }

            this.props.onChangeMsgPost(videoList,this.refs.hill._postRefresh);
            //activityStore.fetchActivityColumnList_addColection(themeId)

        }else{
            activityStore.changVideo(path, id, remarks, isC, isfree,actmethod,score,name,index,ispay,picpath,effect);
        }





    }


}