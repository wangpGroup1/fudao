import React, {PureComponent} from "react";
import {Modal, View, Image, ListView,WebView,Dimensions} from "react-native";
import {Icon, Button, ListItem, Text} from "native-base";
import ImageText from './ImageText'
import userStore from "../../../mobx/userStore";


/**
 * 我的能量场 > 资料填写
 */
class YunDongModal extends PureComponent {

    constructor(props) {
        super(props);


        this.state = {
            ...props,
            visible: false,
            text:'{"img":"zixun/1.3.jpg","title":"拉伸运动","content":"以两手搓热环摸脐周，谁知盘中餐，少用力按摩腹部提拿腹肌，以一手会当临绝顶，一览众山小"}'
        }
    }

    /**
     * 分组
     */


    render() {
        let {visible,text} = this.state;
        let data=JSON.parse(text);
        return (
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={visible}
                onRequestClose={() => this.hide()}
                onLayout={({nativeEvent:e})=>this.layout(e)}
            >
                <View style={styles.opacityView}/>
                <View style={styles.content}>
                    <View style={styles.header}>

                        <View style={{width:25}}>
                            <Button
                                onPress={() => this.hide()}
                                style={styles.closeButton}>
                                <Icon name="close" style={{color:'#FFF', fontSize: 20}}/>
                            </Button>
                        </View>
                    </View>
                    <View style={{flex: 1}}>
                        <ImageText title={data.name} content={data.detail} image={data.img}/>
                    </View>

                </View>


            </Modal>
        )
    }
    layout(data){
        alert(JSON.stringify(data));

    }

    /**
     * 打开对话框
     * @param data
     */
    show(data) {
        let state = {
            visible: true,
            text: data
        };
        this.setState(state);

    }

    /**
     * 关闭对话框
     */
    hide() {
        this.setState({
            visible: false
        })
    }


}


const styles = {
    opacityView: {
        flex: 1,
        backgroundColor: '#6c6c6c',
        opacity: 0.5,
    },
    content: {
        position: "absolute",
        backgroundColor: '#FFFFFF',
        top: 30,
        bottom: 30,
        left: 20,
        right: 20,
        borderRadius: 3,
        opacity: 1,
        flex: 1,
        flexDirection: 'column',
    },
    header: {
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 6,
        flexDirection: 'row',
    },
    headerText: {
        fontSize: theme.fontSizeH4
    },
    closeButton: {
        backgroundColor: '#C8C8C8',
        justifyContent: 'center',
        borderRadius: 12,
        width: 24,
        height: 24,
        paddingLeft: 0,
        paddingRight: 0,
    },
};


export default  (YunDongModal);



