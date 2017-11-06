/**
 * 圆形进度条
 * 内部可以放内容
 * 居中
 * Created by Daemon on 2016/12/12 11:57.
 */
import React, {PureComponent, PropTypes} from 'react';
import {View, Animated} from 'react-native';
import {Svg, Defs, LinearGradient, Stop, Circle, Path} from 'react-native-svg'

export default class CircleProgress extends PureComponent {

    render() {
        const {radius, baseWidth, progressWidth, progress, strokeLinecap, totalNum} = this.props
        let score,color
        if(progress < 10){
            score = progress
            color= 'url(#grad)'
        }else if(progress >=10 && progress<=20) {
            score = 10
            color= 'url(#grad)'
        }else if(progress >20){
            score = 10
            color= 'red'
        }

        let endX, endY, degress = score % 100 / totalNum * 360
        if(score === 0 || score%totalNum != 0){
            degress = score % 100 / totalNum * 360
        }else{
            degress = (score-0.1) % 100 / totalNum * 360
        }

        const size = radius * 2,
            startX = radius,
            startY = progressWidth / 2,
            origin = radius - progressWidth / 2,
            largeFlag = degress >= 180 ? 1 : 0;

        if (degress <= 90) {
            degress = degress * 2 * Math.PI / 360;
            endX = startX + origin * Math.sin(degress);
            endY = startY + origin - origin * Math.cos(degress);
        } else if (90 < degress <= 180) {
            degress = degress - 90;
            degress = degress * 2 * Math.PI / 360;
            endX = startX + origin * Math.cos(degress);
            endY = startY + origin + origin * Math.sin(degress);
        } else if (180 < degress <= 270) {
            degress = degress - 180;
            degress = degress * 2 * Math.PI / 360;
            endX = startX - origin * Math.sin(degress);
            endY = startY - ( origin - origin * Math.cos(degress));
        } else if (270 < degress <= 360) {
            degress = degress - 270;
            degress = degress * 2 * Math.PI / 360;
            endX = startX - origin * Math.cos(degress);
            endY = startY - origin - origin * Math.sin(degress);
        };

        const pushStr = "M{0},{1} A{2},{3} 0 {4},1 {5},{6}",
            result = pushStr.format(startX, startY, origin, origin, largeFlag, endX, endY);



        return (
            <View>
                <Svg width={size} height={size}>
                    <Defs>
                        <LinearGradient id="grad" x1="0" y1="100%" x2="100%" y2="0">
                            <Stop offset="0" stopColor="#2639a6" stopOpacity="0.5"/>
                            <Stop offset="1" stopColor="#cf0463" stopOpacity="1"/>
                        </LinearGradient>
                    </Defs>
                    <Circle
                        cx={radius}
                        cy={radius}
                        r={origin}
                        stroke={'#f7f7f7'}
                        strokeWidth={baseWidth}
                        fill="#fff"/>
                    <Path d={result} stroke={progress <= 20 ? "url(#grad)" :'red'} strokeWidth={progressWidth} strokeLinecap={strokeLinecap}
                          fill="#fff"/>
                </Svg>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: size,
                    height: size,
                    justifyContent: 'center',
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
    radius: 95,
    baseWidth: 8,
    progressWidth: 10,
    progress: 0,
    totalNum: 10,
    strokeLinecap: 'round'
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

