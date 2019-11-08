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
import PersonInfo from '../components/Person/PersonInfo';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/Messages/ErrorMessage';
import authHelpers from '../helpers/authHelpers';
import { ConfirmationModal } from '../components/Person/ConfirmationModal';
import headerConfig from '../helpers/headerConfig';
import constants from '../helpers/constants';
// import MainText from '../UI/MainText';
// import NavigationButton from '../UI/NavigationButton';
// import ScreenContainer from '../UI/ScreenContainer';

//Rename to 'MyProfileScreen' ?
class EditProfileScreen extends Component {
    static navigationOptions = ({ navigation }) =>
        headerConfig('EditProfile', navigation);

    state = {
        requestObject: {},
        modalVisible: false,
        key: '',
        type: '',
        address: '',
        info: '',
        index: null
    };

    toggleModal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        });
    };

    componentDidMount() {
        const {
            accessToken,
            fetchPerson,
            idToken,
            isLoggedIn,
            person
        } = this.props;

        if (this.props.navigation.state.params) {
            const requestObject = {};
            if (isLoggedIn) {
                requestObject['authToken'] = accessToken;
                requestObject['idToken'] = idToken;
            } else {
                this.setState({ requestObject });
            }

            fetchPerson(
                JSON.stringify(requestObject),
                this.props.user ? this.props.user.email : null
            );
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.isLoggedIn === false &&
            this.props.isLoggedIn === true &&
            this.state.requestObject
        ) {
            // console.log('requestobj: ', this.state.requestObject);
            let requestObject = { ...this.state.requestObject };
            requestObject['authToken'] = this.props.accessToken;
            requestObject['idToken'] = this.props.idToken;
            this.props.fetchPerson(
                JSON.stringify(requestObject),
                this.props.user ? this.props.user.email : null
            );
            this.setState({ requestObject: {} });
        }
    }

    showConModal = (key, type, index) => {
        this.setState({ key, type, index });
        this.toggleModal();
    };

    setData = (key, type) => {
        this.setState({ info: key, type: type });
        this.props.getInfo(key, type);
    };
    render() {
        const { isLoggedIn, person, user } = this.props;
        return (
            <Container>
                <StatusBar barStyle="dark-content" />
                <View>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={this.toggleModal}
                    >
                        <ConfirmationModal
                            toggleModal={this.toggleModal}
                            type={this.state.type}
                            data={this.state.key}
                            home={this.state.address}
                            navigation={this.props.navigation}
                            setData={this.setData}
                            user={user}
                            index={this.state.index}
                        />
                    </Modal>
                </View>
                <SafeAreaView>
                    <ScrollView>
                        <View>
                            <Button
                                onPress={() => this.props.navigation.goBack()}
                            >
                                <Text >Back</Text>
                            </Button>
                        </View>
                        {/* <View>
                            {!isLoggedIn && (
                                <TouchableHighlight onPress={this.startRegister}>
                                    <Text >
                                        This is a preview. Social workers can have completely free
                                        access. Click here to find out more.
                                    </Text>
                                </TouchableHighlight>
                            )}
                            {this.props.error && <ErrorMessage />}
                            {!person ? (
                                <Loader />
                            ) : (
                                    <PersonInfo
                                        item={person}
                                        setModalVisible={this.props.setModalVisible}
                                        startRegister={this.startRegister}
                                        isLoggedIn={isLoggedIn}
                                        showConModal={this.showConModal}
                                        navigation={this.props.navigation}
                                        setData={this.setData}
                                    />
                                )}
                        </View> */}
                    </ScrollView>
                </SafeAreaView>
            </Container>
        );
    }
}

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#fff',
//         margin: 5
//     },
//     loginContainer: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     header: {
//         flexDirection: 'row',
//         textAlign: 'center',
//         justifyContent: 'space-between',
//         marginBottom: 25
//     },

//     intro: {
//         padding: 10,
//         fontFamily: constants.fontFamily,
//         fontSize: 18
//     },

//     textInput: {
//         borderColor: '#64aab8',
//         borderWidth: 1,
//         borderStyle: 'solid',
//         flex: 2
//     },

//     textInputSmall: {
//         flex: 1
//     },
//     nameInput: {
//         flexDirection: 'row'
//     },
//     button: {
//         margin: 10,
//         padding: 10,
//         backgroundColor: '#508DB3'
//     },

//     tab: {
//         backgroundColor: 'white'
//     },

//     buttonText: {
//         color: 'white'
//     },

//     matchesText: {
//         fontSize: 20,
//         color: '#508DB3',
//         marginBottom: 20
//     }
// });

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
)(EditProfileScreen);


