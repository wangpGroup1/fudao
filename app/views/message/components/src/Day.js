import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

// import moment from 'moment/min/moment-with-locales.min';

import {isSameDay, isSameUser, warnDeprecated} from './utils';

export default class Day extends React.Component {
    render() {
        let {createdAt} = this.props.currentMessage;
        if (this.props.previousMessage.createdAt) {
            var previousTime = new Date(this.props.previousMessage.createdAt);
        }
        let nowTime = new Date();
        createdAt = new Date(createdAt);
        let arr = createdAt.toLocaleDateString().split('/');
        let dateDiffer = Math.floor((nowTime.getTime() - createdAt.getTime()) / (24 * 3600 * 1000));
        let showTime = createdAt.toLocaleTimeString().split(':')[0] + ':' + createdAt.toLocaleTimeString().split(':')[1]
        if (dateDiffer > 1) {
            let arr = createdAt.toLocaleDateString().split('/')
            showTime = createdAt.getFullYear() + '年' + arr[0] + '月' + arr[1] + '日  ' + showTime;
        }
        if (!previousTime || (createdAt.getTime() - previousTime.getTime()) / (1000 * 60 * 5) > 1) {

            return (
                <View style={[styles.container, this.props.containerStyle]}>
                    <View style={[styles.wrapper, this.props.wrapperStyle]}>
                        <Text style={[styles.text, this.props.textStyle]}>
                            {showTime}
                        </Text>
                    </View>
                </View>
            );
        }
        return null;
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 10,
    },
    wrapper: {
        // backgroundColor: '#ccc',
        // borderRadius: 10,
        // paddingLeft: 10,
        // paddingRight: 10,
        // paddingTop: 5,
        // paddingBottom: 5,
    },
    text: {
        backgroundColor: '#C3C3C3',
        color: '#fff',
        fontSize: 12,
        padding: 5,
        borderRadius: 5,
    },
});

Day.contextTypes = {
    getLocale: React.PropTypes.func,
};

Day.defaultProps = {
    currentMessage: {
        // TODO test if crash when createdAt === null
        createdAt: null,
    },
    previousMessage: {},
    containerStyle: {},
    wrapperStyle: {},
    textStyle: {},
    //TODO: remove in next major release
    isSameDay: warnDeprecated(isSameDay),
    isSameUser: warnDeprecated(isSameUser),
};

Day.propTypes = {
    currentMessage: React.PropTypes.object,
    previousMessage: React.PropTypes.object,
    containerStyle: View.propTypes.style,
    wrapperStyle: View.propTypes.style,
    textStyle: Text.propTypes.style,
    //TODO: remove in next major release
    isSameDay: React.PropTypes.func,
    isSameUser: React.PropTypes.func,
};
