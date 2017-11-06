import React, {Component} from "react";

import {Dimensions, Image, Platform, WebView,View,Text,Modal,AppRegistry} from "react-native";
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {Container,TitleHeader, Content, Header} from "../../components";
import TabBar from "./components/TabBar";
import {Actions} from "react-native-router-flux";

import { List, ListItem, Left, Body, Right, Thumbnail,Button,Icon} from 'native-base';
import DiscoverList from "./DiscoverList"
import DiscoverTraffic from "./DiscoverTraffic"
import DiscoverHome from "./DiscoverHome"
import DiscoverElse from "./DiscoverElse"


const tabTitles = [
    '工作','交通' ,'家','其他'
];

const tabIcons = [
    'ios-paper-outline','ios-bus-outline' ,'ios-home-outline' , 'ios-add-circle-outline'
];
const tabSelectedIcon = [
    'ios-paper','ios-bus' ,'ios-home' , 'ios-add-circle'
];
/*const tabComponents = [
    DiscoverLIst,DiscoverTraffic,DiscoverHome,DiscoverElse
];*/


export default class Discover extends Component {



    constructor(props) {
        super(props);
        this.state={
            Job:true,
            Traffic:false,
            Home:false,
            Else:false
        }


    }

    componentWillMount() {
        this._requst('work')
    }
    _renderTabBar = () => <TabBar tabNames={tabTitles} tabIconNames={tabIcons} selectedTabIconNames={tabSelectedIcon}/>

    render() {
        return (
            <Container>
                <TitleHeader {...this.props}/>
                <Content white>
                <View style={{flexDirection:'row',justifyContent:'space-around',height:60,alignItems:'center',backgroundColor:'#bec5da'}}>
                    <View style={this.state.Job?styles.tabItem1:styles.tabItem} onStartShouldSetResponder={this._clickTab.bind(this,"Job")}>
                        <Icon style={[styles.icon, {color: '#6a6d79'}]} name='ios-paper-outline'/>
                        <Text style={{fontSize: 12, color: '#6a6d79'}}>工作</Text>
                    </View>
                    <View style={this.state.Traffic?styles.tabItem1:styles.tabItem} onStartShouldSetResponder={this._clickTab.bind(this,"Traffic")}>
                        <Icon style={[styles.icon, {color: '#6a6d79'}]} name='ios-bus-outline'/>
                        <Text style={{fontSize: 12, color: '#6a6d79'}}>交通</Text>
                    </View>
                    <View style={this.state.Home?styles.tabItem1:styles.tabItem} onStartShouldSetResponder={this._clickTab.bind(this,'Home')}>
                        <Icon style={[styles.icon, {color: '#6a6d79'}]} name='ios-home-outline'/>
                        <Text style={{fontSize: 12, color: '#6a6d79'}}>家</Text>
                    </View>
                    <View style={this.state.Else?styles.tabItem1:styles.tabItem} onStartShouldSetResponder={this._clickTab.bind(this,"Else")}>
                        <Icon style={[styles.icon, {color: '#6a6d79'}]} name='ios-add-circle-outline'/>
                        <Text style={{fontSize: 12, color: '#6a6d79'}}>其他</Text>
                    </View>
                </View>
                {this.state.data?<DiscoverList data={this.state.data} reload={(kind)=>this._requst(kind)}/>:(null)}

            </Content>
                </Container>
        )

    }

    _clickTab(str){
        if(str=='Job'){
            this.setState({
                Job:true,
                Traffic:false,
                Home:false,
                Else:false
            });
            this._requst('work')


        }else if(str=='Traffic'){
            this.setState({
                Job:false,
                Traffic:true,
                Home:false,
                Else:false
            });
            this._requst('traffic');

        }else if(str=='Home'){
            this.setState({
                Job:false,
                Traffic:false,
                Home:true,
                Else:false
            });
            this._requst('home')


        }else{
            this.setState({
                Job:false,
                Traffic:false,
                Home:false,
                Else:true
            });
            this._requst('other');


        }
    }
    _requst(Str){
        request.getJson(urls.apis.THEMEAPI_GETTHEMELIST,{
            type:Str,
        }).then((data)=>{
            if(data.ok) {
                this.setState({
                    data:data.obj.themeList
                })
                /*alert(JSON.stringify(data.obj.themeList))*/
            }
        },(error)=>{

        })
    }




}
const styles = {
    icon: {
        fontSize: 20,
        marginTop: 2
    },
    tabItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        width:50,
        height:54
    },
    tabItem1:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        width:50,
        height:54,
        marginBottom:-6,
        borderTopLeftRadius:22,
        borderTopRightRadius:22,
        backgroundColor:'#fff'
    },
};