import { Button, Icon } from '@rneui/themed';
import React, { useEffect, useRef, useState } from 'react';
import {
	ActivityIndicator,
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import ModalType from '../../types/modal';
import { modal, useModal } from '../common/modal';

interface VideoData {
	path: string;
	duration: number;
	size: number;
	width: number;
	height: number;
	dataBase64?: string;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ModalRecordVideoProps {
	visible: boolean;
	onCapture?: (video: VideoData) => void;
	maxDuration?: number;
	cameraPosition?: 'back' | 'front';
}

export const ModalRecordVideo: React.FC<ModalRecordVideoProps> = ({
	visible,
	onCapture,
	maxDuration = 60,
	cameraPosition = 'back',
}) => {
	const { close, done } = useModal();
	const camera = useRef<Camera>(null);
	const device = useCameraDevice(cameraPosition);
	const { hasPermission: hasCameraPermission, requestPermission: requestCameraPermission } = useCameraPermission();

	const [isActive, setIsActive] = useState(false);
	const [isRecording, setIsRecording] = useState(false);
	const [recordedVideo, setRecordedVideo] = useState<VideoData | null>(null);
	const [showPreview, setShowPreview] = useState(false);
	const [recordingTime, setRecordingTime] = useState(maxDuration);
	const recordingTimerRef = useRef<number | null>(null);

	const [hasMicrophonePermission, setHasMicrophonePermission] = useState<boolean>(false);
	const [isCheckingPermissions, setIsCheckingPermissions] = useState<boolean>(true);
	const [permissionError, setPermissionError] = useState<string>('');

	// Kiểm tra và yêu cầu quyền camera và microphone
	useEffect(() => {
		const checkPermissions = async () => {
			setIsCheckingPermissions(true);
			setPermissionError('');

			try {
				// Kiểm tra quyền camera
				let cameraGranted = hasCameraPermission;
				if (!cameraGranted) {
					const cameraResult = await requestCameraPermission();
					cameraGranted = cameraResult;

					if (!cameraGranted) {
						setPermissionError('Không có quyền truy cập camera');
						setIsCheckingPermissions(false);
						return;
					}
				}

				// Kiểm tra quyền microphone
				const micPermissionStatus = await Camera.getMicrophonePermissionStatus();
				console.log('Trạng thái quyền microphone:', micPermissionStatus);

				if (micPermissionStatus === 'granted') {
					setHasMicrophonePermission(true);
				} else if (micPermissionStatus === 'not-determined') {
					// Yêu cầu quyền microphone
					const micResult = await Camera.requestMicrophonePermission();
					console.log('Kết quả yêu cầu quyền microphone:', micResult);

					if (micResult === 'granted') {
						setHasMicrophonePermission(true);
					} else {
						setHasMicrophonePermission(false);
						setPermissionError('Không có quyền truy cập microphone');
					}
				} else {
					// Quyền bị từ chối
					setHasMicrophonePermission(false);
					setPermissionError('Quyền microphone đã bị từ chối');
				}
			} catch (error) {
				console.error('Lỗi khi kiểm tra quyền:', error);
				setPermissionError('Lỗi khi kiểm tra quyền truy cập');
			} finally {
				setIsCheckingPermissions(false);
			}
		};

		if (visible) {
			checkPermissions();
		}
	}, [visible, hasCameraPermission, requestCameraPermission]);


	// Kích hoạt camera khi có đủ quyền
	useEffect(() => {
		if (visible && hasCameraPermission && hasMicrophonePermission && device) {
			setIsActive(true);
		} else {
			setIsActive(false);
		}

		return () => {
			setIsActive(false);
		};
	}, [visible, hasCameraPermission, hasMicrophonePermission, device]);

	const handleClose = () => {
		setIsActive(false);
		setIsRecording(false);
		setRecordedVideo(null);
		setShowPreview(false);
		setRecordingTime(maxDuration);
		if (recordingTimerRef.current) {
			clearInterval(recordingTimerRef.current);
		}
		close();
	};

	const handleRequestPermission = async () => {
		setIsCheckingPermissions(true);
		setPermissionError('');

		try {
			// Yêu cầu quyền camera
			if (!hasCameraPermission) {
				const cameraResult = await requestCameraPermission();
				if (!cameraResult) {
					setPermissionError('Không thể cấp quyền camera');
					setIsCheckingPermissions(false);
					return;
				}
			}

			// Yêu cầu quyền microphone
			const micResult = await Camera.requestMicrophonePermission();
			if (micResult === 'granted') {
				setHasMicrophonePermission(true);
			} else {
				setPermissionError('Không thể cấp quyền microphone');
			}
		} catch (error) {
			console.error('Lỗi khi yêu cầu quyền:', error);
			setPermissionError('Lỗi khi yêu cầu quyền truy cập');
		} finally {
			setIsCheckingPermissions(false);
		}
	};

	const startRecording = async () => {
		if (!camera.current || isRecording) return;

		try {
			setIsRecording(true);
			setRecordingTime(maxDuration);

			// Start recording timer (countdown)
			recordingTimerRef.current = setInterval(() => {
				setRecordingTime((prevTime) => {
					const newTime = prevTime - 1;
					// Auto-stop when reaching 0
					if (newTime <= 0) {
						stopRecording();
						return 0;
					}
					return newTime;
				});
			}, 1000);

			await camera.current.startRecording({
				flash: 'off',
				fileType: 'mp4',
				onRecordingFinished: async (video) => {
					console.log('Recording finished:', video);

					// Convert video to base64
					let base64Data = '';
					try {
						base64Data = await RNFS.readFile(video.path, 'base64');
					} catch (error) {
						console.error('Error converting video to base64:', error);
					}

					const videoData: VideoData = {
						path: video.path,
						duration: video.duration,
						size: 0, // Size not available in VideoFile type
						width: video.width || 0,
						height: video.height || 0,
						dataBase64: base64Data,
					};
					setRecordedVideo(videoData);
					setShowPreview(true);
					setIsActive(false);
				},
				onRecordingError: (error) => {
					console.error('Recording error:', error);
					setIsRecording(false);
					if (recordingTimerRef.current) {
						clearInterval(recordingTimerRef.current);
					}
				},
			});
		} catch (error) {
			console.error('Error starting recording:', error);
			setIsRecording(false);
			if (recordingTimerRef.current) {
				clearInterval(recordingTimerRef.current);
			}
		}
	};

	const stopRecording = async () => {
		if (!camera.current || !isRecording) return;

		try {
			await camera.current.stopRecording();
			setIsRecording(false);
			if (recordingTimerRef.current) {
				clearInterval(recordingTimerRef.current);
			}
		} catch (error) {
			console.error('Error stopping recording:', error);
		}
	};

	const handleRecordPress = () => {
		if (isRecording) {
			stopRecording();
		} else {
			startRecording();
		}
	};

	const handleRetake = () => {
		setRecordedVideo(null);
		setShowPreview(false);
		setIsActive(true);
		setRecordingTime(maxDuration);
	};

	const handleConfirm = () => {
		if (recordedVideo) {
			if (onCapture) {
				onCapture(recordedVideo);
			}
			done(recordedVideo);
			setShowPreview(false);
		}
	};

	useEffect(() => {
		if (recordingTime === 0) {
			handleRecordPress();
		}
	}, [recordingTime]);

	const formatTime = (seconds: number): string => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	};

	// Hiển thị màn hình loading khi đang kiểm tra quyền
	if (isCheckingPermissions) {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity style={styles.closeButton} onPress={handleClose}>
						<Icon name="x" type="feather" size={24} color="#1F2024" />
					</TouchableOpacity>
					<Text style={styles.headerTitle}>Quay video</Text>
					<View style={styles.headerSpacer} />
				</View>
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#0057D3" />
					<Text style={styles.loadingText}>Đang kiểm tra quyền truy cập...</Text>
				</View>
			</View>
		);
	}

	// Hiển thị màn hình yêu cầu quyền nếu chưa có đủ quyền
	if (!hasCameraPermission || !hasMicrophonePermission) {
		const missingPermissions = [];
		if (!hasCameraPermission) missingPermissions.push('camera');
		if (!hasMicrophonePermission) missingPermissions.push('microphone');

		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity style={styles.closeButton} onPress={handleClose}>
						<Icon name="x" type="feather" size={24} color="#1F2024" />
					</TouchableOpacity>
					<Text style={styles.headerTitle}>Quay video</Text>
					<View style={styles.headerSpacer} />
				</View>
				<View style={styles.permissionContainer}>
					<Icon
						name={!hasCameraPermission ? "video-off" : "mic-off"}
						type="feather"
						size={64}
						color="#666"
					/>
					<Text style={styles.permissionText}>
						{!hasCameraPermission && !hasMicrophonePermission
							? 'Cần quyền truy cập camera và microphone để quay video'
							: !hasCameraPermission
								? 'Cần quyền truy cập camera để quay video'
								: 'Cần quyền truy cập microphone để ghi âm'}
					</Text>
					{permissionError ? (
						<Text style={styles.errorText}>{permissionError}</Text>
					) : null}
					<Button
						title="Cho phép truy cập"
						onPress={handleRequestPermission}
						buttonStyle={styles.permissionButton}
						titleStyle={styles.permissionButtonText}
						containerStyle={styles.permissionButtonContainer}
						disabled={isCheckingPermissions}
					/>
					<Button
						title="Hủy"
						onPress={handleClose}
						type="clear"
						titleStyle={styles.cancelButtonText}
						containerStyle={styles.cancelButtonContainer}
					/>
				</View>
			</View>
		);
	}

	if (!device) {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity style={styles.closeButton} onPress={handleClose}>
						<Icon name="x" type="feather" size={24} color="#1F2024" />
					</TouchableOpacity>
					<Text style={styles.headerTitle}>Quay video</Text>
					<View style={styles.headerSpacer} />
				</View>
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#0057D3" />
					<Text style={styles.loadingText}>Đang khởi động camera...</Text>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{!showPreview ? (
				<>
					{/* Header */}
					<View style={styles.header}>
						<TouchableOpacity style={styles.closeButton} onPress={handleClose}>
							<Icon name="x" type="feather" size={24} color="#1F2024" />
						</TouchableOpacity>
						<Text style={styles.headerTitle}>Quay video</Text>
						<View style={styles.headerSpacer} />
					</View>

					{/* Camera View */}
					<View style={styles.cameraContainer}>
						<Camera
							ref={camera}
							style={styles.camera}
							device={device}
							isActive={isActive && visible}
							video={true}
							audio={true}

						/>

						{/* Recording Timer */}
						{isRecording && (
							<View style={styles.timerContainer}>
								<View style={styles.recordingIndicator} />
								<Text style={styles.timerText}>{formatTime(recordingTime)}</Text>
							</View>
						)}
					</View>

					{/* Instructions */}
					<View style={styles.instructionsContainer}>
						<Text style={styles.instructionsText}>
							{isRecording
								? 'Nhấn nút để dừng quay'
								: 'Nhấn nút để bắt đầu quay video'}
						</Text>
					</View>

					{/* Record Button */}
					<View style={styles.controlsContainer}>
						<TouchableOpacity
							style={[
								styles.recordButton,
								isRecording && styles.recordButtonActive,
							]}
							onPress={handleRecordPress}
						>
							<View
								style={[
									styles.recordButtonInner,
									isRecording && styles.recordButtonInnerActive,
								]}
							/>
						</TouchableOpacity>
					</View>
				</>
			) : (
				<>
					{/* Header */}
					<View style={styles.header}>
						<TouchableOpacity style={styles.closeButton} onPress={handleClose}>
							<Icon name="x" type="feather" size={24} color="#1F2024" />
						</TouchableOpacity>
						<Text style={styles.headerTitle}>Xem lại video</Text>
						<View style={styles.headerSpacer} />
					</View>

					{/* Video Preview */}
					<View style={styles.cameraContainer}>
						{recordedVideo && (
							<Video
								source={{ uri: `file://${recordedVideo.path}` }}
								style={styles.camera}
								resizeMode="cover"
								repeat
								muted={false}
								controls={false}
								paused={false}
							/>
						)}
					</View>

					{/* Preview Instructions */}
					<View style={styles.instructionsContainer}>
						<Text style={styles.instructionsText}>
							Xem lại video và xác nhận hoặc quay lại
						</Text>
					</View>

					{/* Action Buttons */}
					<View style={styles.actionButtonsContainer}>
						<Button
							title="Quay lại"
							onPress={handleRetake}
							type="outline"
							buttonStyle={styles.retakeButton}
							titleStyle={styles.retakeButtonText}
							containerStyle={styles.actionButton}
						/>
						<Button
							title="Sử dụng video"
							onPress={handleConfirm}
							buttonStyle={styles.confirmButton}
							titleStyle={styles.confirmButtonText}
							containerStyle={styles.actionButton}
						/>
					</View>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFFF',
		borderRadius: 12,
		overflow: 'hidden',

		height: 550,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',

		borderBottomWidth: 1,
		borderBottomColor: '#F1F1F1',
	},
	closeButton: {
		width: 24,
		height: 24,
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerTitle: {
		flex: 1,
		fontSize: 18,
		fontWeight: '700',
		color: '#1F2024',
		textAlign: 'center',
		fontFamily: 'KoHo',
	},
	headerSpacer: {
		width: 24,
	},
	cameraContainer: {
		height: 380,
		backgroundColor: '#000000',
		borderRadius: 8,

		marginTop: 16,
		overflow: 'hidden',
		position: 'relative',
	},
	camera: {
		flex: 1,
	},
	timerContainer: {
		position: 'absolute',
		top: 16,
		left: 16,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 20,
	},
	recordingIndicator: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#FF3B30',
		marginRight: 8,
	},
	timerText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#FFFFFF',
		fontFamily: 'KoHo',
	},
	instructionsContainer: {
		paddingHorizontal: 24,
		paddingVertical: 16,
		alignItems: 'center',
	},
	instructionsText: {
		fontSize: 14,
		fontWeight: '400',
		color: '#6B6B6B',
		textAlign: 'center',
		lineHeight: 21,
		fontFamily: 'KoHo',
	},
	controlsContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 32,
	},
	recordButton: {
		width: 72,
		height: 72,
		borderRadius: 36,
		backgroundColor: '#FFFFFF',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 4,
		borderColor: '#0057D3',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
	},
	recordButtonActive: {
		borderColor: '#FF3B30',
	},
	recordButtonInner: {
		width: 56,
		height: 56,
		borderRadius: 28,
		backgroundColor: '#0057D3',
	},
	recordButtonInnerActive: {
		width: 24,
		height: 24,
		borderRadius: 4,
		backgroundColor: '#FF3B30',
	},
	actionButtonsContainer: {
		flexDirection: 'row',
		gap: 12,

		paddingBottom: 20,
	},
	actionButton: {
		flex: 1,
	},
	retakeButton: {
		height: 48,
		borderWidth: 1,
		borderColor: '#0057D3',
		backgroundColor: '#FFFFFF',

		justifyContent: 'center',
		alignItems: 'center',
	},
	retakeButtonText: {
		fontSize: 16,
		fontWeight: '700',
		color: '#ffffff',
		fontFamily: 'KoHo',
	},
	confirmButton: {
		height: 48,
		backgroundColor: '#0057D3',

		justifyContent: 'center',
		alignItems: 'center',
	},
	confirmButtonText: {
		fontSize: 16,
		fontWeight: '700',
		color: '#FFFFFF',
		fontFamily: 'KoHo',
	},
	permissionContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 24,
	},
	permissionText: {
		fontSize: 16,
		color: '#333',
		textAlign: 'center',
		marginTop: 20,
		marginBottom: 30,
		fontFamily: 'KoHo',
	},
	permissionButton: {
		backgroundColor: '#0057D3',
		paddingHorizontal: 30,
		paddingVertical: 12,
		borderRadius: 8,
		height: 48,
	},
	permissionButtonContainer: {
		marginBottom: 10,
		width: 200,
	},
	permissionButtonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: '600',
		fontFamily: 'KoHo',
	},
	cancelButtonContainer: {
		width: 200,
	},
	cancelButtonText: {
		color: '#666',
		fontSize: 16,
		fontFamily: 'KoHo',
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	loadingText: {
		fontSize: 16,
		color: '#333',
		marginTop: 16,
		fontFamily: 'KoHo',
	},
	errorText: {
		fontSize: 14,
		color: '#FF3B30',
		textAlign: 'center',
		marginTop: 10,
		marginBottom: 10,
		fontFamily: 'KoHo',
	},
});

// Helper function to open the modal
export const showRecordVideoModal = (options?: {
	maxDuration?: number;
	cameraPosition?: 'back' | 'front';
}) => {
	return new Promise<VideoData | null>((resolve, reject) => {
		modal.open({
			render: (
				<ModalRecordVideo
					visible={true}
					maxDuration={options?.maxDuration || 60}
					cameraPosition={options?.cameraPosition || 'back'}
				/>
			),
			onDone: (data) => {
				resolve(data as VideoData);
			},
			onClose: () => {
				resolve(null);
			},
			props: {
				closeOnBackdrop: false,
			} as ModalType.BaseModalProps,
		});
	});
};

export default ModalRecordVideo;
