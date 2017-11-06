import React ,{Component} from "react";
import {Platform, Text, View,Image,TouchableOpacity} from "react-native";
import {Actions} from "react-native-router-flux";

import Swiper from "react-native-swiper";



export default class DynamicPicture extends Component {
    renderOneImg() {
        return (
            <Image
                style={{flex: 1,}}
                resizeMode={Image.resizeMode.contain}
                source={{uri: this.props.image}}
            >
                <TouchableOpacity onPress={Actions.pop} style={{flex: 1}}>
                </TouchableOpacity>
            </Image>
        )
    }

    renderImg() {
        var images = this.props.image.split(',');
        var imageViews = [];
        for (var i = 0; i < images.length; i++) {
            imageViews.push(
                <Image
                    key={i}
                    style={{flex: 1,}}
                    resizeMode={Image.resizeMode.contain}
                    source={{uri: urls.getImage(images[i])}}
                >
                    <TouchableOpacity onPress={Actions.pop} style={{flex: 1}}>
                    </TouchableOpacity>
                </Image>
            );
        }
        return imageViews;
    }
    render(){
        let self = this
        let images = self.props.image.split(',');

        return (
            <View style={{backgroundColor: '#000',flex:1,flexDirection:'column'}}>

            <Swiper
                style={styles.wrapper}
                loop={false}
                paginationStyle={Platform.OS == 'ios' ? {} : {bottom: 110}}
                dot={<View style={styles.dot}></View>}
                index={this.props.i}
                activeDot={<View style={styles.activeDot}></View>}

            >
                {this.props.flag ? this.renderOneImg() : this.renderImg()}


            </Swiper>
            </View>

        )
    }
}
var styles = {
    wrapper: {},
    dot: {
        width: 8,
        height: 8,
        backgroundColor: 'gray',
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3
    },
    activeDot: {
        width: 8,
        height: 8,
        backgroundColor: 'orange',
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3
    },
}

