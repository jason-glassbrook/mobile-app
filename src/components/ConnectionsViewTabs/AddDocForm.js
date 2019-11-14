import React, { useState, useEffect } from "react";
import {
    Button,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
    StyleSheet,
    TextInput,
} from "react-native";
import ToggleSwitch from 'react-native-switch-toggle';
import { Feather } from '@expo/vector-icons';
import { getEngagements } from '../../store/actions/connectionData';
import constants from '../../helpers/constants'
import { connect } from 'react-redux';
import { postConnectionDocument } from '../../store/actions/connectionEngagements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

const AddDocForm = props => {
    // const [dataType, setDataType] = useState('D') 
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
        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
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

            <View>
                <TouchableOpacity
                    // title='SELECT IMAGE'
                    onPress={() => {
                        _pickImage()
                    }}
                >
                    <Text>SELECT IMAGE</Text>
                </TouchableOpacity>
                {attachment ? <Text>{attachment}</Text> : null}
                <View style={{ width: '100%', marginTop: 15, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <View style={{ flexDirection: 'row' }}>
                        {/* <Text style={{width: '75%', fontSize: 15}}>{`THIS INFORMATION IS SENSITIVE\n(2FA REQUIRED TO VIEW)`}</Text> */}
                        <ToggleSwitch
                            switchOn={!isPublic}
                            circleColorOn={constants.highlightColor}
                            size="medium"
                            onPress={() => setIsPublic(!isPublic)}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={() => {
                            // console.log('the id is referring to', props.id)
                            props.postConnectionDocument(props.id, title, category, isPublic, notes, attachment)
                            props.closeForm()
                            props.getEngagements(props.id)
                        }}
                    >
                        <Text style={styles.buttonText}>SAVE DOCUMENT</Text>
                    </TouchableOpacity>
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
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderWidth: 1,
        marginTop: 20,
        backgroundColor: constants.highlightColor,
        borderColor: constants.highlightColor
    },
    buttonText: {
        fontSize: 24,
        textTransform: 'uppercase',
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