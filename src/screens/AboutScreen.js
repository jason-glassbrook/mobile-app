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

class AboutScreen extends Component {
  static navigationOptions = ({ navigation }) =>
    headerConfig('About', navigation);

  // async componentDidMount() {
    // let idToken = await SecureStore.getItemAsync('cok_id_token');
    // if (idToken) {
    //   // confirmedUser = JSON.parse(confirmedUser);
    //   const expiresAt = await SecureStore.getItemAsync('expiresAt');
    //   const isAuthenticated = new Date().getTime() < JSON.parse(expiresAt);
    //   if (isAuthenticated) {
    //     const jwtToken = idToken;
    //     const decoded = jwtDecode(jwtToken);
    //     this.props.setUserCreds(decoded, idToken);
    //   } else {
    //     // re-login
    //     authHelpers.handleLogin(
    //       authHelpers._loginWithAuth0,
    //       this.props.setUserCreds
    //     );
    //   }
    // }
  // }

  render() {
    return (
      <ScreenContainer>
        <SafeAreaView>
          <StatusBar barStyle="dark-content" />
          <ScrollView>
            <MainText>
              Connect Our Kids makes free tools for social workers engaged in
              permanency searches for foster kids.
            </MainText>

            <Text
              style={{
                color: constants.highlightColor,
                fontWeight: 'bold',
                marginBottom: 5
              }}
            >
              Watch the video below to learn more about the free tools and
              resources in this app. Video not loading? <Text style={{ textDecorationLine: 'underline' }}>Tap here.</Text>
            </Text>

            <Video uri={constants.aboutURI} />
            
            {/* <Text onPress={() => Linking.openURL('https://www.connectourkids.org/terms')}>Click Here to view the Terms of Service.</Text>
            <Text onPress={() => Linking.openURL('https://www.connectourkids.org/privacy')}>Click Here to view Privacy Policy.</Text>
            <Text onPress={() => Linking.openURL('https://www.connectourkids.org/contact')}>Click HERE to contact us!</Text> */}

            <Text
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                marginBottom: 5
              }}
            >
              V2.0
            </Text>
            <Text
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                marginBottom: 5
              }}
            >
              Copyright 2019 © Connect Our Kids. All Rights Reserved.
            </Text>
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
)(AboutScreen);
