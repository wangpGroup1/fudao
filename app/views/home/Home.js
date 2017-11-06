import React, {Component} from "react";
import {observer} from "mobx-react/native";
import {Image, RefreshControl, ScrollView, Text, TouchableOpacity, View,DeviceEventEmitter} from "react-native";
import {Actions} from "react-native-router-flux";
import {Body, Button, Header, Icon, Left, List, ListItem, Right} from "native-base";
import {Container, Content} from "../../components/index";
import MyEnter from "./components/MyEnter";
import CircleProgress from "../consult/components/CircleProgress";
import userStore from "../../mobx/userStore";
import activityStore from "../../mobx/activityStore";
import ofthehillStore from "../../mobx/ofthehillStore";

@observer
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            aqi: '',
            aqi_levnm: '',
            weatid: null,
            temperature: '',
            // weather: {temperature_curr: ''},
            // pm25: {aqi: '', aqi_levnm: ''},
            todayScore: 0,
            actNum: 0,
            themeList: [],
            isRefreshing: false
        };

    }

    getThemeList() {
        request.getJson(urls.apis.THEME_GETEVERYDAYRECOMMEND)
            .then((res) => {
                if (res.ok) {
                    this.setState({
                        themeList: res.obj.themeList,
                        isRefreshing: false
                    })
                }

            })
    }

    componentDidMount() {
        activityStore.getWeekscore()
        activityStore.getActNum()
        ofthehillStore.fetfirstchuserList()
        this.getWeather()
        this.getPM25()
        this.getThemeList()
    }

    getPM25() {
        request.getJson(urls.apis.WEATHER_GETPM25, {weaid: userStore.loginUser.regionId})
            .then(res => {
                if (res.ok) {
                    this.setState({
                        aqi: res.obj.aqi,
                        aqi_levnm: res.obj.aqi_levnm,
                    })
                }
            })
    }

    getWeather() {
        request.getJson(urls.apis.WEATHER_GETWEATHER, {weaid: userStore.loginUser.regionId})
            .then(res => {
                if (res.ok) {
                    this.setState({
                        temperature: res.obj.temperature_curr,
                        weatid: res.obj.weatid
                    })
                }
            })
    }

    renderComment(c) {
        if (90 <= c && c <= 100) {
            return '快去占领山头独领风骚'
        } else if (80 <= c && c < 90) {
            return '八九十分，距离一克拉不远啦'
        } else if (70 <= c && c < 80) {
            return '恭喜你不用补习了，进不了冲刺班，也不能进保底班'
        } else if (60 <= c && c < 70) {
            return '不要在及格星停留太久，你还有诗和远方'
        } else if (30 <= c && c < 60) {
            return '系统提示：你需要上个终身挂科险'
        } else if (0 <= c && c < 30) {
            return '矮马，你的发展空间是不是太大了'
        } else {
            return null
        }
    }
    indexAction(){
        DeviceEventEmitter.emit('indexAction',1)
    }
    _onRefresh() {
        this.setState({isRefreshing: true});
        activityStore.getWeekscore()
        activityStore.getActNum()
        this.getWeather()
        this.getPM25()
        this.getThemeList()
    }

    render() {
        let weekScore = activityStore.score > 700 ? 700 : activityStore.score
        let {actNum} = activityStore
        let {loginUser} = userStore;
        let {ofhillphoto} = ofthehillStore
        // let {weather, pm25} = this.state;
        let {weatid, temperature, aqi_levnm, aqi} = this.state;
        let arr = [
            require('./image/weather/晴.png'),
            require('./image/weather/多云.png'),
            require('./image/weather/阴.png'),
            require('./image/weather/阵雨.png'),
            require('./image/weather/雷阵雨.png'),

            require('./image/weather/雷阵雨有冰雹.png'),
            require('./image/weather/雨夹雪.png'),
            require('./image/weather/小雨.png'),
            require('./image/weather/中雨.png'),
            require('./image/weather/大雨.png'),

            require('./image/weather/暴雨.png'),
            require('./image/weather/大暴雨.png'),
            require('./image/weather/特大暴雨.png'),
            require('./image/weather/阵雪.png'),
            require('./image/weather/小雪.png'),

            require('./image/weather/中雪.png'),
            require('./image/weather/大雪.png'),
            require('./image/weather/暴雪.png'),
            require('./image/weather/雾.png'),
            require('./image/weather/冻雨.png'),

            require('./image/weather/沙尘暴.png'),
            require('./image/weather/小雨中雨.png'),
            require('./image/weather/中雨大雨.png'),
            require('./image/weather/大雨暴雨.png'),
            require('./image/weather/暴雨大暴雨.png'),

            require('./image/weather/大暴雨特大暴雨.png'),
            require('./image/weather/小雪中雪.png'),
            require('./image/weather/中雪大雪.png'),
            require('./image/weather/大雪暴雪.png'),
            require('./image/weather/浮尘.png'),

            require('./image/weather/扬沙.png'),
            require('./image/weather/沙尘暴.png'),
            require('./image/weather/霾.png'),
        ]
        return (
            <Container>
                <Header style={{backgroundColor: '#e3e7f3'}}>
                    <Left>
                        <Button style={styles.planButton} onPress={() => {
                            Actions.consult({score: weekScore})
                        }}>
                            <Text style={{color: '#fff', fontSize: 10}}>今日运动 {actNum}组</Text>
                            <Icon name="ios-arrow-forward" style={{fontSize: 15}}/>
                        </Button>
                    </Left>
                    <Body/>
                    <Right>
                        <View style={styles.weather}>
                            <Image source={arr[weatid]} style={{width: 17, height: 17}}/>
                            <Text style={{
                                color: '#424242',
                                marginLeft: 8,
                                fontSize: 12
                            }}>{temperature}</Text>
                            <Text style={{
                                color: '#424242',
                                marginLeft: 8,
                                fontSize: 12
                            }}>{aqi + aqi_levnm}</Text>
                        </View>
                    </Right>
                </Header>
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
                    <Content white>
                        <Image source={require('./image/bj.png')}
                               style={{width: '100%', height: '100%', position: 'absolute', top: 0}}/>
                        <View style={{height: theme.deviceHeight - 253,justifyContent: 'center'}}>
                            <View style={{alignItems: 'center', paddingBottom: 40}}>
                                <CircleProgress
                                    baseColor="#e4e4e4"
                                    totalNum={700}
                                    progress={weekScore}
                                >
                                    <Text style={{fontSize: 9}}>活力值</Text>
                                    <Text style={{fontSize: 31}}>{(activityStore.score || '0') + '分'}</Text>
                                    <TouchableOpacity
                                        style={{width: 200, justifyContent: 'center', alignItems: 'center'}}
                                        activeOpacity={1}
                                        onPress={() => {
                                            Actions.ofTheHill()
                                        }}
                                    >
                                        <View>
                                            <Image source={{uri: urls.getImage(ofhillphoto.photo, 100, 100)}}
                                                   style={{width: 30, height: 30, borderRadius: 15}}></Image>
                                            <Text style={{fontSize: 10, left: 30, position: 'absolute',}}>占你山头</Text>
                                        </View>
                                        <Image source={require('./image/hill.png')} style={{width: 45, height: 35}}/>
                                    </TouchableOpacity>
                                </CircleProgress>
                            </View>
                            <View style={{alignItems: 'center'}}>
                                <Text style={{fontSize: 13}}>
                                    {this.renderComment(activityStore.score)}
                                </Text>

                            </View>
                            <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'center'}}>
                                <Button
                                    style={styles.activeButton}
                                    onPress={() => {
                                        Actions.activity()
                                    }}>
                                    <Text style={{color: '#fff', fontSize: 15}}>一键活动</Text>
                                </Button>
                            </View>
                        </View>
                        <View style={{width: '100%', position: 'absolute', bottom: 56}}>
                            <MyEnter themeList={this.state.themeList}/>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={{
                                    position: 'absolute',
                                    bottom: 6,
                                    left: theme.deviceWidth/2 -16
                                }}
                                onPress={this.indexAction.bind(this)}
                            >
                                <Image source={require('./assets/arrow.png')} style={{ width: 32, height: 16.5,}}/>
                            </TouchableOpacity>
                        </View>
                    </Content>
                </ScrollView>
            </Container>
        )
    }
}

const styles = {
    planButton: {
        flexDirection: 'row',
        width: 92,
        height: 21,
        backgroundColor: '#726585',
        borderBottomRightRadius: 15,
        borderTopRightRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: -10
    },
    weather: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'pink'
    },
    activeButton: {
        width: 103,
        height: 31,
        borderRadius: 15.5,
        backgroundColor: '#726585',
        justifyContent: 'center'
    }
};
