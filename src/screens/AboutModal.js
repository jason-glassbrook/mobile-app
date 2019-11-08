import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, Alert, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import constants from '../helpers/constants'
// import ScreenContainer from '../UI/ScreenContainer'
import MainText from '../UI/MainText'
import Video from '../components/Video/Video';
import { Feather } from '@expo/vector-icons'


class AboutModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
    };
  }


  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  componentDidMount() {
    setTimeout(() => { this.setModalVisible(true) }, 5000)
  }
  render() {
    return (
      <View style={styles.outerContainer}>
        <Modal
          animationType="fade"
          transparent={true}
          style={{
            borderWidth: 1,
            borderColor: 'black',
          }}
          visible={this.state.modalVisible}
        >
          <View style={styles.container}>
            <View style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row' }}>
              <TouchableHighlight >
                <Feather
                  name="x"
                  size={40}
                  color="#212529"
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                />
              </TouchableHighlight>
            </View>
            <View>
              <SafeAreaView>
                <StatusBar barStyle="dark-content" />
                {/* <ScrollView> */}
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
                  resources in this app.
                  </Text>
                <Video uri={constants.aboutURI} />
                {/* </ScrollView> */}
              </SafeAreaView>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    borderWidth: .5,
    borderColor: 'black'
  },
  outerContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
});

export default AboutModal;