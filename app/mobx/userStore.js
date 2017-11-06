import {action, computed, observable, reaction, runInAction} from "mobx";
import {ActionConst, Actions} from "react-native-router-flux";
import {persist} from "mobx-persist";
import hydrate from "../common/hydrate";
var Geolocation = require('Geolocation');


class UserStore {
    @observable hydrated = false;
    @persist @observable isLogin = false;
    @persist @observable phone = '';
    @persist @observable password = '';
    @persist @observable token = '';
    @persist @observable lon = 116.391350;
    @persist @observable lat = 39.907723;
    @persist('object') @observable loginUser = {};
    @persist('object') @observable location = {};
    @observable position = {name: '获取中...', regionId: ''}
    @observable weather = {};
    @observable PM25 = {};

    fieldMap = {
        'personalHistory': 'personal_history',
        'familyHistory': 'family_history',
        'obstetricalHistory': 'obstetrical_history',
        'medicationHistory': 'medication_history',
        'mentalState': 'mental_state',
    };

    @action
    login = async (phone, password, callback) => {
        this.phone = phone;
        this.password = password;
        let token = await this._login(phone, password);
        runInAction(() => {
            this.isLogin = true;
            this.token = token;
            callback();
        })
    };
    @action
    otherLogin = (token,callback)=>{
        runInAction(() => {
            this.isLogin = true;
            this.token = token;
            tools.showToast("登录成功");
            callback();
        })
    };

    @action
    relogin = (callback) => {
        this.login(this.phone, this.password, callback)
    };

    @action
    fetchLoginUser = async () => {
        let loginUser = await this._fetchLoginUser();
        runInAction(() => {
            this.loginUser = loginUser;
            if (!this.loginUser.sex || !this.loginUser.nickname) {
                Actions.startInformation({phone: this.loginUser.phone, password: this.loginUser.password})
            } else {
                Actions.index({type: ActionConst.RESET});
            }
        })
    };

    _login(phone, password) {
        return new Promise(function (resolve, reject) {
            request.getJson(urls.apis.USER_LOGIN, {
                phone,
                password
            }).then((data) => {
                if (data.ok) {
                    tools.showToast("登录成功");
                    resolve(data.obj);
                } else {
                    tools.showToast("用户名或密码错误");
                }
            });
        });
    }

    _fetchLoginUser() {
        return new Promise(function (resolve, reject) {
            request.getJson(urls.apis.USER_GETLOGINUSER)
                .then((data) => {
                    if (data.ok) {
                        resolve(data.obj);
                    }
                });
        });
    }

    @action
    updateUserPhoto(uri, fileName) {
        let formData = new FormData();
        formData.append("filename", {
            uri: uri,
            type: 'multipart/form-data',
            name: fileName
        });
        request.postJson(urls.apis.IMAGE_UPLOAD, formData)
            .then(result => {
                if (result.ok) {
                    // 修改图片路径
                    this.updateUserInfo('photo', result.obj)
                } else {
                    tools.showToast("上传失败")
                }
            })
    }

    @action
    updateUserInfo(property, value) {
        let user0 = {...this.loginUser};
        user0[property] = value;
        this.loginUser = user0;
        request.getJson(urls.apis.USER_UPDATEUSERINFO, {
            fieldName: this.fieldMap[property] || property,
            value
        }).then(result => {
            if (result.ok) {
                // ...
            } else {
                tools.showToast("修改失败");
            }
        })
    }

    @action
    getposition() {
        Geolocation.getCurrentPosition(
            location => {
                var result = "速度：" + location.coords.speed +
                    "\n经度：" + location.coords.longitude +
                    "\n纬度：" + location.coords.latitude +
                    "\n准确度：" + location.coords.accuracy +
                    "\n行进方向：" + location.coords.heading +
                    "\n海拔：" + location.coords.altitude +
                    "\n海拔准确度：" + location.coords.altitudeAccuracy +
                    "\n时间戳：" + location.timestamp;
                this.lon = location.coords.longitude;
                this.lat = location.coords.latitude;
                var coord = location.coords.longitude + "," + location.coords.latitude;
                request.getJson('http://api.map.baidu.com/geoconv/v1/', {
                    coords: coord,
                    from: 1,
                    to: 5,
                    ak: 'trLEKMVBCc6MKGemHlUXdyy2'
                }).then((data) => {
                    var coo = data.result[0].y + "," + data.result[0].x;
                    request.getJson('http://api.map.baidu.com/geocoder/v2/', {
                        location: coo,
                        output: 'json',
                        pois: 1,
                        radius: 20,
                        ak: 'trLEKMVBCc6MKGemHlUXdyy2'
                    }).then((data) => {
                        this.location = data.result;

                    });
                })

            },
            error => {
                tools.showToast("获取位置失败")
            }
        );
    }

    @action
    logout() {
        this.isLogin = false;
        this.token = ''
    }
}


const userStore = new UserStore();
export default userStore
hydrate('user', userStore).then(() => {
    userStore.hydrated = true;
});