import React from 'react';
import { View, Text, StyleSheet, Linking, ScrollView } from 'react-native';
import { Button } from 'native-base';
import { Avatar } from 'react-native-elements';
import constants from '../../helpers/constants';
import { sendEvent } from '../../helpers/createEvent';
import NavigationButton from '../../UI/NavigationButton';
import ScreenContainer from '../../UI/ScreenContainer';
import MainText from '../../UI/MainText';

const Login = props => {
  return (
    <ScreenContainer style={{ padding: 10 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {props.idToken && props.idToken.picture ?
          <Avatar
            rounded
            size="large"
            source={{
              uri: props.idToken.picture
            }}
          /> : null}
      </View>
      {/* <Button title='log' onPress={() => { console.log('Login props.idToken', props.idToken) }} /> */}
      <MainText >
        {props.isLoggedIn && props.idToken && props.idToken.email
          ? 'Welcome back ' + props.idToken.email + '!'
          : 'Welcome to Connect Our Kids!'}
      </MainText>
      <ScrollView >
        <Text>
          {props.isLoggedIn && props.idToken && props.idToken.given_name
            ? 'First Name: ' + props.idToken.given_name
            : null}
        </Text>
        <Text>
          {props.isLoggedIn && props.idToken && props.idToken.family_name
            ? 'Last Name: ' + props.idToken.family_name
            : null}
        </Text>
        <Text>
          {props.isLoggedIn && props.idToken && props.idToken.nickname
            ? 'Username: ' + props.idToken.nickname
            : null}
        </Text>
        <Text>
          {props.isLoggedIn && props.idToken && props.idToken.name
            ? 'Email: ' + props.idToken.name
            : null}
        </Text>
      </ScrollView>
      <View style={styles.linkContainer}>
        <View style={styles.logInBtns}>
          {props.isLoggedIn ? (
            <View style={{ width: '100%' }}>
              <Button
                style={[styles.button, { backgroundColor: 'red' }]}
                onPress={() => {
                  props.idToken && props.idToken.email ? props.logOut(props.idToken.email) : props.logOut()
                  props.clearUserCases()
                }}
                block
              >
                <Text style={styles.logOutText}>Log Out</Text>
              </Button>
            </View>
          ) : (
              <View style={styles.logInBtns}>
                <Button style={styles.buttonStyle} block onPress={props.onLogin}>
                  <Text style={styles.btnText}>Login </Text>
                </Button>
                <Button
                  style={styles.buttonStyle}
                  block
                  onPress={() => {
                    props.setModalVisible(true);
                    sendEvent(null, 'click', 'sign-up');
                  }}
                >
                  <Text style={styles.btnText}>Sign Up</Text>
                </Button>
              </View>
            )}
        </View>
        {/* <View>
          <NavigationButton
            titleText="Resources"
            subTitleText="Useful Materials and Information"
            handlePress={() => Linking.openURL('https://connectourkids.org')}
            style={{ marginBottom: 20 }}
          />
        </View> */}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  logInBtns: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly'
  },
  logOutText: {
    color: '#fff'
  },
  linkContainer: {
    justifyContent: 'space-between',
    flex: 1
  },
  buttonStyle: {
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: constants.highlightColor
  },
  btnText: {
    color: '#fff'
  },
  button: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 10
  },
  text: {
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
});

export default Login;
