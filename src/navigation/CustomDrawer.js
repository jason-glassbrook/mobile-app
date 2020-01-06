import React, { useEffect } from 'react';
import {
    TouchableOpacity,
    View,
    Linking,
    Animated
} from 'react-native'
import {Divider} from 'react-native-elements'
import SafeAreaView from 'react-native-safe-area-view';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { logOut, authChecker, clearUserCases } from '../store/actions';
import { connect } from 'react-redux'

const CustomDrawer = (props) => {

    useEffect(() => {
        // if (props.loadingUser) {
          props.authChecker()
        // }
      }, [props.loadingUser])

    return (
    <Animated.View style={[{paddingTop:10}]}>
        <TouchableOpacity 
            style={styles.links}
            onPress={() => props.navigation.navigate('MyAccount')}
        >
            <Text style={styles.text}>My Account</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={styles.links} 
            onPress={() => props.navigation.navigate('About')}
        >
            <Text style={styles.text}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={styles.links} 
            onPress={() => Linking.openURL('https://www.connectourkids.org/contact')}
        >
            <Text style={styles.text}>Support</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={styles.links} 
            onPress={() => Linking.openURL('https://www.connectourkids.org/privacy')}
        >
            <Text style={styles.text}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={styles.links} 
            onPress={() => Linking.openURL('https://www.connectourkids.org/terms')}
        >
            <Text style={styles.text}>Terms of Service</Text>
        </TouchableOpacity>


        {/* // conditional based on whether user is logged in */}
        {props.isLoggedIn && props.idToken ?
        <>
        
            <Divider
            style={{ height: 1, backgroundColor: "lightgray", marginLeft: 15, marginRight: 15 }}
            />
            <TouchableOpacity 
                style={styles.links} 
                onPress={() => {
                    props.logOut()
                    props.clearUserCases()
                }}
            >
                <Text style={styles.text}>Log Out</Text>
            </TouchableOpacity>
        </>
        : null}
    </Animated.View>
    )};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    links: {
        padding: 15,
        color: 'black',
        
    },
    text: {
        color: '#444444', 
        fontSize: 18
    }
});

const mapStateToProps = state => {
    const { 
        user, 
        isLoggedIn, 
        authToken, 
        idToken, 
        loadingUser 
    } = state.auth;

    return { 
        user, 
        isLoggedIn, 
        authToken, 
        idToken, 
        loadingUser 
    };
  };
  
  export default connect(
    mapStateToProps,
    { 
        logOut,
        authChecker,
        clearUserCases
    }
  )(CustomDrawer);
  