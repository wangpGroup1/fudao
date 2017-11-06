import React, {PureComponent} from "react";
import {Dimensions, Image, Platform, WebView,View,Text,Modal,ScrollView} from "react-native";




import { List, ListItem, Left, Body, Right, Thumbnail,Button,Icon,Header} from 'native-base';
import {Container, Content} from "../../components/index";





export default class DiscoverHome extends PureComponent {



    constructor(props) {
        super(props);


    }

    componentDidMount() {


    }

    componentWillUnmount() {

    }


    render() {

        return (
            <Container>
                <View style={{backgroundColor:'#fff',width:'100%',height:'73%'}}>
                    <ScrollView style={{paddingBottom:55}}>

                        <View style={{width:'100%',height:140,paddingLeft:10,paddingRight:10,marginTop:10}}>
                            <Image source={require('./image/bjtu.png')} style={{width:'100%',height:140}}>
                                <View style={{width:'100%',height:140,backgroundColor:'rgba(0,0,0,.3)',alignItems:'center',justifyContent:'center'}}>
                                    <Text style={styles.font}>家</Text>
                                    <Text style={styles.font}>这一活动都能适用</Text>
                                </View>
                            </Image>
                        </View>
                        <View style={{width:'100%',height:140,paddingLeft:10,paddingRight:10,marginTop:10}}>
                            <Image source={require('./image/bjtu.png')} style={{width:'100%',height:140}}>
                                <View style={{width:'100%',height:140,backgroundColor:'rgba(0,0,0,.3)',alignItems:'center',justifyContent:'center'}}>
                                    <Text style={styles.font}>不论什么工作状态</Text>
                                    <Text style={styles.font}>这一活动都能适用</Text>
                                </View>
                            </Image>
                        </View>
                        <View style={{width:'100%',height:140,paddingLeft:10,paddingRight:10,marginTop:10}}>
                            <Image source={require('./image/bjtu.png')} style={{width:'100%',height:140}}>
                                <View style={{width:'100%',height:140,backgroundColor:'rgba(0,0,0,.3)',alignItems:'center',justifyContent:'center'}}>
                                    <Text style={styles.font}>不论什么工作状态</Text>
                                    <Text style={styles.font}>这一活动都能适用</Text>
                                </View>
                            </Image>
                        </View>
                        <View style={{width:'100%',height:140,paddingLeft:10,paddingRight:10,marginTop:10}}>
                            <Image source={require('./image/bjtu.png')} style={{width:'100%',height:140}}>
                                <View style={{width:'100%',height:140,backgroundColor:'rgba(0,0,0,.3)',alignItems:'center',justifyContent:'center'}}>
                                    <Text style={styles.font}>不论什么工作状态</Text>
                                    <Text style={styles.font}>这一活动都能适用</Text>
                                </View>
                            </Image>
                        </View>
                    </ScrollView>
                </View>
            </Container>
        )
    }




}

const styles = {
    font:{
        fontSize:18,
        color:'#fff',
        textShadowOffset:{width:1,hegith:1},
        textShadowRadius:5,
        textShadowColor:'#000'
    }
};
