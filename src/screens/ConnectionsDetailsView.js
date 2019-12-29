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

export default function ConnectionsDetailsView({details}){
const styles = StyleSheet.create({})
return(
    <View>
        <Text>First Name {details.first_name}</Text>
        <Text>Middle Name {details.middle_name}</Text>
        <Text>Last Name {details.last_name}</Text>
        <Text>Suffix {details.suffix}</Text>
        <Text>Date of Birth {details.last_name}</Text>
        <Text>Gender {details.gender}</Text>
        <Text>Deceased {details.deceased? 'True': 'False'}</Text>
        <Text>Residence {details.addresses.length?
        details.addresses.map(address=>{address})
        :null}</Text>
        <Text>Telephone {details.telephones.length?
        details.addresses.map(telephone=>{telephone})
        :null}</Text>
        <Text>Email {details.emails.length?
        details.addresses.map(email=>{email})
        :null}</Text>
        <Text>Job Title {details.job_title}</Text>
        <Text>Employer {details.employer}</Text>
        <Text>Salary Range {details.salary_range}</Text>
        <Text>Facebook {details.facebook}</Text>
        <Text>LinkedIn {details.linkedin}</Text>
        <Text>Twitter {details.twitter}</Text>
    </View>
)

}