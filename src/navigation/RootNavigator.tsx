import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from '../screens/Home/HomeScreen';
import VideoCallScreen from '../screens/Meeting/VideoCallScreen';
import ShareInfoScreen from '../screens/ActiveSimFlow/ShareInfoScreen';
import InputInfoSimScreen from '../screens/ActiveSimFlow/InputInfoSimScreen';
import DoubleCheckInfoScreen from '../screens/ActiveSimFlow/DoubleCheckInfoScreen';
import SignTheContractScreen from '../screens/ActiveSimFlow/SignTheContractScreen';

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
      component={ShareInfoScreen}
      name="ShareInfo"
      options={{
        headerShown: false,
      }}
    />
    <RootStack.Screen
      component={InputInfoSimScreen}
      name="InputInfoSim"
      options={{
        headerShown: false,
      }}
    />
    <RootStack.Screen
      component={DoubleCheckInfoScreen}
      name="DoubleCheckInfo"
      options={{
        headerShown: false,
      }}
    />
    <RootStack.Screen
      component={SignTheContractScreen}
      name="SignTheContract"
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
