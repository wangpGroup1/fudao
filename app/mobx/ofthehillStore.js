import {AsyncStorage} from "react-native";
import {observable,computed, action} from "mobx";

class OfthehillStore {
    @observable usermineobj = {};
    @observable userlist = [];
    @observable ofhillphoto = {};

    @observable pageSize = 100;

    @action
    fetchUsermine() {
        request.getJson(urls.apis.ACTIVITY_GETUSERSCORELIST, {page:1})
        .then((result) => {

            if(result.ok){
                this.usermineobj=result.obj.usermine
            }else{
                tools.showToast("请求出错");
            }
        });
    }
    @action
    fetchuserList(page,callback){
        request.getJson(urls.apis.ACTIVITY_GETUSERSCORELIST, {page})
        .then((result) => {
            // alert(page+'+++++++++++++++++'+result.obj.pageCount)
            if (page === result.obj.pageCount) {
                this.pageSize = result.obj.count;

                callback(result.obj.userList, {
                    allLoaded: true
                });
            } else {
                callback(result.obj.userList);
            }
        });
    }
    @action
    fetfirstchuserList(){
        request.getJson(urls.apis.ACTIVITY_GETUSERSCORELIST, {page:1})
        .then((result) => {

            this.ofhillphoto=result.obj.userList[0];
        });
    }

    @action
    fetchAll(page=1,callback){
        request.getJson(urls.apis.ACTIVITY_GETUSERSCORELIST, {
            page,
            pageSize:this.pageSize
        })
        .then((result) => {
                callback(result.obj.userList, {
                    allLoaded: true
                });
        });
    }



}
const ofthehillStore = new OfthehillStore();
export default ofthehillStore
