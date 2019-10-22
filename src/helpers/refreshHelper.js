import React, { useEffect } from 'react';
import axios from 'axios';
import NavigationButton from '../UI/NavigationButton'
import AuthSessionCustom from '../helpers/AuthSessionCustom'

const GetRefresh = () => {

    const toQueryString = params => {
        return (
          '?' +
          Object.entries(params)
            .map(
              ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            )
            .join('&')
        );
      };
      
    const refresher = () => {
        // const queryParams2 = toQueryString({
        //   grant_type: 'authorization_code',
        //   client_id: '3dKTXilDyoCV3YP06e90059KI6bPERYQ',
        //   code: 'y9AgmSOKXnB8uQXE',
        //   redirect_uri: 'exp://127.0.0.1:19000/--/expo-auth-session',
        //   });
        
        axios({
            method: 'post',
            url: 'https://connectourkids.auth0.com/oauth/token',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            data: {
                grant_type: 'authorization_code',
                client_id: '3dKTXilDyoCV3YP06e90059KI6bPERYQ',
                code: '9MBS3n1rBTTyn69c',
                redirect_uri: 'exp://127.0.0.1:19000/--/expo-auth-session',
            }
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
      }
         
    return <NavigationButton handlePress={() => refresher()}></NavigationButton>
}

export default GetRefresh;