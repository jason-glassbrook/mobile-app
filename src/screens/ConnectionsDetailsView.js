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
const styles = StyleSheet.create({
    rootView:{
        display:'flex',
        justifyContent:'flex-start',
        width:'90%',
        margin: 0
    },
    header:{
        marginVertical: 20,
        borderBottomWidth: .75,
        borderBottomColor: 'black'
    },
    headerText:{
        color: '#a1a1a1',
        fontWeight: 'bold',
    },
    text:{
        marginBottom: 25
    }
})
return(
    <View style={styles.rootView}>
        <View style={styles.header}><Text style={styles.headerText}>INFORMATION</Text></View>
        <View>
            <Text style={styles.text}>First Name {details.first_name}</Text>
            <Text style={styles.text}>Middle Name {details.middle_name}</Text>
            <Text style={styles.text}>Last Name {details.last_name}</Text>
            <Text style={styles.text}>Suffix {details.suffix}</Text>
            <Text style={styles.text}>Date of Birth {details.birthday}</Text>
            <Text style={styles.text}>Gender {details.gender}</Text>
            <Text style={styles.text}>Deceased {details.deceased? 'Yes': 'No'}</Text>
        </View>
        <View style={styles.header}><Text style={styles.headerText}>CONTACT DETAILS</Text></View>
        <View>
            <Text style={styles.text}>Residence {details.addresses.length?
            details.addresses.map(address=>{address})
            :null}</Text>
            <Text style={styles.text}>Telephone {details.telephones.length?
            details.addresses.map(telephone=>{telephone})
            :null}</Text>
            <Text style={styles.text}>Email {details.emails.length?
            details.addresses.map(email=>{email})
            :null}</Text>
            <Text style={styles.text}>Job Title {details.job_title}</Text>
            <Text style={styles.text}>Employer {details.employer}</Text>
            <Text style={styles.text}>Salary Range {details.salary_range}</Text>
        </View>
        <View style={styles.header}><Text style={styles.headerText}>SOCIAL MEDIA</Text></View>
        <View>
            <Text style={styles.text}>Facebook {details.facebook}</Text>
            <Text style={styles.text}>LinkedIn {details.linkedin}</Text>
            <Text style={styles.text}>Twitter {details.twitter}</Text>
        </View>
    </View>
)

}