import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

class SubTabBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disabled: false
        }
    }

    renderTabOption(tab, i) {
        let backgroundColor = this.props.activeTab == i ?  '#BEC4DA':"#fff" ;
        return (
            <TouchableOpacity
                key={i}
                onPress={() => this.props.goToPage(i)}
                style={[styles.tab,{backgroundColor: backgroundColor}]}
                activeOpacity={1}
            >

                <Text>{this.props.subTabNames[i]}</Text>

            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.tabs}>
                {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    tab: {
        flex: 1,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    }

});


export default SubTabBar;