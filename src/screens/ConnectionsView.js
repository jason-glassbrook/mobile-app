import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  Button,
  Linking
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
import {
  Ionicons, AntDesign, MaterialCommunityIcons, Feather,
  MaterialIcons
} from '@expo/vector-icons';
import { Engagement, Documents } from '../components/ConnectionsViewTabs/ConnectionsViewTabs'
import formatTelephone from '../helpers/formatTelephone.js'

function ConnectionsView(props) {
  const connectionData = props.navigation.getParam('connectionData').person
  const [tabs, setTabs] = useState({
    engagement: true,
    docs: false
  })


  useEffect(() => {
    props.getEngagements(props.navigation.getParam('connectionData').person.pk)
    props.getDocuments(props.navigation.getParam('connectionData').person.pk)
  }, [false])

  const styles = StyleSheet.create({
    tabs: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: 'center',
      // borderWidth: 1,
      // borderColor: '#E5E4E2',
      // borderTopLeftRadius: 4,
      // borderTopRightRadius: 4,
    },

    engagementTab: {
      width: "50%",
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderTopLeftRadius: 4,
      borderColor: '#E5E4E2',
      height: 36,
      fontSize: 17.5,
      textAlign: 'center',
      // paddingTop: 8,
      backgroundColor: '#E5E4E2'
    },

    documentsTab: {
      width: "50%",
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderTopRightRadius: 4,
      borderColor: '#E5E4E2',
      height: 36,
      fontSize: 17.5,
      textAlign: 'center',
      // paddingTop: 8,
      backgroundColor: '#E5E4E2'
    },

    engagementSelected: {
      backgroundColor: "#0F6580",
      color: '#E5E4E2',
      borderWidth: 1,
      borderColor: "#0F6580",
      borderTopLeftRadius: 4,
      overflow: "hidden"
    },

    documentsSelected: {
      backgroundColor: "#0F6580",
      color: '#E5E4E2',
      borderWidth: 1,
      borderColor: "#0F6580",
      borderTopRightRadius: 4,
      overflow: "hidden"
    },

    iconLabelContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    },

    iconContainer: {
      backgroundColor: '#E5E4E2',
      height: 45,
      width: 45,
      borderRadius: 22.5,
      justifyContent: 'center',
      alignItems: 'center'
    },

    iconStyles: {
      fontSize: 28,
      backgroundColor: '#E5E4E2',
      color: '#0F6580',
      width: 28,
      height: 28,
      marginHorizontal: 10
    }, 

    iconLabel: {
      color: '#0F6580', 
      fontSize: 12
    }
  })

  const leftArrow = '\u2190';

  return (
    <View style={{ maxHeight: '100%'}}>
      <TouchableHighlight
        underlayColor="lightgray"
        style={{ padding: 7.5 }}
        onPressIn={() => {
          props.navigation.goBack()
        }}
      >
        <Text
          style={{
          marginLeft: 5,
          fontSize: 15
        }}
        >
          {leftArrow} {props.navigation.getParam('childName').toUpperCase()}
        </Text>
      </TouchableHighlight>
      <View>
        <ListItem
          title={connectionData.full_name}
          titleStyle={{fontSize: 18}}
          subtitle={
            <View>
              {connectionData.telephone ? 
                <TouchableHighlight 
                  onPress={() => Linking.openURL(`tel:${connectionData.telephone}`)}
                >
                  <Text style={{color: '#434245'}}>
                    {formatTelephone(connectionData.telephone)}
                  </Text>
                </TouchableHighlight>
              : null}
              {connectionData.email ? 
                <TouchableHighlight
                  onPress={() => Linking.openURL(`mailto:${connectionData.email}`)}
                >
                  <Text style={{color: '#434245'}}>
                    {connectionData.email}
                  </Text>
                </TouchableHighlight> 
              : null}
              {connectionData.address && connectionData.address.formatted ? <Text style={{color: '#434245'}}>{connectionData.address.formatted}</Text> : null}
            </View>
          }
          leftAvatar={{
            size: "large",
            source: {
              uri:
                connectionData.picture ||
                "https://www.trzcacak.rs/myfile/full/214-2143533_default-avatar-comments-default-avatar-icon-png.png"
            }
          }}
        />
        {/* {connectionData.email ? <Text style={{ padding: 5 }}>Email: {connectionData.email}</Text> : null}
        {connectionData.telephone ? <Text style={{ padding: 5 }}>Phone: {connectionData.telephone}</Text> : null}
        {connectionData.address && connectionData.address.formatted ? <Text style={{ padding: 5 }}>Residence: {connectionData.address.formatted}</Text> : null} */}

      </View>
      
     
      <View 
        style={{
          borderRadius: 4,
          // borderColor: '#0F6580',
          // borderWidth: 0.5,
          width: '95%',
          marginLeft: '2%',
          alignItems: 'center',
          alignContent: "center"
        }}
      >
      <View style={styles.tabs}>
        <View style={[styles.engagementTab, tabs.engagement ? styles.engagementSelected : null]}>
          <Text
            style={[{color: '#E5E4E2', fontSize: 17.5}, tabs.engagement ? {color: '#E5E4E2'} : {color: '#000'}]}
            onPress={() => {
              setTabs({
                engagement: true,
                docs: false,
              });
            }}
          >
            Engagement
          </Text>
        </View>
        <View style={[styles.documentsTab, tabs.docs ? styles.documentsSelected : null]}>
          <Text
            style={[{color: '#E5E4E2', fontSize: 17.5}, tabs.docs ? {color: '#E5E4E2'} : {color: '#000'}]}
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
      </View>


      {
        tabs.engagement ?
          <View style={{width: '100%'}}>
            <View 
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                marginTop: 12,
                // marginBottom: 12
              }}
            >
              <View style={styles.iconLabelContainer}>
                <View style={styles.iconContainer}>
                  <TouchableHighlight
                    // onPress={() => {
                    //   navigation.navigate('MyAccount')
                    // }}
                  >
                    <AntDesign
                      name='file1'
                      style={styles.iconStyles}
                    />
                  </TouchableHighlight>
                </View>
                <Text style={styles.iconLabel}>ADD NOTE</Text>
              </View>

              <View style={styles.iconLabelContainer}>
                <View style={styles.iconContainer}>
                  <TouchableHighlight
                    // onPress={() => {
                    //   navigation.navigate('MyAccount')
                    // }}
                  >
                    <MaterialIcons
                      name='phone'
                      style={{
                        fontSize: 28,
                        backgroundColor: '#E5E4E2',
                        color: '#0F6580',
                        width: 28,
                        height: 28,
                        marginHorizontal: 10,
                        transform: [{rotate: '-90deg'}]
                      }}
                      // iconStyles={{}}
                    />
                  </TouchableHighlight>
                </View>
                <Text style={styles.iconLabel}>LOG CALL</Text>
              </View>

              <View style={styles.iconLabelContainer}>
                <View style={styles.iconContainer}>
                  <TouchableHighlight
                    // onPress={() => {
                    //   navigation.navigate('MyAccount')
                    // }}
                  >
                    <MaterialIcons
                      name='email'
                      style={styles.iconStyles}
                    />
                  </TouchableHighlight>
                </View>
                <Text style={styles.iconLabel}>LOG EMAIL</Text>
              </View>

              <View style={styles.iconLabelContainer}>
                <View style={styles.iconContainer}>
                  <TouchableHighlight
                    // onPress={() => {
                    //   navigation.navigate('MyAccount')
                    // }}
                  >
                    <MaterialCommunityIcons
                      name='clock-outline'
                      style={styles.iconStyles}
                    />
                  </TouchableHighlight>
                </View>
                <Text style={styles.iconLabel}>REMINDER</Text>
              </View>
            </View>

            <ScrollView style={{ maxHeight: '80%' }}>
              <View>
                {
                  props.engagements.map((engagement) => {
                    return (
                      <Engagement key={engagement.pk} engagement={engagement} />)
                  })}
              </View>
            </ScrollView>
          </View>
          : null
      }

      {
        tabs.docs ?
          // <View style={{borderWidth: 2}}>
            <ScrollView style={{maxHeight: '100%', width: '80%'}} >
              {/* <View> */}
                {
                  props.documents.map((document) => {
                    console.log('pk' + ' ' + document.pk)
                    return (
                      <Documents key={document.pk} document={document} />)
                  })}
              {/* </View> */}
            </ScrollView>
          // </View> 
          : null
      }
      </View>
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