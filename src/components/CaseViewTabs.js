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
  Alert
} from 'react-native';
import { ListItem, Button } from "react-native-elements";

export const Engagement = (props) => {
  return(
  <View>
    <ScrollView>
      <Text>notes:{props.caseData.notes}</Text>
      <Text>documents:{props.caseData.count_documents}</Text>
      <Text>phone calls:{props.caseData.phone_calls}</Text>
      <Text>emails:{props.caseData.emails}</Text>
      <Text>reminders{props.caseData.reminders}</Text>
    </ScrollView>
  </View>   
  )
}

export const Participants = (props) => {

  return(
    <View>
      <ScrollView>
        <TextInput placeholder="Add Person" />
        <TextInput placeholder="Add Group" />
        <ListItem leftAvatar={{ source: { uri: props.caseData.created_by.picture || "https://www.trzcacak.rs/myfile/full/214-2143533_default-avatar-comments-default-avatar-icon-png.png" } }} />
        <Text>Owners: {props.caseData.created_by.full_name}</Text>
        <Text>Participants:{props.caseData.participants}</Text>
        <Text>Viewers: {props.caseData.viewers}</Text>
      </ScrollView>
    </View>
  )
}

export const Highlights = (props) => {

  return(
    <View>
      <ScrollView>
        <Text>Highlights: {props.caseData.notes}</Text>
      </ScrollView>
    </View>
  )
}