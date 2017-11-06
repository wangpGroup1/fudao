import React, {Component} from "react";
import {TouchableOpacity, View} from "react-native";
import {Text} from "native-base";
import Icon from "react-native-vector-icons/Ionicons";


export default class TabBar extends Component {
    static propType = {
        goToPage: React.PropTypes.func,
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array,
        tabNames: React.PropTypes.array,
        tabIconNames: React.PropTypes.array,
        page: React.PropTypes.number
    };


    render() {
        return (
            <View style={styles.tabs}>
                {this.props.tabs.map((tab, i) => {
                    let color = this.props.activeTab === i ? theme.navTabBarActiveTextColor : theme.navTabBarTextColor;
                    let icon = this.props.activeTab == i ? this.props.selectedTabIconNames[i] : this.props.tabIconNames[i];
                    return (
                        <TouchableOpacity
                            key={i}
                            activeOpacity={0.8}
                            style={styles.tab}
                            onPress={() => this.props.goToPage(i)}
                        >
                            {icon != '' ?
                                <View style={styles.tabItem}>
                                    <Icon style={[styles.icon, {color: color}]} name={icon}/>
                                    <Text style={{fontSize: 10, color: color}}>{this.props.tabNames[i]}</Text>
                                </View>
                                :
                                <View style={styles.tabItem1}>
                                    <Text style={{fontSize: 26, color: color}}>{this.props.tabNames[i]}</Text>
                                </View>
                            }

                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
}

const styles = {
    tabs: {
        flexDirection: 'row',
        height: theme.navTabBarHeight,
        borderTopWidth: 0,
        backgroundColor: '#30173e'
    },

    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    tabItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    tabItem1: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(225,225,225,.3)'
    },
    icon: {
        fontSize: 23,
        marginBottom: 2
    }
}