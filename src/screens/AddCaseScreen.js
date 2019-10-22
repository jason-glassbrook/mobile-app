import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';

// components
import Input from '../components/Input.js';


export default class AddCaseScreen extends React.Component {
    _handleSubmit = (values) => {
        Alert.alert(JSON.stringify)
    }
    render() {
        return (
            <View style={styles.container}>
                <Formik
                    initialValues={{ firstName: '', lastName: '' }}
                    onSubmit={this._handleSubmit}
                    validationSchema={Yup.object().shape({
                        firstName: Yup.string().required('Please enter a first name.'),
                        lastName: Yup.string().required('Please enter a last name.')
                    })}
                    render={({ values, handleSubmit, setFieldValue, errors, touched, setFieldTouched }) => (
                        <React.Fragment>
                            <Input
                                label="First Name"
                                value={values.firstName}
                                onChange={setFieldValue}
                                onTouch={setFieldTouched}
                                name="firstName"
                                error={touched.firstName && errors.firstName}
                            />
                            <Input
                                label="Last Name"
                                value={values.lastName}
                                onChange={setFieldValue}
                                onTouch={setFieldTouched}
                                name="lastName"
                                error={touched.lastName && errors.lastName}
                            />
                            <Button buttonStyle={styles.button} title="Submit" />
                        </React.Fragment>
                    )}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginTop: 20,
        width: '100%',
    }
});











































//functional

// function AddCase() {

//     return (
//         <View styles={styles.container, styles.root, styles.form}>
//             <Input label="First Name"/>
//             <Input label="Last Name"/>
//         </View>
//     )
// }

// function Input(props) {

//     return (
//         <View>
//             <FormLabel>{props.label}</FormLabel>
//             <FormInput placeholder={props.label}/>
//             <FormValidationMessage>Error</FormValidationMessage>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     root: {
//         width: '90%',
//         alignSelf: 'center'
//     },
//     input: {

//     },
//     form: {

//     }
// })

// export default AddCase












































//Antiquated - may be removed


// function AddCaseScreen(props) {

//     const [userInfo, setUserInfo] = useState({
//         first_name: '',
//         last_name: ''
//     });

//     const submitHandler = () => {

//         axios.post('https://family-staging.connectourkids.org/api/v1/cases/', {
//             headers: {
//                 Authorization: `Bearer ${props.accessToken}`
//             },
//             body: {
//                 first_name: userInfo.first_name,
//                 last_name: userInfo.last_name
//             }
//         }
//             .then(res => {
//                 console.log(res)
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//         )



//         const handleChange = (event) => {
//             //console.log(e.target.name, + ': ' + e.target.value)
//             setUserInfo({ ...userInfo, [event.target.name]: event.target.value })
//             //console.log(userInfo)
//         }

//         // const errorHandler = () => {

//         // }

//         return (
//             <>
//                 <FormLabel>First Name</FormLabel>

//                 <FormInput name="last_name" onChangeText={handleChange} />

//                 <FormValidationMessage>{'This field is required'}</FormValidationMessage>

//                 <Button onPress={submitHandler}>submit</Button>
//             </>
//         )
//     }
// }

// export default AddCaseScreen;