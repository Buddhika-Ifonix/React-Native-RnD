// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoachScreen from './src/Screens/CoachList';
import PhoneNumberScreen from './src/Screens/PhoneNumberScreen';
import { QueryClient, QueryClientProvider } from 'react-query'

import OtpScreen from './src/Screens/OtpScreen';
import Registration from './src/Screens/Registration';


const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={PhoneNumberScreen} />
        <Stack.Screen name="otp" component={OtpScreen} />
        <Stack.Screen name="Coach" component={CoachScreen} />
        <Stack.Screen name="Registration" component={Registration} />
      </Stack.Navigator>
     
      </QueryClientProvider>
    </NavigationContainer>
  );
}

export default App;