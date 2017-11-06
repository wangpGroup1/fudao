import React, {Component} from "react";
import {Image,View} from "react-native";
import {Actions, ActionConst} from "react-native-router-flux";
import {Container} from "../../components";

export default class StartImage extends Component {

    componentDidMount(){
        this.timer = setTimeout(
            () => { Actions.start({type: ActionConst.RESET})},
            2000
        );
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
            return (
                <Container>
                    <Image source={require('../../assets/startImage.jpg')} style={styles.img}/>
                </Container>
            )
    }
}
const styles = {
    img: {
        width: '100%',
        height:'100%',
        position: 'absolute',
        top: 0
    }
}
