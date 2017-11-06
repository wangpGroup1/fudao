import React, {PureComponent} from "react";
import {Button, Text} from "native-base";

export default class TestButton extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            text: '获取验证码',
            number1: "",
            number: '60',
            disabled: false,
        }
    }
    componentWillUnmount(){
        this.timer && clearInterval(this.timer);
    }

    _click() {
        this.interval();
        this.setState({
            text: '重新获取',
            disabled: true,
        });
    }

    interval() {
        let self = this;
        let {number,text} = self.state;
        this.timer = setInterval(function () {
            if (number === 0) {
                self.setState({
                    disabled: false,
                    text: text,
                    number1: ''
                });
                clearInterval(self.timer);
            } else {
                number--;
                if(number>=10){
                    self.setState({
                        number1:number,
                    })
                }else{
                    self.setState({
                        number1:"0"+number,
                    })
                }

            }
        }, 1000);
    }

    render() {
        let title = this.state.text + this.state.number1

        return (
            <Button
                bordered
                warning
                style={{
                    width: 120,
                    justifyContent: 'center',
                    alignSelf: 'center'
                }}
                onPress={this.props.onPress}
                disabled={this.state.disabled}
                {...this.props.rest}
            >
                <Text>{title}</Text>
            </Button>
        )
    }
}
const styles = {
    button: {
        width: 120,
        justifyContent: 'center',
        alignSelf: 'center'
    }
}