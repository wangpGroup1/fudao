import React, {PureComponent,Component} from "react";
import {Animated, View} from "react-native";
import {Circle, Defs, Line, LinearGradient, Path, Stop, Svg, Text} from "react-native-svg";

class CircleProgress extends PureComponent {
    constructor() {
        super()
        this.state = {
            result: '',
            poArr: [],
            longPoArr: [],
            textPoArr: []
        }
    }

    componentDidMount() {
        const {radius, progressWidth} = this.props

        const size = radius * 2,
            center = radius + 30,
            origin = radius - progressWidth / 2,
            sr = radius - progressWidth,
            mr = sr - 6,
            degress = Math.PI / 6,
            startX = center - origin * Math.sin(degress),
            startY = center + origin * Math.cos(degress),
            endX = center + origin * Math.sin(degress),
            endY = center + origin * Math.cos(degress),
            pushStr = "M{0},{1} A{2},{3} 0 {4},1 {5},{6}",
            result = pushStr.format(startX, startY, origin, origin, 1, endX, endY);

        const colFn = function (an) {
            let color
            if (an >= 30 && an < 180) {
                color = '#C90666'
            } else if (an >= 180 && an <= 240) {
                color = '#98B200'
            } else {
                color = '#A3A3A3'
            }
            let x1 = center + mr * Math.sin(an * 3.14 / 180),
                y1 = center + mr * Math.cos(an * 3.14 / 180),
                x2 = center + sr * Math.sin(an * 3.14 / 180),
                y2 = center + sr * Math.cos(an * 3.14 / 180)
            return {x1, y1, x2, y2, color}
        }
        const longColFn = function (an) {
            let color
            if (an >= 30 && an < 180) {
                color = '#C90666'
            } else if (an >= 180 && an <= 240) {
                color = '#98B200'
            } else {
                color = '#A3A3A3'
            }
            let x1 = center + mr * Math.sin(an * 3.14 / 180),
                y1 = center + mr * Math.cos(an * 3.14 / 180),
                x2 = center + origin * Math.sin(an * 3.14 / 180),
                y2 = center + origin * Math.cos(an * 3.14 / 180)
            return {x1, y1, x2, y2, color}
        }
        const TextColFn = function (an, i) {
            let color, val = an - 30 - 10 * i
            if(val == 200) val ='......';
            if (an >= 30 && an < 120) {
                color = '#A3A3A3'
            } else if (an >= 120 && an <= 180) {
                color = '#98B200'
            } else {
                color = '#C90666'
            }
            let x = center - (radius + 10) * Math.sin(an * 3.14 / 180),
                y = center + (radius + 10) * Math.cos(an * 3.14 / 180) - 5
            return {x, y, color, val}
        }
        let anArr = [], poArr = [], longAnArr = [], longPoArr = [], textPoArr = []
        for (var i = 0; i <= 50; i++) {
            anArr[i] = 30 + i * 6;
        }
        for (var i = 0; i <= 10; i++) {
            longAnArr[i] = 30 + i * 30;
        }
        anArr.map((item) => {
            poArr.push(colFn(item))
        })
        longAnArr.map((item) => {
            longPoArr.push(longColFn(item))
        })
        longAnArr.map((item, i) => {
            textPoArr.push(TextColFn(item, i))
        })

        this.setState({
            result: result,
            poArr: poArr,
            longPoArr: longPoArr,
            textPoArr: textPoArr
        });
    }

    render() {
        const {radius, progressWidth, strokeLinecap,progress,text} = this.props,
            {result, poArr, longPoArr, textPoArr} = this.state,
            size = radius * 2,
            center = radius + 30

        const an = 30 + progress * 1.5
        let x1 = center - (radius - 50) * Math.sin(an * 3.14 / 180),
            y1 = center + (radius - 50) * Math.cos(an * 3.14 / 180),
            x2 = center - (radius - 30) * Math.sin(an * 3.14 / 180),
            y2 = center + (radius - 30) * Math.cos(an * 3.14 / 180)
        return (
            <View style={{backgroundColor: '#fff'}}>
                <Svg width={size + 60} height={size + 60}>
                    <Defs>
                        <LinearGradient id="grad" x1="0" y1="100%" x2="100%" y2="0">
                            <Stop offset="0" stopColor="#2639a6" stopOpacity="0.5"/>
                            <Stop offset="1" stopColor="#cf0463" stopOpacity="1"/>
                        </LinearGradient>
                    </Defs>
                    <Path
                        d={result}
                        stroke={"url(#grad)"}
                        strokeWidth={progressWidth}
                        strokeLinecap={strokeLinecap}
                        fill="#fff"/>
                    {
                        poArr.length > 0 && poArr.map((item, i) => {
                            return (
                                <Line x1={item.x1} y1={item.y1} x2={item.x2} y2={item.y2} stroke={item.color}
                                      strokeWidth="2"
                                      key={i}/>
                            )

                        })
                    }

                    {
                        longPoArr.length > 0 && longPoArr.map((item, i) => {
                            return (
                                <Line x1={item.x1} y1={item.y1} x2={item.x2} y2={item.y2} stroke={item.color}
                                      strokeWidth="2"
                                      key={i}/>
                            )

                        })
                    }
                    {
                        textPoArr.length > 0 && textPoArr.map((item, i) => {
                            return (
                                <Text
                                    fill={item.color}
                                    fontSize="12"
                                    x={item.x}
                                    y={item.y}
                                    textAnchor="middle"
                                    key={i}
                                >{item.val}</Text>
                            )

                        })
                    }
                    <Circle cx={center} cy={center} r="4"/>
                    <Circle cx={x1} cy={y1} r="8" fill="#98B200"/>

                    <Line x1={center} y1={center} x2={x2} y2={y2} stroke="#98B200" strokeWidth="3"
                          strokeLinecap="round"/>
                    {/*<Text*/}
                        {/*fill='#F7F8F8'*/}
                        {/*fontSize="10"*/}
                        {/*x={x1}*/}
                        {/*y={y1 - 5}*/}
                        {/*textAnchor="middle"*/}
                    {/*>{text}</Text>*/}
                </Svg>
                <View style={{
                    position: 'absolute',
                    top: 30,
                    left: 30,
                    width: size,
                    height: size,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    zIndex: 1001,
                }}>
                    {this.props.children}
                </View>
            </View>

        );
    };
}
CircleProgress.defaultProps = {
    radius: 100,
    progressWidth: 10,
    strokeLinecap: 'round',
    progress: 0,
    text: '不足'
}
String.prototype.format = function (args) {
    var result = this;
    if (arguments.length < 1) {
        return result;
    }
    var data = arguments;        //如果模板参数是数组
    if (arguments.length == 1 && typeof (args) == "object") {
        //如果模板参数是对象
        data = args;
    }
    for (var key in data) {
        var value = data[key];
        if (undefined != value) {
            result = result.replace("{" + key + "}", value);
        }
    }
    return result;
};

const AnimatedCP = Animated.createAnimatedComponent(CircleProgress);
export default class AnimatedCircleProgress extends Component {

    constructor(props) {
        super(props);
        this.state = {
            progress0: new Animated.Value(0),
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.progress != this.props.progress) {
            this.startAnimate(nextProps.progress);
        }
    }

    componentDidMount() {
        this.startAnimate(this.props.progress)
    }

    startAnimate(progress) {
        this.state.progress0.setValue(0);
        Animated.timing(this.state.progress0, {
            toValue: progress,
            duration: this.props.durtime,
            // useNativeDriver: true,
        }).start();
    }

    render() {
        const {durtime, progress, ...other} = this.props;
        return (
            <AnimatedCP
                {...other}
                progress={this.state.progress0}
            />
        );
    }
}

AnimatedCircleProgress.defaultProps = {
    durtime: 1000,
    progress: 0,
}
