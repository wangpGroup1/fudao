import React, {PureComponent} from "react";
import {View, TouchableOpacity} from "react-native";
import {Text, Thumbnail, ListItem, Left, Body, Button, Icon, Badge} from "native-base";
import {Actions} from "react-native-router-flux";


class SystemMessage extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            flag: true,
        }
    }

    render() {
        let {avatar, title, tip, style, _onSkipTo,flag} = this.props;
        return (
            <View style={[style, {backgroundColor: '#fff'}]}>
                <ListItem avatar>
                    <Left>
                        <Thumbnail style={{width: 40, height: 40}} square
                                   source={avatar}/>
                        <Badge style={flag ? {
                            backgroundColor: '#f00',
                            padding: 3,
                            height: 3,
                            marginLeft: -4,
                            marginTop: -4
                        } : {backgroundColor: 'transparent', padding: 3, marginLeft: -4,}}/>
                    </Left>
                    <Body>
                    <TouchableOpacity onPress={_onSkipTo.bind(this, title)}>
                        <View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{flex: 1, marginBottom: 5}}>{title}</Text>
                                <Text note style={styles.time}>{title}</Text>
                            </View>
                            <Text note style={styles.time}>{tip}</Text>
                        </View>
                    </TouchableOpacity>
                    </Body>
                </ListItem>
            </View>
        )
    }


}

const styles = {
    time: {
        fontSize: 12,
    }
}

SystemMessage.propTypes = {
    _onSkipTo: React.PropTypes.func,
    style: React.PropTypes.object,
    avatar: React.PropTypes.number,
    title: React.PropTypes.string,
    tip: React.PropTypes.string,
    flag: React.PropTypes.bool,
}

SystemMessage.defaultProps = {
    _onSkipTo: () => {
    },
    style: {},
    title: '',
    tip: '',
    flag:true,
}

export default (SystemMessage);
