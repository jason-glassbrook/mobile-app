import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  Linking,
  Modal,
  Image
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
  clearEngagements,
  getDetails,
  setDetails
} from "../store/actions/connectionData";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  Feather,
  MaterialIcons
} from '@expo/vector-icons';
import { Engagement, Documents } from '../components/ConnectionsViewTabs/ConnectionsViewTabs';
import * as TelephoneHelpers from '../helpers/telephoneHelpers.js';
import AddEngagementForm from '../components/ConnectionsViewTabs/AddEngagementForm';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import AddDocForm from '../components/ConnectionsViewTabs/AddDocForm';
import Loader from '../components/Loader/Loader';
import ScrollToTop from '../UI/ScrollToTop'
import ConnectionsDetailsView from './ConnectionsDetailsView'
import { Row } from 'native-base';

const placeholderImg = require('../../assets/profile_placeholder.png')

function ConnectionsView(props) {
  const connectionData = props.navigation.getParam('connectionData').person
  const [tabs, setTabs] = useState({
    engagement: true,
    docs: false,
    details: false,
  });
  const [editing, setEditing] = useState(false);

  // console.log(props.getDetails)
  const [formVisible, setFormVisible] = useState(false)
  const [addDocVisible, setAddDocVisible] = useState(false)
  const [engagementType, setEngagementType] = useState()
  const [image, setImage] = useState({})
  const [isScrolling, setIsScrolling] = useState(false)
  useEffect(() => {
    props.getEngagements(props.navigation.getParam('connectionData').person.pk)
    props.getDocuments(props.navigation.getParam('connectionData').person.pk)
    props.getDetails(props.navigation.getParam('connectionData').person.pk)

  }, [props.isLoadingDocs, props.isLoadingEngagements])

  const styles = StyleSheet.create({
    tabs: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: 'center',
      borderBottomWidth: 1,
      borderTopRightRadius: 4,
      borderBottomColor: '#EBEBEB',
    },

    engagementTab: {
      width: "33.3%",
      justifyContent: 'center',
      alignItems: 'center',
      height: 36,
      fontSize: 17.5,
      textAlign: 'center',
    },

    documentsTab: {
      width: "33.3%",
      justifyContent: 'center',
      alignItems: 'center',
      height: 36,
      fontSize: 17.5,
      textAlign: 'center',
    },
    detailsTab: {
      width: "33.3%",
      justifyContent: 'center',
      alignItems: 'center',
      height: 36,
      fontSize: 17.5,
      textAlign: 'center',
    },

    engagementSelected: {
      color: '#FFFFFF',
      borderBottomWidth: 3,
      borderBottomColor: '#1D6491',
      overflow: "hidden",
    },

    documentsSelected: {
      color: '#FFFFFF',
      borderBottomWidth: 3,
      borderBottomColor: '#1D6491',
      overflow: "hidden",
    },
    detailsSelected: {
      color: '#FFFFFF',
      borderBottomWidth: 3,
      borderBottomColor: '#1D6491',
      overflow: "hidden"
    },

    iconLabelContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },

    iconContainer: {
      height: 45,
      width: 45,
      borderRadius: 22.5,
      justifyContent: 'center',
      alignItems: 'center'
    },

    iconStyles: {
      fontSize: 28,
      color: '#0F6580',
      width: 28,
      height: 28,
      marginHorizontal: 10
    },

    iconLabel: {
      color: '#0F6580',
      fontSize: 12
    }, avatarName: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: '18%'
    }
  })

  const leftArrow = '\u2190';

  const engagementsNoDocuments = props.engagements.filter((engagement) => engagement.data_type !== 'D')

  const passEngagementType = (type) => {
    return props.navigation.navigate('EngagementForm', { data_type: type, id: connectionData.pk })
  }

  const goToTop = () => {
    scroll.scrollTo({ x: 0, y: 0, animated: true });
  }

  return (
    <View>
      {isScrolling ?
        <ScrollToTop
          style={{
            position: 'absolute',
            zIndex: 1000,
            bottom: 15,
            right: 38,
            backgroundColor: 'white',
            padding: 8,
            borderRadius: 35
          }}
          onPress={goToTop}
        /> : null}
      <ScrollView
        ref={(a) => { scroll = a }}
        style={{ maxHeight: '100%', width: '100%' }}
        scrollsToTop
        onScroll={(e) => {
          if (e.nativeEvent.contentOffset.y <= 250) {
            setIsScrolling(false)
          } else if (e.nativeEvent.contentOffset.y >= 250) {
            setIsScrolling(true)
          }
        }}
        onScrollToTop={() => setIsScrolling(false)}
        scrollEventThrottle={16}
      >

        <View>
          <View style={styles.avatarName}>
            <View
              style={{
                height: 80,
                width: 80,
                borderRadius: 40,
                overflow: 'hidden',
              }}
            >
              {connectionData.picture ?
                <Image
                  source={{ uri: connectionData.picture }}
                  style={{
                    height: 80,
                    width: 80,
                    borderRadius: 40,
                    overflow: 'hidden',
                  }}
                  defaultSource={placeholderImg}
                /> :
                <Image
                  source={placeholderImg}
                  style={{
                    height: 80,
                    width: 80,
                    borderRadius: 40,
                    overflow: 'hidden'
                  }}
                />}
            </View>
            <Text
              style={{
                fontSize: 30,
                color: '#444444',
                paddingTop: 15,
                fontFamily: constants.lotoFamily
              }}
            >{connectionData.full_name}</Text>
          </View>
        </View>

        <View style={[{ justifyContent: 'flex-start', width: '100%', alignItems: 'flex-start' }]}>
          <View
            style={{
              borderRadius: 4,
              width: '100%',
              alignItems: 'flex-start',
              justifyContent: 'flex-start'
            }}
          >
            <View style={[styles.tabs]}>
              <View style={[styles.engagementTab, tabs.engagement ? styles.engagementSelected : null]}>
                <Text
                  style={[{ color: '#444444', fontSize: 17.5, paddingBottom: 9 }, tabs.engagement ? { color: '#444444' } : { color: '#444444' }]}
                  onPress={() => {
                    setTabs({
                      engagement: true,
                      docs: false,
                      details: false,
                    });
                  }}
                >
                  Engagements
              </Text>
              </View>
              <View style={[styles.detailsTab, tabs.details ? styles.detailsSelected : null]}>
                <Text
                  style={[{ color: '#444444', fontSize: 17.5, paddingBottom: 9 }, tabs.details ? { color: '#444444' } : { color: '#444444' }]}
                  onPress={() => {
                    setTabs({
                      engagement: false,
                      docs: false,
                      details: true,
                    });
                    props.setDetails(true)
                  }}
                >
                  Details
              </Text>
              </View>
              <View style={[styles.documentsTab, tabs.docs ? styles.documentsSelected : null]}>
                <Text
                  style={[{ color: '#444444', fontSize: 17.5, paddingBottom: 9 }, tabs.docs ? { color: '#444444' } : { color: '#444444' }]}
                  onPress={() => {
                    setTabs({
                      engagement: false,
                      docs: true,
                      details: false,
                    });
                  }}
                >
                  Documents
              </Text>
              </View>
            </View>

            {
              tabs.engagement ?
                <View
                  style={{
                    width: '100%',
                    minHeight: 350,
                    paddingVertical: 20,
                    paddingHorizontal: 25,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 12
                    }}
                  >
                    <View style={styles.iconLabelContainer}>
                      <View style={styles.iconContainer}>
                        <TouchableOpacity
                          onPress={() => {
                            passEngagementType('N')
                          }}
                        >
                          <MaterialIcons
                            name='note-add'
                            style={styles.iconStyles}
                          />
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.iconLabel}>ADD NOTE</Text>
                    </View>

                    <View style={styles.iconLabelContainer}>
                      <View style={styles.iconContainer}>
                        <TouchableOpacity
                          onPress={() => {
                            passEngagementType('C')
                          }}
                        >
                          <MaterialCommunityIcons
                            name='phone-plus'
                            style={{
                              fontSize: 28,
                              color: '#0F6580',
                              width: 28,
                              height: 28,
                              marginHorizontal: 10,
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.iconLabel}>LOG CALL</Text>
                    </View>

                    <View style={styles.iconLabelContainer}>
                      <View style={styles.iconContainer}>
                        <TouchableOpacity
                          onPress={async () => {
                            passEngagementType('E')
                          }}
                        >
                          <MaterialCommunityIcons
                            name='email-plus'
                            style={styles.iconStyles}
                          />
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.iconLabel}>LOG EMAIL</Text>
                    </View>

                    <View style={styles.iconLabelContainer}>
                      <View style={styles.iconContainer}>
                        <TouchableOpacity
                          onPress={async () => {
                            passEngagementType('R')
                          }}
                        >
                          <MaterialCommunityIcons
                            name='reminder'
                            style={styles.iconStyles}
                          />
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.iconLabel}>REMINDER</Text>
                    </View>
                  </View>

                  <View>
                    {
                      engagementsNoDocuments.map((engagement) => {
                        return (
                          <View key={engagement.pk} style={{ width: '70%' }}>
                            <Engagement engagement={engagement} />
                          </View>)

                      })}
                  </View>
                </View>
                : null
            }

            {
              tabs.docs ?
                <View
                  style={{
                    minHeight: 350,

                    width: '100%'
                  }}
                >
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('DocumentForm', { id: connectionData.pk })
                      }}
                      style={{
                        width: 162,
                        height: 40,
                        backgroundColor: constants.highlightColor,
                        borderRadius: 4,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 18,
                        marginBottom: 10
                      }}
                    >
                      <Text style={{ color: "#FFFFFF", fontSize: 18 }}>Add Document</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ width: '100%', maxHeight: '100%' }} >
                    {props.isLoadingDocs ? <Loader /> :
                      props.documents.map((document) => {

                        return (
                          <Documents key={document.pk} document={document} />)
                      })}
                  </View>
                </View>
                // </View> 
                : null
            }
            {
              tabs.details ?
                <View
                  style={{
                    minHeight: 350,

                    width: '100%'
                  }}
                >
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {props.isLoadingDetails ? <Loader /> :
                      <ConnectionsDetailsView details={props.details} />
                    }
                  </View>
                </View>
                : null
            }
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    engagements: state.connection.engagements,
    isLoadingEngagements: state.engagements.isLoadingEngagements,
    engagementsError: state.connection.engagementsError,
    documents: state.connection.documents,
    isLoadingDocuments: state.connection.isLoadingDocuments,
    isLoadingDocs: state.engagements.isLoadingDocs,
    documentsError: state.connection.documentsError,
    details: state.connection.details,
    isLoadingDetails: state.connection.isLoadingDetails,
    detailsTab: state.connection.detailsTab
  }
}

export default connect(
  mapStateToProps,
  {
    getEngagements,
    clearEngagements,
    getDocuments,
    clearDocuments,
    getDetails,
    setDetails
  }
)(ConnectionsView);