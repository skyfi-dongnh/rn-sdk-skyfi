import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from './screens/HomeScreen';
import VideoCallScreen from './screens/VideoCallScreen';

const RootStack = createStackNavigator();

const App = () => (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen
          component = { HomeScreen }
          name = "Home"
          options = {{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          component = { VideoCallScreen }
          name = "Meeting"
          options = {{
            headerShown: false,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
);

export default App;