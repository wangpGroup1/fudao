import {AsyncStorage} from "react-native";
import {observable, computed, action} from "mobx";

class ActivityStore {
    @observable activityColumnList = [];
    @observable videoList = {
        firstVideo : '',
        videoId : '',
        description : '',
        actmethod : '',
        iscollection : false,
        isfree :2,
        score :0,
        name :'',
        index : '',
        ispay :false,
        actNum: 0,
        principle:''
    };

    @observable listLength = 10;
    @observable allscorea = 0;
    @observable score = 0;
    @observable actNum = 0;
    @observable pageSize = 100;
    @observable firstZu = {};
    @observable allLoaded = false;
    @observable page = 0;



    @action
    fetchActivityFirst(themeId){
        if(themeId){
            request.getJson(urls.apis.ACTIVITY_GETTHEMEACTIVITYLIST,{themeId,page:1,pageSize:this.pageSize})
            .then((result) => {
                if (result.ok) {


                    this.firstZu=result.obj.activityList[0];

                } else {
                    tools.showToast("请求出错！")
                }
            });
        }else{
            request.getJson(urls.apis.ACTIVITY_GETRECOMMENDACTIVITYLIST,{page:1,pageSize:this.pageSize})
            .then((result) => {
                if (result.ok) {


                    this.firstZu=result.obj.activityList[0];

                } else {
                    tools.showToast("请求出错！")
                }
            });
        }


    }

    @action
    fetchActivityList(themeId,page,callback){
        this.page=page;
        if(themeId){
            request.getJson(urls.apis.ACTIVITY_GETTHEMEACTIVITYLIST,{themeId,page,pageSize:8})
            .then((result) => {
                if (result.ok) {


                    if(page==result.obj.pageCount){
                        callback(result.obj.activityList, {
                            allLoaded: true
                        });
                    }else{
                        callback(result.obj.activityList);
                    }



                } else {
                    tools.showToast("请求出错！")
                }
            });
        }else{
            request.getJson(urls.apis.ACTIVITY_GETRECOMMENDACTIVITYLIST,{page,pageSize:10})
            .then((result) => {
                if (result.ok) {
                    callback(result.obj.activityList, {
                        allLoaded: true
                    });

                } else {
                    tools.showToast("请求出错！")
                }
            });
        }


    }
    @action
    allLoadedFun(pageCount) {
        this.allLoaded = pageCount <= this.page ? true : false
    }

    @action
    fetchActivityAllList(themeId,page,callback){

        if(themeId){
            request.getJson(urls.apis.ACTIVITY_GETTHEMEACTIVITYLIST,{themeId,page,pageSize:8*this.page})
            .then((result) => {
                if (result.ok) {
                    if(8*this.page>=result.obj.count){
                        callback(result.obj.activityList,{
                            allLoaded: true
                        });
                    }else{
                        callback(result.obj.activityList);
                    }


                } else {
                    tools.showToast("请求出错！")
                }
            });
        }else{
            request.getJson(urls.apis.ACTIVITY_GETRECOMMENDACTIVITYLIST,{themeId,page,pageSize:8*this.page})
            .then((result) => {
                if (result.ok) {

                    callback(result.obj.activityList,{
                        allLoaded: true
                    });
                } else {
                    tools.showToast("请求出错！")
                }
            });
        }


    }
    @action
    fetchActivityColumnList() {
        request.getJson(urls.apis.ACTIVITY_GETRECOMMENDACTIVITYLIST,{page:1,pageSize:100})
            .then((result) => {
                if (result.ok) {
                    this.activityColumnList = result.obj.activityList;
                    this.listLength=result.obj.activityList.length;
                    for(var i=0; i<result.obj.activityList.length; i++){

                        if(result.obj.activityList[i].isfree!=1||result.obj.activityList[i].ispay){
                            this.videoList={
                                firstVideo : result.obj.activityList[i].videopath,
                                videoId : result.obj.activityList[i].id,
                                description : result.obj.activityList[i].description,
                                actmethod : result.obj.activityList[i].actmethod,
                                score : result.obj.activityList[i].score,
                                iscollection : result.obj.activityList[i].iscollection,
                                isfree : result.obj.activityList[i].isfree,
                                name : result.obj.activityList[i].name,
                                ispay : result.obj.activityList[i].ispay,
                                index : i,
                                picpath: result.obj.activityList[i].picpath,
                                principle: result.obj.activityList[i].principle,
                            }
                            break;
                        }


                    }


                } else {
                    tools.showToast("请求出错！")
                }
            });
    }

    @action
    fetchThemeColumnList(themeId) {

        request.getJson(urls.apis.ACTIVITY_GETTHEMEACTIVITYLIST, {
            themeId: themeId,page:1,pageSize:100
        })
            .then((result) => {
                if (result.ok) {
                    this.activityColumnList = result.obj.activityList;
                    this.listLength=result.obj.count;
                    for(var i=0; i<result.obj.activityList.length; i++){

                        if(result.obj.activityList[i].isfree!=1||result.obj.activityList[i].ispay){

                            this.videoList={
                                firstVideo : result.obj.activityList[i].videopath,
                                videoId : result.obj.activityList[i].id,
                                description : result.obj.activityList[i].description,
                                actmethod : result.obj.activityList[i].actmethod,
                                score : result.obj.activityList[i].score,
                                iscollection : result.obj.activityList[i].iscollection,
                                isfree : result.obj.activityList[i].isfree,
                                name : result.obj.activityList[i].name,
                                ispay : result.obj.activityList[i].ispay,
                                index : i,
                                picpath: result.obj.activityList[i].picpath,
                                principle: result.obj.activityList[i].principle,
                            }
                            break;
                        }

                    }

                } else {
                    tools.showToast("请求出错！")
                }
            });
    }


    @action
    fetchActivityColumnList_addColection(themeId,callback) {

        if (themeId) {
            request.getJson(urls.apis.ACTIVITY_GETTHEMEACTIVITYLIST, {
                themeId,page:1,pageSize:100
            })
                .then((result) => {

                    if (result.ok) {

                        callback(result.obj.activityList);
                        this.listLength=result.obj.activityList.length;

                    } else {
                        tools.showToast("请求出错！")
                    }
                });
        } else {
            request.getJson(urls.apis.ACTIVITY_GETRECOMMENDACTIVITYLIST,{page:1,pageSize:100})
                .then((result) => {

                    if (result.ok) {

                        callback(result.obj.activityList);
                        this.listLength=result.obj.activityList.length;

                    } else {
                        tools.showToast("请求出错！")
                    }
                });
        }
    }

    @action
    changVideo(path, id, description, isco, isfree, actmethod,score,name,index,ispay,picpath,principle) {


        this.videoList={
            firstVideo : path,
            videoId : id,
            description : description,
            actmethod : actmethod,
            score:score,
            iscollection : isco,
            isfree : isfree,
            name : name,
            index : index,
            ispay : ispay,
            picpath : picpath,
            principle:principle

        }



    }

    //@action
    getWeekscore() {
        request.getJson(urls.apis.ACTIVITY_GETTHISWEEKTOTALSCORE)
            .then((result) => {
                if (result.ok) {
                    this.score = result.obj.weekScore;
                } else {
                    tools.showToast("请求出错！")
                }
            });

    }
    //@action
    getActNum() {
        request.getJson(urls.apis.ACTIVITY_GETACRTALLFORTHISDAY)
            .then(res => {
                if (res.ok) {
                    this.actNum= res.obj.actTallThisDay
                }else {
                    tools.showToast("请求出错！")
                }
            })
    }
    @action
    allscore() {
        request.getJson(urls.apis.ACTIVITY_GETTHISDATESCORE)
        .then((result) => {
            if (result.ok) {
                this.allscorea = result.obj.dateScore;

            } else {
                tools.showToast("请求出错！")
            }
        });

    }

    @action
    addScore(id) {


    }


    @computed
    get isFetching() {
        return this.videoList.firstVideo == ''
    }
}
const activityStore = new ActivityStore();
export default activityStore