import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/navigation';
import { useInitializeStores } from './src/store';
import './src/locales/i18n.config'; // Initialize i18n

const App = () => {
  // Initialize stores on app start
  useInitializeStores();

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;