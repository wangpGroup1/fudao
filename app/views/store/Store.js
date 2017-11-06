import React, { Component } from 'react';
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View
} from 'react-native';
import {Container,TitleHeader, Content, Header} from "../../components";



export default class Store extends Component {

    render() {
        return (
            /*<ScrollableTabView
                style={styles.container}
                renderTabBar={() => <DefaultTabBar />}
                tabBarUnderlineStyle={styles.lineStyle}
                tabBarActiveTextColor='#FF0000'>

                <Text style={styles.textStyle} tabLabel='娱乐'>娱乐</Text>
                <Text style={styles.textStyle} tabLabel='科技'>科技</Text>
                <Text style={styles.textStyle} tabLabel='军事'>军事</Text>
                <Text style={styles.textStyle} tabLabel='体育'>体育</Text>
            </ScrollableTabView>*/
            <Container>
                <TitleHeader {...this.props}/>
                <Content style={{backgroundColor:'#e4e4eb'}}>
                    <View style={styles.View}>
                        <View style={styles.imgBox}>
                            <Image style={styles.Img} source={require('../../assets/store1.png')} />
                            <Text style={styles.Text}>店铺装修 &nbsp; 敬请期待</Text>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    Img:{
        width:200,
        height:200

    },
    View:{
        width:'100%',
        height:'80%',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center'
    },
    imgBox:{

        justifyContent: 'center',
    },
    Text:{
        fontSize:16,
        textAlign:'center'
    }
});


