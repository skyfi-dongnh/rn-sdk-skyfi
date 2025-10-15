import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Image } from '@rneui/base';
import { Button, makeStyles, Text } from '@rneui/themed';
import * as React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { showCameraModal } from '../../components/modals';
import { showMessage } from '../../components/modals/ModalComfirm';
import { showScanQRModal } from '../../components/modals/ModalScanQR';
import { useLoading } from '../../hooks';
import type { RootStackParamList } from '../../navigation/types';
import ActivateApi from '../../services/api/activate.api';
import { useActiveSimStore } from '../../store';

type NavigationProp = StackNavigationProp<RootStackParamList>;



const InputInfoSimScreen = () => {
    const styles = useStyles();
    const navigation = useNavigation<NavigationProp>();
    const [phoneNumber, setPhoneNumber] = React.useState('0707 123 456');
    const [serialNumber, setSerialNumber] = React.useState('');
    const [isFocused, setIsFocused] = React.useState(false);
    const [currentType, setCurrentType] = React.useState<'front' | 'back' | 'face' | 'done'>('front');
    const [isFist, setIsFirst] = React.useState(true);
    const { data, setData } = useActiveSimStore();

    const { load, close } = useLoading();

    const handleScanPress = async () => {
        try {
            const data = await showScanQRModal();
            return getInfoIccd(data);
        } catch {
            showMessage({
                title: 'Thông báo',
                description: 'Quét mã không thành công. Vui lòng thử lại.',
                closeLabel: 'Đóng',
                confirmLabel: 'Thử lại'
            })
        }
    };

    const getInfoIccd = async (barcode: string) => {
        try {
            load();
            const res = await ActivateApi.infoIccd({ barcode });
            if (res.code === 200 && res.result) {
                setSerialNumber(res.result.iccid);
                setPhoneNumber(res.result.msisdn);
                setData({ ...data, imsi: res.result.imsi, phone: res.result.msisdn, seri: res.result.iccid });
            } else {
                throw new Error('Không tìm thấy thông tin ICCD. Vui lòng thử lại.');
            }

        } catch (error: Error | any) {
            showMessage({
                title: 'Thông báo',
                description: error.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.',
                closeLabel: 'Đóng',
                confirmLabel: 'Thử lại'
            })
        } finally {
            close();
        }
    }

    const handleContinue = async () => {
        try {
            if (!serialNumber || !phoneNumber) {
                throw new Error('Vui lòng nhập đầy đủ thông tin.');
            }
            load();
            const checkExist = currentType === 'front' ? await checkSim(serialNumber, phoneNumber) : true;
            if (!checkExist) {
                throw new Error('Số thuê bao và Serial SIM không khớp hoặc chưa được đăng ký. Vui lòng thử lại.');
            }

            if (currentType === 'front') {
                const cardFront = await showCameraModal({
                    title: 'Chụp ảnh CCCD',
                    subtitle: 'Mặt trước',
                    cameraPosition: 'back',
                });
                if (!cardFront) {
                    setCurrentType('front');
                    return;
                }

                await getKycFront(cardFront.base64.replace('data:image/jpeg;base64,', ''));
                setData({ ...data, img1: cardFront.base64.replace('data:image/jpeg;base64,', '') });
                setCurrentType('back');
            }
            if (currentType === 'back') {
                const cardBack = await showCameraModal({
                    title: 'Chụp ảnh CCCD',
                    subtitle: 'Mặt sau',
                    cameraPosition: 'back',

                });
                if (!cardBack) {
                    setCurrentType('front');
                    return;
                }
                const resKycOcr = await getKycOcr(
                    data.img1,
                    cardBack.base64.replace('data:image/jpeg;base64,', '')
                );
                setData({
                    ...data,
                    img2: cardBack.base64.replace('data:image/jpeg;base64,', ''),
                    idNumber: resKycOcr.result?.idnumber || '',
                    fullName: resKycOcr.result?.name || '',
                    birthDay: resKycOcr.result?.dob || '',
                    gender: resKycOcr.result?.gender as 'Male' | 'Female' || null,
                    address: resKycOcr.result?.address || '',
                    issueDate: resKycOcr.result?.issue_date || '',
                    issuePlace: resKycOcr.result?.issued_place || '',
                    international: 'VNM',
                    contactPhone: '',
                    homeTown: resKycOcr.result?.place_of_origin || '',
                    city_code: resKycOcr.result?.address_detail.city.city_code || null,
                    district_code: resKycOcr.result?.address_detail.district.district_code,
                    ward_code: resKycOcr.result?.address_detail.ward.ward_code || null,
                });
                setCurrentType('face');
            }
            if (currentType === 'face') {
                const face = await showCameraModal({
                    title: 'Chụp ảnh khuôn mặt',
                    subtitle: 'Đảm bảo khuôn mặt rõ nét, không đeo khẩu trang',
                    cameraPosition: 'front',
                });
                if (!face) {
                    setCurrentType('back');
                    return;
                }
                const resFaceMatch = await getFaceMatch(
                    data.img1,
                    face.base64.replace('data:image/jpeg;base64,', '')
                );
                setData({
                    ...data,
                    img3: face.base64.replace('data:image/jpeg;base64,', ''),
                    faceMatching: resFaceMatch.result?.face_score,
                });
                setCurrentType('done');
            }
            if (currentType === 'done') {
                navigation.navigate('DoubleCheckInfo');
                setIsFirst(true);
                setCurrentType('front');
            }


        } catch (error) {
            showMessage({
                title: 'Thông báo',
                description: (error as Error).message || 'Đã có lỗi xảy ra. Vui lòng thử lại.',
                closeLabel: 'Đóng',
                confirmLabel: 'Thử lại',
                onConfirm: () => handleContinue()
            })
        } finally {
            close();
        }
    };

    const checkSim = async (iccid: string, msisdn: string) => {
        try {
            const res = await ActivateApi.checkSim({ iccid, msisdn });
            if (res.code != 200) {
                throw new Error(res.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
            }
            return res.result.checkExist;
        } catch (error: Error | any) {
            return false;
        }
    }
    const getKycFront = async (image_front_base64: string) => {
        try {
            load();
            const res = await ActivateApi.getKycFront(image_front_base64);
            if (res.code != 200) {
                throw new Error(showError(res.code) || res.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
            }
            if (res.result?.dob && !checkAgeAtLeast14(res.result.dob)) {
                throw new Error('Người dùng phải từ 14 tuổi trở lên.');
            }
            const isCanRegister = await checkIsCanRegister(res.result?.idnumber || '');
            if (!isCanRegister) {
                throw new Error('Số CMND/CCCD đã đăng ký 5 số thuê bao. Vui lòng sử dụng số khác.');
            }
            return res;
        } catch (error: Error | any) {
            throw error;
        }
    }

    const getKycOcr = async (image_front_base64: string, image_back_base64: string) => {
        try {
            load();
            const res = await ActivateApi.getKycOcr(image_front_base64, image_back_base64);
            if (res.code != 0) {
                throw new Error(showErrorOcr(res.code) || res.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
            }
            return res;
        } catch (error: Error | any) {
            throw error;
        }
    }
    const showError = (code: number) => {
        switch (code) {
            case 99:
                return 'Ảnh không phù hợp';
            case 1:
                return 'Ảnh có dấu hiệu được chụp qua màn hình điện tử';
            case 2:
                return 'Ảnh giấy tờ tùy thân là bản photocopy';
            case 4:
                return 'Ảnh giấy tờ tùy thân không có mặt';
            case 5:
                return 'Giấy tờ tùy thân bị cắt góc';
            case 6:
                return 'Giấy tờ tùy thân bị nghi ngờ là giả mạo';
            case 7:
                return 'Loại thẻ không đúng, có thể sai mặt trước và mặt sau';
            case -1:
                return 'Giấy tờ tùy thân bị cắt góc';
            case 9:
                return 'Ảnh giấy tờ không đúng nội dung';
            default:
                return 'Lỗi không xác định';
        }
    };

    const checkIsCanRegister = async (idnumber: string) => {
        try {
            const res = await ActivateApi.checkIsCanRegisterSim(idnumber);
            if (res.code != 200) {
                throw new Error(res.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
            }
            return res.result!.value! < res.result!.valueBlock!;
        } catch (error: Error | any) {
            throw error;

        }
    }

    function checkAgeAtLeast14(birthday: string): boolean {
        if (!birthday || birthday.length === 0) return false;

        try {
            const dateParts = birthday.split('/');
            if (dateParts.length !== 3) return false;

            const day = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10);
            const year = parseInt(dateParts[2], 10);

            if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
            if (month < 1 || month > 12) return false;
            if (day < 1 || day > 31) return false;
            if (year < 1900 || year > new Date().getFullYear()) return false;

            if (!isValidDate(day, month, year)) return false;

            // Month is 0-indexed in JavaScript Date
            const birthDate = new Date(year, month - 1, day);
            const now = new Date();

            if (birthDate.getTime() > now.getTime()) return false;

            let age = now.getFullYear() - birthDate.getFullYear();

            if (now.getMonth() < birthDate.getMonth()) {
                age--;
            } else if (now.getMonth() === birthDate.getMonth()) {
                if (now.getDate() < birthDate.getDate()) {
                    age--;
                }
            }

            console.log(`Birthday: ${birthday}, Age: ${age}`);
            return age >= 14;
        } catch (e) {
            console.log(`Error parsing birthday: ${e}`);
            return false;
        }
    }

    function isValidDate(day: number, month: number, year: number): boolean {
        const date = new Date(year, month - 1, day);
        return (
            date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day
        );
    }

    function showErrorOcr(code: number) {

        switch (code) {
            case 99:
                return 'Ảnh không phù hợp';
            case 1:
                return 'Ảnh có dấu hiệu được chụp qua màn hình điện tử';
            case 2:
                return 'Ảnh giấy tờ tùy thân là bản photocopy';
            case 4:
                return 'Ảnh giấy tờ tùy thân không có mặt';
            case 5:
                return 'Giấy tờ tùy thân bị cắt góc';
            case 6:
                return 'Giấy tờ tùy thân bị nghi ngờ là giả mạo';
            case 7:
                return 'Loại thẻ không đúng, có thể sai mặt trước và mặt sau';
            case -1:
                return 'Giấy tờ tùy thân bị cắt góc';
            case 9:
                return 'Ảnh giấy tờ không đúng nội dung';
            default:
                return 'Lỗi không xác định';
        }

    }

    async function getFaceMatch(image_front_base64: string, image_face_base64: string) {
        try {
            load();
            const res = await ActivateApi.getFaceMatch(image_front_base64, image_face_base64);
            if (res.code != 0) {
                throw new Error(res.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
            }
            return res;
        } catch (error: Error | any) {
            throw error;
        }
    }

    React.useEffect(() => {
        if (!isFist) {
            handleContinue();
        } else {
            setIsFirst(false);
        }
    }, [currentType]);

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
                        <View style={{ height: 16 }} />
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
                                    <TextInput onChangeText={setPhoneNumber} style={styles.inputValueDisabled} value={phoneNumber} editable={true} />
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
                                    <Image
                                        source={require('../../assets/icons/ic_scan.png')}
                                        style={styles.scanIcon}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                {/* Bottom Button */}
                <View style={styles.bottomContainer}>
                    <Button
                        title="Tiếp tục"
                        onPress={handleContinue}
                    />
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
        marginRight: 40,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    form: {
        padding: 16,
    },
    titleSection: {
        paddingVertical: 8,
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 26,
        color: '#333333',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        color: '#5C5C5C',
    },
    inputContainer: {
        marginBottom: 16,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },
    inputWrapperFocused: {
        borderColor: '#333333',
    },
    inputContent: {
        flex: 1,
        justifyContent: 'center',
        marginRight: 8,
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    inputLabel: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
        color: '#A1A1A1',
        marginRight: 4,
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