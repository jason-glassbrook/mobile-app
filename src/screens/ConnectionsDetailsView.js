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
    Image,
    Platform
} from 'react-native';
import EditConnectionForm from '../components/ConnectionsViewTabs/EditConnectionForm';

export default function ConnectionsDetailsView({ details, id }) {

    const [ edit, setEdit ] = useState(false);



    const styles = StyleSheet.create({
        rootView: {
            display: 'flex',
            justifyContent: 'flex-start',
            width: '90%',
            margin: 0
        },
        header: {
            marginTop: 1,            
            marginBottom: 20,
            borderBottomWidth: .5,
            borderBottomColor: 'rgba(24, 23, 21, 0.3)',
            display: 'flex',
            flexDirection:'row',
            justifyContent: 'space-between'
        },
        headerText: {
            color: '#a1a1a1',
            fontWeight: 'bold',

        },
        textView: {//container that wraps every text row, ex) First Name John
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'flex-start',
            alignItems: 'flex-start',

        },
        labelText: {
            width: '25%',
            marginBottom: 25,
            paddingTop: '1%'
        },
        contentText: {
            // marginHorizontal: 20
            width: '75%',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
            marginLeft: 35



            // textAlign: 'left',

        },
        addressDiv: {
            width: "100%",
            // display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            marginLeft: 17

        },
        phoneDiv: {
            width: "100%",
            // display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
        },
        addPad: {
            padding: '5%',
            paddingTop: 2,
        },
        edit:{
            color:'#0279AC', 
            paddingTop:20, 
            paddingRight:5, 
            textAlign:'right'
        }
    })

    const teleFormat = (phoneNumber) => {
        let phoneNumberArr = phoneNumber.split('')
        if (phoneNumberArr.length === 10) {
            return `(${phoneNumberArr.slice(0, 3).join('')}) ${phoneNumberArr.slice(3, 6).join('')}-${phoneNumberArr.slice(6, 10).join('')}`
        }
        else if (phoneNumberArr.length === 11) {
            return `${phoneNumberArr[0]}(${phoneNumberArr.slice(1, 4).join('')}) ${phoneNumberArr.slice(4, 7).join('')}-${phoneNumberArr.slice(7, 11).join('')}`
        }
        else return phoneNumber
    }

    return (
       edit === false ?  
        <View style={styles.rootView}>
            {/* INFORMATION SECTION */}
            {/* onPress needed for edit */}
            <Text style={styles.edit} onPress={()=> {
                setEdit(!edit)
                }}>Edit</Text> 
            <View style={styles.header}>
                <Text style={styles.headerText}>INFORMATION</Text>
            </View>
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
                    {!details.birthday ? null : details.birthday.day ? <Text style={styles.contentText}>{details.birthday.month}/{details.birthday.day}/{details.birthday.year}</Text> : null}</View>
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
                    <View style={styles.addressDiv}>
                        {details.addresses.length && details.addresses.map((addressObj, ind) =>
                          (
                            <View 
                            onPress={() => {Linking.openURL(`geopoint: ${addressObj.address}`)}}
                            key={ind} 
                            style={styles.addPad}>
                                <Text>{addressObj.address}</Text>
                                <Text>{addressObj.street_number} {addressObj.route}</Text>
                                <Text>{addressObj.route}{','} {addressObj.state_code}</Text>
                                <Text>{addressObj.postal_code}{','} {addressObj.country}</Text>
                            </View>
                          
                          ) 
                        )}
                        
                    </View>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.labelText}>Telephone</Text>
                    <View style={styles.phoneDiv}>
                        {details.telephones.length ? details.telephones.map((telephoneObj, index) => <Text 
                        onPress={() => {Platform.OS === 'android' ? Linking.openURL(`tel: ${telephoneObj.telephone}`) : Linking.openURL(`tel:// ${telephoneObj.telephone}`)}}
                        key={index} 
                        style={styles.contentText}>{teleFormat(telephoneObj.telephone)}</Text>) : null}
                    </View>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.labelText}>Email</Text>
                    {details.emails.length ? details.emails.map(emailObj => <Text
                        onPress={() => {Linking.openURL(`mailto: ${emailObj.email}`)}}
                    style={styles.contentText}>{emailObj.email}</Text>) : null}
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
        : <EditConnectionForm details = {details} id={id} setEdit={setEdit}  /> 
    ) 

}