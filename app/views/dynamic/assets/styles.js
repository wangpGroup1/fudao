import {Dimensions} from "react-native";


const styles = {
    indexTitle: {
        color: '#fff',
        fontSize: theme.DefaultFontSize + 4,
    },
    contain1: {
        backgroundColor: '#fff',
        flex: 1,
    },
    content1: {
        height: 250,
        width:Dimensions.get('window').width,
        marginBottom: 20,
        borderBottomWidth:1,
        borderBottomColor:'#eee'
    },
    bgImg: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: null,
        height: null,
    },
    person: {
        position: 'absolute',
        top: 215,
        right: 120,
        backgroundColor: 'transparent',

    },
    colorfff: {
        color: '#fff',
        fontSize: theme.DefaultFontSize + 1,
    },
    touxiangView: {
        position: 'absolute',
        top: 190,
        right: 20,
        backgroundColor: '#fff',
        borderRadius: 88,
        overflow: 'hidden',
        borderColor:'#CECECE',
        borderWidth:0.5,
    },
    touxiang: {
        width: 88,
        height: 88,
        borderRadius: 44,
    },
    dynamic: {
        borderBottomColor: '#E0E0E2',
        borderBottomWidth: 0.5,
        paddingRight: 8,
        paddingBottom: 16,
        marginTop: 16,
        paddingLeft: 8,
    },

    time: {
        color: '#7E7E7E',
        fontSize: 12,
    },
    dynamicMessage: {
        position: 'absolute',
        right: 0,
    },
    dynamicMessageImage: {
        width: 16,
        height: 16,
    },
    timeAndDelete: {
        marginLeft: 64,
        flexDirection: 'row'
    },
    other: {
        flexDirection: 'row',
    },
    delete: {
        color: '#786e7f',
        marginLeft: 8,
        fontSize: 12,
    },
    showContain: {
        marginTop: 5,
        height: 20,
        marginBottom: 6,
    },
    show: {
        flexDirection: 'row',
        position: 'absolute',
        right: 34,
    },
    showMessage: {
        position: 'absolute',
        right: 0,
    },
    divid: {
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 0,
        height: 24,
    },
    showoneText: {
        textAlign: 'center',
        color: '#999',
        fontSize: theme.DefaultFontSize,
    },
    textInputContain: {
        padding: 10,
        position: 'absolute',
        zIndex: 99,
        bottom: 0,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    textInput: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 12,
    },
    allComments: {
        backgroundColor: '#F3F3F5',
        paddingLeft: 10,
        marginLeft: 60,
        // paddingBottom:8,
    },
    oneComment: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: 4,
    },
    commentName: {
        color: '#786e7f',
        lineHeight: 25,
        fontSize: 14,
        marginRight: 6,
    },
    commentContent: {
        flex:1,
        fontSize: theme.DefaultFontSize,
        lineHeight: 25,
        color: '#060608',

    },
    allSupports: {
        backgroundColor: '#F3F3F5',
        paddingLeft: 10,
        marginLeft: 60,
        paddingBottom: 8,
        flexDirection: 'row',
        borderBottomWidth: 0.3,
        borderBottomColor: '#E0E0E2',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    xin: {
        marginTop: 6,
        marginRight: 4,
        width: 20,
        height: 20,
    },
    onlyDetail: {
        marginRight: 8,
        marginLeft: -40,
        paddingLeft: 0,
        marginTop: 15,
    }
};

export default styles;
