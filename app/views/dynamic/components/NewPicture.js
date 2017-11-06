import React, {Component} from "react";
import {View, Image, TouchableHighlight} from "react-native";

/**
 * 上传图片
 */
export default class NewPicture extends Component {
    render() {
        var {imgArr,addImage,delImage,imgUpload} = this.props;
        var item = imgArr.map((p, i) => {
            return (
                <TouchableHighlight key={i} onPress={()=>delImage(i)}>
                    <Image source={p} style={styles.addPicture}/>
                </TouchableHighlight>
            )
        });
        return (
            <View style={styles.pictureView}>
                {item}
                <TouchableHighlight onPress={() =>addImage()} underlayColor='#fafafa'>
                    <Image source={require('../assets/addPicture.png')} style={styles.addPicture}/>
                </TouchableHighlight>
            </View>
        )
    }
    //
    // selectPhotoTapped() {
    //     const {dispatch} = this.props;
    //     dispatch(selectPhotoTapped())
    // }


}

const styles = {
    pictureView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderBottomWidth: 1,
        borderBottomColor: '#dbdbdb',
        alignItems: 'flex-start',
    },
    addPicture: {
        width: 68,
        height: 68,
        marginLeft: 10,
        marginBottom: 10,
    }
}


NewPicture.propTypes = {
    addImage: React.PropTypes.func,
};