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

const AddEngagementModal = props => {

  // const [formState, setFormState] = useState({
  //     // subject: null,
  //     data_type: 'N',
  //     due_date: null,
  //     is_public: true,
  //     person: null
  //   })

  const [note, setNote] = useState('')
  const [subject, setSubject] = useState(null)
  const [isPublic, setIsPublic] = useState(true)
  const [person, setPerson] = useState(null)
  const [dueDate, setDueDate] = useState(new Date())

  const [dataType, setDataType] = useState('') 

  //set type of engagement
  useEffect(() => {
    // setFormState({ ...formState, data_type: props.data_type, person: props.id }) 
    
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
    <View>
      {console.log('dataType', dataType)}      
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
        <Input
          onChangeText={(text) => {
            setSubject(text)
          }}
          placeholder='Subject'
          name="subject"
          value={subject}
        /> : null}
        <Input
          onChangeText={(text) => {
            setNote(text)
          }}
          placeholder={`ADD ${dataType}`}
          name="note"
          multiline
          numberOfLines={4}
          value={note}
        />

        {/* Items below here don't change */}
        <View style={{width: '100%', marginTop: 15, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
          <ToggleSwitch
            switchOn={!isPublic}
            onColor="sky blue"
            offColor="grey"
            label="This information is Sensitive(2FA Required to view)"
            labelStyle={{ color: "blue", fontWeight: "790" }}
            size="large"
            onPress={() => setIsPublic(!isPublic)}
          />
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={() => {
              console.log('the id is referring to', props.id)
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
    width: '100%',
    // margin: 20,
    marginTop: 35,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  saveButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: constants.highlightColor
  },
  buttonText: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: constants.highlightColor,
    flex: 1
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
  })(AddEngagementModal);