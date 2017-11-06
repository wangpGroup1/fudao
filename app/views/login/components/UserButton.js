import React, {PureComponent} from "react";
import {TouchableOpacity} from "react-native";
import {View,Text,Icon} from "native-base";

export default class UserButton extends PureComponent {
    render() {
        const {style,onPress,text,icon,underline,buttonStyle,...rest} = this.props
        return (
            <View style={[styles.buttonView,style]}>
                <TouchableOpacity
                    onPress={onPress}
                    activeOpacity={1}
                    style={[styles.button,buttonStyle]}
                >
                    {icon? <Icon name="ios-phone-portrait-outline" style={{marginRight: 10,color: '#fff'}}/> : null}
                    <Text style={[styles.text,underline ? {textDecorationLine: 'underline'}: null]}>{text}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = {
    buttonView: {
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 186,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.brandPrimary,
    },
    text: {
        color: '#fff',
        fontSize: theme.DefaultFontSize + 2,
    }
}