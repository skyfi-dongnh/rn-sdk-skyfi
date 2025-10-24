import { StackScreenProps } from '@react-navigation/stack';
import { Icon } from '@rneui/themed';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { RootStackParamList } from '../../navigation/types';

type Props = StackScreenProps<RootStackParamList, 'Payment'>;

const PaymentScreen: React.FC<Props> = ({ route, navigation }) => {
  const { url } = route.params;
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);

  const handleNavigationStateChange = (navState: any) => {
    setCanGoBack(navState.canGoBack);
    
    console.log('onUrlChange:', navState.url);
    
    // Handle payment success
    if (navState.url && navState.url.includes('success')) {
      // Parse URL and query parameters
      const url = new URL(navState.url);
      const queryParams = Object.fromEntries(url.searchParams);
      console.log('queryParams:', queryParams);
      
      const orderId = queryParams.orderId;
      // You can store orderId in state or pass to next screen
      navigation.replace('ResultVideoCall', { status: 'success' });
    }
    
    // Handle payment error
    if (navState.url && navState.url.includes('error')) {
      // Parse URL and query parameters
      const url = new URL(navState.url);
      const queryParams = Object.fromEntries(url.searchParams);
      const orderId = queryParams.orderId;
      
      // Navigate to home screen (replace with your home screen name)
      navigation.replace('MainTabs');
    }
    
    // Handle payment cancel - move to home
    if (navState.url && navState.url.includes('cancel')) {
      navigation.replace('MainTabs');
    }
    
    console.log('urlChange -->:', navState.url);
  };

  const handleBackPress = () => {
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="arrow-back"
          type="material"
          size={24}
          onPress={handleBackPress}
          containerStyle={styles.backButton}
        />
      </View>
      
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        style={styles.webview}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={handleNavigationStateChange}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
      />
      
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default PaymentScreen;
