import React, { Component } from 'react';
import {
    Stylesheet,
    View,
    SafeAreaView,
    Text,
    Linking,
    StatusBar,
    Modal
} from 'react-native';
import { Container, Button } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import {
    eventTrack,
    fetchPerson,
    resetPerson,
    setModalVisible,
    setAgreeModalVisible,
    setUserCreds,
    showModal,
    getInfo
} from '../store/actions';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/Messages/ErrorMessage';
import authHelpers from '../helpers/authHelpers';
import headerConfig from '../helpers/headerConfig';
import constants from '../helpers/constants';

export const MyProfile = (props) => {

}


const mapStateToProps = state => {
    // console.log(state);
    const { error, isFetching, person, possiblePersons } = state.people;
    const {
        accessToken,
        idToken,
        isLoggedIn,
        user,
        modalVisible,
    } = state.auth;
    return {
        accessToken,
        error,
        idToken,
        isFetching,
        isLoggedIn,
        person,
        possiblePersons,
        user,
        modalVisible,
        getInfo: state.confirmationModal.info
    };
};

export default connect(
    mapStateToProps,
    {
        eventTrack,
        fetchPerson,
        setModalVisible,
        setUserCreds,
        showModal,
        getInfo
    }
)(MyProfileScreen);


