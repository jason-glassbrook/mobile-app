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
} from 'react-native';
import { ListItem, Button } from "react-native-elements";

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
    <View>
      
      <ListItem
        title={props.engagement.created_by.full_name + ' - ' + getDataType()}
        titleStyle={{ color: "#5A6064" }}
        leftAvatar={{ source: { uri: props.engagement.created_by.picture } }}
        to pDivider={true}
        subtitle={props.engagement.data.note}
       
      />
    </View>
  )
}


export const Documents = (props) => {

  return (
    <View style={{ padding: 30 }}>
      <ScrollView>
        <Text>Documents: {props.caseData.notes}</Text>
      </ScrollView>
    </View>
  )
}
