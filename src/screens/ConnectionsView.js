import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
  Button
} from 'react-native';
import {
  Divider,
  ListItem
} from 'react-native-elements';
import constants from "../helpers/constants";
import { connect } from "react-redux";
import {
  getEngagements,
  getDocuments,
  clearDocuments,
  clearEngagements
} from "../store/actions/connectionData";
// import { Engagement, Documents } from '../CaseViewTabs'
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Engagement, Documents } from '../components/ConnectionsViewTabs/ConnectionsViewTabs'

function ConnectionsView(props) {
  
  const connectionData = props.connectionData.connectionData.person
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
    },

    iconStyles: {
      fontSize: 32, 
      color: constants.highlightColor, 
      width: 32, 
      height: 32, 
      marginHorizontal: 10
    }
  })

  return (
    <View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View 
          style={{
            flexDirection: "column",
            justifyContent: "center",
            marginTop: 55,
            width: "85%"
          }}
        >
          <View>
            <View>
              <Text style={{fontSize: 20}}>{connectionData.full_name}</Text>
              <ListItem
                leftAvatar={{
                  source: {
                    uri:
                    connectionData.picture ||
                      "https://www.trzcacak.rs/myfile/full/214-2143533_default-avatar-comments-default-avatar-icon-png.png"
                  }
                }}
              >{}</ListItem>
            </View>
            
            <Text>{connectionData.telephone}</Text>
            {connectionData.address !== null && connectionData.address.formatted !== null ? <Text>{connectionData.address.formatted}</Text>
              : <Text>No address provided.</Text>}
          </View>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-evenly', 
            alignItems: 'center'}}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('MyAccount')
              }}
            >
              <Ionicons 
                name='md-mail' 
                style={styles.iconStyles}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('MyAccount')
              }}
            >
              <AntDesign
                name='file1'
                style={styles.iconStyles}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('MyAccount')
              }}
            >
              <MaterialCommunityIcons
                name='clock'
                style={styles.iconStyles}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>

      <Divider
        style={{
          height: 1,
          backgroundColor: "lightgrey",
          width: "85%",
          marginTop: 15
        }}
      />

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
          Engagements
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
          Documents
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