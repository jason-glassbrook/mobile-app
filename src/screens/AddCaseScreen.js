import React, { useState, useEffect } from 'react';
import { FormLabel, FormInput, FormValidationMessage, TextInput, Button } from 'react-native';
import axios from 'axios';

function AddCaseScreen(props) {

    const [userInfo, setUserInfo] = useState();

    const submitHandler = () => {

        axios.post('https://family-staging.connectourkids.org/api/v1/cases/', {
            headers: {
                Authorization: `Bearer ${props.accessToken}`
            }
            body: {

            }
        })

    }

    const handleChange = (event) => {
        //console.log(e.target.name, + ': ' + e.target.value)
        setUserInfo({ [event.target.name]: event.target.value })
        //console.log(userInfo)
    }

    // const errorHandler = () => {

    // }

    return (
        <>
            <FormLabel>First Name</FormLabel>

            <FormInput onChangeText={handleChange} />

            <FormValidationMessage>{'This field is required'}</FormValidationMessage>

            <Button onPress={submitHandler}>submit</Button>
        </>
    )
}