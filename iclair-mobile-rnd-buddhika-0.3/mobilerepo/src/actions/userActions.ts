import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
// @ts-ignore
import {BASE_URL} from '@env';

const API_URL = BASE_URL;

export const login = async (phone: String) => {

  const sent = {
    phone: phone,
  };

  const {data} = await axios.post(`${BASE_URL}/api/users/auth`, sent);

  const jsonValue = JSON.stringify(data)
  await AsyncStorage.setItem('otpData', jsonValue)

  return data;
};

export const verify = async (cont: String) => {
  const userData:any = await AsyncStorage.getItem('otpData')
  const jsonData = JSON.parse(userData)

  const sent = {
    otp: cont,
    phone: jsonData.phone
  };

  const {data} = await axios.post(`${BASE_URL}/api/users/verify`, sent);

 const jsonValue = JSON.stringify(data)
  await AsyncStorage.setItem('userData', jsonValue)

  return data;
};


