import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { makeStyles } from '@rneui/themed';
import * as React from 'react';
import { Dimensions, Image, SafeAreaView, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type { RootStackParamList } from '../../navigation/types';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const { width: screenWidth } = Dimensions.get('window');

const WaitingVideoCallScreen = ({ onStopCall }: { onStopCall: () => void }) => {
    const styles = useStyles();
    const navigation = useNavigation<NavigationProp>();

    const handleEndCall = () => {
        console.log('Ending call...');
        onStopCall()
        // navigation.goBack();
    };

    return (
        <LinearGradient
            colors={['#811A19', '#ED1B2F']}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.content}>
                    {/* Logo */}
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../assets/images/logo_skyfi_yellow.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>

                    {/* End Call Button */}
                    <TouchableOpacity
                        style={styles.endCallButton}
                        onPress={handleEndCall}
                        activeOpacity={0.8}
                    >
                        <View style={styles.endCallIcon} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default WaitingVideoCallScreen;

const useStyles = makeStyles(() => ({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 60,
    },
    logo: {
        width: screenWidth * 0.5,
        height: screenWidth * 0.3,
    },
    endCallButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    endCallIcon: {
        width: 28,
        height: 28,
        backgroundColor: '#ED1B2F',
        borderRadius: 14,
        transform: [{ rotate: '135deg' }],
    },
}));
