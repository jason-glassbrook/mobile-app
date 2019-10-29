<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { Text, View, TouchableHighlight, StyleSheet, ScrollView } from "react-native";
import constants from "../helpers/constants";
import { ListItem, Button, Divider } from "react-native-elements";
import { Engagement, Participants, Highlights } from "../components/CaseViewTabs";
import {
  getCaseData,
  clearCaseData
} from "../store/actions/caseData";
import { connect } from "react-redux";
import Loader from "../components/Loader/Loader";

export function CaseViewScreen(props) {
=======
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
>>>>>>> f7c8626c0bd676bffed70df1ea74c834cb76ef9e
  const [tabs, setTabs] = useState({
    engagement: true,
    participants: false,
    highlights: false,
  });

<<<<<<< HEAD


  // const [caseInfo, setCaseInfo] = useState({...getCaseData(props.pk)})
  // console.log('START YEAHHHHHHHHHHH', caseInfo, 'END OF PROPS')

  // const [caseData, setCaseData] = useState({})

  console.log('Is doing a load?', props.isLoading)


=======
  const [connections, setConnections] = useState();

>>>>>>> f7c8626c0bd676bffed70df1ea74c834cb76ef9e
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
<<<<<<< HEAD
    }
  })

  useEffect(() => {
    props.getCaseData(props.pk)
  }, [false])

  console.log('CaseDATTTTA', props.caseData)

  // let caseData = props.caseData;
  // console.log(props.caseData);

=======
    },
  });

  let caseData = props.caseData;
  console.log(props.caseData);

  if (!connections) {
      const accessToken = props.accessToken;
      console.log('accessToken:' + ' ' + props.accessToken);
      axios
        .get(
          `https://family-staging.connectourkids.org/api/v1/cases/4/relationships/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          console.log(
            '********************************************response***************************************************'
          );
          console.log(response.data.results[0].person.full_name);
          setConnections(response.data.results);
        })
        .catch((error) => {
          console.log("*****************************************error************************************************")
          console.log(error);
        });
  }
  

>>>>>>> f7c8626c0bd676bffed70df1ea74c834cb76ef9e
  return (
    <ScrollView>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
<<<<<<< HEAD
        {props.isLoading ? (<Loader />) : (<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 55, width: '85%' }}>
            <View>
              <Text style={{ fontSize: 20 }}>{props.caseData.full_name}</Text>
              <ListItem leftAvatar={{ source: { uri: props.caseData.picture || "https://www.trzcacak.rs/myfile/full/214-2143533_default-avatar-comments-default-avatar-icon-png.png" } }} />
            </View>
            <View style={{ maxWidth: '60%' }}>
              <Text style={{ padding: 5 }}>Gender: {props.caseData.gender}</Text>
              <Text style={{ padding: 5 }}>Date of Birth: {props.caseData.birthday}</Text>
              <Text style={{ padding: 5 }}>Residence: {props.caseData.address && props.caseData.address.formatted ? props.caseData.address.formatted : "no address available"}</Text>
              <Text style={{ padding: 5 }}>Initiation:{props.caseData.foster_care}</Text>
            </View>
      </View>)}
=======
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
>>>>>>> f7c8626c0bd676bffed70df1ea74c834cb76ef9e
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
<<<<<<< HEAD
        <View style={styles.tabs}>
          <Text style={[styles.tab, tabs.engagement ? styles.selected : null]} onPress={() => { setTabs({ engagement: true, participants: false, highlights: false }) }}>Engagement</Text>
          <Text style={[styles.tab, tabs.participants ? styles.selected : null]} onPress={() => { setTabs({ engagement: false, participants: true, highlights: false }) }}>Participants</Text>
          <Text style={[styles.tab, tabs.highlights ? styles.selected : null]} onPress={() => { setTabs({ engagement: false, participants: false, highlights: true }) }}>Highlights</Text>
        </View>
        <Divider
          style={{ height: 1, backgroundColor: "lightgrey", margin: 5, width: "85%", marginTop: 15 }}
        />
=======

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
>>>>>>> f7c8626c0bd676bffed70df1ea74c834cb76ef9e

      <View>
        {connections ? (
          connections.map((connection) => {
            return (
            
            <Text key={connection.person.pk}>{connection.person.full_name}</Text>

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
        )}
      </View>
<<<<<<< HEAD
      {
        tabs.engagement ? <Engagement caseData={props.caseData} /> : null
      }
      {
        tabs.participants ? <Participants caseData={props.caseData} /> : null
      }
      {
        tabs.highlights ? <Highlights caseData={props.caseData} /> : null
      }
=======
>>>>>>> f7c8626c0bd676bffed70df1ea74c834cb76ef9e

      <TouchableHighlight
        underlayColor="lightgray"
        style={{ alignItems: 'center' }}
<<<<<<< HEAD
        onPress={
          () => {
            props.clearCaseData()
            props.setCaseVisible()
          }}
=======
        onPress={() => {
          props.setCaseVisible();
        }}
>>>>>>> f7c8626c0bd676bffed70df1ea74c834cb76ef9e
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
<<<<<<< HEAD

// export default CaseViewScreen;

const mapStateToProps = state => {
  // const { caseData } = state.caseData
  const {
    caseData,
    isLoading,
    error
  } = state.caseData;
  return {
    caseData,
    isLoading,
    error
  };
}

export default connect(
  mapStateToProps, {
  getCaseData,
  clearCaseData
})(CaseViewScreen);
=======
>>>>>>> f7c8626c0bd676bffed70df1ea74c834cb76ef9e
