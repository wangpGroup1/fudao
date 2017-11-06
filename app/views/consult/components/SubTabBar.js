import React, {Component} from 'react';

import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

export default class SubTabBar extends Component {

    constructor(){
        super()
        this.state = {
            activeTab: new Date().getDay() -1
        }
    }
    onPress(i){
        this.setState({
            activeTab: i
        })
        this.props.onPress(i)
    }

    renderTabOption(tab, i) {
        let backgroundColor = this.state.activeTab == i ? "#fff" : theme.contentBgColor;
        let date = new Date();
        let nowDate = date.getDay() === 0 ? 6 : date.getDay() - 1;
        return (
            <TouchableOpacity
                key={i}
                onPress={this.onPress.bind(this,i)}
                style={styles.tab}
                activeOpacity={1}
                disabled={i <= nowDate ? false : true}
            >
                <View style={[styles.item,{backgroundColor: backgroundColor,}]}>
                    <Text style={{color: i <= nowDate ? '#333' : '#999', fontSize: 13}}>
                        {tab}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.tabs}>
                {this.props.subTabNames.map((tab, i) => this.renderTabOption(tab, i))}
            </View>
        );
    }
}

const styles = {
    tabs: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.contentBgColor
    },

    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        width: 36,
        height: 50,
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    }
}