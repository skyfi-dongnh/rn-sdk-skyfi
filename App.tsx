import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@rneui/themed';
import { RootNavigator } from './src/navigation';
import { useInitializeStores } from './src/store';
import { theme } from './src/theme';
import './src/locales/i18n.config'; // Initialize i18n
import { ModalProvider } from './src/components/common';

const App = () => {
  // Initialize stores on app start
  useInitializeStores();

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <RootNavigator />
        <ModalProvider />
      </NavigationContainer>

    </ThemeProvider>
  );
};

export default App;