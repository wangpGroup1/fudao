import React, {Component} from "react";
import {Animated, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {observer} from "mobx-react/native";
import {Icon} from "native-base";

import {Container, Content, Header, WebView} from "../../components";
import NewCircleProgress from "./components/NewCircleProgress";

const nowMonth = new Date().getMonth()
const nowYear = new Date().getFullYear()
const max =  574-theme.deviceWidth
@observer
export default class Consult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subTabNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            activeTab: nowMonth,
            scrollX: nowMonth * 40 >max? max:nowMonth * 40,
            progress: 0,
            widthAnim: new Animated.Value(40),
            renderYear: false
        }
    }

    componentDidMount() {
        let self = this
        this.timer = setTimeout(function () {
            self._scrollView.scrollTo({x: self.state.scrollX > max? max:self.state.scrollX, y: 0, animated: true})
        }, 500)
        request.getJson(urls.apis.ACTIVITY_GETTHISDATESCORE)
            .then((result) => {
                if (result.ok) {
                    this.setState({
                        progress:result.obj.dateScore
                    })
                } else {
                    tools.showToast("请求出错！")
                }
            });
    }

    onPress(i) {
        this.setState({
            activeTab: i
        })
    }

    renderTabOption(tab, i) {
        let backgroundColor = this.state.activeTab == i ? "#fff" : theme.contentBgColor;
        let nowDate = new Date().getMonth()
        return (
            <TouchableOpacity
                key={i}
                onPress={this.onPress.bind(this, i)}
                style={styles.tab}
                activeOpacity={1}
                disabled={i <= nowDate ? false : true}
            >
                <View style={[styles.item, {backgroundColor: backgroundColor,}]}>
                    <Text style={{color: i <= nowDate ? '#333' : '#999', fontSize: 11}}>
                        {tab}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    onMessage(data) {
        this.setState({
            progress: data
        })
    }

    onYearPress() {
        let value
        JSON.stringify(this.state.widthAnim) == 40 ? value = 200 : value = 40
        Animated.timing(
            this.state.widthAnim,
            {
                toValue: value,
            }
        ).start();
    }

    render() {
        let {activeTab, scrollX, progress,widthAnim,renderYear} = this.state,
            activeMonth = activeTab + 1,
            yearMonth = nowYear + '-' + (activeMonth < 10 ? "0" + activeMonth : activeMonth)
        let tipText, fingerText
        if (progress < 60) {
            tipText = '活动量不足'
            fingerText = '不足'
        } else if (progress >= 60 && progress <= 100) {
            tipText = '活动量刚好'
            fingerText = '完美'
        } else if (progress > 100) {
            tipText = '活动过量'
            fingerText = '过量'
        }

        return (
            <Container>
                <Header {...this.props}/>
                <Content white>
                    <View style={{alignItems: 'center'}}>
                        <NewCircleProgress
                            progress={progress >= 200 ? 200 : progress}
                            text={fingerText}
                        >
                            <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 25}}>
                                <Text style={{fontSize: 24}}>{progress}</Text>
                                <Text style={{fontSize: 12}}>{tipText}</Text>
                            </View>
                        </NewCircleProgress>
                    </View>
                    {/*<SubTabBar subTabNames={this.state.subTabNames} onPress={(i) => this.setState({activeMonth: i})}/>*/}
                    <View style={styles.tabView}>

                        <Animated.View style={[styles.yearBox, {width: widthAnim}]}>
                            <ScrollView
                                contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                ref={o => this._scrollView1 = o}
                            >
                                {
                                    renderYear ?
                                        <TouchableOpacity
                                            onPress={this.onYearPress.bind(this)}
                                        >
                                            <Text style={{fontSize: 11}}>{nowYear}</Text>
                                        </TouchableOpacity> : null
                                }
                                <TouchableOpacity
                                    onPress={this.onYearPress.bind(this)}
                                >
                                    <Text>{nowYear}</Text>
                                </TouchableOpacity>
                            </ScrollView>

                        </Animated.View>

                        <TouchableOpacity
                            onPress={() => this._scrollView.scrollTo({x: scrollX <= 0 ? 0: scrollX- 40, y: 0, animated: true})}
                        >
                            <Icon name="ios-arrow-back" style={{marginLeft: 10, marginRight: 10,fontSize:20}}/>
                        </TouchableOpacity>
                        <ScrollView
                            horizontal
                            onScroll={(e) => {
                                this.setState({scrollX: e.nativeEvent.contentOffset.x > max ? max : e.nativeEvent.contentOffset.x})
                            }}

                            showsHorizontalScrollIndicator={false}
                            ref={o => this._scrollView = o}
                        >
                            {this.state.subTabNames.map((tab, i) => this.renderTabOption(tab, i))}
                        </ScrollView>
                        <TouchableOpacity
                            onPress={() => this._scrollView.scrollTo({x: scrollX >= max ? max : scrollX+ 40, y: 0, animated: true})}
                        >
                            <Icon name="ios-arrow-forward" style={{marginLeft: 10, marginRight: 10,fontSize:20}}/>
                        </TouchableOpacity>
                    </View>
                    <WebView
                        uri={urls.pages.ECHART + '?yearMonth=' + yearMonth}
                        onMessage={(e) => this.onMessage(e.nativeEvent.data)}
                    />
                    {/*<Echarts option={option} height={250} width={theme.deviceWidth}*/}
                    {/*style={{backgroundColor: theme.toolbarDefaultBg}}/>*/}
                </Content>
            </Container>
        )
    }
}

const styles = {
    yearBox: {
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 1000,
        height: 47,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(210,210,230)',
        borderTopRightRadius: 23.5,
        borderBottomRightRadius: 23.5,

    },
    tabView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 47,
        backgroundColor: theme.contentBgColor,
        paddingLeft: 40
        // backgroundColor: 'pink'
    },

    tab: {
        height: 47,
        width: 40,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        width: 36,
        height: 45,
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    }
}
