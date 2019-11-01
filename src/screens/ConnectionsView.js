import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  Button
} from 'react-native';
import constants from "../helpers/constants";
import { connect } from "react-redux";
import {
  getEngagements,
  getDocuments,
  clearDocuments,
  clearEngagements
} from "../store/actions/connectionData";
// import { Engagement, Documents } from '../CaseViewTabs'
import { Ionicons } from '@expo/vector-icons';

function ConnectionsView(props) {
  console.log('PROPS.CONNECTIONDATA', props.connectionData)
  const [tabs, setTabs] = useState({
    engagement: true,
    docs: false
  })
// Can we do this in ONE useEffect?
  useEffect(() => {
    props.getEngagements(props.connectionData.connectionData.person.pk)
    props.getDocuments(props.connectionData.connectionData.person.pk)
  }, [false])

  const styles = StyleSheet.create({
    tabs: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: 'center'
    },

    selected: {
      backgroundColor: constants.highlightColor,
      color: "white",
      borderWidth: 1,
      borderColor: constants.highlightColor,
      borderRadius: 4,
      overflow: "hidden"
    },

    tab: {
      width: 120,
      height: 40,
      fontSize: 16,
      textAlign: 'center',
      paddingTop: 8
    }
  })

  return (
    <View>
      <Text style={{ margin: 50 }}>Connection  Screen</Text>
      <View style={styles.tabs}>
        <Text
          style={[styles.tab, tabs.engagement ? styles.selected : null]}
          onPress={() => {
            setTabs({
              engagement: true,
              docs: false,
            });
          }}
        >
          Engagement
        </Text>
        <Text
          style={[styles.tab, tabs.docs ? styles.selected : null]}
          onPress={() => {
            setTabs({
              engagement: false,
              docs: true,
            });
          }}
        >
          Docs
        </Text>
      </View>
      {/* {
        tabs.engagement ? <Engagement connectionData={props.connectionData} /> : null
      }
      {
        tabs.docs ? <Documents connectionData={props.connectionData} /> : null
      } */}

      {
        tabs.engagement ? <Text>engagements tab</Text> : null
      }
      {
        tabs.docs ? <Text>docs tab</Text> : null
      }
      <Button title='connectionData' onPress={() => {
        console.log('**********************************************************')
        console.log('props.connectionData', props.connectionData)
      }} />

<Button title='person' onPress={() => {
        console.log('**********************************************************')
        console.log('person', props.connectionData.person)
      }} />

      <TouchableHighlight
        underlayColor="lightgray"
        style={{ alignItems: "center" }}
        onPress={() => {
          props.closeCase()
        }}
      >
        <Text>This Is The Back Button</Text>
              
      </TouchableHighlight>
      {
        props.engagements? 
          props.engagements.map((engagement) => {
            // console.log(props.engagement)
            return (
              <Text key={engagement.pk} >{engagement.action_name}</Text>
            )
          }) : console.log('props.engagement = undefined', props.engagements)
      }
    </View>
  );
}

const mapStateToProps = state => {
  return {
    engagements: state.connection.engagements,
    isLoadingEngagements: state.connection.isLoadingEngagements,
    engagementsError: state.connection.engagementsError,
    documents: state.connection.documents,
    isLoadingDocuments: state.connection.isLoadingDocuments,
    documentsError: state.connection.documentsError
  }
}

export default connect(
  mapStateToProps,
  {
    getEngagements,
    clearEngagements,
    getDocuments,
    clearDocuments
  }
)(ConnectionsView);