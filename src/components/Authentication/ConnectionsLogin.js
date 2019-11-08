import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { Button } from 'native-base';
import constants from '../../helpers/constants';
import { sendEvent } from '../../helpers/createEvent';
import NavigationButton from '../../UI/NavigationButton';
import MainText from '../../UI/MainText';
import authHelpers from '../../helpers/authHelpers';


const ConnectionsLogin = (props) => {

  return (
    <View style={styles.linkContainer}>
      <View style={styles.logInBtns}>
        <Button
          style={styles.buttonStyle} 
          block 
          onPress={() =>
            authHelpers.handleLogin(
              authHelpers._loginWithAuth0,
              props.setUserCreds
            )}>
          <Text style={styles.btnText}>Login</Text>
        </Button>
        <Button
          style={styles.buttonStyle}
          block
          onPress={() => {
            props.setModalVisible(true); {/* {props.setModalVisible} */}
            sendEvent(null, 'click', 'sign-up');
          }}
        ><Text style={styles.btnText}>Sign Up</Text>
        </Button>
      </View>
    </View>
  )}

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
    }
  });


export default ConnectionsLogin;