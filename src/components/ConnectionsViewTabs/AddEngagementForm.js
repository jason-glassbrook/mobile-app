import React, {useState, useEffect} from "react";
import { Button, Text, ScrollView, View, TouchableOpacity, StyleSheet, TextInput, DatePickerIOS } from "react-native";
import ToggleSwitch from 'react-native-switch-toggle';
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
        return 'something else'
      }
    }
    setDataType(dataTypeHelper(props.data_type))
  }, [false])
  
  return (
    <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>     
      <View style={{width: '100%', justifyContent: 'flex-end', marginTop: 20}}>
        <TouchableOpacity style={{width: 64, height: 64}}>
          <Feather
            name="x"
            size={40}
            color="#212529"
            onPress={() => {
              props.closeForm()
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
      {dataType === 'REMINDER' ?
        <View style={{width: '100%'}}>
          <DatePickerIOS mode="date" date={dueDate} onDateChange={(e) => setDueDate(e)} />
        </View>
         : null}
      {dataType === 'EMAIL' ?
        <View 
          style={{minHeight: 24, marginTop: 10, marginBottom: 5, width: '100%', backgroundColor: '#E5E4E2', borderRadius: 4}}
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
          style={{minHeight: 61, marginTop: 5, marginBottom: 10, width: '100%', backgroundColor: '#E5E4E2', borderRadius: 4}}
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
        <View style={{width: '100%', marginTop: 15, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{width: '75%', fontSize: 15}}>{`THIS INFORMATION IS SENSITIVE\n(2FA REQUIRED TO VIEW)`}</Text>
            <ToggleSwitch
              switchOn={!isPublic}
              circleColorOn={constants.highlightColor}
              size="medium"
              onPress={() => setIsPublic(!isPublic)}
            />
          </View>
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={() => {
              // console.log('the id is referring to', props.id)
              props.postConnectionEngagements(props.id, note, subject, props.data_type, dueDate, isPublic)
              props.closeForm(props.getEngagements(props.id))
            }}
          >
            <Text style={styles.buttonText}>{`SAVE ${dataType}`}</Text>
          </TouchableOpacity>
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
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 20,
    backgroundColor: constants.highlightColor,
    borderColor: constants.highlightColor
  },
  buttonText: {
    fontSize: 24,
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