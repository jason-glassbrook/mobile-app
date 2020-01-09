
import React, { useEffect, useState } from "react"
import DatePicker from 'react-native-datepicker'
import axios from "axios"
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
  Picker,
  CheckBox
} from "react-native";
import { connect } from "react-redux";
import * as SecureStore from 'expo-secure-store';
import Intl from "intl"

import getEnvVars from '../../../environment';
const { familyConnectionsURL } = getEnvVars()


function EditConnectionForm(props) {
  const [token, setToken] = useState("");
  const [formData, setFormData] = useState(props.details);


  SecureStore.getItemAsync('cok_access_token').then(res => {
    setToken(res)
  }).catch(err => { console.log(err) })

  function handleChange(name, value, index = 0) {

    setFormData(formData => {
      return {
        ...formData,
        [name]: value
      }
    })

  }

  function handleSave() {
    const form = new FormData();
    form.append("person", JSON.stringify(formData));

    axios
      .patch(`${familyConnectionsURL}/api/v1/individualperson/${props.id}/`, form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        //console.log("(PATCH)person edited: ", res.data);
      })
      .catch(err => {
        console.log("Unable to edit person", err);
      })
  }
  function handleCancel() {
    props.setEdit(false)
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

  return (

    <View style={styles.container}>
      <View style={styles.header}><Text>INFORMATION</Text></View>

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
      <View style={styles.picker}>
        <Picker selectedValue={formData.suffix} onValueChange={suffix => handleChange("suffix", suffix)}>
          <Picker.Item label="" value="" />
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
          <Text>Date of Birth</Text>
          <DatePicker
            date={formData.birthday} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="select date"
            format="MM/DD/YYYY"
            minDate="01/08/1890"
            maxDate={`01/08/2020`}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={date => handleChange("birthday", date)}
          />
        </View>

        <View style={styles["dob_gen_item"]}>
          <Text>Gender</Text>
          <View style={styles.picker}>
            <Picker selectedValue={formData["gender"]} onValueChange={gender => handleChange("gender", gender)}>
              <Picker.Item label="male" value="M" />
              <Picker.Item label="female" value="F" />
              <Picker.Item label="other" value="O" />
            </Picker>
          </View>

        </View>

      </View>

      <Text>Deceased</Text>
      <CheckBox value={formData.deceased}
        onChange={deceased => handleChange("deceased", deceased)} />

      <View style={styles.header}><Text>Contact Details</Text></View>


      <View style={{ marginBottom: 30 }}><Text>Residence</Text></View>
      {
        formData.addresses && formData.addresses.map((val, i) => {
          return (
            <>
              <Text>Street Address</Text>
              <TextInput style={styles.textInput} value={val.route} placeholder="Street" />

              <View style={styles.addressInfo}>
                <View style={styles.addressDetail}>
                  <Text>City</Text>
                  <TextInput style={styles.textInput} value={val.locality} placeholder="City" />
                </View>

                <View style={styles.addressDetail}>
                  <Text>State</Text>
                  <TextInput style={styles.textInput} value={val.state} placeholder="State" />
                </View>
              </View>

              <View style={styles.addressInfo}>
                <View style={styles.addressDetail}>
                  <Text>Zip Code</Text>
                  <TextInput style={styles.textInput} value={val["postal_code"]} placeholder="Zip Code" />
                </View>

                <View style={styles.addressDetail}>
                  <Text>Country</Text>
                  <TextInput style={styles.textInput} value={val.country} placeholder="Country" />
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
          return <TextInput style={styles.textInput} key={i} value={val.telephone} placeholder="000-000-0000" />
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
          return <TextInput style={styles.textInput} key={i} value={val.email} placeholder="name@mail.com" />
        })
      }
      <View style={styles.addButtonRow}>
        <TouchableOpacity style={styles.addButton} onPress={e => handleNew("emails")}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <Text>Add Email</Text>
      </View>


      <Text>Job Title</Text>
      <TextInput style={styles.textInput} value={formData["job_title"]}
        onChangeText={text => handleChange("job_title", text)} placeholder="Job Title" />

      <Text>Employer</Text>
      <TextInput style={styles.textInput} value={formData["employer"]}
        onChangeText={text => handleChange("employer", text)} placeholder="Company Name" />

      <Text>Salary Range</Text>
      <View style={styles.picker}>
        <Picker selectedValue={formData["salary_range"]}
          onValueChange={salary => handleChange("salary_range", salary)} >
          <Picker.Item label="unknown" value="unknown" />
          <Picker.Item label="<$40,000" value="<$40,000" />
          <Picker.Item label="$40,001-$80,000" value="$40,001-$80,000" />
          <Picker.Item label="$81,001-$120,000" value="$81,001-$120,000" />
          <Picker.Item label="$120,001-$160,000" value="$120,001-$160,000" />
          <Picker.Item label="$160,001-$200,000" value="$160,001-$200,000" />
          <Picker.Item label="$200,000+" value="$200,000+" />
        </Picker>
      </View>


      <View style={styles.header}><Text>Social Media</Text></View>

      <Text>Facebook</Text>
      <TextInput style={styles.textInput} value={formData["facebook"]}
        onChangeText={text => handleChange("facebook", text)} placeholder="Facebook" />

      <Text>Twitter</Text>
      <TextInput style={styles.textInput} value={formData["twitter"]}
        onChangeText={text => handleChange("twitter", text)} placeholder="Twitter" />

      <Text>LinkedIn</Text>
      <TextInput style={styles.textInput} value={formData["linkedin"]}
        onChangeText={text => handleChange("linkedin", text)} placeholder="LinkedIn" />
      <View style= {{justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row'}}>
      <Button onPress={handleSave} title="save" />
      <Button onPress={handleCancel} title="cancel" />
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
  },
  header: {
    marginTop: 50,
    marginBottom: 30,
    borderBottomColor: "silver",
    borderBottomWidth: 2,
    color: "silver",
    fontSize: 2
  },
  textInput: {
    flex: 1,
    color: "black",
    borderColor: "silver",
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    margin: 10
  },
  picker: {
    color: "black",
    borderColor: "silver",
    borderWidth: 1,
    borderRadius: 5
  },
  dob_gen: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  dob_gen_item: {
    width: "45%"
  },
  addButton: {
    backgroundColor: "#0279AC",
    borderRadius: 20,
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center"
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
    justifyContent: "space-around"
  },
  addressDetail: {
    width: "40%"
  }
})

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(EditConnectionForm); 
