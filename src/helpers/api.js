import React from 'react';
import axios from 'axios';
import { Request } from '../utils/Interfaces';
import { Alert } from 'react-native';

export async function api(request: Request) {
  let baseUrl = 'https://simple-contact-crud.herokuapp.com';
  try {
    let res = await axios.request({
      method: request.method,
      url: baseUrl + request.endpoint,
      param: request.params,
      data: request.data,
      timeout: 30000,
    });
    if (res.status === 200) {
      let jsonResponse;
      jsonResponse = res.data;
      return jsonResponse;
    } else {
      console.log('error');
    }
  } catch (e) {
    Alert.alert(e.code, e.message.toString(), [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  }
}
