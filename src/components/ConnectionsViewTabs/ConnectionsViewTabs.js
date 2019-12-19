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
  Image,
  Linking,
} from 'react-native';
import { ListItem, Button, Avatar } from "react-native-elements";
import { AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import moment from "moment";

const placeholderImg = require('../../../assets/profile_placeholder.png')

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
      {props.engagement.created_by.picture ?
      <Image
        style={{ height: 50, width: 50, borderRadius: 25, overflow: 'hidden', marginLeft: 15, marginRight: 15, marginTop: 5 }}
        source={{ uri: props.engagement.created_by.picture }}
        onError={placeholderImg}
        defaultSource = {placeholderImg}
      /> :
      <Image
        style={{ height: 50, width: 50, borderRadius: 25, overflow: 'hidden', marginLeft: 15, marginRight: 15, marginTop: 5 }}
        source={placeholderImg}
      />}
      <View>
    <Text style={{fontSize: 16}}>{props.engagement.created_by.full_name} {getDataIcon()} {props.engagement.data_type === 'R' && props.engagement.due_date ? `Due: ${props.engagement.due_date.substring(0, 10)}` : null}</Text>
        {props.engagement.data.subject ? <Text>Subject: {props.engagement.data.subject}</Text> : null}
        <Text>{props.engagement.data.note}</Text>
        <Text style={{color: 'gray'}}>{moment(props.engagement.created_at).format('MMM Do YYYY, h:mm a')}</Text>
      </View>
    </View>
  )
}

export const Documents = (props) => {

  const docIcon = (name) => {
    if (name.slice(-3) === 'pdf') {
      return <AntDesign name="pdffile1" size={34} />
    } else if (name.slice(-3) === 'jpg') {
      return <AntDesign name="picture" size={34} />
    } else if (name.slice(-4) === 'jpeg') {
      return <AntDesign name="picture" size={34} />
    } else if (name.slice(-3) === 'png') {
      return <AntDesign name="picture" size={34} />
    } else {
      return <Entypo name="attachment" size={34} />
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
        subtitle={
          <View>
            <Text>{props.document.created_by.full_name}</Text>
            <Text>{moment(props.document.created_at).format('MMM Do YYYY, h:mm a')}</Text>
          </View>
        }
      chevron
      />
    </View>
  )
}
