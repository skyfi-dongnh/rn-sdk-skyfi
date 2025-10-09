import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@rneui/themed';
import React from 'react';
import { ModalProvider } from './src/components/common';
import { LoadingProvider } from './src/components/common/loading';
import './src/locales/i18n.config'; // Initialize i18n
import { RootNavigator } from './src/navigation';
import { useInitializeStores } from './src/store';
import { theme } from './src/theme';

const App = () => {
  // Initialize stores on app start
  useInitializeStores();

  return (
    <ThemeProvider theme={theme}>
      <LoadingProvider>
        <NavigationContainer>
          <RootNavigator />
          <ModalProvider />
        </NavigationContainer>
      </LoadingProvider>
    </ThemeProvider>
  );
};

export default App;