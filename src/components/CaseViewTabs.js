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
  return(
  <View style={{padding: 30}}>
    <ScrollView>
        <Text style={{padding: 5}}>notes:{props.caseData.notes}</Text>
        <Text style={{padding: 5}}>documents:{props.caseData.count_documents}</Text>
        <Text style={{padding: 5}}>phone calls:{props.caseData.phone_calls}</Text>
        <Text style={{padding: 5}}>emails:{props.caseData.emails}</Text>
        <Text>reminders: {props.caseData.reminders}</Text>  
    </ScrollView>
  </View> 
  )
}

export const Participants = (props) => {

  return(
    <View style={{padding: 30}}>
      <ScrollView>
      <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <TextInput placeholder="Add Person" style= {{borderColor: "gray", borderWidth: 1, padding: 10 }} />
        <TextInput placeholder="Add Group" style= {{borderColor: "gray", borderWidth: 1, padding: 10 }} />
      </View>  
        <ListItem leftAvatar={{ source: { uri: props.caseData.created_by.picture || "https://www.trzcacak.rs/myfile/full/214-2143533_default-avatar-comments-default-avatar-icon-png.png" } }} />
        <Text style={{padding: 5}}>Owners: {props.caseData.created_by.full_name}</Text>
        <Text style={{padding: 5}}>Participants:{props.caseData.participants}</Text>
        <Text style={{padding: 5}}>Viewers: {props.caseData.viewers}</Text>
      </ScrollView>
    </View>
  )
}

// export const Highlights = (props) => {

//   return(
//     <View style={{padding: 30}}>
//       <ScrollView>
//         <Text>Highlights: {props.caseData.notes}</Text>
//       </ScrollView>
//     </View>
//   )
// }

export const Documents = (props) => {

  return(
    <View style={{padding: 30}}>
      <ScrollView>
        <Text>Documents: {props.caseData.notes}</Text>
      </ScrollView>
    </View>
  )
}
