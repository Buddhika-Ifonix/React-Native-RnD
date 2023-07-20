import {useState} from 'react';

import {
  Button,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import styled from 'styled-components';
import {useMutation, useQueryClient} from 'react-query';
import {login, verify} from '../actions/userActions';

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

type ScreenProps = {
  navigation: any;
};

interface LoginData {
  _id: string;
  otp: string;
  phone: string;
  token: string;
}

const OtpScreen = ({navigation}: ScreenProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  const queryClient = useQueryClient();
  let cachedData: LoginData = queryClient.getQueryData('login')!;

  const loginMutaion = useMutation(verify, {
    onSuccess: (data: any) => {
      queryClient.setQueryData('token', data);
      if (data.user) {
        navigation.navigate('Coach');
      } else {
        navigation.navigate('Registration');
      }
    },

    onError: error => {
      console.log(error);
    },
  });

  const resetInput = () => {
    setInputValue('');
  };

  const boom = () => {
    if (inputValue === cachedData.otp) {
      loginMutaion.mutate(inputValue);
    } else {
      Alert.alert('Invalid OTP!', 'Please double check your OTP', [
        {text: 'Okay', style: 'destructive', onPress: resetInput},
      ]);
    }
  };

  return (
    <Container>
      <Header>
        <Title>Your OTP code is {cachedData.otp}</Title>
      </Header>

      <Input
        placeholder="Enter OTP Here"
        placeholderTextColor="#999"
        onChangeText={value => setInputValue(value)}
      />
      <Buttongo onPress={boom}>
        <ButtonText>Submit</ButtonText>
      </Buttongo>
    </Container>
  );
};

export default OtpScreen;
