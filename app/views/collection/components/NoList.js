import React from "react";
import {StyleSheet, View, Text, ActivityIndicator} from "react-native";

export default class NoList extends React.Component {
    render() {
        //alert(this.props.isShow);
        if (!this.props.isShow){
            return (
                <View style={styles.container}>
                    <Text>
                        ~~您没有收藏~~
                    </Text>
                </View>
            )
        }else{
            return null
        }

    }
}

NoList.propTypes = {
    isShow: React.PropTypes.bool
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        backgroundColor: 'gray',
        height: 80,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingTitle: {
        marginTop: 10,
        fontSize: 14,
        color: 'white'
    }
})