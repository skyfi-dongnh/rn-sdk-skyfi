import * as React from 'react';
import { View, ScrollView, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, makeStyles, Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

const InputInfoSimScreen = () => {
    const styles = useStyles();
    const navigation = useNavigation();
    const [phoneNumber] = React.useState('0707 123 456');
    const [serialNumber, setSerialNumber] = React.useState('');
    const [isFocused, setIsFocused] = React.useState(false);

    const handleScanPress = () => {
        console.log('Scan QR code');
        // Navigate to QR scanner
    };

    const handleContinue = () => {
        console.log('Continue with serial:', serialNumber);
        // Navigate to next screen
    };

    const isButtonDisabled = serialNumber.trim().length === 0;

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={0}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <View style={styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Kích hoạt SIM</Text>
                </View>

                {/* Main Content */}
                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <View style={styles.form}>
                        {/* Title Section */}
                        <View style={styles.titleSection}>
                            <Text style={styles.title}>Thông tin SIM</Text>
                            <Text style={styles.subtitle}>
                                Lưu ý: Bạn có tối đa 10 lần nhập/quét số Serial SIM cho 1 số thuê bao trong 1 ngày.
                                Vượt quá số lần quy định, vui lòng thử lại sau 24 giờ.
                            </Text>
                        </View>

                        {/* Phone Number Input (Disabled) */}
                        <View style={styles.inputContainer}>
                            <View style={styles.inputWrapper}>
                                <View style={styles.inputContent}>
                                    <Text style={styles.inputLabel}>Số thuê bao cần kích hoạt</Text>
                                    <Text style={styles.inputValueDisabled}>{phoneNumber}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Serial Number Input */}
                        <View style={styles.inputContainer}>
                            <View style={[styles.inputWrapper, isFocused && styles.inputWrapperFocused]}>
                                <View style={styles.inputContent}>
                                    <View style={styles.labelRow}>
                                        <Text style={[styles.inputLabel, isFocused && styles.inputLabelFocused]}>
                                            Serial
                                        </Text>
                                        <Text style={styles.requiredStar}>*</Text>
                                    </View>
                                    <View style={styles.inputValueRow}>
                                        {isFocused && <View style={styles.cursor} />}
                                        <TextInput
                                            style={styles.input}
                                            value={serialNumber}
                                            onChangeText={setSerialNumber}
                                            placeholder="Nhập 16 số serial SIM hoặc quét mã"
                                            placeholderTextColor="#A1A1A1"
                                            onFocus={() => setIsFocused(true)}
                                            onBlur={() => setIsFocused(false)}
                                            maxLength={16}
                                            keyboardType="default"
                                        />
                                    </View>
                                </View>
                                <TouchableOpacity onPress={handleScanPress} style={styles.scanButton}>
                                    <View style={styles.scanIcon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                {/* Bottom Button */}
                <View style={styles.bottomContainer}>
                    <Button
                        title="Tiếp tục"
                        disabled={isButtonDisabled}
                        onPress={handleContinue}
                        containerStyle={styles.buttonContainer}
                        buttonStyle={styles.button}
                        titleStyle={styles.buttonText}
                        disabledStyle={styles.buttonDisabled}
                        disabledTitleStyle={styles.buttonDisabledText}
                    />
                    {/* Home Indicator */}
                    <View style={styles.homeIndicator} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default InputInfoSimScreen;

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
        height: 48,
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
    headerTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 24,
        color: '#333333',
        textAlign: 'center',
        marginRight: 40, // Compensate for back button
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    form: {
        padding: 16,
        gap: 16,
    },
    titleSection: {
        gap: 4,
        paddingVertical: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 26,
        color: '#333333',
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        color: '#5C5C5C',
    },
    inputContainer: {
        gap: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    inputWrapperFocused: {
        borderColor: '#333333',
    },
    inputContent: {
        flex: 1,
        gap: 4,
        justifyContent: 'center',
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    inputLabel: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
        color: '#A1A1A1',
    },
    inputLabelFocused: {
        color: '#333333',
    },
    requiredStar: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        color: '#ED1B2F',
        width: 7,
        height: 16,
    },
    inputValueRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1,
    },
    cursor: {
        width: 1,
        height: 22.25,
        backgroundColor: '#2F6BFF',
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        color: '#333333',
        padding: 0,
        margin: 0,
    },
    inputValueDisabled: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        color: '#A1A1A1',
    },
    scanButton: {
        padding: 4,
    },
    scanIcon: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#333333',
        borderRadius: 4,
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
        fontWeight: '700',
        lineHeight: 24,
        color: '#333333',
    },
    buttonDisabled: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: 'rgba(12, 12, 14, 0.1)',
    },
    buttonDisabledText: {
        color: 'rgba(17, 24, 39, 0.25)',
    },
    homeIndicator: {
        width: 139,
        height: 5,
        backgroundColor: '#000000',
        borderRadius: 100,
        alignSelf: 'center',
    },
}));
