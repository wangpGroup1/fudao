import {PureComponent } from "react";
import {View,Text} from "react-native";



var watchID=null;

/**
 * 我的位置
 */
export default class GeolocationExample extends PureComponent {

    state = {
        initialPosition: 'unknown',
        lastPosition: 'unknown',
    };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (initialPosition) => this.setState({initialPosition}),
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
        this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
            this.setState({lastPosition});
        });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    render() {
        return (
            <View>
                <Text>
                    {JSON.stringify(this.state.initialPosition)}
                </Text>
                <Text>

                    {JSON.stringify(this.state.lastPosition)}
                </Text>
            </View>
        );
    }

}

const mapStateToProps = state => ({
    ...state.position
});
