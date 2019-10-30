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
// import { Engagement, Documents } from '../CaseViewTabs'

function ConnectionsView(props) {

  const [tabs, setTabs] = useState({
    engagement: true,
    docs: false
  })

  // useEffect(() => {
  //   axios
  //   .get(`https://family-staging.connectourkids.org/api/v1/person/${props.relationshipData.pk}/histories/`)
  //   .then((res) => {
  //     console.log(res.data)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // }, [false])

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
      <Text style={{margin: 50}}>Relationship  Screen</Text>
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
        tabs.engagement ? <Engagement relationshipData={props.relationshipData} /> : null
      }
      {
        tabs.docs ? <Documents relationshipData={props.relationshipData} /> : null
      } */}

{
        tabs.engagement ? <Text>engagements tab</Text> : null
      }
      {
        tabs.docs ? <Text>docs tab</Text> : null
      }
<Button title='log' onPress={() => {
  console.log('**********************************************************')
  console.log(props.relationshipData)}} />

<TouchableHighlight
        underlayColor="lightgray"
        style={{ alignItems: "center" }}
        onPress={() => {
          props.closeCase()
        }}
      >
        <Text
          style={{
            marginVertical: 30,
            padding: 10,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: `${constants.highlightColor}`,
            color: `${constants.highlightColor}`
          }}
        >
          Close Connection
        </Text>
      </TouchableHighlight>
    </View>
  );
}

const mapStateToProps = state => {
  const {engagements, isLoadingEngagements, engagementsError} = state.engagements;
  const {documents, isLoadingDocuments, documentsError} = state.documents;
  return {
    engagments,
    isLoadingEngagments,
    engagmentsError,
    documents,
    isLoadingDocuments,
    documentsError
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