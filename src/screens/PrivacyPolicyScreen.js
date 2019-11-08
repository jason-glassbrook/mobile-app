import React, { Component } from 'react';
import { SafeAreaView, Text, Linking, StatusBar, ScrollView, TouchableHighlight } from 'react-native';
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
class PrivacyPolicyScreen extends Component {
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
        const leftArrow = '\u2190';
        return (
            <ScreenContainer>
                <SafeAreaView>
                    <StatusBar barStyle="dark-content" />
                    <ScrollView>
                        <Text onPress={() => Linking.openURL('http://google.com')}>Click Here to view Privacy Policy.</Text>
                        <TouchableHighlight
                            underlayColor="lightgray"
                            style={{ padding: 7.5 }}
                            onPressIn={() => {
                                props.navigation.goBack()
                            }}
                        >
                            <Text
                                style={{
                                    marginLeft: 5,
                                    fontSize: 15
                                }}
                            >
                                {leftArrow} Back to MENU
                            </Text>
                        </TouchableHighlight>
                    </ScrollView>
                </SafeAreaView>
            </ScreenContainer>
        )
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
)(PrivacyPolicyScreen);