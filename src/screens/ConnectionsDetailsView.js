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
        width:'95%',
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
    textView:{//container that wraps every text row, ex) First Name John
        width: '60%',
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignContent:'flex-start',
        alignItems:'flex-start',

    },
    labelText:{
        marginBottom: 25
    },
    contentText:{
        // marginHorizontal: 20
        width:'100%',
        textAlign:'left',
        alignSelf:'flex-start',
    }
})
return(
    <View style={styles.rootView}>
        <View style={styles.header}><Text style={styles.headerText}>INFORMATION</Text></View>
        <View>
            <View style={styles.textView}><Text style={styles.labelText}>First Name </Text><Text style={styles.contentText}>{details.first_name}</Text></View>
            <View style={styles.textView}><Text style={styles.labelText}>Middle Name </Text><Text style={styles.contentText}>{details.middle_name}</Text></View>
            <View style={styles.textView}><Text style={styles.labelText}>Last Name </Text><Text style={styles.contentText}>{details.last_name}</Text></View>
            <View style={styles.textView}><Text style={styles.labelText}>Suffix </Text><Text style={styles.contentText}>{details.suffix}</Text></View>
            <View style={styles.textView}><Text style={styles.labelText}>Date of Birth </Text><Text style={styles.contentText}>{details.birthday}</Text></View>
            <View style={styles.textView}><Text style={styles.labelText}>Gender </Text><Text style={styles.contentText}>{details.gender}</Text></View>
            <View style={styles.textView}><Text style={styles.labelText}>Deceased </Text><Text style={styles.contentText}>{details.deceased? 'Yes': 'No'}</Text></View>
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