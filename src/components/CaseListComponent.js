import React from 'react';
// import { Card, ListItem, Button, Icon } from 'react-native-elements'
// import { Avatar, Badge, withBadge } from 'react-native-elements'
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    Modal,
    StatusBar,
    TextInput,
    ActivityIndicator,
    ScrollView,
    Platform,
    TouchableHighlight,
    Alert
} from "react-native";
import { connect } from "react-redux";
import {
    getCaseData,
    getUserCases
} from "../store/actions"
import axios from "axios";
import {
    ListItem,
    SearchBar,
    Button,
    CheckBox,
    Divider,
    Badge,
    SocialIcon
} from "react-native-elements";


const CaseListComponent = (props) => {

    return (
        <View style={{paddingLeft: 2, paddingRight: 2}}>
            {props.connection.person.status ?
            <View>
              
                <ListItem
                    title={props.connection.person.full_name}
                    titleStyle={{ color: "#5A6064" }}
                    leftAvatar={{ source: { uri: props.connection.person.picture } }}
                    to pDivider={true}
                    onPress={async () => {
                        props.pressed()

                    }}
                />
                {/* <Text style= {{position: "absolute", bottom: 15, left: 15, backgroundColor: props.connection.person.status.color}}> </Text> */}
                <SocialIcon style={{position: "absolute", bottom: 5, left: 5, backgroundColor: props.connection.person.status.color, height: 18, width: 18}}/> 

                </View>
                :
                <ListItem
                    title={props.connection.person.full_name}
                    titleStyle={{ color: "#5A6064" }}
                    leftAvatar={{ source: { uri: props.connection.person.picture } }}
                    to pDivider={true}
                    onPress={async () => {
                        props.pressed()

                    }}
                />
            }
        </View>
    )


}

export default CaseListComponent


