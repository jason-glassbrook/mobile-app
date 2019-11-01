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
import { Engagement, Documents } from '../components/ConnectionsViewTabs/ConnectionsViewTabs'
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
      <ScrollView>
      {
        tabs.engagement ?
          <View>
             {
              props.engagements.map((engagement) => {
                return (
                  <Engagement key={engagement.pk} engagement={engagement} />)
              })}
             
             </View>: null
  
      }
      </ScrollView>



      <ScrollView>
      {
        tabs.docs ?
          <View>
             {
              props.documents.map((document) => {
                return (
                  <Documents key={document.pk} document={document} />)
              })}
             
             </View>: null
  
      }
      </ScrollView>



      {/* {
        tabs.docs ? <Text>docs tab</Text> : null
      } */}



      <TouchableHighlight
        underlayColor="lightgray"
        style={{ alignItems: "center" }}
        onPress={() => {
          props.closeCase()
        }}
      >
        <Text>This Is The Back Button</Text>

      </TouchableHighlight>
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