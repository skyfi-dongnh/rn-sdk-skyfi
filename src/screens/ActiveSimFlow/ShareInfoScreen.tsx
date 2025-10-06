import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { Button, CheckBox, makeStyles, Text } from '@rneui/themed';

const ShareInfoScreen = () => {
    const styles = useStyles();
    const [isChecked, setIsChecked] = React.useState(false);

    const infoItems = [
        { label: 'Họ và tên', value: 'Nguyễn Văn A' },
        { label: 'Số CCCD/CMND', value: '001234567890' },
        { label: 'Ngày sinh', value: '01/01/1990' },
        { label: 'Giới tính', value: 'Nam' },
        { label: 'Quê quán', value: 'Hà Nội' },
        { label: 'Địa chỉ thường trú', value: 'Số 1, Đường ABC, Quận XYZ, TP. Hà Nội' },
    ];

    return (

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
                                <Text h3>{item.label}</Text>
                                <Text h3>{item.value}</Text>
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

                <CheckBox
                    checked={isChecked}
                    onPress={() => setIsChecked(!isChecked)}
                    title="Tôi đồng ý chia sẻ thông tin"
                    containerStyle={styles.checkboxContainer}
                    textStyle={styles.checkboxText}
                />

                <Button
                    title="Tiếp tục"
                    disabled={!isChecked}
                    containerStyle={styles.buttonContainer}
                />

                {/* Home Indicator */}
                <View style={styles.homeIndicator} />
            </View>
        </View>
    );
};

export default ShareInfoScreen;

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing.lg,
        flex: 1,
        backgroundColor: theme.colors.background,
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
        padding: 16,
    },
    infoItem: {
        gap: 4,
        paddingVertical: 12,
    },
    infoLabel: {
        fontSize: 12,
        fontWeight: '400',
        color: '#8C8C8C',
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '500',
        color: '#0C0C0E',
    },
    divider: {
        height: 0.5,
        backgroundColor: '#8C8C8C',
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
    checkboxContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 0,
        marginLeft: 0,
        marginRight: 0,
    },
    checkboxText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#0C0C0E',
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
