import React, {Component} from "react";
import {Actions} from "react-native-router-flux";
import {View, TouchableHighlight, Image,} from "react-native";

/**
 * 动态
 */
class DynamicImage extends Component {
    render() {
        let {imagePath} =this.props;
        if (imagePath) {
            var arr_pic = imagePath.split(',');
            let pic = arr_pic.map((p, i) => {
                return (
                    <TouchableHighlight key={i} onPress={() => Actions['dynamicPicture']({image: imagePath, i: i})}
                                        style={styles.imageTouch}>
                        <Image source={{uri: urls.getImage(p, 650, 650)}} style={styles.msgImage} />
                    </TouchableHighlight>
                )
            });
            return (
                <View style={styles.allImage}>
                    {pic}
                </View>
            )
        }
        return (null);
    }

}

const styles = {
    imageTouch: {
        marginRight: 7,
        width: 78,
        height: 78,
        marginBottom:3,
        marginTop:2,
    },
    allImage: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    msgImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: null,
        height: null,
    },
};

DynamicImage.propsTypes = {
    imagePath: React.PropTypes.string,
};
DynamicImage.defaultProps = {
    imagePath: "",
};

export default (DynamicImage);
