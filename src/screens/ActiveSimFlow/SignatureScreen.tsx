import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Button, makeStyles, Text } from '@rneui/themed';
import * as React from 'react';
import { Dimensions, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import type { RootStackParamList } from '../../navigation/types';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const { width: screenWidth } = Dimensions.get('window');

const SignatureScreen = () => {
    const styles = useStyles();
    const navigation = useNavigation<NavigationProp>();
    const [isChecked, setIsChecked] = React.useState(false);

    const handleCheckboxPress = () => {
        setIsChecked(!isChecked);
    };

    const handleContinue = () => {
        console.log('Continue from signature screen');
        // Navigate to next screen in the flow
    };

    const handleSignatureAreaPress = () => {
        console.log('Open signature capture');
        // Open signature capture modal or navigate to signature screen
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <View style={styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>SIM của tôi</Text>
                    <View style={styles.stepIndicator}>
                        <View style={[styles.stepDot, styles.stepDotActive]} />
                        <View style={[styles.stepDot, styles.stepDotActive]} />
                        <View style={[styles.stepDot, styles.stepDotActive]} />
                        <View style={[styles.stepDot, styles.stepDotActive]} />
                        <View style={styles.stepDot} />
                    </View>
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

                        {/* Terms and Conditions Section */}
                        <View style={styles.termsSection}>
                            <View style={styles.conditionsSection}>
                                {/* Checkbox */}
                                <TouchableOpacity
                                    style={styles.checkboxRow}
                                    onPress={handleCheckboxPress}
                                    activeOpacity={0.7}
                                >
                                    <View style={[styles.checkboxBox, isChecked && styles.checkboxBoxChecked]}>
                                        {isChecked && <View style={styles.checkboxCheckmark} />}
                                    </View>
                                    <Text style={styles.checkboxText}>
                                        Tôi hiểu và đồng ý với các điều kiện dưới đây:
                                    </Text>
                                </TouchableOpacity>

                                {/* Terms Text */}
                                <Text style={styles.termsText}>
                                    Việc đăng ký thông tin thuê bao trên hệ thống sẽ chỉ được thực hiện sau khi cung cấp đầy đủ các giấy tờ, thông tin theo quy định của pháp luật.{'\n\n'}
                                    Trong quá trình chờ và sau khi hoàn thành đăng ký thông tin trên hệ thống, nếu có xảy ra bất kỳ khiếu kiện, tranh chấp nào liên quan đến số thuê bao trên, tôi đồng ý để SkyFi thu hồi số thuê bao để giải quyết khiếu nại, đồng thời tôi cam kết sẽ phối hợp SkyFi để giải quyết và chịu hoàn toàn trách nhiệm trước pháp luật.{'\n\n'}
                                    Các thông tin và chữ ký của bạn sẽ được tự đồng điền vào Phiếu xác nhận thông tin thuê bao dưới đây.{'\n\n'}
                                    Chính sách xử lý và bảo vệ dữ liệu cá nhân
                                </Text>
                            </View>

                            {/* Contract Instructions */}
                            <Text style={styles.contractInstruction}>
                                Vui lòng đọc hợp đồng và ký tên của bạn tại phía dưới cùng của hợp đồng tại đây
                            </Text>
                        </View>

                        {/* Signature Area */}
                        <TouchableOpacity
                            style={styles.signatureContainer}
                            onPress={handleSignatureAreaPress}
                            activeOpacity={0.8}
                        >
                            <View style={styles.signatureHeader}>
                                <View style={styles.signatureIcon}>
                                    <View style={styles.signatureIconInner} />
                                </View>
                                <Text style={styles.signatureTitle}>Chữ ký khách hàng</Text>
                            </View>
                            <View style={styles.signatureArea}>
                                {/* This would be where signature canvas or captured signature would go */}
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                {/* Bottom Button */}
                <View style={styles.bottomContainer}>
                    <Button
                        title="Tiếp tục"
                        disabled={!isChecked}
                        onPress={handleContinue}
                        containerStyle={styles.buttonContainer}
                        buttonStyle={[styles.button, !isChecked && styles.buttonDisabled]}
                        titleStyle={[styles.buttonText, !isChecked && styles.buttonDisabledText]}
                    />
                    {/* Home Indicator */}
                    <View style={styles.homeIndicator} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SignatureScreen;

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
    },
    stepIndicator: {
        flexDirection: 'row',
        gap: 4,
        paddingHorizontal: 8,
    },
    stepDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: 'rgba(51, 51, 51, 0.3)',
    },
    stepDotActive: {
        backgroundColor: '#0000EA',
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
        textAlign: 'center',
    },
    termsSection: {
        gap: 24,
    },
    conditionsSection: {
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
        borderWidth: 1.25,
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
        width: 8,
        height: 4,
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
    contractInstruction: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 21,
        color: '#333333',
    },
    signatureContainer: {
        backgroundColor: 'rgba(210, 0, 140, 0.1)',
        borderRadius: 8,
        padding: 16,
        gap: 16,
        height: 370,
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
        backgroundColor: '#D93843',
        borderRadius: 2,
    },
    signatureTitle: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24,
        color: '#27272A',
    },
    signatureArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        // This is where the signature canvas would be implemented
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
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 24,
        color: '#FFFFFF',
    },
    buttonDisabled: {
        backgroundColor: '#E5E5E5',
    },
    buttonDisabledText: {
        color: 'rgba(51, 51, 51, 0.5)',
    },
    homeIndicator: {
        width: 139,
        height: 5,
        backgroundColor: '#000000',
        borderRadius: 100,
        alignSelf: 'center',
    },
}));