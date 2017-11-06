import React, {PureComponent} from "react";
import {AppRegistry, StyleSheet, View, TextInput} from "react-native";
import QRCode from 'react-native-qrcode';
import {Header,Container} from "../../../components/index";
import userStore from "../../../mobx/userStore";

export default class Qrcode extends PureComponent {

    render() {
        return (
        <Container>
            <Header {...this.props}/>
            <View style={styles.container}>
                <QRCode
                    value={userStore.phone}
                    size={200}
                    bgColor='purple'
                    fgColor='white'/>
            </View>
        </Container>

        );
    }
};

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    }
}

