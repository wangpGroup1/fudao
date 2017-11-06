import React, {PureComponent} from "react";
import {Icon} from "native-base";
import {View, TextInput} from "react-native";

export default class UserInput extends PureComponent {
    render() {
        const {children,iconName,...rest} = this.props
        return (
            <View style={styles.inputBox}>
                <View style={styles.iconView}>
                    <Icon name={iconName} />
                </View>
                <TextInput
                    style={{flex: 1}}
                    underlineColorAndroid='transparent'
                    {...rest}/>
                {children}
            </View>
        )
    }
}
const styles = {
    inputBox: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#D4D4D4',
    },
    iconView: {
        width: 30,
        alignItems: 'center',
        marginRight: 10,
    }
};
