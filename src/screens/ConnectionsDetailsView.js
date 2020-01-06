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

export default function ConnectionsDetailsView({ details }) {
    const styles = StyleSheet.create({
        rootView: {
            display: 'flex',
            justifyContent: 'flex-start',
            width: '90%',
            margin: 0
        },
        header: {
            marginVertical: 20,
            borderBottomWidth: .75,
            borderBottomColor: 'black'
        },
        headerText: {
            color: '#a1a1a1',
            fontWeight: 'bold',
        },
        textView: {//container that wraps every text row, ex) First Name John
            width: '70%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'flex-start',
            alignItems: 'flex-start',

        },
        labelText: {
            marginBottom: 25
        },
        contentText: {
            // marginHorizontal: 20
            
            display: 'flex',
            flexDirection: 'column',
           
            
           
            // textAlign: 'left',
            
        },
        addressDiv: {
            width: "100%",
            // display: 'flex',
            flexDirection:'column',
            flexWrap: 'wrap',

        },
        addPad: {
            padding: '5%'
        }
    })
  
    return (
        <View style={styles.rootView}>
            {/* INFORMATION SECTION */}
            <View style={styles.header}><Text style={styles.headerText}>INFORMATION</Text></View>
            <View>
                <View style={styles.textView}>
                    <Text style={styles.labelText}>First Name</Text>
                    <Text style={styles.contentText}>{details.first_name}</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.labelText}>Middle Name</Text>
                    <Text style={styles.contentText}>{details.middle_name}</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.labelText}>Last Name</Text>
                    <Text style={styles.contentText}>{details.last_name}</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.labelText}>Suffix</Text>
                    <Text style={styles.contentText}>{details.suffix}</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.labelText}>Date of Birth</Text>
                    {!details.birthday?null:details.birthday.day?<Text style={styles.labelText}>{details.birthday.month}/{details.birthday.day}/{details.birthday.year}</Text>:null}                </View>
                <View style={styles.textView}>
                    <Text style={styles.labelText}>Gender</Text>
                    <Text style={styles.contentText}>{details.gender}</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.labelText}>Deceased</Text>
                    <Text style={styles.contentText}>{details.deceased ? 'Yes' : 'No'}</Text>
                </View>
            </View>
            <View style={styles.header}><Text style={styles.headerText}>CONTACT DETAILS</Text></View>
            <View>
                <View style={styles.textView}>
                    <Text style={styles.labelText}>Residence</Text>
                    <View style = {styles.addressDiv}>
                    {details.addresses.length ? details.addresses.map(address => 
                    <View style = {styles.addPad}>
                            <Text>{address.street_number} {address.route}</Text>
                            <Text>{address.route}{','} {address.state_code}</Text>
                            <Text>{address.postal_code}{','} {address.country}</Text>
                           
                    </View>
                    ) : null}
                    </View>
                </View>
                <View style={styles.textView}>
                    {console.log(details.telephones)}
                    <Text style={styles.labelText}>Telephone</Text>
                    {details.telephones.length ? details.telephones.map((telephoneObj, index) => <Text key={index} style={styles.contentText}>{telephoneObj.telephone}</Text>) : null}
                </View>
                <View style={styles.textView}>
                    <Text style={styles.labelText}>Email</Text>
                    {details.emails.length ? details.emails.map(email => <Text style={styles.contentText}>{email}</Text>) : null}
                </View>
                <View style={styles.textView}>
                    <Text style={styles.labelText}>Job Title</Text>
                    <Text style={styles.contentText}> {details.job_title}</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.labelText}>Employer</Text>
                    <Text style={styles.contentText}> {details.employer}</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.labelText}>Salary Range</Text>
                    <Text style={styles.contentText}> {details.salary_range}</Text>
                </View>
            </View>
            <View style={styles.header}><Text style={styles.headerText}>SOCIAL MEDIA</Text></View>
            <View>
                <View style={styles.textView}>
                    <Text style={styles.labelText}>Facebook</Text>
                    <Text> {details.facebook}</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.labelText}>LinkedIn</Text>
                    <Text> {details.linkedin}</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.labelText}>Twitter</Text>
                    <Text>{details.twitter}</Text>
                </View>
            </View>
        </View>
    )

}