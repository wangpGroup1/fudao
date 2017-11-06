import React, {
    Component,
    PropTypes
} from 'react'

import {
    View,
    Text,
    TextInput,
    TouchableHighlight,
    StyleSheet
} from 'react-native'


export default class EditorComp extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <View>
                <TextInput
                    placeholder={this.props.placeholder}
                    multiline={true}
                    style={styles.textInput}
                    value={this.props.text}
                    onChangeText={this.props.onChangeText}
                    underlineColorAndroid ='transparent'
                />
            </View>
        )
    }

    _renderTool(tool, icon, handle = () => {}) {
        if(this._enableTool(tool)) {
            return (
                <TouchableHighlight style={styles.tool}>
                    <Text style={styles.toolText}>{iconfontConf(icon)}</Text>
                </TouchableHighlight>
            )
        }
    }

}


const styles = StyleSheet.create({
    textInput: {
        height: 140,
        backgroundColor: '#fff',
        padding: 10,
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 14,
        textAlignVertical: 'top',
        lineHeight:24

    },
    toolbar: {
        flexDirection: 'row',
        height: 40,
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#dadada',
    },
    tool: {
        width: 50,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5
    },
    toolText: {
        fontSize: 22,
        fontFamily: 'iconfont',
        color: '#666'
    }
})
