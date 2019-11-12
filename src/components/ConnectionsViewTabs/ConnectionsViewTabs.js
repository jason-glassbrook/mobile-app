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
import { ListItem, Button } from "react-native-elements";
import { AntDesign, Entypo } from '@expo/vector-icons';

export const Engagement = (props) => {

  const getDataType = () => {
    if (props.engagement.data_type === 'N') {
      return 'Note'
    } else if (props.engagement.data_type === 'E') {
      return 'Email'
    } else if (props.engagement.data_type === 'C') {
      return 'Call'
    } else if (props.engagement.data_type === 'R') {
      return 'Reminder'
    } else if (props.engagement.data_type === 'D') {
      return 'Document'
    } else {
      return props.engagement.data_type
    }
  }

  

  return (
    <View >
      <Button title='log' onPress={() => {console.log(props.engagement)}} />

      <ListItem
        title={props.engagement.created_by.full_name + ' - ' + getDataType() + '\n' + props.engagement.created_at}
        titleStyle={{ color: "#5A6064" }}
        leftAvatar={{ source: { uri: props.engagement.created_by.picture } }}
        to pDivider={true}
        subtitle={props.engagement.data.note}
      />
    </View>
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
    } else {
      return <Entypo name="attachment" size={30} />
    }
  }

  return (
    <View>
      <ListItem
        title={props.document.original_file_name}
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


