import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Button, makeStyles, Text } from '@rneui/themed';
import * as React from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import type { RootStackParamList } from '../../navigation/types';

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface InfoField {
    label: string;
    value: string;
}

const CheckInfoScreen = () => {
    const styles = useStyles();
    const navigation = useNavigation<NavigationProp>();

    // Sample data based on Figma design
    const personalInfo: InfoField[] = [
        { label: 'Họ và tên', value: 'Nguyễn Thị Thuỳ Linh' },
        { label: 'Giới tính', value: 'Nữ' },
        { label: 'Số Căn cước công dân', value: '019196444134' },
        { label: 'Ngày sinh', value: '25/03/1995' },
    ];

    const documentInfo: InfoField[] = [
        { label: 'Ngày cấp', value: '14/08/2021' },
        { label: 'Ngày hết hạn', value: '14/08/2029' },
    ];

    const addressInfo: InfoField[] = [
        { label: 'Nơi cấp', value: 'Công an Thành phố Hà Nội' },
        { label: 'Nơi thường trú', value: 'Peakview - Số 36 Hoàng Cầu, Ô Chợ Dừa, Đống Đa, Hà Nội' },
    ];

    const currentAddress: InfoField = {
        label: 'Địa chỉ hiện tại',
        value: '34 đường Quang Trung, Phường Quang'
    };

    const handleContinue = () => {
        console.log('Continue from check info screen');
        // Navigate to next screen in the flow
    };

    const renderInfoField = (item: InfoField, index: number) => (
        <View key={index} style={styles.infoField}>
            <Text style={styles.fieldLabel}>{item.label}</Text>
            <Text style={styles.fieldValue}>{item.value}</Text>
        </View>
    );

    const renderInfoSection = (items: InfoField[], isRow: boolean = false) => (
        <View style={isRow ? styles.infoRow : styles.infoSection}>
            {items.map((item, index) => (
                <View key={index} style={isRow ? styles.infoFieldRow : undefined}>
                    {renderInfoField(item, index)}
                </View>
            ))}
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <View style={styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Kiểm tra lại thông tin</Text>
                </View>

                {/* Main Content */}
                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <View style={styles.form}>
                        {/* Personal Information */}
                        {renderInfoSection(personalInfo)}

                        {/* Document Dates (Row Layout) */}
                        {renderInfoSection(documentInfo, true)}

                        {/* Address Information */}
                        {renderInfoSection(addressInfo)}

                        {/* Current Address (Special Input Style) */}
                        <View style={styles.addressInputContainer}>
                            <View style={styles.addressInputWrapper}>
                                <View style={styles.addressInputContent}>
                                    <Text style={styles.addressInputLabel}>{currentAddress.label}</Text>
                                    <Text style={styles.addressInputValue}>{currentAddress.value}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                {/* Bottom Button */}
                <View style={styles.bottomContainer}>
                    <Button
                        title="Tiếp tục"
                        onPress={handleContinue}
                        containerStyle={styles.buttonContainer}
                        buttonStyle={styles.button}
                        titleStyle={styles.buttonText}
                    />
                    {/* Home Indicator */}
                    <View style={styles.homeIndicator} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default CheckInfoScreen;

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
        fontSize: 22,
        fontWeight: '700',
        lineHeight: 26.4,
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
        gap: 4,
    },
    infoSection: {
        gap: 4,
    },
    infoRow: {
        flexDirection: 'row',
        gap: 12,
    },
    infoFieldRow: {
        flex: 1,
    },
    infoField: {
        gap: 4,
        paddingVertical: 4,
        width: '100%',
    },
    fieldLabel: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 21,
        color: '#A1A1A1',
    },
    fieldValue: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24,
        color: '#333333',
    },
    addressInputContainer: {
        marginTop: 8,
    },
    addressInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DDDDDD',
    },
    addressInputContent: {
        flex: 1,
        gap: 4,
        justifyContent: 'center',
    },
    addressInputLabel: {
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 18,
        color: '#333333',
    },
    addressInputValue: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24,
        color: '#333333',
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
    homeIndicator: {
        width: 139,
        height: 5,
        backgroundColor: '#000000',
        borderRadius: 100,
        alignSelf: 'center',
    },
}));