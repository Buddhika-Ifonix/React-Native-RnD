
import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
// @ts-ignore
import {BASE_URL} from '@env';


export const getCoaches = async () => {
  const userData:any = await AsyncStorage.getItem('userData')
  const jsonData = JSON.parse(userData)

  console.log(jsonData)

  const config = {
    headers: {
      Authorization: `Bearer ${jsonData.token}`,
    },
  }

  const {data} = await axios.get(`${BASE_URL}/api/coaches`, config);

  console.log(data)
  return data;
};
