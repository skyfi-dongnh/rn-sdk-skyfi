import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Image } from '@rneui/base';
import { Button, makeStyles, Text } from '@rneui/themed';
import * as React from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import SignatureCanvas from 'react-native-signature-canvas';

import { showPdfViewerModal } from '../../components/modals/ModalPdfViewer';
import { useLoading } from '../../hooks';
import type { RootStackParamList } from '../../navigation/types';
import ActivateApi from '../../services/api/activate.api';
import { useActiveSimStore } from '../../store';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const SignTheContractScreen = () => {
    const styles = useStyles();
    const navigation = useNavigation<NavigationProp>();
    const [isAgreed, setIsAgreed] = React.useState(false);
    const { data, setData } = useActiveSimStore();
    const signatureRef = React.useRef<any>(null);
    const [isSigning, setIsSigning] = React.useState(false);
    const { close, load } = useLoading();
    const [contractUrl, setContractUrl] = React.useState<string>('');

    const handleSignature = (signature: string) => {
        setData({ ...data, img4: signature.replace('data:image/png;base64,', '') });
    };

    const handleClearSignature = () => {
        signatureRef.current?.clearSignature();
        setIsSigning(false);
        setData({ ...data, img4: '' });
    };

    const handlePolicyPress = () => {
        console.log('Press Chính sách xử lý và bảo vệ dữ liệu cá nhân');
        // Navigate to policy page
    };

    const getContract = async () => {
        load();
        try {
            const { img1, img2, img3, ...newData } = data
            const response = await ActivateApi.getContract(newData);
            if (response.code === 200) {
                setContractUrl(response.result);
            }
        } catch (error) {
            console.error('Failed to get contract:', error);
        } finally {
            close();
        }
    };

    const handleContractPress = async () => {
        console.log('Press tại đây');
        // Open PDF viewer modal with contract
        try {
            await showPdfViewerModal({
                pdfSource: contractUrl, // Replace with your contract PDF URL
                title: 'Hợp đồng dịch vụ',
                showPageNumbers: true,
                enablePaging: true,
                onLoadComplete: (numberOfPages, filePath) => {
                    console.log(`Contract loaded: ${numberOfPages} pages`);
                },
                onError: (error) => {
                    console.error('Failed to load contract:', error);
                },
            });
        } catch (error) {
            console.log('User closed contract viewer', error);
        }
    };

    const handleContinue = () => {
        signatureRef.current?.readSignature();
    };

    const isButtonDisabled = !isAgreed || !isSigning;

    React.useEffect(() => {
        if (data.img4) {
            getContract();

        }
    }, [data.img4]);



    const saveLogVideoCall = async () => {
        try {
            load();
            const response = await ActivateApi.saveLogVideoCall(data);
            if (response.code === 200) {
                console.log('Video call log saved successfully', response.result);
            }
        } catch (error) {
            console.error('Failed to save video call log:', error);
        } finally {
            close();
        }
    };

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
                                    ✣ Việc đăng ký thông tin thuê bao trên hệ thống sẽ chỉ được thực hiện sau khi cung cấp
                                    đầy đủ các giấy tờ, thông tin theo quy định của pháp luật.{'\n'}
                                    ✣ Trong quá trình chờ và sau khi hoàn thành đăng ký thông tin trên hệ thống, nếu có xảy
                                    ra bất kỳ khiếu kiện, tranh chấp nào liên quan đến số thuê bao trên, tôi đồng ý để
                                    SkyFi thu hồi số thuê bao để giải quyết khiếu nại, đồng thời tôi cam kết sẽ phối hợp
                                    SkyFi để giải quyết và chịu hoàn toàn trách nhiệm trước pháp luật.{'\n'}
                                    ✣ Các thông tin và chữ ký của bạn sẽ được tự đồng điền vào Phiếu xác nhận thông tin
                                    thuê bao dưới đây.{''}
                                </Text>
                                <Text style={styles.termsText}>
                                    <Text
                                        style={styles.termsLinkText}
                                        onPress={handlePolicyPress}
                                    >
                                        ✣ Chính sách xử lý và bảo vệ dữ liệu cá nhân
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
                                <TouchableOpacity onPress={handleClearSignature} style={styles.clearButton}>
                                    <Text style={styles.clearButtonText}>Xóa</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.signatureCanvasWrapper}>
                                <SignatureCanvas
                                    ref={signatureRef}
                                    onOK={handleSignature}
                                    onEmpty={() => console.log('Empty signature')}

                                    onBegin={() => {
                                        setIsSigning(true);
                                    }}
                                    onEnd={() => {
                                        signatureRef.current?.readSignature();
                                    }}
                                    penColor="#0000EA"
                                    webStyle={`.m-signature-pad--footer {
                                        display: none;
                                    }
                                    .m-signature-pad {
                                        box-shadow: none;
                                        border: none;
                                    }
                                    body, html {
                                        width: 100%;
                                        height: 100%;
                                        margin: 0;
                                        padding: 0;
                                    }
                                    canvas {
                                        border: 1px dashed #E5E5E5;
                                        border-radius: 8px;
                                    }`}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>

                {/* Bottom Button */}
                <View style={styles.bottomContainer}>
                    <Button
                        title="Tiếp tục"
                        onPress={saveLogVideoCall}
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
        transform: [{ rotate: '-45deg' as any }, { translateY: -1 }] as any,
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
        justifyContent: 'space-between',
        gap: 8,
    },
    clearButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    clearButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.secondary,
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
        flex: 1,
    },
    signatureCanvasWrapper: {
        height: 250,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
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
