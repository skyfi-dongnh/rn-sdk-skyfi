import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Button, makeStyles, Text } from '@rneui/themed';
import * as React from 'react';
import { Dimensions, SafeAreaView, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AlertIcon, BackIcon, StarIcon, SuccessIcon } from '../../components/Svgs';
import type { RootStackParamList } from '../../navigation/types';

type NavigationProp = StackNavigationProp<RootStackParamList>;
type ResultVideoCallRouteProp = RouteProp<RootStackParamList, 'ResultVideoCall'>;

const { width: screenWidth } = Dimensions.get('window');

const ResultVideoCall: React.FC = () => {
    const styles = useStyles();
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<ResultVideoCallRouteProp>();
    const { status = 'error' } = route.params || {};

    const handleGoHome = () => {
        navigation.navigate('Home');
    };

    const handleGoBack = () => {
        navigation.goBack();
    };



    const HomeIndicator = () => (
        <View style={styles.homeIndicator} />
    );

    return (
        <LinearGradient
            colors={[
                '#FFFFFF',
                '#FFFDFC',
                '#FEF8F4',
                '#FCF1EE',
                '#F3E8F4',
                '#E8E5FA'
            ]}
            locations={[0, 0.2, 0.4, 0.6, 0.8, 1]}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea} >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                        <BackIcon />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Chi tiết giao dịch</Text>
                    <View style={styles.headerRight} />
                </View>

                {/* Content */}
                <View style={styles.content}>
                    <View style={styles.alertContainer}>
                        {status === 'success' ? <SuccessIcon /> : <AlertIcon />}
                        <Text style={[styles.alertTitle, status === 'success' && styles.successTitle]}>
                            {status === 'success' ? 'Kích hoạt SIM thành công' : 'Gửi yêu cầu thất bại!'}
                        </Text>
                        {status === 'error' && (
                            <Text style={styles.alertMessage}>
                                Liên hệ tổng đài 1900 6605 để được hỗ trợ
                            </Text>
                        )}
                    </View>
                </View>

                {/* Bottom Container */}
                <View style={styles.bottomContainer}>
                    {status === 'success' ? (
                        <>
                            <StarIcon />
                            <View style={styles.successContent}>
                                <Text style={styles.congratsTitle}>
                                    Xin chúc mừng! Thuê bao của bạn đã sẵn sàng!
                                </Text>
                                <Text style={styles.congratsSubtitle}>
                                    Bạn muốn thêm tài khoản ?
                                </Text>
                            </View>
                            <View style={styles.buttonRow}>
                                <Button
                                    title="Có"
                                    onPress={handleGoHome}
                                    containerStyle={styles.buttonContainer}
                                    buttonStyle={styles.outlineButton}
                                    titleStyle={styles.outlineButtonText}
                                />
                                <Button
                                    title="Không, để sau"
                                    onPress={handleGoHome}
                                    containerStyle={styles.buttonContainer}
                                    buttonStyle={styles.button}
                                    titleStyle={styles.buttonText}
                                />
                            </View>
                        </>
                    ) : (
                        <Button
                            title="Về trang chủ"
                            onPress={handleGoHome}
                            containerStyle={styles.buttonContainer}
                            buttonStyle={styles.button}
                            titleStyle={styles.buttonText}
                        />
                    )}
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default ResultVideoCall;

const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    statusBar: {
        height: 54,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        backgroundColor: 'transparent',
    },
    statusBarTime: {
        fontSize: 17,
        fontWeight: '600',
        color: '#000000',
        fontFamily: 'SF Pro',
        textAlign: 'center',
        lineHeight: 22,
        marginLeft: 35,
    },
    header: {
        height: 50,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
    },
    backButton: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333333',
        fontFamily: 'Inter',
        textAlign: 'center',
        lineHeight: 24,
        flex: 1,
    },
    headerRight: {
        width: 24,
        height: 24,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    alertContainer: {
        borderRadius: 12,
        paddingVertical: 20,
        paddingHorizontal: 16,
        alignItems: 'center',
        gap: 12,


    },
    alertTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#D2008C',
        fontFamily: 'Inter',
        textAlign: 'center',
        lineHeight: 26.4,
    },
    successTitle: {
        color: '#D2008C',
    },
    alertMessage: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333333',
        fontFamily: 'Inter',
        textAlign: 'center',
        lineHeight: 21,
        width: screenWidth - 32,
    },
    bottomContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 0,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: -12 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 10,
		alignItems: 'stretch',
		gap: 12,
    },
    buttonContainer: {
        width: '100%',
		marginBottom: 12,

    },
    button: {
        backgroundColor: theme.colors.primary,
        borderRadius: 1000,
        paddingVertical: 12,
        paddingHorizontal: 16,
        height: 48,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 24,
        color: '#FFFFFF',
        fontFamily: 'Be Vietnam Pro',
        letterSpacing: -0.2,
    },
    homeIndicator: {
        width: 139,
        height: 5,
        backgroundColor: '#000000',
        borderRadius: 2.5,
        alignSelf: 'center',
        marginTop: 8,
        marginBottom: 8,
    },
    successContent: {
        width: '100%',
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    congratsTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333333',
        fontFamily: 'Inter',
        textAlign: 'left',
        lineHeight: 29,
        marginBottom: 14,
    },
    congratsSubtitle: {
        fontSize: 22,
        fontWeight: '400',
        color: '#333333',
        fontFamily: 'Inter',
        textAlign: 'left',
        lineHeight: 26.6,
    },
    buttonRow: {
        flexDirection: 'column',
        width: '100%',
        gap: 8,
        marginBottom: 12,
    },
    outlineButton: {
        backgroundColor: '#FFFFFF',
        borderColor: 'rgba(12, 12, 14, 0.1)',
        borderWidth: 1,
        borderRadius: 1000,
        paddingVertical: 12,
        paddingHorizontal: 16,
        height: 48,
    },
    outlineButtonText: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22,

        fontFamily: 'Be Vietnam Pro',
        letterSpacing: -0.43,
    },
}));