import React, {PureComponent} from "react";
import {Text, Button, Icon} from "native-base";
import {View, Image, DeviceEventEmitter, TouchableHighlight} from "react-native";
import {Actions} from "react-native-router-flux";
import Index from "../../index/Index"

export default  class MyEnter extends PureComponent {



    render() {
        let {themeList} = this.props
        let flag = themeList && themeList[0]
        return (
            <View>
                <View style={styles.View}>
                    <Button style={styles.button} transparent onPress={() => {
                        Actions.activity({title: flag && themeList[0].themeName,themeId:flag && themeList[0].id})
                    }}>
                        {flag&& <Image source={{uri: urls.getImage(themeList[0].iconPath)}} style={styles.themeImg}/>}
                        <Text style={styles.themeText}>{flag && themeList[0].themeName}</Text>
                    </Button>
                    <Button style={styles.button} transparent onPress={() => {
                        Actions.activity({title: flag && themeList[1].themeName,themeId:flag && themeList[1].id})
                    }}>
                        {flag && <Image source={{uri: urls.getImage(themeList[1].iconPath)}} style={styles.themeImg}/>}
                        <Text style={styles.themeText}>{flag && themeList[1].themeName}</Text>
                    </Button>
                </View>
                <View style={styles.View}>
                    <Button style={styles.button} transparent onPress={() => {
                        Actions.activity({title: flag && themeList[2].themeName,themeId:flag && themeList[2].id})
                    }}>
                        {flag && <Image source={{uri: urls.getImage(themeList[2].iconPath)}} style={styles.themeImg}/>}
                        <Text style={styles.themeText}>{flag && themeList[2].themeName}</Text>
                    </Button>
                    <Button style={styles.button} transparent onPress={() => {
                        Actions.activity({title: flag && themeList[3].themeName,themeId:flag && themeList[3].id})
                    }}>
                        {flag && <Image source={{uri: urls.getImage(themeList[3].iconPath)}} style={styles.themeImg}/>}
                        <Text style={styles.themeText}>{flag && themeList[3].themeName}</Text>
                    </Button>
                    {/*<Button style={styles.button} transparent onPress={this.indexAction.bind(this)}>*/}
                        {/*<Icon name="ios-add-circle-outline" style={{color: '#fff', fontSize: 27}}/>*/}
                        {/*<Text style={styles.themeText}>更多场景</Text>*/}
                    {/*</Button>*/}
                </View>
            </View>

        )
    }
}

const styles = {
    View: {
        flexDirection: 'row',
    },
    button: {
        flexDirection: 'column',
        height: 65,
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        marginBottom: 1,
        marginRight: 1
    },
    themeImg: {
        width: 50,
        height: 27
    },
    themeText: {
        fontSize: 13,
        color: '#fff',
    },
    color2: {
        backgroundColor: '#E5B2A8',
    },
    color3: {
        backgroundColor: '#D5E1AF',
    },
    color4: {
        backgroundColor: '#CABBD3',
    },
};

