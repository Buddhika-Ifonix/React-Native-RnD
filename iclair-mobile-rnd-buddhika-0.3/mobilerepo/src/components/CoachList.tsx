import {Button, Image, ScrollView, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React from 'react';
import { useQuery } from 'react-query';
import { getCoaches } from '../actions/coachActions';


interface coach {
    id: number,
    name: string,
    online: boolean,
    imageUrl: string,
}

import io from 'socket.io-client';


const socket = io("http://localhost:8000");


const CoachList = () => {
  
  const {
    isLoading,
    isError,
    error,
    data: coaches,
  } = useQuery( 'coaches', getCoaches)

if(isLoading){
  return (
    <View>
      <Text>Loading.......</Text>
    </View>
  )
}

if(isError){
  return (
    <View>
      <Text>Err, Something went wrong.......</Text>
    </View>
  )
}


const handShake = () => {

  console.log('Boom, boom, boom Even brighter than the moon, moon, moon')

  socket.emit("chat", 'world');
}
  return (
    <View>
      <Text style={styles.headingText}>Coaches</Text>
      <ScrollView style={styles.container} scrollEnabled={false}>
        {coaches?.map((item: coach) => (
          <View key={item.id} style={styles.userCard}>
            <Image
              source={{
                uri: item.imageUrl,
              }}
              style={styles.userImage}
            />
            <View>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userStatus}>{item.online && 'Online'}</Text>
            </View>
          </View>
        ))}
       
      </ScrollView>
      <TouchableOpacity onPress={handShake}><Text>Boom</Text></TouchableOpacity>
    </View>
  );
};

export default CoachList;

const styles = StyleSheet.create({
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    color: 'black'
  },
  container: {
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  userCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
    backgroundColor: '#8D3DAF',
    padding: 8,
    borderRadius: 10,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 14,

  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff'
  },
  userStatus: {
    fontSize: 14,
    fontWeight: '600',
    color: '#13d1b1'
  },
});
