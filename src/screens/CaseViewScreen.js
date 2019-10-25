import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
} from 'react-native';
import constants from '../helpers/constants';
import { ListItem, Button, Divider } from 'react-native-elements';
import {
  Engagement,
  Participants,
  Documents,
} from '../components/CaseViewTabs';

import ConnectionsViewScreen from './ConnectionsViewScreen';
import axios from 'axios';

export default function CaseViewScreen(props) {
  const [tabs, setTabs] = useState({
    engagement: true,
    participants: false,
    highlights: false,
  });

  const [ connections, setConnections ] = useState([]);

  const styles = StyleSheet.create({
    tabs: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },

    selected: {
      backgroundColor: constants.highlightColor,
      color: 'white',
      borderWidth: 1,
      borderColor: constants.highlightColor,
      borderRadius: 4,
      overflow: 'hidden',
    },

    tab: {
      padding: 10,
      fontSize: 16,
    },
  });

  let caseData = props.caseData;
  console.log(props.caseData);

  axios
  .get('', {header: {
    access_token: ''
  }})
  .then(res => {
      console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

  return (
    <ScrollView>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 55,
            width: '85%',
          }}
        >
          <View>
            <Text style={{ fontSize: 20 }}>{caseData.full_name}</Text>
            <ListItem
              leftAvatar={{
                source: {
                  uri:
                    caseData.picture ||
                    'https://www.trzcacak.rs/myfile/full/214-2143533_default-avatar-comments-default-avatar-icon-png.png',
                },
              }}
            />
          </View>
          <View style={{ maxWidth: '60%' }}>
            <Text style={{ padding: 5 }}>Gender: {caseData.gender}</Text>
            <Text style={{ padding: 5 }}>
              Date of Birth: {caseData.birthday}
            </Text>
            <Text style={{ padding: 5 }}>
              Residence:{' '}
              {caseData.address && caseData.address.formatted ? (
                caseData.address.formatted
              ) : (
                'no address available'
              )}
            </Text>
            <Text style={{ padding: 5 }}>
              Initiation:{caseData.foster_care}
            </Text>
          </View>
        </View>
        <View
          style={{
            alignContent: 'center',
            marginVertical: 60,
            marginHorizontal: 30,
            fontSize: 80,
            fontWeight: 'bold',
            paddingTop: -10,
          }}
        >
          <TouchableHighlight>
            <Button
              buttonStyle={{ backgroundColor: constants.highlightColor }}
              title="Work on Case"
              onPress={() => {
                props.setModalVisible(!props.modalVisible);
              }}
            />
          </TouchableHighlight>
        </View>

        <Divider
          style={{
            height: 1,
            backgroundColor: 'lightgrey',
            margin: 5,
            width: '85%',
            marginTop: 15,
          }}
        />
      </View>

      <View>
        {
          connections.map(connection => {
            return <ConnectionsViewScreen connection={connection} />
          })
        }

      </View>

      <TouchableHighlight
        underlayColor="lightgray"
        style={{ alignItems: 'center' }}
        onPress={() => {
          props.setCaseVisible();
        }}
      >
        <Text
          style={{
            marginVertical: 30,
            padding: 10,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: `${constants.highlightColor}`,
            color: `${constants.highlightColor}`,
          }}
        >
          Close Case
        </Text>
      </TouchableHighlight>
    </ScrollView>
  );
}
