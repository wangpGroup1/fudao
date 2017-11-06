import React, {Component} from "react";
import {observer} from "mobx-react/native";
import {StyleSheet, View, Image, Dimensions,DeviceEventEmitter} from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import TabBar from "./components/TabBar";
import Home from "../home/Home";
import Article from "../article/Article";
import Discover from "../discover/Discover";
import My from "../my/My";
import Store from "../store/Store";
import userStore from "../../mobx/userStore"

const tabTitles = ['资讯', '发现', '动', '商店', '我'];
const tabIcons = ['ios-list-box-outline', 'ios-compass-outline', '', 'ios-appstore-outline', 'ios-person-outline'];
const tabSelectedIcon = ['ios-list-box', 'ios-compass', '', 'ios-appstore', 'ios-person'];
const tabComponents = [Article, Discover, Home, Store, My];

@observer
export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            img: true,
            imgA: false,
            imgB: false,
            num: 2
        }
    }

    componentWillMount() {
        let {page} = this.props
        if (page) {
            this.setState({
                num: page
            })
        }
    }

    componentDidMount(){
        let self = this
        this.listener = DeviceEventEmitter.addListener('indexAction',function (i) {
            self.indexAction(i)
        })
    };

    componentWillUnmount(){
        this.listener.remove();
    }


    indexAction = (i) => {
        this.setState({
            num: i
        })
    }

    showState(){
        this.setState({imgB:false});
        userStore.model1=false;
    }

    render() {

        return (
            <View style={{width:"100%",height:'100%'}}>
                {/*{this.state.img?(<Image source={require('./image/yindao1.png')} style={{width:'120%',height:"120%",position:'absolute',zIndex:1000,top:-80,left:-30}} onStartShouldSetResponder={()=>{this.setState({img:false,imgA:true})}}/>):(null)}*/}
                {/*{this.state.imgA?(<Image source={require('./image/yindao2.png')} style={{width:'102%',height:'104%',position:'absolute',zIndex:1000,top:-5,left:-2}} onStartShouldSetResponder={()=>{this.setState({imgA:false,imgB:true})}}/>):(null)}*/}
                {/*{this.state.imgB?(<Image source={require('./image/yindao3.png')} style={{width:'101%',height:'100%',position:'absolute',zIndex:1000,top:0,left:-2}} onStartShouldSetResponder={()=>{this.showState()}}/>):(null)}*/}
                <ScrollableTabView
                    renderTabBar={()=> <TabBar
                        tabNames={tabTitles}
                        tabIconNames={tabIcons}
                        selectedTabIconNames={tabSelectedIcon}
                        page={this.props.page}/>}
                    tabBarPosition='bottom'
                    locked
                    initialPage={this.state.num}
                    page={this.state.num}
                    scrollWithoutAnimation
                >
                    {tabComponents.map((Component, i) => (
                        <Component key={tabTitles[i]} title={tabTitles[i]} newnew={1}/>
                    ))}
                </ScrollableTabView>
            </View>
        )
    }
}
const styles = {
    container: {
        flexGrow: 1
    },
    tabBarStyle: {},
    sceneStyle: {},
    titleStyle: {
        color: theme.navTabBarTextColor,
        fontSize: 12
    },
    titleStyleSelected: {
        color: theme.navTabBarActiveTextColor
    },
    tabIcon: {
        color: theme.navTabBarTextColor,
        fontSize: 28,
        marginBottom: -3
    },
    tabIconSelected: {
        color: theme.navTabBarActiveTextColor
    },
}