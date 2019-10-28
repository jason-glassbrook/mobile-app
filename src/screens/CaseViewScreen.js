import React, { useState, useEffect } from 'react';
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

import axios from 'axios';

export default function CaseViewScreen(props) {
  const [tabs, setTabs] = useState({
    engagement: true,
    participants: false,
    highlights: false,
  });

  const [connections, setConnections] = useState();

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

  if (!connections) {
    // useEffect(() => {
    //   const accessToken = props.accessToken;
    //   console.log('accessToken:' + accessToken);
    //   axios
    //     .get(
    //       `https://family-staging.connectourkids.org/api/v1/cases/4/relationships/`,
    //       {
    //         headers: {
    //           Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1USkNPRFV3TlVRNVJrVTFNelpDTUVJNFJVVXpRekkzTlRreE5UTkdSRGhCTmtVMVJUazNNZyJ9.eyJpc3MiOiJodHRwczovL2xvZ2luLmNvbm5lY3RvdXJraWRzLm9yZy8iLCJzdWIiOiJhdXRoMHw1ZDliOTVjZTU2NzIyNzBlMGE2MjVlZjAiLCJhdWQiOlsiaHR0cHM6Ly9mYW1pbHktc3RhZ2luZy5jb25uZWN0b3Vya2lkcy5vcmcvYXBpL3YxLyIsImh0dHBzOi8vY29ubmVjdG91cmtpZHMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTU3MjI5NzAzOCwiZXhwIjoxNTcyMzA0MjM4LCJhenAiOiIzZEtUWGlsRHlvQ1YzWVAwNmU5MDA1OUtJNmJQRVJZUSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgb2ZmbGluZV9hY2Nlc3MifQ.ehbjCPrFzkd-Go600duvGBS_Yrkv_IwyyccbZxhEcB_rW9S5hh99NryIGzS3q_IN_cj6Meuc9EUy1ahOUXIg9S-5BeOijFa2JKB79A0nhGXQwwp1o43tENoSZucwL0wv77vH6fNWXPuxyzVOCQNTRD_wyZuMCSVLT1qzJjtKrF15vR3HKczbgb_Ao3g32D8O7qk_ejPFPCJMwQ9hcrh2lw_JeqQXl8gh71Fq9Ceerj9tFAwGQqlN5gaK0LTqIKbALAuB0F_wb9L-FJQuxjrnHdK2UjjG3jnPM4yx85B1w-Z_Ww_emEijTQQEpoQmmVmYIj5HSdL3gTaPCYpAqXxvCQ`,
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       console.log(
    //         '********************************************response***************************************************'
    //       );
    //       console.log('full_name' + response.data.results[0].full_name);
    //       setConnections(response.data.results);
    //     })
    //     .catch((error) => {
    //       console.log("*****************************************error************************************************")
    //       console.log(error);
    //     });
    // }, []);
  }
  

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
        {/* {connections ? (
          connections.map((connection) => {
            return (
            
            <Text>{connection.full_name}</Text>

            );
          })
        ) : (
          <Text
            style={{
              textAlignVertical: 'center',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            loading connections....
          </Text>
        )} */}
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
