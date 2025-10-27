import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { ModalExamples } from '../components/common/ModalExamples';
import DoubleCheckInfoScreen from '../screens/ActiveSimFlow/DoubleCheckInfoScreen';
import InputInfoSimScreen from '../screens/ActiveSimFlow/InputInfoSimScreen';
import ShareInfoScreen from '../screens/ActiveSimFlow/ShareInfoScreen';
import SignTheContractScreen from '../screens/ActiveSimFlow/SignTheContractScreen';
import BottomTabNavigator from '../screens/BottomTabBar';
import CheckoutScreen from '../screens/checkout/checkout';
import PaymentScreen from '../screens/checkout/Payment';
import CustomBrowserScreen from '../screens/InAppBrowserTest/CustomBrowserScreen';
import InAppBrowserTestScreen from '../screens/InAppBrowserTest/InAppBrowserTestScreen';
import ResultVideoCall from '../screens/Meeting/ResultVideoCall';
import VideoCallScreen from '../screens/Meeting/VideoCallScreen';
import SimDataScreen from '../screens/simData/SimData';

const RootStack = createStackNavigator();

export const RootNavigator = () => (
  <RootStack.Navigator id={undefined} initialRouteName="MainTabs">
      <RootStack.Screen
        component={BottomTabNavigator}
        name="MainTabs"
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
      <RootStack.Screen
        component={ResultVideoCall}
        name="ResultVideoCall"
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen
        component={SimDataScreen}
        name="SimData"
        options={{
          headerShown: false,
        }}
    />
    <RootStack.Screen
        component={CheckoutScreen}
        name="Checkout"
        options={{
            headerShown: false,
        }}
    />
    <RootStack.Screen
        component={PaymentScreen}
        name="Payment"
        options={{
            headerShown: false,
        }}
    />
    <RootStack.Screen
        component={InAppBrowserTestScreen}
        name="InAppBrowserTest"
        options={{
            headerShown: false,
        }}
    />
    <RootStack.Screen
        component={CustomBrowserScreen}
        name="CustomBrowser"
        options={{
            headerShown: false,
            presentation: 'modal',
        }}
    />

    </RootStack.Navigator>
);
