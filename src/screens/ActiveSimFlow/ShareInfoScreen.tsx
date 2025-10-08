import * as React from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Button, makeStyles, Text } from '@rneui/themed';

const ShareInfoScreen = () => {
    const styles = useStyles();
    const [isChecked, setIsChecked] = React.useState(false);

    const handlePolicyPress = () => {
        console.log('Press Chính sách xử lý dữ liệu cá nhân của Vikki Bank');
        // Navigate to policy page
    };

    const handleSkyFiPress = () => {
        console.log('Press SkyFi');
        // Navigate to SkyFi page
    };

    const infoItems = [
        { label: 'Họ và tên', value: 'Nguyễn Văn A' },
        { label: 'Số CCCD/CMND', value: '001234567890' },
        { label: 'Ngày sinh', value: '01/01/1990' },
        { label: 'Giới tính', value: 'Nam' },
        { label: 'Quê quán', value: 'Hà Nội' },
        { label: 'Gmail', value: 'gmail@example.com' },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
            <View style={styles.container}>
                {/* Main Content */}
                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    <View style={styles.titleSection}>
                        <Text h1 h1Style={{ fontWeight: 'bold' }}>Chia sẻ thông tin để đăng ký SIM</Text>
                        <Text h3> Chúng tôi sẽ gửi các thông tin dưới đây tới SkyFi để đăng ký thông tin thuê bao theo quy định
                        </Text>
                    </View>

                    {/* Info List */}
                    <View style={styles.infoContainer}>
                        {infoItems.map((item, index) => (
                            <React.Fragment key={index}>
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoLabel}>{item.label}</Text>
                                    <Text style={styles.infoValue}>{item.value}</Text>
                                </View>
                                {index < infoItems.length - 1 && <View style={styles.divider} />}
                            </React.Fragment>
                        ))}
                    </View>
                </ScrollView>

                {/* Bottom Sheet */}
                <View style={styles.bottomSheet}>
                    <Text style={styles.bottomTitle}>Chuyển đến trang kích hoạt SIM</Text>
                    <Text style={styles.bottomBody}>
                        Quý khách sẽ được chuyển tới trang chọn số do SkyFi cung cấp
                    </Text>
                    {/*Check box  */}
                    <TouchableOpacity
                        style={styles.checkboxRow}
                        onPress={() => setIsChecked(!isChecked)}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.checkboxBox, isChecked && styles.checkboxBoxChecked]}>
                            {isChecked && <View style={styles.checkboxCheckmark} />}
                        </View>
                        <View style={styles.checkboxTextContainer}>
                            <Text h4 style={styles.checkboxText}>
                                Tôi đồng ý với{' '}
                                <Text style={styles.checkboxTextLink} onPress={handlePolicyPress}>
                                    Chính sách xử lý dữ liệu cá nhân của Vikki Bank
                                </Text>
                                {' '}và{' '}
                                <Text style={styles.checkboxTextLink} onPress={handleSkyFiPress}>
                                    SkyFi
                                </Text>
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <Button
                        title="Tiếp tục"
                        disabled={!isChecked}
                        containerStyle={styles.buttonContainer}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ShareInfoScreen;

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing.lg,
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingVertical: theme.spacing.sm,
    },
    headerGradient: {
        paddingBottom: theme.spacing.lg,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        gap: 20,
    },
    backButton: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        flex: 1,
        fontSize: theme.spacing.lg,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    stepIndicator: {
        flexDirection: 'row',
        gap: 6,
    },
    stepDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    stepDotActive: {
        backgroundColor: '#FFFFFF',
    },
    content: {
        flex: 1,
    },
    titleSection: {
        padding: 16,
        gap: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: '500',
        lineHeight: 28.8,
        color: '#0C0C0E',
    },
    description: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 16.8,
        color: '#8C8C8C',
    },
    infoContainer: {
        marginHorizontal: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        paddingHorizontal: 7,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 14,
        gap: 8,
        flex: 1,
        width: '100%',
    },
    infoLabel: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 21,
        color: '#A1A1A1',
        flex: 1,
        minWidth: 120,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 24,
        color: '#333333',

    },
    divider: {
        height: 0.5,
        backgroundColor: '#8C8C8C',
        marginHorizontal: 14,
    },
    bottomSheet: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 16,
        paddingBottom: 0,
        gap: 12,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: -12 },
        shadowOpacity: 0.15,
        shadowRadius: 29.9,
        elevation: 10,
    },
    bottomTitle: {
        fontSize: 24,
        fontWeight: '500',
        lineHeight: 32,
        color: '#0C0C0E',
    },
    bottomBody: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        color: 'rgba(12, 12, 14, 0.6)',
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
    },
    checkboxBox: {
        width: 20,
        height: 20,
        borderWidth: 1.25,
        borderColor: '#A1A1A1',
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    checkboxBoxChecked: {
        backgroundColor: theme.colors.secondary,
        borderColor: theme.colors.secondary,
    },
    checkboxCheckmark: {
        width: 12,
        height: 6,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#FFFFFF',
        transform: [{ rotate: '-45deg' }, { translateY: -1 }],
    },
    checkboxTextContainer: {
        flex: 1,
        paddingTop: 2,
    },
    checkboxText: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        color: '#333333',
    },
    checkboxTextLink: {
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 20,
        color: theme.colors.secondary,
        textDecorationLine: 'underline',
    },
    buttonContainer: {
        width: '100%',
    },
    homeIndicator: {
        width: 139,
        height: 5,
        backgroundColor: '#000000',
        borderRadius: 100,
        alignSelf: 'center',
        marginTop: 8,
        marginBottom: 8,
    },
}));
