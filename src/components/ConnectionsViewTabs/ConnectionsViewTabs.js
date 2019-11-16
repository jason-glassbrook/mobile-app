import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  StatusBar,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Platform,
  TouchableHighlight,
  Alert,
  Linking,
} from 'react-native';
import { ListItem, Button, Avatar } from "react-native-elements";
import { AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export const Engagement = (props) => {

  const getDataIcon = () => {
    if (props.engagement.data_type === 'N') {
      return <AntDesign name='file1' size={16} color='#0F6580' />
    } else if (props.engagement.data_type === 'E') {
      return <MaterialIcons name='email' size={16} color='#0F6580' />
    } else if (props.engagement.data_type === 'C') {
      return <MaterialIcons name='phone' size={16} color='#0F6580' />
    } else if (props.engagement.data_type === 'R') {
      return <MaterialCommunityIcons name='clock-outline' size={16} color='#0F6580' />
    } else if (props.engagement.data_type === 'D') {
      return 'Document'
    } else {
      return props.engagement.data_type
    }
  }

  return (
    <View 
      style={{ 
        flexDirection: 'row', 
        alignItems: "flex-start", 
        justifyContent: "flex-start", 
        marginBottom:20 
      }}
    >
      <Avatar
        containerStyle={{ marginLeft: 15, marginRight: 15, marginTop: 5 }}
        source={{ uri: props.engagement.created_by.picture }}
        size="medium"
        rounded />
      <View>
    <Text style={{fontSize: 16}}>{props.engagement.created_by.full_name} {getDataIcon()} {props.engagement.data_type === 'R' && props.engagement.due_date ? `Due: ${props.engagement.due_date.substring(0, 10)}` : null}</Text>
        {props.engagement.data.subject ? <Text>Subject: {props.engagement.data.subject}</Text> : null}
        <Text>{props.engagement.data.note}</Text>
        <Text style={{color: 'gray'}}>{props.engagement.created_at.substring(0, 10)}</Text>
      </View>
    </View>

    // <View >
    //   <ListItem
    //     title={props.engagement.created_by.full_name + ' - ' + getDataType()}
    //     titleStyle={{ color: "#5A6064" }}
    //     leftAvatar={{ source: { uri: props.engagement.created_by.picture } }}
    //     to pDivider={true}
    //     subtitle={[props.engagement.data.subject ? 'Subject: ' + props.engagement.data.subject + '\n' : null] + props.engagement.data.note + '\n' + props.engagement.created_at.substring(0,10)}
    //   />
    // </View>
  )
}

export const Documents = (props) => {

  const docIcon = (name) => {
    if (name.slice(-3) === 'pdf') {
      return <AntDesign name="pdffile1" size={30} />
    } else if (name.slice(-3) === 'jpg') {
      return <AntDesign name="picture" size={30} />
    } else if (name.slice(-4) === 'jpeg') {
      return <AntDesign name="picture" size={30} />
    } else if (name.slice(-3) === 'png') {
      return <AntDesign name="picture" size={30} />
    } else {
      return <Entypo name="attachment" size={30} />
    }
  }

  return (
    <View>
      <ListItem
        title={props.document.title}
        titleStyle={{ color: "#5A6064" }}
        leftIcon={docIcon(props.document.original_file_name)}
        to pDivider={true}
        onPress={() => Linking.openURL(props.document.attachment)}
        subtitle={props.document.created_by.full_name + ' - ' + props.document.created_at.substring(0, 10)}
        chevron
      />
    </View>
  )
}
