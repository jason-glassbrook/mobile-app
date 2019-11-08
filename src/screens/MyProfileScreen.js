import React, { useState, useEffect } from 'react';
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
    getInfo,
    getUserProfile
} from '../store/actions';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/Messages/ErrorMessage';
import authHelpers from '../helpers/authHelpers';
import headerConfig from '../helpers/headerConfig';
import constants from '../helpers/constants';

const MyProfile = ({ props }) => {
    const [profile, setProfile] = useState([]);
    useEffect(() => {
        if (profile) {
            setProfile([...profile]);
        }
    }, []);


    return (
        <View>
            <ListItem
                title={profile.full_name}
                titleStyle={{ fontSize: 18 }}
                subtitle={
                    <View>
                        {profile.telephone ?
                            <TouchableOpacity
                                onPress={() => Linking.openURL(`tel:${profile.telephone}`)}
                            >
                                <Text style={{ color: '#434245' }}>
                                    {formatTelephone(profile.telephone)}
                                </Text>
                            </TouchableOpacity>
                            : null}
                        {profile.email ?
                            <TouchableOpacity
                                onPress={() => Linking.openURL(`mailto:${profile.email}`)}
                            >
                                <Text style={{ color: '#434245' }}>
                                    {profile.email}
                                </Text>
                            </TouchableOpacity>
                            : null}
                        {profile.address && profile.address.formatted ? <Text style={{ color: '#434245' }}>{profile.address.formatted}</Text> : null}
                    </View>
                }
                leftAvatar={{
                    size: "large",
                    source: {
                        uri:
                            profile.picture ||
                            "https://www.trzcacak.rs/myfile/full/214-2143533_default-avatar-comments-default-avatar-icon-png.png"
                    }
                }}
            />
        </View>
    )
}
{/* {profile.map(({ response.data }, i) => ()
            
{values.userProfile.map(userProfile => console.log("each user", user))}
{users
  ? users.map(user => (
      <p key={user.id} className="users">
       {user.name} */}


const mapStateToProps = state => {
    // console.log(state);
    const { error, isLoading } = state.profile;
    return {
        isFetching,
        error
    };
};

export default connect(
    mapStateToProps,
    {
        getUserProfile
    }
)(MyProfileScreen);
