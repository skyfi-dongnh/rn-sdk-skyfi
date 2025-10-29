import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNInBrowserApp from 'react-native-in-browser';

const InAppBrowserTestScreen = () => {
    const navigation = useNavigation<any>();
    const [status, setStatus] = useState<string>('Checking availability...');
    const [lastUrl, setLastUrl] = useState<string>('');
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

    useEffect(() => {
        checkAvailability();
    }, []);

    const checkAvailability = async () => {
        try {
            console.log('RNInBrowserApp module:', RNInBrowserApp);

            if (!RNInBrowserApp || !RNInBrowserApp.open) {
                setStatus('Error: RNInBrowserApp module is not available');
                setIsAvailable(false);
                return;
            }

            setIsAvailable(true);
            setStatus('Ready to test - RNInBrowserApp is available');
        } catch (error: any) {
            console.error('Availability check error:', error);
            setStatus(`Availability check failed: ${error.message}`);
            setIsAvailable(false);
        }
    };

    const openLink = async (url: string, customOptions?: any) => {
        try {
            setStatus('Opening browser...');
            setLastUrl(url);

            const options = {
                showCloseButton: true,
                ...customOptions,
            };

            const result = await RNInBrowserApp.open(url, options);
            console.log('Browser result:', result);

            setStatus(`Browser closed - ${result.type}`);
        } catch (error: any) {
            setStatus(`Error: ${error.message}`);
            Alert.alert('Error', error.message);
            console.error('RNInBrowserApp Error:', error);
        }
    };

    const openJitsiMeetingLink = () => {
        // Example Jitsi meeting link
        const jitsiUrl = 'https://meet.jit.si/leung19021999@';
        openLink(jitsiUrl);
    };

    const openJitsiDemoLink = () => {
        const jitsiUrl = 'https://jitsi.org/';
        openLink(jitsiUrl);
    };

    const openCustomJitsiLink = () => {
        Alert.prompt(
            'Enter Jitsi URL',
            'Enter the full Jitsi meeting URL',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Open',
                    onPress: (url) => {
                        if (url) {
                            openLink(url);
                        }
                    },
                },
            ],
            'plain-text',
            'https://meet.jit.si/'
        );
    };

    const openWithCustomOptions = () => {
        const jitsiUrl = 'https://meet.jit.si/YourTestMeetingRoom456';
        openLink(jitsiUrl, {
            showCloseButton: false, // Hide close button
        });
    };

    const openInCustomBrowser = () => {
        const jitsiUrl = 'https://meet.jit.si/leung';
        navigation.navigate('CustomBrowser', { url: jitsiUrl });
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.title}>RNInBrowserApp Test</Text>
                    <Text style={styles.subtitle}>
                        Test native RNInBrowserApp module with Jitsi links
                    </Text>
                </View>

                <View style={styles.statusContainer}>
                    <Text style={styles.statusLabel}>Status:</Text>
                    <Text style={styles.statusText}>{status}</Text>
                    {isAvailable !== null && (
                        <View style={[styles.availabilityBadge, isAvailable ? styles.availableBadge : styles.unavailableBadge]}>
                            <Text style={styles.badgeText}>
                                {isAvailable ? '✓ Available' : '✗ Not Available'}
                            </Text>
                        </View>
                    )}
                    {lastUrl ? (
                        <View style={styles.urlContainer}>
                            <Text style={styles.urlLabel}>Last URL:</Text>
                            <Text style={styles.urlText} numberOfLines={2}>
                                {lastUrl}
                            </Text>
                        </View>
                    ) : null}
                    <TouchableOpacity
                        style={styles.recheckButton}
                        onPress={checkAvailability}
                    >
                        <Text style={styles.recheckButtonText}>Recheck Availability</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.primaryButton]}
                        onPress={openJitsiMeetingLink}
                    >
                        <Text style={styles.buttonText}>
                            Open Jitsi Test Meeting
                        </Text>
                        <Text style={styles.buttonSubtext}>
                            meet.jit.si/YourTestMeetingRoom123
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.secondaryButton]}
                        onPress={openJitsiDemoLink}
                    >
                        <Text style={styles.buttonText}>Open Jitsi.org</Text>
                        <Text style={styles.buttonSubtext}>
                            Official Jitsi website
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.tertiaryButton]}
                        onPress={openCustomJitsiLink}
                    >
                        <Text style={styles.buttonText}>Open Custom URL</Text>
                        <Text style={styles.buttonSubtext}>
                            Enter your own Jitsi URL
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.quaternaryButton]}
                        onPress={openWithCustomOptions}
                    >
                        <Text style={styles.buttonText}>
                            Open Without Close Button
                        </Text>
                        <Text style={styles.buttonSubtext}>
                            Test without close button
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.customBrowserButton]}
                        onPress={openInCustomBrowser}
                    >
                        <Text style={styles.buttonText}>
                            🎨 Open in Custom WebView Browser
                        </Text>
                        <Text style={styles.buttonSubtext}>
                            Fully customizable UI - No toolbars!
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>About This Test</Text>
                    <Text style={styles.infoText}>
                        This screen demonstrates the native RNInBrowserApp module
                        by opening Jitsi meeting links in an in-app browser.
                    </Text>
                    <Text style={styles.infoText}>
                        Features tested:
                    </Text>
                    <Text style={styles.infoListItem}>
                        • Opening URLs in native WebView
                    </Text>
                    <Text style={styles.infoListItem}>
                        • Full-screen presentation
                    </Text>
                    <Text style={styles.infoListItem}>
                        • Close button toggle
                    </Text>
                    <Text style={styles.infoListItem}>
                        • Jitsi meeting compatibility
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContent: {
        padding: 20,
    },
    header: {
        marginBottom: 24,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    statusContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statusLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        marginBottom: 4,
    },
    statusText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    urlContainer: {
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    urlLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        marginBottom: 4,
    },
    urlText: {
        fontSize: 12,
        color: '#1a73e8',
    },
    availabilityBadge: {
        marginTop: 12,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    availableBadge: {
        backgroundColor: '#34A853',
    },
    unavailableBadge: {
        backgroundColor: '#EA4335',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    recheckButton: {
        marginTop: 12,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#453AA4',
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    recheckButtonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
    buttonsContainer: {
        gap: 12,
        marginBottom: 24,
    },
    button: {
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    primaryButton: {
        backgroundColor: '#453AA4',
    },
    secondaryButton: {
        backgroundColor: '#1a73e8',
    },
    tertiaryButton: {
        backgroundColor: '#34A853',
    },
    quaternaryButton: {
        backgroundColor: '#EA4335',
    },
    customBrowserButton: {
        backgroundColor: '#9C27B0',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 4,
    },
    buttonSubtext: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 12,
        textAlign: 'center',
    },
    infoContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    infoText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        lineHeight: 20,
    },
    infoListItem: {
        fontSize: 14,
        color: '#666',
        marginLeft: 8,
        marginBottom: 4,
        lineHeight: 20,
    },
});

export default InAppBrowserTestScreen;
