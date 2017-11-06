import React, {PureComponent} from "react";
import {Actions} from "react-native-router-flux";
import {View,Text,Button} from "native-base";
import {Container, Content, Header} from "../../components";

export default class About extends PureComponent {
    render() {
        return (
            <Container>
                <Header {...this.props}/>
                <Content white padder>
                    <Text style={styles.desc}>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        活·动是福道健康系列产品之一，旨在培养用户动的意识，打造健康生活习惯，为用户提供适用于各种场景和问题的微运动方法，帮助用户活动各身体部位，协助解决用户的健康问题。
                    </Text>
                    <Text style={styles.bold}>关注我们</Text>
                    <Text>官方网站：www.infcn.com.cn</Text>
                    <Text>微信公众号：infcn430374</Text>
                    <Text style={styles.bold}>联系我们</Text>
                    <Text>商务合作：fudao@infcn.com.cn</Text>
                    <View style={styles.statement}>
                        <Button onPress={() => Actions.privacyStatement()}><Text>隐私声明</Text></Button>
                        <Button onPress={() => Actions.userAgreement()}><Text>用户协议</Text></Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = {
    desc: {
        lineHeight: 24
    },
    bold: {
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10
    },
    statement: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
};