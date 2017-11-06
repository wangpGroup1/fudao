import React, {Component} from "react";
import {Text} from "native-base";
import {View, Image, ToastAndroid, TouchableOpacity} from "react-native";
import styles from "../assets/styles";

/**
 * 动态
 */
export default class DynamicComments extends Component {
    render() {
        let {comments,sendComment} = this.props;
        if (comments) {
            let comment = comments.map((p, i) => {
                return (
                    <TouchableOpacity key={i} style={styles.oneComment} activeOpacity={1} onPress={()=>sendComment(p.user)}>
                        <Text style={styles.commentName}>
                            {p.user.friendremark || p.user.nickname || p.user.phone || "用户" + JSON.stringify(p.user.id).substr(1, 4)}: {p.atuser?'@'+(p.atuser.friendremark || p.atuser.nickname || p.atuser.phone || "用户" + JSON.stringify(p.user.id).substr(1, 4)):''}
                        </Text>
                        <Text style={styles.commentContent}>
                                {p.content}
                        </Text>
                    </TouchableOpacity>
                )
            })
            return (
                <View style={styles.allComments}>
                    {comment}
                </View>
            )
        }
        return (null);
    }
}
