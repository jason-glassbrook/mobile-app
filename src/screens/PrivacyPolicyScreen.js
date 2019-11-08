import React, { Component } from 'react';
import { SafeAreaView, Text, Linking, StatusBar, ScrollView, TouchableHighlight, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { setUserCreds, logOut } from '../store/actions';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { withNavigation, NavigationActions } from 'react-navigation';
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
        headerConfig('PrivacyPolicy', navigation);

    async componentDidMount() {
    }

    render() {
        const leftArrow = '\u2190';
        return (
            <ScreenContainer>
                <SafeAreaView>
                    <StatusBar barStyle="dark-content" />
                    <ScrollView>
                        <Text onPress={() => Linking.openURL('https://www.connectourkids.org/privacy')}>Click Here to view Privacy Policy.</Text>
                        <TouchableHighlight
                            underlayColor="lightgray"
                            style={{ padding: 7.5 }}
                            onPressIn={() => {
                                navigation.navigate(FamilyConnectionsScreen)
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





// ***withNavigation***
//return (<Button title='Back' onPress{() => {navigation.goBack()}}/>)
//export default withNavigation(PrivacyPolicyScreen)

// ***NavigationActions.back***        
// const backAction = NavigationActions.back({
//     key: 'FamilyConnectionsScreen'
// });
// return (
//     navigation.dispatch(backAction)
// );