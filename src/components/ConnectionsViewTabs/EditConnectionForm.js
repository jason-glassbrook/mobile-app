
import React, { useEffect, useState } from "react"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import axios from "axios"
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
  Platform,
  BouncyCheckbox
} from "react-native";
import {CheckBox} from "react-native-elements"
import { Picker } from 'react-native-picker-dropdown'
import {getDetails} from "../../store/actions/connectionData"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from "react-redux";
import * as SecureStore from 'expo-secure-store'
import Intl from "intl"
import getEnvVars from '../../../environment'
import * as yup from 'yup'

const { familyConnectionsURL } = getEnvVars()

let schema = yup.object().shape({
  first_name: yup.string().required(),
  middle_name: yup.string().nullable(),
  last_name: yup.string().nullable(),
  suffix: yup.string().nullable(),
  dob: yup.string().nullable(),
  gender: yup.string().nullable(),
  deceased: yup.boolean().nullable(),
  addresses:
    yup
      .array()
      .of(yup.object({
        locality: yup.string().required(),
        state: yup.string().required(),
        zip: yup.number().positive().integer()
      }))
  ,
  telephones:
    yup
      .array()
      .of(yup.object({
        telephone: yup.string().min(10),
        is_verified: yup.boolean()
      })).required(),
  emails:
    yup
      .array()
      .of(yup.object({
        email: yup.string().email().required(),
        is_verified: yup.boolean()
      })).required(),
  job_title: yup.string().nullable(),
  employer: yup.string().nullable(),
  salary_range: yup.string().nullable(),
  facebook: yup.string().nullable(),
  twitter: yup.string().nullable(),
  linkedin: yup.string().nullable()
})


function EditConnectionForm(props) {
  const [token, setToken] = useState("");
  const [formData, setFormData] = useState(props.details);
  const [error, setError] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showCal, setShowCal] = useState(false);



  SecureStore.getItemAsync('cok_access_token').then(res => {
    setToken(res)
  }).catch(err => { console.log(err) })


  function handleChange(name, value, options = {}) {

    setFormData(formData => {
      let copy = { ...formData }

      if ("index" in options) copy[name][options.index][options.subname] = value
      else copy[name] = value

      return copy;
    })

  }



  function errorValidatorFormatter(err) {
    // nests errors for fields that are arrays, yup returns '[]' in errors that are arrays
    // "telephones[3].telephone must be at least 10 characters"

      let fieldErrors = {};
    
      if (err.includes('[')) {

        let newErr = err.split('[')
        let name = newErr[0]
        let errTemplate = newErr[1].split(']')
        let errIndex = errTemplate[0] // index of error 3
        let errDetail = errTemplate[1].slice(1) // message of error
        let errType = errTemplate[1].split(' ')[0].slice(1)

        fieldErrors[name] = [];
        fieldErrors[name][errIndex] = {};
        fieldErrors[name][errIndex][errType] = errDetail
        return fieldErrors

      }
      else { 
        fieldErrors[err.split(" ")[0]] = err.split(' ').slice(1).join('');
        return fieldErrors
      }

  }

  function handleSave() {
    // let currentErrors = {}
    setFormErrors({})
    schema
      .validate(formData, { abortEarly: false })
      .then((valid) => { // checks the formData with Yup schema, if it passes errors are cleared and save function is run
        console.log(valid)
        setFormErrors({})
        save()
      })
      .catch(error => {
        let errObj = {}
        error.errors.forEach(err => {
          errObj = {...errObj,...errorValidatorFormatter(err)}
        })
        setFormErrors(errObj)
      })
    }

    function save() {
      const form = new FormData();
      form.append("person", JSON.stringify(formData));
     
      axios
        .patch(`${familyConnectionsURL}/api/v1/individualperson/${props.id}/`, form, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          props.setEdit(false)
          props.getDetails(props.id)
        })
        .catch(err => {
          console.log("Unable to edit person", err);
          setError(true);
        })
    }

  function handleCancel() {
    props.setEdit(false)
    props.getDetails(props.id)
  }

  function handleNew(name) {
    setFormData(formData => {
      let shape;
      switch (name) {
        case "addresses":
          shape = {
            "country": "", "country_code": "", "formatted": "", "is_verified": false, "latitude": 0, "locality": "", "longitude": 0,
            "postal_code": "", "raw": "", "route": "", "state": "", "state_code": "", "street_number": ""
          }
          break
        case "emails":
          shape = { email: "", "is_verified": false }
          break
        case "telephones":
          shape = { "telephone": "", "is_verified": false }
          break
      }
      return {
        ...formData,
        [name]: [...formData[name], shape]
      }

    })
  }

  function TRY(path){
    let v ;
    try{
      v = eval(path)
    }catch(err){
      return undefined;
    }
    return v;
  }

  //functions for birthday field date selector
  //show/hide native picker
  function showDatePicker(){
    setShowCal(true)
  }

  function hideDatePicker() {
    setShowCal(false)
  }

  //handler for date: backend expects birthday object w/ numeric day/month/year and date string of mm/dd/yyyy, m/d/yyyy, etc
  function handleDate(date) {
    setShowCal(false) //must be first or race condition causes picker to reappear after submit
    const day = date.getDate()
    const month = date.getMonth() +1
    const year = date.getFullYear()
    setFormData({
      ...formData,
      birthday: {
        day, month, year,
        raw: month+'/'+day+'/'+year
      }
    })
    

  }

  return (
    <View style={styles.container}>
      <View style={styles.header}><Text
      style={{
        color: 'rgba(24, 23, 21, 0.5)',
        fontWeight: 'bold',
      }}
      >INFORMATION</Text>
      </View>

      <Text>First Name</Text>
      <TextInput style={styles.textInput} value={formData["first_name"]} placeholder="First Name"
        onChangeText={text => handleChange("first_name", text)} />

      <Text>Middle Name</Text>
      <TextInput style={styles.textInput} value={formData["middle_name"]} placeholder="Middle Name"
        onChangeText={text => handleChange("middle_name", text)} />

      <Text>Last Name</Text>
      <TextInput style={styles.textInput} value={formData["last_name"]} placeholder="Last Name"
        onChangeText={text => handleChange("last_name", text)} />

      <Text>Suffix</Text>
      <View style={styles.picker} >
        <Picker selectedValue={formData.suffix} onValueChange={suffix => handleChange("suffix", suffix)} textStyle={styles.pickerText}>
          <Picker.Item label="Suffix" value="" />
          <Picker.Item label="Sr." value="Sr." />
          <Picker.Item label="Jr." value="Jr." />
          <Picker.Item label="II" value="II" />
          <Picker.Item label="III" value="III" />
          <Picker.Item label="IV" value="IV" />
          <Picker.Item label="V" value="V" />
        </Picker>
      </View>

      <View style={styles.dob_gen}>
        <View style={styles["dob_gen_item"]}>
          <Text style={{ marginBottom: 10 }}>Date of Birth</Text>

        {/* Date picker: touchable is styled to match text inputs but triggers picker modal via hook */}
          <TouchableOpacity style={styles.datePicker} onPress={showDatePicker} > 
            <Text style={styles.dateText}>{formData.birthday? formData.birthday.raw : ""}</Text>
          </TouchableOpacity>

        {/* Modal appears over other components when showCal===true */}
          <DateTimePickerModal 
            isVisible={showCal}
            onCancel={hideDatePicker}
            onConfirm={handleDate}
          />


        </View>

        <View style={styles["dob_gen_item"]}>
          <Text>Gender</Text>
          <View style={styles.picker}>
            <Picker selectedValue={formData["gender"]} onValueChange={gender => handleChange("gender", gender)} textStyle={styles.pickerText}>
              <Picker.Item label="male" value="M" />
              <Picker.Item label="female" value="F" />
              <Picker.Item label="other" value="O" />
            </Picker>
          </View>
        </View>
      </View>


      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginRight: 10 }}>Deceased</Text>
        <CheckBox checked={formData.deceased}
          onIconPress={e => handleChange("deceased", !formData.deceased)} />
      </View>


      <View style={styles.header}><Text>CONTACT DETAILS</Text></View>


      <View style={{ marginBottom: 30 }}><Text>Residence</Text></View>
      {
        formData.addresses && formData.addresses.map((val, i) => {
          return (
            <>
              <Text>Street Address</Text>
              <TextInput style={styles.textInput} value={`${val.street_number} ${val.route}`} placeholder="Street"
                onChange={route => handleChange("addresses", route, {
                  index: i,
                  subname: "route"
                })} />
              <Text style={styles.errorText}>{TRY(`formErrors["addresses"][${i}]["route"]`)}</Text>

              <View style={styles.addressInfo}>
                <View style={styles.addressDetail}>
                  <Text>City</Text>
                  <TextInput style={styles.textInput} value={val.locality} placeholder="City"
                    onChange={locality => handleChange("addresses", locality, {
                      index: i,
                      subname: "locality"
                    })} />
                  <Text style={styles.errorText}>{TRY(`formErrors["addresses"][${i}]["locality"]`)}</Text>
                </View>

                <View style={styles.addressDetail}>
                  <Text>State</Text>
                  <TextInput style={styles.textInput} value={val.state} placeholder="State"
                    onChange={state => handleChange("addresses", state, {
                      index: i,
                      subname: "state"
                    })} />
                    <Text style={styles.errorText}>{TRY(`formErrors["addresses"][${i}]["state"]`)}</Text>
                </View>
              </View>

              <View style={styles.addressInfo}>
                <View style={styles.addressDetail}>
                  <Text>Zip Code</Text>
                  <TextInput style={styles.textInput} value={val["postal_code"]} placeholder="Zip Code"
                    onChange={postal_code => handleChange("addresses", postal_code, {
                      index: i,
                      subname: "postal_code"
                    })} />
                    <Text style={styles.errorText}>{TRY(`formErrors["addresses"][${i}]["postal_code"]`)}</Text>
                </View>

                <View style={styles.addressDetail}>
                  <Text>Country</Text>
                  <TextInput style={styles.textInput} value={val.country} placeholder="Country"
                    onChange={country => handleChange("addresses", country, {
                      index: i,
                      subname: "country"
                    })} />
                    <Text style={styles.errorText}>{TRY(`formErrors["addresses"][${i}]["country"]`)}</Text>
                </View>
              </View>
            </>
          )
        })
      }
      <View style={styles.addButtonRow}>
        <TouchableOpacity style={styles.addButton} onPress={e => handleNew("addresses")}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <Text>Add Address</Text>
      </View>


      {
        formData.telephones && formData.telephones.map((val, i) => {
          return (
            <>
              <TextInput style={styles.textInput} key={i} value={val.telephone} placeholder="000-000-0000"
              onChange={telephone => handleChange("telephones", telephone, {
                index: i,
                subname: "telephone"
              })} />
            <Text style={styles.errorText}>{TRY(`formErrors["telephones"][${i}].telephone`)}</Text>
          </>
          )
        })
      }
      <View style={styles.addButtonRow}>
        <TouchableOpacity style={styles.addButton} onPress={e => handleNew("telephones")}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <Text>Add Telephone</Text>
      </View>

      {
        formData.emails && formData.emails.map((val, i) => {
          return (
            <>
              <TextInput style={styles.textInput} key={i} value={val.email} placeholder="name@mail.com"
              onChange={email => handleChange("emails", email, {
                index: i,
                subname: "email"
              })} />
              <Text style={styles.errorText}>{TRY(`formErrors["emails"][${i}].email`)}</Text>
            </>
          )
        })
      }
      <View style={styles.addButtonRow}>
        <TouchableOpacity style={styles.addButton} onPress={e => handleNew("emails")}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <Text>Add Email</Text>
      </View>


      <Text style={{ marginTop: 10 }}>Job Title</Text>
      <TextInput style={styles.textInput} value={formData["job_title"]}
        onChangeText={text => handleChange("job_title", text)} placeholder="Job Title" />

      <Text>Employer</Text>
      <TextInput style={styles.textInput} value={formData["employer"]}
        onChangeText={text => handleChange("employer", text)} placeholder="Company Name" />

      <Text>Salary Range</Text>
      <View style={styles.picker}>
        <Picker selectedValue={formData["salary_range"] } textStyle={styles.pickerText}
          onValueChange={salary => handleChange("salary_range", salary)} >
          <Picker.Item label="Salary Range" value={1} />
          <Picker.Item label="<$40,000" value={2} />
          <Picker.Item label="$40,001-$80,000" value={3}/>
          <Picker.Item label="$81,001-$120,000" value={4}/>
          <Picker.Item label="$120,001-$160,000" value={5}/>
          <Picker.Item label="$160,001-$200,000" value={6}/>
          <Picker.Item label="$200,000+" value={7} />
        </Picker>
      </View>


      <View style={styles.header}><Text>SOCIAL MEDIA</Text></View>

      <Text>Facebook</Text>
      <TextInput style={styles.textInput} value={formData["facebook"]}
        onChangeText={text => handleChange("facebook", text)} placeholder="Facebook" />

      <Text>Twitter</Text>
      <TextInput style={styles.textInput} value={formData["twitter"]}
        onChangeText={text => handleChange("twitter", text)} placeholder="Twitter" />

      <Text>LinkedIn</Text>
      <TextInput style={styles.textInput} value={formData["linkedin"]}
        onChangeText={text => handleChange("linkedin", text)} placeholder="LinkedIn" />
       

      {error ?
        <View style={styles.errorBox}>
          <Text style={{ color: '#fff', alignSelf: 'center' }}>Unable to Update Connection</Text>
        </View>
        : null}

      <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginBottom: 15 }}>
        <TouchableOpacity onPress={handleCancel} ><Text style={styles.cancelButton} >Cancel</Text></TouchableOpacity>
        <TouchableOpacity onPress={handleSave}><Text style={styles.saveButton} >Save</Text></TouchableOpacity>
      </View>
      <View style={{height: 60}}/>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,   /// used to be 90% width
    color: '#444444'
  },
  header: {
    marginTop: 50,
    marginBottom: 30,
    borderBottomColor: 'rgba(24, 23, 21, 0.3)',
    borderBottomWidth: .5,
    fontSize: 2.3,
  },
  textInput: {
    flex: 1,
    color: "#444444",
    borderColor:'rgba(24, 23, 21, 0.5)',
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginTop: 10,   ///// used to be margin
    marginBottom: 20
  },
  picker: {
    color: "#444444",
    borderColor: 'rgba(24, 23, 21, 0.5)',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20, 
    paddingVertical: Platform.OS === 'ios' ? 16 : 4,
    paddingHorizontal: Platform.OS === 'ios' ? 10.5 : 0
  },
  pickerText: {
    fontSize: Platform.OS === 'ios' ? 14 : null,
    paddingTop: Platform.OS === 'ios' ? 2.5 : null,
    color: '#444444'
  },
  dob_gen: {
    
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    // height on iOS
    // ActionSheet
  },
  dob_gen_item: {
    width: "45%"
  },
  datePicker: {  
    borderColor:'rgba(24, 23, 21, 0.5)',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 16.3 : 20,
    height: Platform.OS === 'ios' ? 49 : 60
    
  },
  addButton: {
    backgroundColor: "#0279AC",
    borderRadius: 20,
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 10,
    paddingBottom: 2,
    paddingLeft: 1
  },
  addButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15
  },
  buttonText: {
    color: "white",
    fontSize: 20
  },
  addressInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  addressDetail: {
    width: "45%"
  },
  saveButton: {
    width: 150,
    marginVertical: 15,
    // marginHorizontal: 10,
    padding: 15,
    backgroundColor: '#0279AC',
    color: '#fff',
    borderRadius: 5,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  cancelButton: {
    width: 150,
    marginVertical: 15,
    // marginHorizontal: 10,
    padding: 14,
    backgroundColor: '#fff',
    color: '#0279AC',
    borderColor: '#0279AC',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 20,
    textAlign: 'center'
  },
  errorBox: {
    justifyContent: 'center',
    backgroundColor: '#ff9494',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 15
  },
  errorText:{
    color:'#DB272A'
  }
})

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, { getDetails })(EditConnectionForm); 
