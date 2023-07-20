import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';

import CoachList from '../components/CoachList';
import { useQuery, useQueryClient } from 'react-query';
import { getCoaches } from '../actions/coachActions';

const Card = () => {



  return (
    <SafeAreaView>
      <ScrollView>
      <CoachList/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Card;