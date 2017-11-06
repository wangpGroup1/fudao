import React, {PureComponent} from "react";
import {Modal, View, Image, ListView} from "react-native";
import {Icon, Button, ListItem, Text} from "native-base";
import ImageText from './ImageText'
import VideoText from '../../components/VideoText'

/**
 * 我的能量场 > 资料填写
 */
class DetailsModal extends PureComponent {

    constructor(props) {
        super(props);


        this.state = {
            ...props,
            visible: false,
            text:'{"imgPath":"zixun/1.3.jpg","title":"点一支薰衣草窗前明月光的休息一下吧~","content":"以两手搓热环摸脐周，谁知盘中餐，少用力按摩腹部提拿腹肌，以一手会当临绝顶，一览众山小"}'
        }
    }

    /**
     * 分组
     */


    render() {
        let {visible,text} = this.state;
        let data=JSON.parse(text);
let mol=(null);
        let c=data.img+'';
        if(c.indexOf(';')>0){
            c=c.split(';')[0]
        }

        let n=c.substring(c.length-3);
       if(n=='mp3'){
           let time = parseFloat(data.length)
           mol=(
               <VideoText title={data.name} content={data.detail} video={data.img} time={time}/>
           )
       }else{
           mol=(
               <ImageText title={data.name} content={data.detail} image={c}/>
           )
       }
        return (
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={visible}
                onRequestClose={() => this.hide()}
            >
                <View style={styles.opacityView}/>
                <View style={styles.content}>

                            <Button
                                onPress={() => this.hide()}
                                style={styles.closeButton}>
                                <Icon name="close" style={{color:'#FFF', fontSize: 20,}}/>
                            </Button>

                    <View style={{height:500}}>
                        {mol}
                    </View>

                </View>


            </Modal>
        )
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
        overflow:'hidden'
    },
    header: {
        borderRadius: 3,
        height: 30,
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
        margin:10,
        zIndex:100
    },
};


export default  (DetailsModal);

