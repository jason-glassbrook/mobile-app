import React, { Component } from 'react';
import { SafeAreaView, Text, Linking, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import { setUserCreds, logOut } from '../store/actions';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';

import headerConfig from '../helpers/headerConfig';
import constants from '../helpers/constants';
import MainText from '../UI/MainText';
import NavigationButton from '../UI/NavigationButton';
import ScreenContainer from '../UI/ScreenContainer';
// import authHelpers from '../helpers/authHelpers';

//can this be renamed to about?
class EditProfileScreen extends Component {
    static navigationOptions = ({ navigation }) =>
        headerConfig('EditProfile', navigation);

    async componentDidMount() {
    }

    render() {
        return (
            <ScreenContainer>
                <SafeAreaView>
                    <StatusBar barStyle="dark-content" />
                    <ScrollView>
                        <MainText>
                            This is the Edit Profile Screen. Yasssss!
                        </MainText>
                    </ScrollView>
                </SafeAreaView>
            </ScreenContainer>
        );
    }
}

const mapStateToProps = state => {
    const { isLoggedIn } = state.auth;
    return {
        isLoggedIn
    };
};

export default connect(
    mapStateToProps,
    { setUserCreds, logOut }
)(EditProfileScreen);
