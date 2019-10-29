import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  ScrollView
} from "react-native";
import constants from "../helpers/constants";
import { 
  ListItem, 
  Button, 
  Divider 
} from "react-native-elements";
import { 
  getCaseData, 
  clearCaseData } from "../store/actions/caseData";
import { 
  getCaseConnections, 
  clearCaseConnections 
} from "../store/actions/caseConnections"
import { connect } from "react-redux";
import Loader from "../components/Loader/Loader";

export function CaseViewScreen(props) {

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
    }
  });


  // on load get case data and case connections through redux
  useEffect(() => {
    props.getCaseData(props.pk);
    props.getCaseConnections(props.pk);
  }, [false]);


  let caseData = props.caseData;
  // console.log(props.caseData);

  return (
    <ScrollView>
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
              marginTop: 55,
              width: "85%"
            }}
          >
            <View>
              <Text style={{ fontSize: 20 }}>{caseData.full_name}</Text>
              <ListItem
                leftAvatar={{
                  source: {
                    uri:
                      caseData.picture ||
                      "https://www.trzcacak.rs/myfile/full/214-2143533_default-avatar-comments-default-avatar-icon-png.png"
                  }
                }}
              />
            </View>
            <View style={{ maxWidth: "60%" }}>
              <Text style={{ padding: 5 }}>Gender: {caseData.gender}</Text>
              <Text style={{ padding: 5 }}>
                Date of Birth: {caseData.birthday}
              </Text>
              <Text style={{ padding: 5 }}>
                Residence:{" "}
                {caseData.address && caseData.address.formatted
                  ? caseData.address.formatted
                  : "no address available"}
              </Text>
              <Text style={{ padding: 5 }}>
                Initiation:{caseData.foster_care}
              </Text>
            </View>
          </View>
        )}
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

        <Divider
          style={{
            height: 1,
            backgroundColor: "lightgrey",
            margin: 5,
            width: "85%",
            marginTop: 15
          }}
        />
      </View>

      <View>
        {props.isLoadingConnections ? (
          <Loader />
        ) : (
          props.caseConnections.map(connection => {
            return (
              <Text key={connection.person.pk}>
                {connection.person.full_name}
              </Text>
            );
          })
        )}
      </View>

      <TouchableHighlight
        underlayColor="lightgray"
        style={{ alignItems: "center" }}
        onPress={() => {
          props.clearCaseData();
          props.clearCaseConnections();
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
            color: `${constants.highlightColor}`
          }}
        >
          Close Case
        </Text>
      </TouchableHighlight>
    </ScrollView>
  );
}

const mapStateToProps = state => {
  const { caseData, isLoadingCaseData, caseDataError } = state.caseData;
  const {caseConnections, isLoadingConnections, connectionsError} = state.caseConnections;
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
