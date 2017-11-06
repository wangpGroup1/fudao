import React, {Component} from "react";
import {Image, Text, View, WebView} from "react-native";
import userStore from "../mobx/userStore";

export default class InfcnWebView extends Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.uri != this.props.uri) {
            return true
        }
        return false;
    }

    render() {
        let {uri} = this.props;
        uri += (_.endsWith(uri, '.html') ? '?' : '&') + 'token=' + userStore.token + '&_time' + new Date().getTime();
        return (
            <WebView
                ref={(e) => this._webview = e}
                source={{uri}}
                style={this.props.style}
                onMessage={this.props.onMessage}
                startInLoadingState={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                scalesPageToFit={false}
                renderError={this.renderError.bind(this)}
            />
        )
    }

    renderError() {
        return (
            <View style={styles.errorView}>
                <Image source={require('../assets/error.png')}/>
                <Text>网络不给力，请稍后再重试。</Text>
            </View>
        )
    }
}

const styles = {
    errorView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
}