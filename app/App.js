import React, {Component} from "react";
import {StyleProvider} from "native-base";
import {observer} from "mobx-react/native";

import getTheme from "../native-base-theme/components";
import GlobalContants from "./common/globalContants";
import Router from './Router'
import userStore from "./mobx/userStore";
import * as Wechat from 'react-native-wechat';
@observer
export default class App extends Component {
    componentWillMount() {
        // Wechat.registerApp('wx3ea7884b0c372a3c');
        // Wechat.registerApp('wxe23aa58309478cd8');
        Wechat.registerApp('wx3f6124c4261c2bf6');
    }

    render() {
        if (userStore.hydrated) {
            return (
                <StyleProvider style={getTheme(theme)}>
                    <Router/>
                </StyleProvider>
            )
        }
        return null
    }
}

