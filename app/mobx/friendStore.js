import {AsyncStorage,DeviceEventEmitter} from "react-native";
import {observable, runInAction, computed, action, reaction} from "mobx";

class FriendStore {
    @observable MyFriendList =[];
    @observable friendNickMap ={};
    @observable errorMsg = '';
    @observable NewFriendList=[];
    @observable hasNewFriend=false;


    @action
    fetchMyFriendList () {
        request.getJson(urls.apis.FRIEND_GETMYFRIENDLIST)
        .then((result) => {
            if (result.ok) {
                this.MyFriendList = result.obj;
                this.MyFriendList .forEach((f) => {
                    this.friendNickMap[f.id] = new Date().getTime()//f.friendNick;
                });
            } else {
                tools.showToast("请求出错！")
            }
        });
    }
    @action
    fetchNewFriendList(){
        request.getJson(urls.apis.FRIEND_GETMYFRIENDAPPLYLIST)
        .then((result) => {
            if (result.ok) {
                this.NewFriendList = result.obj;

            } else {
                tools.showToast("请求出错！")
            }
        });
    }
    @action
    hasNewFriendFun(){
        request.getJson(urls.apis.FRIENDAPI_GETMYFRIENDAPPLYISNOTREADY)
        .then((result) => {
            if (result.ok) {
                if(result.obj>0){
                    this.hasNewFriend = true;
                }else{
                    this.hasNewFriend = false;
                }
            } else {
                tools.showToast("请求出错！")
            }
        });
    }
    @action
    changeMyFriendApplyToready(){
        request.getJson(urls.apis.FRIENDAPI_CHANGEMYFRIENDAPPLYTOREADY)
        .then((result) => {
            if (result.ok) {
                    this.hasNewFriend = false;
                     DeviceEventEmitter.emit('noticeName_f');

            } else {
                tools.showToast("请求出错！")
            }
        });
    }

    @computed
    get isFetching() {
        return this.MyFriendList.length == 0 && this.errorMsg == ''
    }
    @computed
    get isNewFetching() {
        return this.NewFriendList.length == 0 && this.errorMsg == ''
    }
}

const friendStore = new FriendStore()
export default friendStore