import * as React from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Button, makeStyles, Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../navigation/types';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const DoubleCheckInfoScreen = () => {
    const styles = useStyles();
    const navigation = useNavigation<NavigationProp>();

    const personalInfo = [
        { label: 'Họ và tên', value: 'Nguyễn Thị Thuỳ Linh' },
        { label: 'Giới tính', value: 'Nữ' },
        { label: 'Số Căn cước công dân', value: '019196444134' },
        { label: 'Ngày sinh', value: '25/03/1995' },
    ];

    const dateInfo = [
        { label: 'Ngày cấp', value: '14/08/2021' },
        { label: 'Ngày hết hạn', value: '14/08/2029' },
    ];

    const addressInfo = [
        { label: 'Nơi cấp', value: 'Công an Thành phố Hà Nội' },
        { label: 'Nơi thường trú', value: 'Peakview - Số 36 Hoàng Cầu, Ô Chợ Dừa, Đống Đa, Hà Nội' },
        { label: 'Địa chỉ hiện tại', value: '34 đường Quang Trung, Phường Quang' },
    ];

    const handleContinue = () => {
        console.log('Continue to next step');
        navigation.navigate('SignTheContract');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style= {styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <View style={styles.backIcon} />
                    </TouchableOpacity>
                    <View style={styles.stepIndicator}>
                        <View style={[styles.stepDot, styles.stepDotActive]} />
                        <View style={[styles.stepDot, styles.stepDotActive]} />
                        <View style={[styles.stepDot, styles.stepDotActive]} />
                        <View style={[styles.stepDot]} />
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
                        <Text style={styles.title}>Kiểm tra lại thông tin</Text>

                        {/* Personal Info Section */}
                        <View style={styles.infoSection}>
                            {personalInfo.map((item, index) => (
                                <View key={index} style={styles.infoItem}>
                                    <Text style={styles.infoLabel}>{item.label}</Text>
                                    <Text style={styles.infoValue}>{item.value}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Date Info Section - Two columns */}
                        <View style={styles.dateRow}>
                            {dateInfo.map((item, index) => (
                                <View key={index} style={styles.dateItem}>
                                    <Text style={styles.infoLabel}>{item.label}</Text>
                                    <Text style={styles.infoValue}>{item.value}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Address Info Section */}
                        <View style={styles.infoSection}>
                            {addressInfo.map((item, index) => (
                                <View key={index} style={styles.infoItem}>
                                    <Text style={styles.infoLabel}>{item.label}</Text>
                                    <Text style={styles.infoValue}>{item.value}</Text>
                                </View>
                            ))}
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
                </View>
            </View>
        </SafeAreaView>
    );
};

export default DoubleCheckInfoScreen;

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
    infoSection: {
        gap: 4,
    },
    infoItem: {
        gap: 4,
        paddingVertical: 4,
    },
    infoLabel: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 21,
        color: '#A1A1A1',
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24,
        color: '#333333',
    },
    dateRow: {
        flexDirection: 'row',
        gap: 12,
    },
    dateItem: {
        flex: 1,
        gap: 4,
        paddingVertical: 4,
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
        marginTop: 8,
    },
}));
