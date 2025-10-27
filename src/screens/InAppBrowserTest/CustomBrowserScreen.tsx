import React, { useRef, useState } from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { WebView } from 'react-native-webview';

interface CustomBrowserScreenProps {
    route: {
        params: {
            url: string;
        };
    };
    navigation: any;
}

const CustomBrowserScreen: React.FC<CustomBrowserScreenProps> = ({ route, navigation }) => {
    const { url } = route.params;
    const webViewRef = useRef<WebView>(null);
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentUrl, setCurrentUrl] = useState(url);

    const handleBack = () => {
        if (canGoBack && webViewRef.current) {
            webViewRef.current.goBack();
        }
    };

    const handleForward = () => {
        if (canGoForward && webViewRef.current) {
            webViewRef.current.goForward();
        }
    };

    const handleReload = () => {
        if (webViewRef.current) {
            webViewRef.current.reload();
        }
    };

    const handleClose = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Custom Top Bar - Completely customizable */}
            <View style={styles.topBar}>
                <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={handleClose}
                >
                    <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
                
                <View style={styles.urlContainer}>
                    <Text style={styles.urlText} numberOfLines={1}>
                        {currentUrl}
                    </Text>
                </View>

                <TouchableOpacity 
                    style={styles.reloadButton}
                    onPress={handleReload}
                >
                    <Text style={styles.reloadButtonText}>⟳</Text>
                </TouchableOpacity>
            </View>

            {/* WebView - Full screen with no browser chrome */}
            <WebView
                ref={webViewRef}
                source={{ uri: url }}
                style={styles.webview}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
                onNavigationStateChange={(navState) => {
                    setCanGoBack(navState.canGoBack);
                    setCanGoForward(navState.canGoForward);
                    setCurrentUrl(navState.url);
                }}
                mediaPlaybackRequiresUserAction={false}
                allowsInlineMediaPlayback={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                renderLoading={() => (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#453AA4" />
                    </View>
                )}
            />

            {/* Custom Bottom Navigation Bar - Optional, fully customizable */}
            <View style={styles.bottomBar}>
                <TouchableOpacity 
                    style={[styles.navButton, !canGoBack && styles.navButtonDisabled]}
                    onPress={handleBack}
                    disabled={!canGoBack}
                >
                    <Text style={[styles.navButtonText, !canGoBack && styles.navButtonTextDisabled]}>
                        ◄
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.navButton, !canGoForward && styles.navButtonDisabled]}
                    onPress={handleForward}
                    disabled={!canGoForward}
                >
                    <Text style={[styles.navButtonText, !canGoForward && styles.navButtonTextDisabled]}>
                        ►
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.navButton}
                    onPress={handleReload}
                >
                    <Text style={styles.navButtonText}>⟳</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.navButton}
                    onPress={handleClose}
                >
                    <Text style={styles.navButtonText}>Done</Text>
                </TouchableOpacity>
            </View>

            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#453AA4" />
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    closeButton: {
        padding: 8,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '300',
    },
    urlContainer: {
        flex: 1,
        backgroundColor: '#2a2a2a',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        marginHorizontal: 12,
    },
    urlText: {
        color: '#999',
        fontSize: 12,
    },
    reloadButton: {
        padding: 8,
    },
    reloadButtonText: {
        color: '#fff',
        fontSize: 24,
    },
    webview: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bottomBar: {
        flexDirection: 'row',
        backgroundColor: '#1a1a1a',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: '#333',
        justifyContent: 'space-around',
    },
    navButton: {
        paddingHorizontal: 20,
        paddingVertical: 8,
    },
    navButtonDisabled: {
        opacity: 0.3,
    },
    navButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
    },
    navButtonTextDisabled: {
        color: '#666',
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
});

export default CustomBrowserScreen;
