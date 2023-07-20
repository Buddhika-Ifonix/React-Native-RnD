import {useEffect, useState} from 'react';

import {Button, View, TextInput, TouchableOpacity, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styled from 'styled-components';
import {useMutation, useQueryClient} from 'react-query';
import {login} from '../actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ScreenProps = {
  navigation: any;
};

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
`;

const Input = styled(TextInput)`
  height: 50px;
  width: 80%;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  color: black;
  margin-bottom: 20px;
`;

const Buttongo = styled(TouchableOpacity)`
  height: 50px;
  width: 80%;
  border-radius: 10px;
  background-color: #4b9ce2;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;

const Header = styled(View)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled(Text)`
  font-size: 20px;
  font-weight: 500;
  color: #333;
`;

const PhoneNumberScreen = ({navigation}: ScreenProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [userinfo , setuserInfo] = useState(null)


  const queryClient = useQueryClient();

  const loginMutaion = useMutation(login, {
    onSuccess: (data: any) => {
      queryClient.setQueryData('login', data);
      navigation.navigate('otp');
      
    },

    onError: error => {
      console.log(error);
    },
  });
 
  const fetchInfo = async ()=> {
    const userData:any = await AsyncStorage.getItem('@storage_Key')
    const jsonData = JSON.parse(userData)
    if(jsonData){
      setuserInfo(jsonData.token)
    }
    
  }


  const boom = () => {
    if (inputValue) {
      loginMutaion.mutate(inputValue);
    }
  };
  useEffect(() => {
    if(userinfo){
      navigation.navigate('Coach');
    }
    fetchInfo()
  }, [userinfo])
  


  return (
    <Container>
      <Header>
        <Title>Hello World!</Title>
      </Header>
      <Input
        placeholder="Enter your phone number"
        placeholderTextColor="#999"
        onChangeText={value => setInputValue(value)}
      />
      <Buttongo onPress={boom}>
        <ButtonText>Submit</ButtonText>
      </Buttongo>
    </Container>
  );
};

export default PhoneNumberScreen;
