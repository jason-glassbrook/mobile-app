import React from "react";
import { Text, View, TouchableHighlight } from "react-native";
import constants from "../helpers/constants";
import { ListItem, Button } from "react-native-elements";

export default function CaseViewScreen(props) {
  let caseData = props.caseData;
  const fullYear = new Date();
  console.log(props.caseData);
  return (
    <View>
      <View
        style={{
          marginVertical: 200,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text>{caseData.full_name}</Text>
        <View>
          <ListItem leftAvatar={{ source: { uri: caseData.picture||"https://www.trzcacak.rs/myfile/full/214-2143533_default-avatar-comments-default-avatar-icon-png.png"} }} />
          <Text>Gender: {caseData.gender}</Text>
          <Text>Date of Birth: {caseData.birthday}</Text>
          <Text>
            Age: {caseData.birthday} years
            old
          </Text>
          <Text>Residence: {caseData.address && caseData.address.formatted ? caseData.address.formatted: "no address available"}</Text>
          <Text>Initiation:{caseData.foster_care}</Text>
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
        <View>
          <Text>Engagement</Text>
          <Text>Participants</Text>
          <Text>Highlights</Text>
        </View>
        <TouchableHighlight
          underlayColor="lightgray"
          onPress={() => {
            props.setCaseVisible(!props.caseVisible);
          }}
        >
          <Text>Close Modal</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}
