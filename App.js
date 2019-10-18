import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import * as Font from 'expo-font';
import constants from './src/helpers/constants';
import Navigator from './src/navigation';
import * as LocalAuthentication from 'expo-local-authentication';

export default class App extends Component {
  state = { fontLoaded: false };
  static navigationOptions = {
    contentOptions: {
      activeTintColor: constants.highlightColor,
      itemsContainerStyle: {
        marginVertical: 0
      }
    }
  };

  async componentDidMount() {
    await LocalAuthentication.hasHardwareAsync()
      .then(res => 
        console.log(res),
        await LocalAuthentication.supportedAuthenticationTypesAsync()
          .then(res => 
            console.log(res),
            await LocalAuthentication.isEnrolledAsync()
              .then(res => 
                console.log(res),
                await LocalAuthentication.authenticateAsync({
                  promptMessage: 'Use Touch/Face ID to access the app', 
                  fallbackLabel: 'Use Passcode'
                })
                .then(res => 
                  console.log(res)
                )
                .catch(err => 
                  console.log(err)
                )
              )
              .catch(err => 
                console.log(err)
              )
          )
          .catch(err => 
            console.log(err)
          )
      )
      .catch(err => console.log(err));


    await Font.loadAsync({
      [constants.fontFamily]: require('./assets/fonts/Futura-Light.otf'),
      ['Roboto_medium']: require('./assets/fonts/Roboto_medium.otf')
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return this.state.fontLoaded ? (
      <Provider store={store}>
        <Navigator />
      </Provider>
    ) : null;
  }
}
