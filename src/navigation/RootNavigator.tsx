import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';


import { ModalExamples } from '../components/common/ModalExamples';
import DoubleCheckInfoScreen from '../screens/ActiveSimFlow/DoubleCheckInfoScreen';
import InputInfoSimScreen from '../screens/ActiveSimFlow/InputInfoSimScreen';
import ShareInfoScreen from '../screens/ActiveSimFlow/ShareInfoScreen';
import SignTheContractScreen from '../screens/ActiveSimFlow/SignTheContractScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import VideoCallScreen from '../screens/Meeting/VideoCallScreen';

const RootStack = createStackNavigator();

export const RootNavigator = () => (
  <RootStack.Navigator id={undefined} initialRouteName="Home">
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
    <RootStack.Screen
      component={ModalExamples}
      name="ModalExamples"
      options={{
        headerShown: false,
      }}
    />
    {/* StartVideoCallScreen */}
    <RootStack.Screen
      component={require('../screens/Meeting/StartVideoCallScreen').default}
      name="StartVideoCall"
      options={{
        headerShown: false,
      }}
    />

  </RootStack.Navigator>
);
