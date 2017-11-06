import React, {Component} from "react";
import {Text} from "native-base";
import {View, Image, TouchableOpacity, TouchableHighlight, Dimensions, Modal, Slider,TouchableWithoutFeedback,Animated,StyleSheet,Easing} from "react-native";
import Video from "react-native-video";
import {observer} from "mobx-react/native";
/**
 * 播放器
 */

@observer
class VideoSolve extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btn: false,//true表示暂停
            cc: require('../assets/play2.png'),
            cc2: require('../assets/pause2.png'),
            sliderValue: 0,  //Slide的value
            file_duration:0, //歌曲长度
            currentTime: 0,  //当前时间
            duration: 0,  //歌曲时间
            showControls:true,
            loading:true,

        }
        this.animations = {
            loader: {
                rotate: new Animated.Value( 0 ),
                MAX_VALUE: 360,
            }
        };
        this.events = {
            onLoadStart: this._onLoadStart.bind( this ),
            onLoad: this._onLoad.bind( this ),
        };
    }

    player={
        controlTimeout:null,
        controlTimeoutDelay:5000
    }
    componentWillMount(){
    }
    setControlTimeout() {
        this.player.controlTimeout = setTimeout( ()=> {
            this._hideControls();
        }, this.player.controlTimeoutDelay );
    }
    clearControlTimeout() {
        clearTimeout( this.player.controlTimeout );
    }
    resetControlTimeout() {
        this.clearControlTimeout();
        this.setControlTimeout();
    }



    onScreenTouch(){
        let state = this.state;
        state.showControls = ! state.showControls;
        this.setState( state );
        this.resetControlTimeout()

    }

    _hideControls(){
        let state = this.state;
        state.showControls = false;
        this.setState( state );
    }

    showControls(){
        let {title, content, video, isEmotion} = this.props;
        return(
            <View style={{position:'relative'}}>
                <View style={styles.btn}>
                    <TouchableOpacity onPress={this._btn.bind(this)}>
                        <View style={{
                            width: isEmotion ? 120 : 80,
                            height: isEmotion ? 120 : 80,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Image source={isEmotion?this.state.cc2:this.state.cc} style={{
                                width: 60,
                                height: 60

                            }}/>
                        </View>
                    </TouchableOpacity>
                </View>

                <Slider
                    style={{width: theme.deviceWidth * 0.7, marginLeft: 10, marginRight: 10}}
                    value={this.state.sliderValue}
                    maximumValue={this.state.file_duration}
                    step={1}
                    minimumTrackTintColor='#FFDB42'
                    trackImage={require('../../../assets/emotion/progressbar.png')}
                    onValueChange={(value) => {
                        this.setState({
                            currentTime: value
                        })
                    }}
                    onSlidingComplete={(value) => {
                        this.refs.video.seek(value)
                    }}
                />
                {
                    isEmotion ? (
                        <Text style={{
                            fontSize: 22,
                            color: '#000'
                        }}>{this.formatTime(Math.floor(this.state.file_duration))}</Text>

                    ) : (
                        <Text style={{color:'#000'}}>{this.formatTime(Math.floor(this.state.currentTime))}
                            - {this.formatTime(Math.floor(this.state.file_duration))}</Text>
                    )
                }
            </View>
        )
    }
    /**
     * Loop animation to spin loader icon. If not loading then stop loop.
     */
    loadAnimation() {
        if ( this.state.loading ) {
            Animated.sequence([
                Animated.timing(
                    this.animations.loader.rotate,
                    {
                        toValue: this.animations.loader.MAX_VALUE,
                        duration: 1500,
                        easing: Easing.linear,
                    }
                ),
                Animated.timing(
                    this.animations.loader.rotate,
                    {
                        toValue: 0,
                        duration: 0,
                        easing: Easing.linear,
                    }
                ),
            ]).start( this.loadAnimation.bind( this ) );
        }
    }


    _onLoadStart() {


        let state = this.state;
        state.loading = true;
        this._hideControls();
        this.loadAnimation();
        this.setState( state );
    }


    _onLoad() {

        let state = this.state;
        state.loading = false;
        this.setState( state );

        if ( state.showControls ) {
            this.setControlTimeout();
        }

    }
    renderLoader() {
        if ( this.state.loading ) {
            return (
                <View style={ styles.loader.container }>
                    <Animated.Image source={ require( './assets/img/timg2.png' ) } style={[
                        styles.loader.icon,
                        { transform: [
                            { rotate: this.animations.loader.rotate.interpolate({
                                inputRange: [ 0, 360 ],
                                outputRange: [ '0deg', '360deg' ]
                            })}
                        ]}
                    ]} />
                </View>
            );
        }
        return null;
    }

    render() {
        let {title, content, video, isEmotion} = this.props;
        return (
            <TouchableWithoutFeedback onPress={ this.onScreenTouch.bind(this) }>
                <View style={[styles.View,{
                    justifyContent:isEmotion?'center':'flex-start',
                    paddingBottom:isEmotion?50:0
                }]}>
                    {this.state.showControls?this.showControls():null}
                    {this.renderLoader()}
                    <Video
                        ref='video'
                        source={{uri: urls.getImage(video)}} // 视频的URL地址，或者本地地址，都可以.
                        rate={this.props.rate}                   // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.（初始进来是暂停或播放）
                        volume={1.0}                 // 声音的放大倍数，0 代表没有声音，就是静音muted, 1 代表正常音量 normal，更大的数字表示放大的倍数
                        muted={false}                // true代表静音，默认为false.
                        resizeMode="cover"           // 视频的自适应伸缩铺放行为，
                        repeat={false}                // 是否重复播放
                        playInBackground={true}     // 当app转到后台运行的时候，播放是否暂停//
                        playWhenInactive={false}     // [iOS] Video continues to play when control or notification center are shown. 仅适用于IOS
                        onLoadStart={this.events.onLoadStart} // 当视频开始加载时的回调函数
                        onLoad={this.events.onLoad}    // 当视频加载完毕时的回调函数
                        onProgress={(e) => this.onProgress(e)}    //  进度控制，每250ms调用一次，以获取视频播放的进度
                        onEnd={(e)=> this.props.onEnd(e)}           // 当视频播放完毕后的回调函数
                        onError={this.videoError}    // 当视频不能加载，或出错后的回调函数
                        style={styles.backgroundVideo}
                        paused={this.state.btn}               // true代表暂停，
                    />

                </View>
            </TouchableWithoutFeedback>
        )
    }
    loadStart(data){

        this.refs.video.seek(0)
    }


    onProgress(data) {


        let val = parseInt(data.currentTime);
        let file_duration=parseInt(data.playableDuration);

        this.setState({
            file_duration:file_duration,
            sliderValue: val,
            currentTime: data.currentTime
        })

    }

    close() {

        let {btn} = this.state;
        if (!btn)
            this.setState({
                btn: true,
                cc: require('../assets/play2.png'),
                cc2: require('../assets/pause2.png')
            })
    }

    _btn() {
        let {btn} = this.state;
        if (this.state.btn) {
            this.setState({
                btn: !btn,
                cc: require('../assets/pause2.png'),
                cc2: require('../assets/play2.png')
            })

        } else {
            this.setState({
                btn: !btn,
                cc: require('../assets/play2.png'),
                cc2: require('../assets/pause2.png')
            })
        }
    }

    //把秒数转换为时间类型
    formatTime(time) {
        // 71s -> 01:11
        let min = Math.floor(time / 60)
        let second = time - min * 60
        min = min >= 10 ? min : '0' + min
        second = second >= 10 ? second : '0' + second
        return min + ':' + second
    }

    onLoad(data) {
        this.setState({duration: data.duration});
    }

    videoError(data) {
    }
}

const styles = {
    loader: StyleSheet.create({
        container: {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            alignItems: 'center',
            justifyContent: 'center',
        },
    }),
    View: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: -1,
        backgroundColor: '#fff'
    },
    bj: {
        resizeMode: 'contain'
    },
    left: {
        width: 100,
    },
    title: {
        textAlign: 'center',
        fontSize: theme.DefaultFontSize + 8,
        marginTop: 40,
        marginBottom: 30
    },
    content: {
        width: '70%',
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'center',
        fontSize: theme.DefaultFontSize + 2,
        lineHeight: 28,
    },
    basis: {
        fontSize: theme.DefaultFontSize,
        lineHeight: 28,
    },
    basisBox: {
        width: '70%',
        marginLeft: 30,
        marginRight: 30,
    },
    btn: {
        marginBottom: 30,
        position:'relative'
    }
};
VideoSolve.propsTypes = {
    title: React.PropTypes.string,
    content: React.PropTypes.string,
    video: React.PropTypes.string,
};
export default (VideoSolve);


