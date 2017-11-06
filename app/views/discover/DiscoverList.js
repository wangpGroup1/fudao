import React, {PureComponent} from "react";
import {Dimensions, Image, Platform, WebView,View,Text,Modal,ScrollView,TouchableOpacity } from "react-native";
import {Actions} from "react-native-router-flux";
import { List, ListItem, Left, Body, Right, Thumbnail,Button,Icon,Header} from 'native-base';
import {Container, Content} from "../../components/index";
import PayModal from "./PayModal"

export default class DiscoverList extends PureComponent {



    constructor(props) {
        super(props);
    }

    renderItem(item,index){
        let img=(null);
        var imgPath=item.ispay?require('../../assets/ypay.png'):require('../../assets/pay-coin.png')
        if(item.is_free==1){
            img=(
                <Image source={imgPath} style={{position:'absolute',right:6,top:20,zIndex:90,height:20,resizeMode:'contain'}}/>
            )
        }
        return(
            <TouchableOpacity activeOpacity={1} key={index} style={{height:140,marginTop:5,paddingLeft:5,paddingRight:5,position:'relative'}} onPress={this._goDetail.bind(this,item)}>
             {img}
                <Image source={{uri: urls.getImage(item.pic_path)}} style={{width:'100%',height:140,resizeMode:'cover'}}/>
            </TouchableOpacity >
            )


    }
    render() {

        return (
            <Container>
                <View style={{backgroundColor:'#fff',width:'100%',height:'73%'}}>
                    <ScrollView  style={{paddingBottom:50}}>
                        {this.props.data? this.props.data.map((item,index)=>this.renderItem(item,index)):null}
                    </ScrollView>
                </View>
                <PayModal ref={(e) => this._PayModal_zt = e} relData={(kind)=>this.props.reload(kind)}/>
            </Container>
        )
    }
    _goDetail(item){

        if(item.is_free==1&&item.ispay!=true){
          this._PayModal_zt.show(item);
        }else{
           Actions.activity({title:item.theme_name,themeId:item.id})
        }

    }




}

const styles = {
    font:{
        fontSize:12,
        color:'#fff',
        textShadowOffset:{width:1,hegith:1},
        textShadowRadius:5,
        textShadowColor:'#000'
    }
};
