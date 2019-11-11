import React, {useState, useEffect} from "react";
import { Button, Text, ScrollView, View, TouchableOpacity, StyleSheet } from "react-native";
// import { compose } from "recompose";
// import {
//   handleTextInput,
//   withNextInputAutoFocusInput
// } from "react-native-formik";
// import { TextField } from "react-native-material-textfield";
// import SwitchBtn from "./SwitchBtn";
import ToggleSwitch from 'react-native-switch-toggle';
import axios from "axios";
// import { Formik } from 'formik';
import {Feather} from '@expo/vector-icons';
import { Input } from 'react-native-elements';
// import { getEngagements } from '../../store/actions/connectionData';
import constants from '../../helpers/constants'
import * as SecureStore from 'expo-secure-store'


const AddEngagementModal = props => {

  const [formState, setFormState] = useState({
      data: '',
      data_type: '',
      due_date: null,
      is_public: true
  })

  const [dataType, setDataType] = useState('')
  
  //pull access token from SecureStore
  const accessToken = SecureStore.getItemAsync('cok_access_token')

  // const dataTypeHelper = (type) => {
  //   if (type === 'N') {
  //     return 'NOTE'
  //   } else if (type === 'R') {
  //     return 'REMINDER'
  //   } else if (type === 'C') {
  //     return 'CALL'
  //   } else if (type === 'D') {
  //     return 'DOCUMENT'
  //   } else if (type === 'E') {
  //   return 'EMAIL'
  //   }
  // }

  //set type of engagement
  useEffect(() => {
    setFormState({ ...formState, data_type: props.data_type }) 
    
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
  
  // determine which endpoint to use
  const endpointPicker = () => {
    if (props.data_type = 'D') {
      return 'https://family-staging.connectourkids.org/api/v1/documents/'
    } else {
      return 'https://family-staging.connectourkids.org/api/v1/person/356/histories/'
    } 
  }

  // /api/v1/documents/?response_type=code&state=&client_id=&scope=&redirect_uri=https%3A%2F%2Ffamily-staging.connectourkids.org
  // axios .post('/api/v1/documents/?response_type=code&state=&client_id=&scope=&redirect_uri=https%3A%2F%2Ffamily-staging.connectourkids.org')

  const submitHandler = () => {
    axios.post(endpointPicker(), {
      Header: {Authorization: `Bearer ${accessToken}`},
      Body: {formState}
    })
    .then(res => {
      console.log(response);
    }, (error) => {
      console.error('Please try again', error);
    })
  }

  const handleChange = event => {
    setFormState({ ...formState, [event.target.SAVE]: event.target.value });
  }
  
  return (
    <View style={styles.formContainer}>
      <TouchableOpacity>
        <Feather
          name="x"
          size={40}
          color="#212529"
          onPress={() => {
            props.closeForm()
          }}
        />
        </TouchableOpacity>
      <Input
        onChange={handleChange}
        placeholder={`ADD ${dataType}`}
        // value={query.Add}
        name="message"
        target={props.message}
      />
      {formState.data_type === 'R' && 
        <Input
        onChange={handleChange}
        placeholder={`ADD ${dataType}`}
        // value={query.Add}
        name="message"
        target={props.message}
      />
      }
      <ToggleSwitch
        switchOn={!formState.is_public}
        onColor="sky blue"
        offColor="grey"
        label="This information is Sensitive(2FA Required to view)"
        labelStyle={{ color: "blue", fontWeight: "790" }}
        size="large"
        onPress={() => setFormState({...formState, is_public: !formState.is_public})}
      />
      <TouchableOpacity 
        style={styles.saveButton}
        onPress={submitHandler}
      >
        <Text style={styles.buttonText}>{`SAVE ${dataType}`}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    width: '95%',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  saveButton: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 10,
    
  },
  buttonText: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: constants.highlightColor,
    flex: 1
  }
})

export default AddEngagementModal;




//***FORMIK code***
// const AddNotesInput = compose(
//   handleTextInput,
//   withNextInputAutoFocusInput
// )(TextField);

// const NotesForm = withNextInputAutoFocusInputForm(View);
// const [notes, setNotes] = useState([]);

// useEffect(() => {
//   axios.post('https://family-staging.connectourkids.org/api/v1/documents/')
//     .then(res => {
//       console.log(response);
//     }, (error) => {
//       console.error('Please try again', error);
//     })
// }, []);

// function NotesForm(Notes) {
//   axios.post('https://family-staging.connectourkids.org/api/v1/person/356/histories/')
//     .then(res => {
//       console.log(response);
//     }, (error) => {
//       console.error('Note failed to save please try again', error);
//     })
// }

// export default EngagementsWithFormik = props => (
//   <Formik
//     onsubmit={values => console.log(values)}
//     validationSchema={validationSchema}
//     render={props => {  
//       return (
//         <NotesForm>
//           <TouchableHighlight >
//             <Feather
//               name="x"
//               size={40}
//               color="#212529"
//               onPress={() => {
//                 setFormVisible(false)
//               }}
//             />
//           </TouchableHighlight>
//           <MyInput label="Notes" name="Add a Note" type="inputfield" />
//           <ToggleSwitch
//             isOn={false}
//             onColor="sky blue"
//             offColor="grey"
//             label="This information is Sensitive(2FA Required to view)"
//             labelStyle={{ color: "blue", fontWeight: "790" }}
//             size="large"
//             onToggle={isOn => console.log("changed to : ", isOn)}
//           />
//           <Button onPress={props.handleSubmit} title="SAVE" />
//         </NotesForm>
//       )
//     }}
//   />
// );