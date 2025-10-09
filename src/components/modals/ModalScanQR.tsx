import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Linking,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { modal, useModal } from '../common/modal';
import { BottomSheetProps } from './modalBase/BottomSheet';


const ModalScanQR = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const { close, done } = useModal();
  const [isActive, setIsActive] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCameraAvailable, setIsCameraAvailable] = useState(false);
  const device = useCameraDevice('back');

  useEffect(() => {
    checkCameraAvailability();
  }, []);

  const checkCameraAvailability = async () => {
    try {
      // Check if Camera module is available
      if (!Camera || typeof Camera.getCameraPermissionStatus !== 'function') {
        console.error('Camera module is not available');
        setCameraError('Camera module chưa được cài đặt đúng cách. Vui lòng khởi động lại ứng dụng.');
        Alert.alert(
          'Lỗi Camera',
          'Camera module chưa được cài đặt đúng cách. Vui lòng đóng và khởi động lại ứng dụng.',
          [{ text: 'Đóng', onPress: close }]
        );
        return;
      }

      setIsCameraAvailable(true);
      await checkCameraPermission();
    } catch (error) {
      console.error('Camera availability error:', error);
      setCameraError('Không thể khởi tạo camera. Vui lòng khởi động lại ứng dụng.');
      Alert.alert(
        'Lỗi',
        'Không thể khởi tạo camera. Vui lòng khởi động lại ứng dụng.',
        [{ text: 'Đóng', onPress: close }]
      );
    }
  };

  const checkCameraPermission = async () => {
    try {
      const permission = await Camera.getCameraPermissionStatus();
      if (permission === 'granted') {
        setHasPermission(true);
      } else {
        const newPermission = await Camera.requestCameraPermission();
        setHasPermission(newPermission === 'granted');
        if (newPermission === 'denied') {
          Alert.alert(
            'Quyền truy cập camera',
            'Vui lòng cấp quyền truy cập camera trong cài đặt để sử dụng tính năng này.',
            [
              { text: 'Hủy', style: 'cancel', onPress: close },
              { text: 'Mở cài đặt', onPress: () => Linking.openSettings() },
            ]
          );
        }
      }
    } catch (error) {
      console.error('Camera permission error:', error);
      setCameraError('Không thể truy cập camera. Vui lòng kiểm tra cài đặt.');
      Alert.alert(
        'Lỗi',
        'Không thể truy cập camera. Vui lòng đảm bảo ứng dụng đã được cài đặt đúng cách.',
        [{ text: 'OK', onPress: close }]
      );
    }
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'code-128', 'code-39', 'code-93', 'ean-8', 'upc-e'],
    onCodeScanned: (codes) => {
      if (isScanning || codes.length === 0) return;
      
      setIsScanning(true);
      const scannedData = codes[0]?.value;
      
      if (scannedData) {
        // Vibrate on successful scan (optional)
        // Vibration.vibrate(100);
        
        setTimeout(() => {
          done(scannedData);
        }, 100);
      } else {
        setIsScanning(false);
      }
    },
  });

  const handlePickFromGallery = async () => {
    try {
      // TODO: Implement QR code reading from gallery
      // This requires additional setup with image picker and QR decoder
      Alert.alert('Thông báo', 'Chức năng tải ảnh từ thư viện đang được phát triển');
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleEnterManually = () => {
    close();
    // You can trigger another modal here for manual input
    // modal.open({
    //   modalId: 'enter-serial-modal',
    //   render: EnterSerialModal,
    //   onDone: (data) => done(data),
    // });
  };

  if (!isCameraAvailable || !hasPermission) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>
            {cameraError || 'Vui lòng cấp quyền truy cập camera để quét mã QR'}
          </Text>
          {isCameraAvailable && (
            <TouchableOpacity style={styles.settingsButton} onPress={() => Linking.openSettings()}>
              <Text style={styles.settingsButtonText}>Mở cài đặt</Text>
            </TouchableOpacity>
          )}
          {!isCameraAvailable && (
            <TouchableOpacity style={styles.settingsButton} onPress={close}>
              <Text style={styles.settingsButtonText}>Đóng</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000EA" />
        <Text style={styles.loadingText}>Đang tải camera...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Camera View */}
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive && hasPermission}
        codeScanner={codeScanner}
        enableZoomGesture
      />

      {/* Overlay with scanning frame */}
      <View style={styles.overlay}>
        {/* Top section with semi-transparent background */}
        <View style={styles.overlayTop}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={close}>
              <View style={styles.closeIcon}>
                <Text style={styles.closeIconText}>×</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.title}>Quét mã QR</Text>
          
          <Text style={styles.description}>
            Đối với SIM vật lý: Quét mã trên thẻ SIM{'\n'}
            Đối với eSIM: Quét mã QR đã gửi về email
          </Text>
        </View>

        {/* Center scanning area */}
        <View style={styles.scanningFrame}>
          <View style={styles.scanningArea}>
            {/* Corner borders */}
            <View style={[styles.corner, styles.cornerTopLeft]} />
            <View style={[styles.corner, styles.cornerTopRight]} />
            <View style={[styles.corner, styles.cornerBottomLeft]} />
            <View style={[styles.corner, styles.cornerBottomRight]} />
          </View>
        </View>

        {/* Bottom section with buttons */}
        <View style={styles.overlayBottom}>
          <TouchableOpacity style={styles.uploadButton} onPress={handlePickFromGallery}>
            <View style={styles.uploadIcon}>
              <Text style={styles.uploadIconText}>↑</Text>
            </View>
            <Text style={styles.uploadButtonText}>Tải mã QR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.manualButton} onPress={handleEnterManually}>
            <Text style={styles.manualButtonText}>Nhập số serial</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Scanning indicator */}
      {isScanning && (
        <View style={styles.scanningIndicator}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.scanningText}>Đang xử lý...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
     borderRadius: 16,
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(18, 18, 18, 0.4)',
  },
  overlayTop: {
    paddingTop:  10,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',

  },
  closeButton: {
    padding: 8,
  },
  closeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIconText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '300',
    lineHeight: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Inter',
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 21,
    fontFamily: 'KoHo',
  },
  scanningFrame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanningArea: {
    width: 250,
    height: 250,
    backgroundColor: 'transparent',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#FFFFFF',
    borderWidth: 3,
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 12,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 12,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 12,
  },
  overlayBottom: {
    paddingHorizontal: 25,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    gap: 12,
    alignItems: 'center',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginBottom: 12,
    gap: 8,
    minWidth: 185,
  },
  uploadIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIconText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  manualButton: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0000EA',
  },
  manualButtonText: {
    color: '#0000EA',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  scanningIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanningText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 16,
    fontWeight: '500',
  },
  permissionContainer: {
    padding: 32,
    alignItems: 'center',
  },
  permissionText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  settingsButton: {
    backgroundColor: '#0000EA',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  settingsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 16,
  },
});

// Helper function to open the modal
export const showScanQRModal = () => {
  return new Promise<string>((resolve, reject) => {
    modal.showBottomSheet<string>({
      render: <ModalScanQR />,
      onDone: (data) => {
        resolve(data);
      },
      onClose: () => {
        reject(new Error('User cancelled'));
      },
      props:{
        maxHeight: 1,
      } as Omit<BottomSheetProps, 'visible'>,
    });
  });
};

export default ModalScanQR;
