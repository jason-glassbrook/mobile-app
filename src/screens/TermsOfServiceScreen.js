import React, { Component } from 'react';
import {
    SafeAreaView,
    Text,
    Linking,
    StatusBar,
    ScrollView,
    TouchableHighlight,
    Button
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { setUserCreds, logOut } from '../store/actions';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { withNavigation, NavigationActions } from 'react-navigation';
import headerConfig from '../helpers/headerConfig';
import constants from '../helpers/constants';
import MainText from '../UI/MainText';
import NavigationButton from '../UI/NavigationButton';
import ScreenContainer from '../UI/ScreenContainer';
import authHelpers from '../helpers/authHelpers';

//can this be renamed to about?
class TermsOfServiceScreen extends Component {
    static navigationOptions = ({ navigation }) =>
        headerConfig('Terms Of Service', navigation);

    async componentDidMount() {
    }

    render() {
        const leftArrow = '\u2190';
        return (
            <ScreenContainer>
                <SafeAreaView>
                    <StatusBar barStyle="dark-content" />
                    <ScrollView>
                        <Text onPress={() => Linking.openURL('https://www.connectourkids.org/terms')}>Click Here to view the Terms of Service.</Text>
                        <TouchableHighlight
                            underlayColor="lightgray"
                            style={{ padding: 7.5 }}
                            onPressIn={() => {
                                navigation.goback(FamilyConnectionsScreen)
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
)(TermsOfServiceScreen);


