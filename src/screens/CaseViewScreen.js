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

export function CaseViewScreen(props) {
  const [tabs, setTabs] = useState({
    engagement: true,
    participants: false,
    highlights: false
  })


  
  // const [caseInfo, setCaseInfo] = useState({...getCaseData(props.pk)})
  // console.log('START YEAHHHHHHHHHHH', caseInfo, 'END OF PROPS')
  
  // const [caseData, setCaseData] = useState({})

  console.log('PROPPPPPPPPPPPPPPPPS', props)
  

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
      overflow: "hidden"
    },

    tab: {
      padding: 10,
      fontSize: 16,
    }
  })

  useEffect(() => {
    props.getCaseData(props.pk)
  }, [false])
  
  console.log('CaseDATTTTA', props.caseData)
  
  // let caseData = props.caseData;
  // console.log(props.caseData);
  
  return (
    <ScrollView>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 55, width: '85%'}}> 
      <View>
        <Text style={{fontSize: 20}}>{props.caseData.full_name}</Text>
        <ListItem leftAvatar={{ source: { uri: props.caseData.picture || "https://www.trzcacak.rs/myfile/full/214-2143533_default-avatar-comments-default-avatar-icon-png.png" } }} />
      </View>
        <View style={{maxWidth: '60%'}}> 
          <Text style={{padding: 5}}>Gender: {props.caseData.gender}</Text>
          <Text style={{padding: 5}}>Date of Birth: {props.caseData.birthday}</Text>
          <Text style={{padding: 5}}>Residence: {props.caseData.address && props.caseData.address.formatted ? props.caseData.address.formatted : "no address available"}</Text>
          <Text style={{padding: 5}}>Initiation:{props.caseData.foster_care}</Text>
        </View>
      </View> 
        <View
          style={{
            alignContent: "center",
            marginVertical: 60,
            marginHorizontal: 30,
            fontSize: 80,
            fontWeight: "bold",
            paddingTop: -10
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
        <View style={styles.tabs}>
          <Text style={[styles.tab, tabs.engagement ? styles.selected : null]} onPress={() => { setTabs({ engagement: true, participants: false, highlights: false }) }}>Engagement</Text>
          <Text style={[styles.tab, tabs.participants ? styles.selected : null]} onPress={() => { setTabs({ engagement: false, participants: true, highlights: false }) }}>Participants</Text>
          <Text style={[styles.tab, tabs.highlights ? styles.selected : null]} onPress={() => { setTabs({ engagement: false, participants: false, highlights: true }) }}>Highlights</Text>
        </View>

        <Divider 
          style={{ height: 1, backgroundColor: "lightgrey", margin: 5, width: "85%", marginTop: 15 }}
        />

      </View>
      {
        tabs.engagement ? <Engagement caseData={props.caseData} /> : null
      }
      {
        tabs.participants ? <Participants caseData={props.caseData} /> : null
      }
      {
        tabs.highlights ? <Highlights caseData={props.caseData} /> : null
      }

      <TouchableHighlight
        underlayColor="lightgray"
        style={{ alignItems: 'center' }}
        onPress={
          () => {
            props.clearCaseData()
            props.setCaseVisible()
          }}
      >
        <Text style={{
          marginVertical: 30,
          padding: 10,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: `${constants.highlightColor}`,
          color: `${constants.highlightColor}`
        }}>Close Case</Text>
      </TouchableHighlight>
    </ScrollView>
  );
}

// export default CaseViewScreen;

const mapStateToProps = state => {
  const { caseData } = state.caseData
  const {
      // caseData,
      isLoading,
      error
  } = state;
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