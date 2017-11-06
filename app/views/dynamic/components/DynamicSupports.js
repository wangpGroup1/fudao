import React, {Component} from "react";
import {Text} from "native-base";
import {View, Image} from "react-native";
import styles from "../assets/styles";

/**
 * 动态
 */
class DynamicSupports extends Component {

    render() {
        let {zan} = this.props;
        if (zan.length >= 1) {
            let supports = zan.map((p, i) => {
                if (i == 0) {
                    return (
                        <View key={i} style={{flexDirection: 'row'}}>
                            <Image source={require('../../../assets/xin.png')} style={styles.xin}/>
                            <Text style={styles.commentName}>
                                {p.friendremark||p.nickname||p.phone||"用户"+p.id.substr(0,4)}
                            </Text>
                        </View>
                    )
                } else {
                    return (
                        <Text key={i} style={styles.commentName}>
                            , {p.friendremark||p.nickname||p.phone||"用户"+JSON.stringify(p.id).substr(1,4)}
                        </Text>
                    )
                }
            })
            return (
                <View style={styles.allSupports}>
                    {supports}
                </View>
            )
        }
        return (null);
    }
}

DynamicSupports.propsTypes = {
    zan: React.PropTypes.array,
};
DynamicSupports.defaultProps = {
    zan: [],
};

export default (DynamicSupports);
