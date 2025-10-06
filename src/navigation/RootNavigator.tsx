import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from '../screens/Home/HomeScreen';
import VideoCallScreen from '../screens/Meeting/VideoCallScreen';

const RootStack = createStackNavigator();

export const RootNavigator = () => (
  <RootStack.Navigator initialRouteName="Home">
    <RootStack.Screen
      component={HomeScreen}
      name="Home"
      options={{
        headerShown: false,
      }}
    />
    <RootStack.Screen
      component={VideoCallScreen}
      name="Meeting"
      options={{
        headerShown: false,
      }}
    />
  </RootStack.Navigator>
);
