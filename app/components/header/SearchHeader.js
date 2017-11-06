import React, {PureComponent} from "react";
import {TouchableOpacity, StyleSheet, Platform} from "react-native";
import {Actions} from "react-native-router-flux";
import {Header, Icon, Input, Item, Button, Grid, Row, Col} from "native-base";

class SearchHeader extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    render() {
        let {placeholder, autoFocus} = this.props,
            {text} = this.state,
            clearIcon = null;

        if (text.length > 0) {
            clearIcon = (
                <Icon name="close" style={styles.inputIcon} onPress={() => this.changeText('')}/>
            );
        }

        return (


            <Col style={styles.inputCol}>
                <Item rounded style={styles.inputGroup}>
                    <Input
                        ref={(e) => this._input = e}
                        placeholder={placeholder}
                        onChangeText={(text) => this._onChangeText(text)}
                        autoFocus={autoFocus}
                        onSubmitEditing={(text) => this._onSubmitEditing(text)}
                        style={Platform.OS == 'ios' ? styles.inputText_ios : styles.inputText_android}/>
                    <TouchableOpacity activeOpacity={1} onPress={()=>this.props.search(this._input)}>
                        <Icon name="search" style={styles.inputIcon}/>
                    </TouchableOpacity>

                    {clearIcon}
                </Item>
            </Col>

        )
    }

    _onChangeText(text) {
        let {onChangeText} = this.props;

        if (onChangeText) {
            onChangeText(text);
        }
    }

    _onSubmitEditing(event) {
        let {onSearch} = this.props;

        if (onSearch) {
            onSearch(event.nativeEvent.text);
        }
    }


}

const styles = {
    backCol: {width: 35, justifyContent: 'center'},
    inputCol: {justifyContent: 'center', flexDirection: 'row'},
    backButton: {marginLeft: -10},
    inputGroup: {height: 35, backgroundColor: '#fff', width: '90%', marginTop: 20},
    inputIcon: {color: '#666666', backgroundColor: 'transparent'},
    inputText_android: {color: '#666666', marginBottom: 2},
    inputText_ios: {height: 35, color: '#666666'},
};

SearchHeader.propsType = {
    placeholder: React.PropTypes.string,
    autoFocus: React.PropTypes.bool,
    onSearch: React.PropTypes.func, // 提交搜索
    onChangeText: React.PropTypes.func,
};
SearchHeader.defaultProps = {
    placeholder: '搜索',
    autoFocus: false,
};


export default (SearchHeader)