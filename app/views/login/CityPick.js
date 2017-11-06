import React, {Component} from "react";
import {Actions, ActionConst} from "react-native-router-flux";
import AlphabetListView from 'react-native-alphabetlistview';
import {observer} from "mobx-react/native";
import {View, Alert, TextInput, TouchableOpacity} from "react-native";
import {Container, Content} from "../../components/index";
import {Text} from "native-base";
import cityData from "./assets/city.json";
import UserStore from "../../mobx/userStore";

@observer
export default class MyComponent extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let array = {};
        array["A"] = [];
        array["B"] = [];
        array["C"] = [];
        array["D"] = [];
        array["E"] = [];
        array["F"] = [];
        array["G"] = [];
        array["H"] = [];
        array["J"] = [];
        array["K"] = [];
        array["L"] = [];
        array["M"] = [];
        array["N"] = [];
        array["P"] = [];
        array["Q"] = [];
        array["R"] = [];
        array["S"] = [];
        array["T"] = [];
        array["W"] = [];
        array["X"] = [];
        array["Y"] = [];
        array["Z"] = [];
        cityData.allcity.map((item, index) => {
            if (item.pinyin.slice(0, 1) == "a") {
                array["A"].push(item)
            } else if (item.pinyin.slice(0, 1) == "b") {
                array["B"].push(item)
            } else if (item.pinyin.slice(0, 1) == "c") {
                array["C"].push(item)
            } else if (item.pinyin.slice(0, 1) == "d") {
                array["D"].push(item)
            } else if (item.pinyin.slice(0, 1) == "e") {
                array["E"].push(item)
            } else if (item.pinyin.slice(0, 1) == "f") {
                array["F"].push(item)
            } else if (item.pinyin.slice(0, 1) == "g") {
                array["G"].push(item)
            } else if (item.pinyin.slice(0, 1) == "h") {
                array["H"].push(item)
            } else if (item.pinyin.slice(0, 1) == "j") {
                array["J"].push(item)
            } else if (item.pinyin.slice(0, 1) == "k") {
                array["K"].push(item)
            } else if (item.pinyin.slice(0, 1) == "l") {
                array["L"].push(item)
            } else if (item.pinyin.slice(0, 1) == "m") {
                array["M"].push(item)
            } else if (item.pinyin.slice(0, 1) == "n") {
                array["N"].push(item)
            } else if (item.pinyin.slice(0, 1) == "p") {
                array["P"].push(item)
            } else if (item.pinyin.slice(0, 1) == "q") {
                array["Q"].push(item)
            } else if (item.pinyin.slice(0, 1) == "r") {
                array["R"].push(item)
            } else if (item.pinyin.slice(0, 1) == "s") {
                array["S"].push(item)
            } else if (item.pinyin.slice(0, 1) == "t") {
                array["T"].push(item)
            } else if (item.pinyin.slice(0, 1) == "w") {
                array["W"].push(item)
            } else if (item.pinyin.slice(0, 1) == "x") {
                array["X"].push(item)
            } else if (item.pinyin.slice(0, 1) == "y") {
                array["Y"].push(item)
            } else if (item.pinyin.slice(0, 1) == "z") {
                array["Z"].push(item)
            }
        })
        this.setState({
            data: array
        })

    }

    render() {
        return (
            <Container>
                <View style={styles.title}>
                    <Text style={{fontSize: theme.DefaultFontSize + 2, fontWeight: 'bold'}}>当前城市：</Text>
                    <Text style={{fontSize: theme.DefaultFontSize, fontWeight: 'bold'}}>{UserStore.position.name}</Text>
                </View>
                <Content padder>
                    <AlphabetListView
                        data={this.state.data}
                        cell={this.Cell}
                        cellHeight={30}
                        sectionHeaderHeight={22.5}
                        initialListSize={500}
                        pageSize={100}
                    />
                </Content>
            </Container>


        );
    }

    Cell(item) {
        return (
            <TouchableOpacity
                onPress={() => {
                    UserStore.position.name = item.item.name;
                    UserStore.position.regionId = item.item.city_id;
                    Actions.pop()
                }}>
                <Text>{item.item.name}</Text>
            </TouchableOpacity>

        )
    }
}
const styles = {
    title: {
        height: 40,
        backgroundColor: theme.contentBgColor,
        flexDirection: 'row',
        alignItems: 'center',

    },
    textStyle: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: '700',
        fontSize: 16
    },
    viewStyle: {
        backgroundColor: 'red'
    },
    view: {
        padding: 10
    }
};