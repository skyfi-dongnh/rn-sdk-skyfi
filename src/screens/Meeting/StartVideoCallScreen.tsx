import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Button, makeStyles, Text, Image } from '@rneui/themed';
import * as React from 'react';
import { Dimensions, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import type { RootStackParamList } from '../../navigation/types';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const { width: screenWidth } = Dimensions.get('window');

const StartVideoCallScreen = ({ onPressStart, onPressHome }: { onPressStart: () => void, onPressHome: () => void }) => {
    const styles = useStyles();
    const navigation = useNavigation<NavigationProp>();

    const handleStartVideoCall = () => {
        console.log('Starting video call...');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <View style={styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Hướng dẫn video call</Text>
                </View>

                {/* Main Content */}
                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <View style={styles.mainContent}>
                        {/* Video Call Preview/Illustration */}
                        <View style={styles.previewContainer}>
                            <View style={styles.previewImage}>
                                <Image
                                    resizeMode="contain"
                                    source={require('../../assets/images/phone-illustration.png')}
                                    style={{
                                        width: screenWidth * 0.7,
                                        height: (screenWidth * 0.6 * 160) / 120,
                                    }}
                                />
                            </View>
                        </View>

                        {/* Instructions */}
                        <View style={styles.instructionsContainer}>
                            <Text style={styles.instructionsTitle}>
                                Hướng dẫn thực hiện cuộc gọi Video
                            </Text>

                            <Text style={styles.instructionsSubtitle}>
                                Thiết bị đang sử dụng có CAMERA ĐƯỢC CẤP QUYỀN
                            </Text>

                            <Text style={styles.instructionsBody}>
                                Theo quy định của Bộ Thông tin truyền thông, để hoàn tất thủ tục đăng ký/cập nhật thông tin thuê bao, Bạn vui lòng thực hiện cuộc Video với tổng đài viên.
                            </Text>

                            <Text style={styles.noteText}>
                                *Lưu ý: cấp quyền truy cập CAMERA cho thiết bị
                            </Text>
                        </View>
                    </View>
                </ScrollView>

                {/* Bottom Button */}
                <View style={styles.bottomContainer}>
                    <Button
                        title="Bắt đầu cuộc gọi Video"
                        onPress={() => onPressStart()}
                        containerStyle={styles.buttonContainer}
                        buttonStyle={styles.button}
                        titleStyle={styles.buttonText}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default StartVideoCallScreen;

const useStyles = makeStyles((theme) => ({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
        gap: 20,
    },
    backButton: {
        padding: 12,
        marginLeft: -12,
    },
    backIcon: {
        width: 12,
        height: 12,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#333333',
        transform: [{ rotate: '45deg' }],
        marginLeft: 8,
    },
    headerTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 24,
        color: '#333333',
        textAlign: 'center',
        marginRight: 24, // Compensate for back button
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 120,
    },
    mainContent: {
        padding: 20,
        gap: 24,
    },
    previewContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    previewImage: {
        width: 303,
        height: 189,
        backgroundColor: '#F5F5F5',
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    phoneIllustration: {
        width: 120,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
    },
    phoneScreen: {
        width: 100,
        height: 140,
        backgroundColor: '#333333',
        borderRadius: 12,
        padding: 8,
        justifyContent: 'space-between',
    },
    phoneHeader: {
        height: 6,
        backgroundColor: '#FFFFFF',
        borderRadius: 3,
        width: '60%',
        alignSelf: 'center',
    },
    phoneContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    videoCallIcon: {
        width: 40,
        height: 40,
        backgroundColor: theme.colors.primary,
        borderRadius: 20,
    },
    phoneText: {
        fontSize: 10,
        fontWeight: '500',
        color: '#FFFFFF',
    },
    instructionsContainer: {
        gap: 16,
    },
    instructionsTitle: {
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24,
        color: '#000000',
        textAlign: 'left',
    },
    instructionsSubtitle: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22,
        color: '#000000',
    },
    instructionsBody: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 21,
        color: '#000000',
        textAlign: 'justify',
    },
    noteText: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 21,
        color: '#000000',
        fontStyle: 'italic',
    },
    bottomContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 16,
        paddingBottom: 8,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: -12 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 10,
    },
    buttonContainer: {
        width: '100%',
        marginBottom: 8,
    },
    button: {
        backgroundColor: theme.colors.primary,
        borderRadius: 1000,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 24,
        color: '#FFFFFF',
    },
    homeIndicator: {
        width: 139,
        height: 5,
        backgroundColor: '#000000',
        borderRadius: 100,
        alignSelf: 'center',
    },
}));