import React, {Component} from "react";
import {View, Image, TouchableOpacity, Platform,Alert,TextInput} from "react-native";
import {Thumbnail, Text, Icon} from "native-base";
import {Header, Container, Content} from "../../components";
import {Actions, ActionConst} from "react-native-router-flux";
import {observer} from "mobx-react/native";
import UserButton from "./components/UserButton";
import WomanChoose from "./components/WomanChoose";
import UserStore from "../../mobx/userStore";
import DatePicker from 'react-native-datepicker';

var Geolocation = require('Geolocation');

@observer
export default class StartInformation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: '',
            sex: null,
            nickname: '',
            jieduan: ''

        }
    }

    componentWillMount() {
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
                        UserStore.location = data.result;
                        UserStore.position.name = UserStore.location.addressComponent.city;
                        UserStore.position.regionId = UserStore.location.addressComponent.adcode;
                    });
                })

            },
            error => {
                tools.showToast("获取位置失败")
                UserStore.position.name = "手动选择位置"
            }
        );
    }

    changeSex(sex) {
        this.setState({
            sex: sex
        })
        if(sex == 2) {
            this._modal.show();
        }
    }

    tishi(){
        let {sex,nickname} = this.state;
        if (sex === null) {
            tools.showToast("请点击选择您的性别")
            return;
        }
        if (nickname === '') {
            tools.showToast("请输入您的昵称")
            return;
        }
        if (UserStore.position.regionId == '') {
            tools.showToast("请点击选择您的位置")
            return;
        }
        Alert.alert(
            '悄悄告诉你:',
            "性别保存后不可修改哦，确认提交吗？",
            [
                {text: '取消', onPress: () => null},
                {text: '提交', onPress: () => this.commit()},
            ]
        )
    }

    commit() {
        let {sex, date,nickname,jieduan} = this.state;

        let {phone, password} = this.props


        request.postJson(urls.apis.USER_SETUSERBASEINFO, {
            phone: phone,
            nickname: nickname,
            sex: sex,
            crowd: jieduan,
            birthday: date ,
            regionId: UserStore.position.regionId
        }).then((res) => {
            if (res.ok) {
                UserStore.login(phone, password, () => {
                    UserStore.fetchLoginUser();
                });
            }
        })
    }
    _jieduan(text){
        this.setState({
            jieduan:text
        })
    }
    render() {
        let position = UserStore.position.name;
        let date1 = tools.dateFormat(new Date(), 'yyyy-MM-dd')
        return (
            <Container style={styles.container}>
                <Header {...this.props}/>
                <Content padder white>
                    <View style={styles.photo}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={this.changeSex.bind(this, 1)}
                        >
                            {this.state.sex === 1 ? <Thumbnail large source={require('./assets/m.png')}/> :
                                <Thumbnail large source={require('./assets/m-h.png')}/>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={this.changeSex.bind(this, 2)}
                        >
                            {this.state.sex === 2 ? <Thumbnail large source={require('./assets/w.png')}/> :
                                <Thumbnail large source={require('./assets/w-h.png')}/>
                            }

                            <Text style={{textAlign:'center',marginTop:5}}>{this.state.jieduan}</Text>

                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop: 20}}>
                        {/*<Text style={styles.dateText}>请选择您的生日</Text>*/}
                    </View>
                    <View style={styles.row}>
                        <Text>昵称</Text>
                        <TextInput
                            style={{flex: 1, textAlign: 'right'}}
                            underlineColorAndroid='transparent'
                            placeholder={'请输入您的昵称'}
                            onChangeText={(value) => {
                                this.setState({nickname: value})
                            }}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text>生日</Text>
                        <DatePicker
                            style={{width: 100}}
                            date={this.state.date}
                            showIcon={false}
                            mode="date"
                            maxDate={date1}
                            placeholder={this.state.date}
                            format="YYYY-MM-DD"
                            confirmBtnText="确定"
                            cancelBtnText="取消"
                            customStyles={{
                                dateInput: styles.datePicker,
                                dateText: styles.pickerText,
                                placeholderText: {color: "#999999"}
                            }}
                            onDateChange={(date) => {
                                this.setState({date: date})
                            }}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.position}
                        onPress={() => Actions.cityPick()}>
                        <Icon name='navigate'/>
                        <Text style={styles.positionText}>{position}</Text>
                    </TouchableOpacity>
                    <UserButton text="提交" onPress={this.tishi.bind(this)}/>
                    <WomanChoose ref={(e)=>this._modal = e}  onPress={this._jieduan.bind(this)}/>
                </Content>
            </Container>
        )
    };
}
const styles = {
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    photo: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    datePicker: {
        borderWidth: 0,
    },
    pickerText: {
        fontSize: theme.DefaultFontSize + 2,
    },
    dateText: {
        textAlign: 'center',
        fontSize: theme.DefaultFontSize + 2,
    },
    dateBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#A1CC00',
        padding: 10,
        marginTop: 30,
    },
    position: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    positionText: {
        marginLeft: 10,
        fontSize: theme.DefaultFontSize - 3,
    },
};



