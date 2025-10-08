import * as React from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Button, makeStyles, Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/types';
import { Image } from '@rneui/base';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const SignTheContractScreen = () => {
    const styles = useStyles();
    const navigation = useNavigation<NavigationProp>();
    const [isAgreed, setIsAgreed] = React.useState(false);
    const [signature, setSignature] = React.useState<string | null>(null);

    const handleUploadSignature = () => {
        console.log('Upload signature');
        setSignature('signature-uploaded');
        // Open image picker or signature pad
    };

    const handlePolicyPress = () => {
        console.log('Press Chính sách xử lý và bảo vệ dữ liệu cá nhân');
        // Navigate to policy page
    };

    const handleContractPress = () => {
        console.log('Press tại đây');
        // Navigate to contract page
    };

    const handleContinue = () => {
        console.log('Continue with signature');
        // Navigate to next screen
    };

    const isButtonDisabled = !isAgreed || !signature;

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <View style={styles.backIcon} />
                    </TouchableOpacity>
                    <View style={styles.stepIndicator}>
                        <View style={[styles.stepDot, styles.stepDotActive]} />
                        <View style={[styles.stepDot, styles.stepDotActive]} />
                        <View style={[styles.stepDot, styles.stepDotActive]} />
                        <View style={[styles.stepDot, styles.stepDotActive]} />
                    </View>
                    <View style={styles.headerSpacer} />
                </View>

                {/* Main Content */}
                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <View style={styles.form}>
                        {/* Title */}
                        <Text style={styles.title}>Ký hợp đồng</Text>

                        {/* Terms & Conditions */}
                        <View style={styles.termsSection}>
                            {/* Checkbox */}
                            <TouchableOpacity
                                style={styles.checkboxRow}
                                onPress={() => setIsAgreed(!isAgreed)}
                                activeOpacity={0.7}
                            >
                                <View style={[styles.checkboxBox, isAgreed && styles.checkboxBoxChecked]}>
                                    {isAgreed && <View style={styles.checkboxCheckmark} />}
                                </View>
                                <Text style={styles.checkboxText}>
                                    Tôi hiểu và đồng ý với các điều kiện dưới đây:
                                </Text>
                            </TouchableOpacity>

                            {/* Terms Text */}
                            <View>
                                <Text style={styles.termsText}>
                                    Việc đăng ký thông tin thuê bao trên hệ thống sẽ chỉ được thực hiện sau khi cung cấp
                                    đầy đủ các giấy tờ, thông tin theo quy định của pháp luật.{'\n\n'}
                                    Trong quá trình chờ và sau khi hoàn thành đăng ký thông tin trên hệ thống, nếu có xảy
                                    ra bất kỳ khiếu kiện, tranh chấp nào liên quan đến số thuê bao trên, tôi đồng ý để
                                    SkyFi thu hồi số thuê bao để giải quyết khiếu nại, đồng thời tôi cam kết sẽ phối hợp
                                    SkyFi để giải quyết và chịu hoàn toàn trách nhiệm trước pháp luật.{'\n\n'}
                                    Các thông tin và chữ ký của bạn sẽ được tự đồng điền vào Phiếu xác nhận thông tin
                                    thuê bao dưới đây.{'\n\n'}
                                </Text>
                                <Text style={styles.termsText}>
                                    <Text
                                        style={styles.termsLinkText}
                                        onPress={handlePolicyPress}
                                    >
                                        Chính sách xử lý và bảo vệ dữ liệu cá nhân
                                    </Text>
                                </Text>
                            </View>
                        </View>

                        {/* Contract Note */}
                        <Text style={styles.contractNote}>
                            Vui lòng đọc hợp đồng và ký tên của bạn tại phía dưới cùng của hợp đồng{' '}
                            <Text style={styles.contractLinkText} onPress={handleContractPress}>
                                tại đây
                            </Text>
                        </Text>

                        {/* Signature Upload Area */}
                        <View style={styles.signatureSection}>
                            <View style={styles.signatureHeader}>
                                <View style={styles.signatureIcon}>
                                    <Image
                                        source={require('../../assets/icons/ic_sign.png')}
                                        style={styles.signatureIconInner}
                                        resizeMode="contain"
                                    />
                                </View>
                                <Text style={styles.signatureTitle}>Chữ ký khách hàng</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.signatureUploadArea}
                                onPress={handleUploadSignature}
                                activeOpacity={0.8}
                            >
                                {!signature && (
                                    <View style={styles.signatureEmptyState}>
                                        <View style={styles.uploadIcon} />
                                        <Text style={styles.uploadText}>Chụp/ Tải ảnh chữ ký mẫu</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

                {/* Bottom Button */}
                <View style={styles.bottomContainer}>
                    <Button
                        title="Tiếp tục"
                        onPress={handleContinue}
                        disabled={isButtonDisabled}
                        containerStyle={styles.buttonContainer}
                        buttonStyle={styles.button}
                        titleStyle={styles.buttonText}
                        disabledStyle={styles.buttonDisabled}
                        disabledTitleStyle={styles.buttonDisabledText}
                    />

                </View>
            </View>
        </SafeAreaView>
    );
};

export default SignTheContractScreen;

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
        justifyContent: 'space-between',
        height: 50,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
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
    stepIndicator: {
        flexDirection: 'row',
        gap: 4,
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 8,
    },
    stepDot: {
        flex: 1,
        height: 4,
        backgroundColor: '#A1A1A1',
        borderRadius: 2,
        maxWidth: 60,
    },
    stepDotActive: {
        backgroundColor: '#0000EA',
    },
    headerSpacer: {
        width: 24,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    form: {
        padding: 16,
        gap: 12,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        lineHeight: 26.4,
        color: '#333333',
        marginBottom: 4,
    },
    termsSection: {
        gap: 12,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
    },
    checkboxBox: {
        width: 16,
        height: 16,
        borderWidth: 1.5,
        borderColor: '#A1A1A1',
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginTop: 2,
    },
    checkboxBoxChecked: {
        backgroundColor: '#0000EA',
        borderColor: '#0000EA',
    },
    checkboxCheckmark: {
        width: 10,
        height: 5,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#FFFFFF',
        transform: [{ rotate: '-45deg' }, { translateY: -1 }],
    },
    checkboxText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24,
        color: '#333333',
    },
    termsText: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 18,
        color: '#333333',
    },
    termsLinkText: {
        fontSize: 12,
        fontWeight: '600',
        lineHeight: 18,
        color: theme.colors.secondary,
        textDecorationLine: 'underline',
    },
    contractNote: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 21,
        color: '#333333',
    },
    contractLinkText: {
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 21,
        color: theme.colors.secondary,
        textDecorationLine: 'underline',
    },
    signatureSection: {
        gap: 16,
        padding: 16,
        backgroundColor: 'rgba(210, 0, 140, 0.1)',
        borderRadius: 8,
    },
    signatureHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    signatureIcon: {
        width: 36,
        height: 36,
        backgroundColor: '#FFF0F1',
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signatureIconInner: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#D93843',
    },
    signatureTitle: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24,
        color: '#27272A',
    },
    signatureUploadArea: {
        height: 250,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderStyle: 'dashed',
    },
    signatureEmptyState: {
        alignItems: 'center',
        gap: 12,
    },
    uploadIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F5F5F5',
        borderWidth: 2,
        borderColor: '#D93843',
    },
    uploadText: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 21,
        color: '#A1A1A1',
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
    buttonDisabled: {
        backgroundColor: '#F5F5F5',
    },
    buttonDisabledText: {
        color: '#A1A1A1',
    },
    homeIndicator: {
        width: 139,
        height: 5,
        backgroundColor: '#000000',
        borderRadius: 100,
        alignSelf: 'center',
        marginTop: 8,
    },
}));
