import React, {useState, useEffect} from "react";
import { Button, Text, ScrollView, View, TouchableOpacity, StyleSheet, TextInput, DatePickerIOS } from "react-native";
import SwitchToggle from 'react-native-switch-toggle';
import axios from "axios";
import { Feather } from '@expo/vector-icons';
import { Input } from 'react-native-elements';
import { getEngagements } from '../../store/actions/connectionData';
import constants from '../../helpers/constants'
import * as SecureStore from 'expo-secure-store'
import { connect } from 'react-redux';
import { postConnectionEngagements } from '../../store/actions/connectionEngagements';

const AddEngagementForm = props => {

  const [note, setNote] = useState('')
  const [subject, setSubject] = useState(null)
  const [isPublic, setIsPublic] = useState(true)
  const [person, setPerson] = useState(null)
  const [dueDate, setDueDate] = useState(new Date())

  const [dataType, setDataType] = useState('') 

  
  //set type of engagement
  useEffect(() => {
    
    setPerson(props.id)

    const dataTypeHelper = (type) => {
      if (type === 'N') {
        return 'NOTE'
      } else if (type === 'R') {
        return 'REMINDER'
      } else if (type === 'C') {
        return 'CALL'
      } else if (type === 'D') {
        return 'DOCUMENT'
      } else if (type === 'E') {
      return 'EMAIL'
      } else {
        return 'OTHER'
      }
    }
    // console.log('props.navigation', props.navigation.getParam('data_type'))
    // const newDataType = 
    setDataType(dataTypeHelper(props.navigation.getParam('data_type')))
  }, [false])
  
  return (
    <View 
      style={{
        width: '100%', 
        justifyContent: 'flex-start', 
        alignItems: 'center',
        backgroundColor: '#E5E4E2',
        height: '100%',
      }}
    >     
      <View style={styles.formContainer}>
      {dataType === 'REMINDER' ?
        <View style={{width: '95%'}}>
          <DatePickerIOS mode="date" date={dueDate} onDateChange={(e) => setDueDate(e)} />
        </View>
        : null}
      {dataType === 'EMAIL' ?
        <View 
          style={{
            minHeight: 165, 
            marginTop: 10, 
            marginBottom: 5, 
            width: '95%', 
            backgroundColor: 'white', 
            borderRadius: 4
          }}
        >
          <TextInput
            onChangeText={(text) => {
              setSubject(text)
            }}
            placeholder='SUBJECT'
            placeholderTextColor={'#000'}
            style={{padding: 4, fontSize: 15}}
            textAlignVertical='top'
            name="subject"
            value={subject}
          /> 
        </View> : null}
        <View 
          style={{
            minHeight: 165,
            marginTop: 10,
            marginBottom: 5,
            width: '95%',
            backgroundColor: 'white',
            borderRadius: 4
          }}
        >
          <TextInput
            multiline
            numberOfLines={4}
            onChangeText={(text) => {
              setNote(text)
            }}
            placeholder={`ADD ${dataType}`}
            placeholderTextColor={'#000'}
            name="note"
            style={{padding: 4, fontSize: 15}}
            textAlignVertical='top'
            value={note}
          />
        </View>

        {/* Items below here don't change */}
        <View 
          style={{
            width: '95%', 
            marginTop: 20, 
            flexDirection: 'column', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start'
          }}
        >
          <View 
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between'
            }}
          >
            <Text style={{ width: '75%', fontSize: 15 }}>This Information is Sensitive</Text>
            <View>
              <SwitchToggle
                switchOn={!isPublic}
                backgroundColorOn='#158FB4'
                backgroundColorOff='#AAA9AD'
                circleColorOn='#0F6580'
                circleColorOff='#E5E4E2'
                containerStyle={{
                  width: 49,
                  height: 20,
                  borderRadius: 16,
                  padding: 0.1
                }}
                circleStyle={{
                  width: 28,
                  height: 28,
                  borderRadius: 15,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 1,
                    height: 3,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,
                  elevation: 4,
                }}
                onPress={() => setIsPublic(!isPublic)}
              />
            </View>
          </View>
          <View style={{ width: '100%', alignItems: 'flex-end', marginTop: 20 }}>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={() => {
                // console.log('the id is referring to', props.id)
                props.postConnectionEngagements(props.id, note, subject, props.data_type, dueDate, isPublic)
                props.closeForm(props.getEngagements(props.id))
              }}
            >
              <Text style={styles.buttonText}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    width: '95%',
    padding: 4,
    marginTop: 35,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  saveButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 96,
    height: 36,
    backgroundColor: 'lightgray',
    borderRadius: 50,
    borderWidth: 1,
    marginTop: 20,
    backgroundColor: constants.highlightColor,
    borderColor: constants.highlightColor
  },
  buttonText: {
    fontSize: 14,
    textTransform: 'uppercase', 
    color: '#fff',
  }
})

const mapStateToProps = state => {
  const {accessToken} = state.auth

  return {
    accessToken,
    isLoadingEngagements: state.engagements.isLoadingEngagements,
    engagementsError: state.engagements.engagementsError
  }
}

export default connect(
  mapStateToProps, {
    postConnectionEngagements,
    getEngagements
  })(AddEngagementForm);