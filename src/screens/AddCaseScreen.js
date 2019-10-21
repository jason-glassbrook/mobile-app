import React, { useState, useEffect } from 'react';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native';
import axios from 'axios';

function AddCaseScreen(props) {

    const [userInfo, setUserInfo] = useState({
        first_name: '',
        last_name: ''
    });

    const submitHandler = () => {

        axios.post('https://family-staging.connectourkids.org/api/v1/cases/', {
            headers: {
                Authorization: `Bearer ${props.accessToken}`
            },
            body: {
                first_name: userInfo.first_name,
                last_name: userInfo.last_name
            }
        }
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        )



        const handleChange = (event) => {
            //console.log(e.target.name, + ': ' + e.target.value)
            setUserInfo({ ...userInfo, [event.target.name]: event.target.value })
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
}

export default AddCaseScreen;