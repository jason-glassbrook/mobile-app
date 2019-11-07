import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  Modal
} from "react-native";
import constants from "../helpers/constants";
import {
  ListItem,
  Button,
  Divider,
  SearchBar,
} from "react-native-elements";
import {
  getCaseData,
  clearCaseData
} from "../store/actions/caseData";
import {
  getCaseConnections,
  clearCaseConnections
} from "../store/actions/caseConnections"
import { connect } from "react-redux";
import Loader from "../components/Loader/Loader";
import CaseListComponent from "../components/CaseListComponent";

export function CaseViewScreen (props) {
  
  const [searchKeywords, setSearchKeywords] = useState('')

  const [filtersSelected, setFiletersSelected] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
  })

  const styles = StyleSheet.create({
    tabs: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around"
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
      padding: 10,
      fontSize: 16
    },
    searchBar: {
      marginHorizontal: Platform.OS === "ios" ? 5 : 5,
      width: '98%',
      backgroundColor: Platform.OS === "ios" ? "white" : "white",
    },
    imageStyles: { width: 225, height: 90 },
    iconStyles: { fontSize: 40, color: '#000', paddingRight: 20 },
    filters: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: "stretch"
    },
    filter: {
      height: 26,
      width: 26,
      borderRadius: 13,
      overflow: 'hidden',
      marginLeft: 10,
      marginRight: 10
    },
    selected: {
      borderWidth: 2,
    }
  });


  // on load get case data and case connections through redux
  useEffect(() => {
    props.getCaseData(props.navigation.getParam('pk'));
    props.getCaseConnections(props.navigation.getParam('pk'));
  }, [false]);

  let caseData = props.caseData;
  // console.log(props.caseData);

  const handleKeywordChange = (e) => {
    setSearchKeywords(e)
  }

  const genderAssignment = (gender) => {
    if (gender === 'M') {
      return 'Male'
    } else if (gender === 'F') {
      return 'Female'
    } else if (gender === 'O') {
      return 'Unspecified Gender'
    } else {
      return null
    }
  }


  //filter functionality
  const filteredConnections = () => {
  //if no filters are set, do nothing
  if (!filtersSelected[1] && !filtersSelected[2] && !filtersSelected[3] && !filtersSelected[4] && !filtersSelected[5]) {
    return props.caseConnections
  } else {
    //remove everyone without a status
    let filteredList = props.caseConnections.filter((connection) => connection.person.status)
    console.log('person   +   color')
    for (i in filteredList) {
      console.log(filteredList[i].person.full_name + ' ' + filteredList[i].person.status.color)
    }
    if (!filtersSelected[1]) {
      //if filter1 not selected, remove everyone with filter1
      filteredList = filteredList.filter((connection) => connection.person.status.color.toUpperCase() !== '#6AA84F')
      // console.log('length***************************', filteredList.length)
    } 
    if (!filtersSelected[2]) {
      //if filter1 not selected, remove everyone with filter1
      filteredList = filteredList.filter((connection) => connection.person.status.color.toUpperCase() !== '#FFFF00')
    } 
    if (!filtersSelected[3]) {
      //if filter1 not selected, remove everyone with filter1
      filteredList = filteredList.filter((connection) => connection.person.status.color.toUpperCase() !== '#CC0000')
    }
    if (!filtersSelected[4]) {
      //if filter1 not selected, remove everyone with filter1
      filteredList = filteredList.filter((connection) => connection.person.status.color.toUpperCase() !== '#9900FF')
    } 
    if (!filtersSelected[5]) {
      //if filter1 not selected, remove everyone with filter1
      filteredList = filteredList.filter((connection) => connection.person.status.color.toUpperCase() !== '#6FA8DC')
    }

    return filteredList 
  }}


  // ------SEARCHBAR functionality - filters by case first_name or last_name---------
  let SearchedConnections = filteredConnections().filter(result => {
    return result.person.full_name.toLowerCase().indexOf(searchKeywords.toLowerCase()) != -1;
  });

  const leftArrow = '\u2190';

  return (
    <ScrollView>
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
          //   padding: 10,
          //   borderRadius: 4,
          //   borderWidth: 1,
          //   borderColor: `${constants.highlightColor}`,
          //   color: `${constants.highlightColor}`
          }}
        >
          {leftArrow} ALL CASES
        </Text>
      </TouchableHighlight>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {props.isLoadingCaseData ? (
          <Loader />
        ) : (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 15,
                width: "85%"
              }}
            >
              <View style={{ justifyContent: 'center' }}>
                <Text style={{ fontSize: 20 }}>{caseData.full_name}</Text>
                <ListItem
                  leftAvatar={{
                    size: "large",
                    avatarStyle: {
                      borderRadius: 100,
                      borderWidth: 2,
                      borderColor: '#dbdbdb'
                    },
                    source: {
                      uri:
                        caseData.picture ||
                        "https://www.trzcacak.rs/myfile/full/214-2143533_default-avatar-comments-default-avatar-icon-png.png"
                    }
                  }}
                />
              </View>
              <View style={{ maxWidth: "60%" }}>
                {caseData.gender ? <Text style={{ padding: 5 }}>{genderAssignment(caseData.gender)}</Text> : null}
                {caseData.birthday ? <Text style={{ padding: 5 }}>Date of Birth: {caseData.birthday}</Text> : null}
                {caseData.address && caseData.address.formatted ? <Text style={{ padding: 5 }}>{`Residence:\n${caseData.address.formatted}`}</Text> : null}
                {caseData.foster_care ? <Text style={{ padding: 5 }}>Initiation: {caseData.foster_care}</Text> : null}
              </View>
            </View>
          )}

        {/* search Functionality */}
        <View
          style={{
            flexDirection: "column",
            width: '95%',
            minHeight: 350,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            borderWidth: 0.5,
            borderColor: '#c4c4c4',
          }}
        >
          <View style={{width: '100%', height: 36, borderTopLeftRadius: 4, borderTopRightRadius: 4, backgroundColor: '#0F6580', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
            <View><Text style={{ width: '100%', padding: 5, fontSize: 17.5, color: '#E5E4E2' }}>Connections</Text></View>
            {/* <View><Text style={{ width: '100%', padding: 5, fontSize: 17.5, color: 'white' }}>Engagement</Text></View> */}
          </View>
          <SearchBar
            inputStyle={{ fontSize: 12 }}
            inputContainerStyle={{ backgroundColor: '#FAFAFA', height: 45.62 }}
            placeholder="Search Name..."
            placeholderTextColor="#8D8383"
            // lightTheme
            round
            name="searchKeywords"
            value={searchKeywords}
            onChangeText={handleKeywordChange}
            // create searchbar target platform.os
            platform="ios"
            containerStyle={styles.searchBar}
          />
          <View style={styles.filters}>
            <Text style={[styles.filter, { backgroundColor: '#6AA84F' }, [filtersSelected[1] ? styles.selected : null]]} onPress={() => setFiletersSelected({ ...filtersSelected, 1: !filtersSelected[1] })}></Text>
            <Text style={[styles.filter, { backgroundColor: '#FFFF00' }, [filtersSelected[2] ? styles.selected : null]]} onPress={() => setFiletersSelected({ ...filtersSelected, 2: !filtersSelected[2] })}></Text>
            <Text style={[styles.filter, { backgroundColor: '#CC0000' }, [filtersSelected[3] ? styles.selected : null]]} onPress={() => setFiletersSelected({ ...filtersSelected, 3: !filtersSelected[3] })}></Text>
            <Text style={[styles.filter, { backgroundColor: '#9900FF' }, [filtersSelected[4] ? styles.selected : null]]} onPress={() => setFiletersSelected({ ...filtersSelected, 4: !filtersSelected[4] })}></Text>
            <Text style={[styles.filter, { backgroundColor: '#6FA8DC' }, [filtersSelected[5] ? styles.selected : null]]} onPress={() => setFiletersSelected({ ...filtersSelected, 5: !filtersSelected[5] })}></Text>
          </View>
          {props.isLoadingConnections ? (
            <Loader />
          ) : (
              SearchedConnections && SearchedConnections.map((connection, index) => {
                return (
                  <CaseListComponent
                    pressed={() => {
                      // console.log('**************connection****************')
                      // console.log(connection)
                      // setConnectionSelected(
                      //   {
                      //   connectionOpen: true,
                      //   connectionData: connection
                      // })
                      props.navigation.navigate('ConnectionsView', { connectionData: connection, childName: caseData.full_name })
                    }}
                    key={index}
                    connection={connection} />
                );
              })
            )}

          {/* CASE onPress MODAL */}
          {/* <Modal
          animationType="slide"
          transparent={false}
          visible={connectionSelected.connectionOpen}
        >
          <ConnectionsView
            connectionData={connectionSelected}
            childName={caseData.full_name}
            closeCase={() => {
              setConnectionSelected({ connectionOpen: false, connectionData: {} });
            }}
          />
        </Modal> */}

          {/* </ScrollView> */}
        </View>

        {/* <Divider
          style={{
            height: 1,
            backgroundColor: "lightgrey",
            width: "100%",
            marginTop: 15
          }}
        /> */}
      </View>

      <View style={{
        justifyContent: "center",
        alignItems: "center"
      }}>
        {/* <Divider
          style={{
            height: 1,
            backgroundColor: "lightgrey",
            width: "85%",
          }}
        /> */}
      </View>
    </ScrollView>
  );
}



const mapStateToProps = state => {
  const { caseData, isLoadingCaseData, caseDataError } = state.caseData;
  const { caseConnections, isLoadingConnections, connectionsError } = state.caseConnections;
  return {
    caseData,
    isLoadingCaseData,
    isLoadingConnections,
    caseDataError,
    connectionsError,
    caseConnections
  };
};

export default connect(
  mapStateToProps,
  {
    getCaseData,
    clearCaseData,
    getCaseConnections,
    clearCaseConnections
  }
)(CaseViewScreen);
