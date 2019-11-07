import React, { Component } from 'react';
import { SafeAreaView, Text, Linking, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import { setUserCreds, logOut } from '../store/actions';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';

import headerConfig from '../helpers/headerConfig';
import constants from '../helpers/constants';
import Video from '../components/Video/Video';
import MainText from '../UI/MainText';
import NavigationButton from '../UI/NavigationButton';
import ScreenContainer from '../UI/ScreenContainer';
import authHelpers from '../helpers/authHelpers';

//can this be renamed to about?
class SupportScreen extends Component {
    static navigationOptions = ({ navigation }) =>
        headerConfig('Best Practices', navigation);

    async componentDidMount() {
        // let idToken = await SecureStore.getItemAsync('cok_id_token');
        // if (idToken) {
        //     // confirmedUser = JSON.parse(confirmedUser);
        //     const expiresAt = await SecureStore.getItemAsync('expiresAt');
        //     const isAuthenticated = new Date().getTime() < JSON.parse(expiresAt);
        //     if (isAuthenticated) {
        //         const jwtToken = idToken;
        //         const decoded = jwtDecode(jwtToken);
        //         this.props.setUserCreds(decoded, idToken);
        //     } else {
        //         // re-login
        //         authHelpers.handleLogin(
        //             authHelpers._loginWithAuth0,
        //             this.props.setUserCreds
        //         );
        //     }
        // }
    }

    render() {
        return (
            <ScreenContainer>
                <SafeAreaView>
                    <StatusBar barStyle="dark-content" />
                    <ScrollView>
                        <MainText>
                            This is the Support Screen!
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
)(SupportScreen);