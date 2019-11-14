import React, { useState, useEffect } from "react";
import {
    Button,
    Image,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
    StyleSheet,
    TextInput,
} from "react-native";
import SwitchToggle from 'react-native-switch-toggle';
import { Feather } from '@expo/vector-icons';
import { getEngagements } from '../../store/actions/connectionData';
import constants from '../../helpers/constants'
import { connect } from 'react-redux';
import { postConnectionDocument } from '../../store/actions/connectionEngagements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';

const AddDocForm = props => {
    const [title, setTitle] = useState('this is the title')
    const [category, setCategory] = useState(3) // 1-Education, 2-Friends, 3-Network, 4-Other, 5-Relatives, 6-Sports
    const [tags, setTags] = useState([])
    const [notes, setNotes] = useState('these are notes')
    const [person, setPerson] = useState(null)
    const [attachment, setAttachment] = useState(null)
    const [isPublic, setIsPublic] = useState(true)

    //set type of engagement
    useEffect(() => {
        setPerson(props.id)
        getPermissionAsync()
    }, [false])

    const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    const _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled) {
            setAttachment(result.uri);
            console.log('attachment', result.uri)
        }
        console.log('result', result)
    };

    return (
        <View style={{width: '100%', height: '100%', justifyContent: 'flex-start', borderRadius: 4}}>
          <View style={{ width: '100%', justifyContent: 'flex-end', marginTop: 20 }}>
            <TouchableOpacity style={{ width: 64, height: 64 }}>
              <Feather
                name="x"
                size={40}
                color="#212529"
                onPress={() => {
                    props.closeForm()
                }}
              />
            </TouchableOpacity>
          </View>

        <View style={{ width: '100%', height: '100%', justifyContent: 'flex-start', backgroundColor: '#DEDEDE'}}>
          <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 4}}>  
            <View 
              style={{minHeight: 24, marginTop: 10, marginBottom: 5, width: '95%', backgroundColor: 'white', borderRadius: 4}}
            >
              <TextInput
                onChangeText={(text) => {
                  setTitle(text)
                }}
                placeholder='TITLE'
                placeholderTextColor={'#000'}
                style={{padding: 4, fontSize: 15}}
                textAlignVertical='top'
                name="title"
                value={title}
              />
            </View>
            
              <View style={{width: '95%'}}>
                <TouchableOpacity
                  onPress={() => {
                    _pickImage()
                  }}
                >
                  <Text>SELECT IMAGE</Text>
                  {attachment ? <Image source={{uri: attachment}} alt={title} style={{width: 150, height: 150}} /> : <AntDesign name="picture" size={125} />}
                </TouchableOpacity>
              </View>
            <View
              style={{ minHeight: 61, marginTop: 5, marginBottom: 10, width: '95%', backgroundColor: 'white', borderRadius: 4}}
            >
              <TextInput
                onChangeText={(text) => {
                  setNotes(text)
                }}
                placeholder='NOTES'
                placeholderTextColor={'#000'}
                style={{ padding: 4, fontSize: 15 }}
                textAlignVertical='top'
                name="notes"
                value={notes}
              /> 
            </View>
              <View style={{ width: '95%', marginTop: 15, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{width: '75%', fontSize: 15}}>{'THIS INFORMATION IS SENSITIVE'}</Text>
                  <View>
                    <SwitchToggle
                      switchOn={!isPublic}
                      backgroundColorOn='#158FB4'
                      backgroundColorOff='#AAA9AD'
                      circleColorOn='#0F6580'
                      circleColorOff='#E5E4E2'
                      containerStyle={{ 
                        width: 49, 
                        height: 20, 
                        borderRadius: 16, 
                        // borderWidth: 0.4, 
                        // borderColor: '#bab5b5', 
                        padding: 0.1
                      }}
                      circleStyle={{ 
                        width: 28, 
                        height: 28, 
                        borderRadius: 15, 
                        // borderWidth: 1.2, 
                        // borderColor: '#bab5b5', 
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 1,
                          height: 3,
                        },
                        shadowOpacity: 0.23,
                        shadowRadius: 2.62,
                      
                        elevation: 4,}}
                      onPress={() => setIsPublic(!isPublic)}
                    />
                  </View>
                </View>
                <View style={{width: '100%'}}>
                  <View style={{width: '100%', alignItems: 'flex-end'}}>
                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={() => {
                        props.postConnectionDocument(props.id, title, category, isPublic, notes, attachment)
                        props.closeForm()
                      }}
                    >
                      <Text style={styles.buttonText}>SAVE</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        width: '95%',
        padding: 4,
        marginTop: 35,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    saveButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 96,
        height: 36,
        backgroundColor: 'lightgray',
        borderRadius: 50,
        borderWidth: 1,
        marginTop: 20,
        backgroundColor: constants.highlightColor,
        borderColor: constants.highlightColor
    },
    buttonText: {
        fontSize: 14,
        color: '#fff',
    }
})

const mapStateToProps = state => {
    const { accessToken } = state.auth
    const { isLoadingDocs } = state.engagements
    return {
        accessToken,
        isLoadingEngagements: state.engagements.isLoadingEngagements,
        engagementsError: state.engagements.engagementsError,
        isLoadingDocs
    }
}

export default connect(
    mapStateToProps, {
    postConnectionDocument,
    getEngagements
})(AddDocForm);