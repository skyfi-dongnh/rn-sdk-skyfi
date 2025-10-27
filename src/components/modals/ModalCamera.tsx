import { Button, Icon } from '@rneui/themed';
import React, { useEffect, useRef, useState } from 'react';
import {
	ActivityIndicator,
	Dimensions,
	Image,
	Platform,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import ModalType from '../../types/modal';
import { modal, useModal } from '../common/modal';

interface PhotoData {
	path: string;
	width: number;
	height: number;
	orientation: string;
	isMirrored: boolean;
	base64: string;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Frame guide dimensions
const FRAME_WIDTH_BACK = SCREEN_WIDTH - 33; // 360px for back camera (ID card)
const FRAME_HEIGHT_BACK = 240;
const FRAME_BORDER_RADIUS_BACK = 12;

// Ellipse frame for front camera (selfie)
const FRAME_WIDTH_FRONT = 280; // Ellipse width
const FRAME_HEIGHT_FRONT = 360; // Ellipse height (taller than wide for portrait)

interface ModalCameraProps {
	visible: boolean;
	onCapture?: (photo: any) => void;
	title?: string;
	subtitle?: string;
	cameraPosition?: 'back' | 'front';
}

export const ModalCamera: React.FC<ModalCameraProps> = ({
	visible,
	onCapture,
	title = 'Chụp ảnh CCCD',
	subtitle = 'Mặt trước',
	cameraPosition = 'back',


}) => {
	const { close, done } = useModal();
	const camera = useRef<Camera>(null);
	const device = useCameraDevice(cameraPosition);
	const { hasPermission, requestPermission } = useCameraPermission();
	const [isActive, setIsActive] = useState(false);
	const [isTakingPhoto, setIsTakingPhoto] = useState(false);
	const [capturedPhoto, setCapturedPhoto] = useState<PhotoData | null>(null);
	const [showPreview, setShowPreview] = useState(false);

	// Dynamic frame dimensions based on camera position
	const isCircularFrame = cameraPosition === 'front';
	const frameWidth = isCircularFrame ? FRAME_WIDTH_FRONT : FRAME_WIDTH_BACK;
	const frameHeight = isCircularFrame ? FRAME_HEIGHT_FRONT : FRAME_HEIGHT_BACK;
	const frameBorderRadius = FRAME_BORDER_RADIUS_BACK; // Use width/2 for ellipse to create smooth oval

	useEffect(() => {
		if (visible) {
			setIsActive(true);
			if (!hasPermission) {
				requestPermission();
			}
		} else {
			setIsActive(false);
		}
	}, [visible, hasPermission]);

	const handleClose = () => {
		setIsActive(false);
		close();
	};

	const handleTakePhoto = async () => {
		if (!camera.current || isTakingPhoto) return;

		try {
			setIsTakingPhoto(true);

			// Calculate target dimensions based on camera position
			const targetWidth = isCircularFrame ? FRAME_WIDTH_FRONT : FRAME_WIDTH_BACK;
			const targetHeight = isCircularFrame ? FRAME_HEIGHT_FRONT : FRAME_HEIGHT_BACK;

			// Take photo
			const photo = await camera.current.takePhoto({
				flash: 'off',
				enableShutterSound: false,
			});

			// Convert photo to base64 with compression
			const photoPath = photo.path.startsWith('file://') ? photo.path : `file://${photo.path}`;
			const response = await fetch(photoPath);
			const blob = await response.blob();

			// Convert to base64 with reduced quality
			const base64 = await new Promise<string>((resolve, reject) => {
				const reader = new FileReader();
				reader.onloadend = () => {
					const result = reader.result as string;
					// The base64 string includes the data:image/jpeg;base64, prefix
					resolve(result);
				};
				reader.onerror = reject;
				reader.readAsDataURL(blob);
			});

			const photoData: PhotoData = {
				path: photo.path,
				width: targetWidth,
				height: targetHeight,
				orientation: photo.orientation,
				isMirrored: photo.isMirrored,
				base64,
			};

			if (onCapture) {
				onCapture(photoData);
			}

			// Show preview instead of immediately closing
			setCapturedPhoto(photoData);
			setShowPreview(true);
			setIsActive(false);
		} catch (error) {
			console.error('Error taking photo:', error);
		} finally {
			setIsTakingPhoto(false);
		}
	};

	const handleRetake = () => {
		setCapturedPhoto(null);
		setShowPreview(false);
		setIsActive(true);
	};

	const handleConfirm = () => {
		if (capturedPhoto) {
			done(capturedPhoto);
			setShowPreview(false);
		}
	};

	if (!hasPermission) {
		return (
			<View style={styles.permissionContainer}>
				<Icon name="camera-off" type="feather" size={64} color="#666" />
				<Text style={styles.permissionText}>
					Cần quyền truy cập camera để chụp ảnh
				</Text>
				<Button
					title="Cho phép truy cập"
					onPress={requestPermission}
					buttonStyle={styles.permissionButton}
					titleStyle={styles.permissionButtonText}
					containerStyle={styles.permissionButtonContainer}
				/>
				<Button
					title="Hủy"
					onPress={handleClose}
					type="clear"
					titleStyle={styles.cancelButtonText}
					containerStyle={styles.cancelButtonContainer}
				/>
			</View>
		);
	}

	if (!device) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#FFFFFF" />
				<Text style={styles.loadingText}>Đang khởi động camera...</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" />
			<View style={styles.container}>
				{!showPreview ? (
					<>
						{/* Camera View */}
						<Camera
							ref={camera}
							style={StyleSheet.absoluteFill}
							device={device}
							isActive={isActive && visible}
							photo={true}
						/>

						{/* Dark Overlay with cutout for ID card frame */}
						<View style={styles.overlay}>
							{/* Top overlay */}
							<View style={styles.overlayTop} />

							{/* Middle row with frame */}
							<View style={[styles.overlayMiddle, { height: frameHeight }]}>
								<View style={styles.overlaySide} />
								<View style={[
									styles.frameGuide,
									{
										width: frameWidth,
										height: frameHeight,
										borderRadius: frameBorderRadius,
									},
								]}>
									{/* Corner brackets - only show for rectangular frame */}
									{!isCircularFrame && (
										<>
											<View style={[styles.corner, styles.cornerTopLeft]} />
											<View style={[styles.corner, styles.cornerTopRight]} />
											<View style={[styles.corner, styles.cornerBottomLeft]} />
											<View style={[styles.corner, styles.cornerBottomRight]} />
										</>
									)}
								</View>
								<View style={styles.overlaySide} />
							</View>

							{/* Bottom overlay */}
							<View style={styles.overlayBottom} />
						</View>

						{/* Header */}
						<View style={styles.header}>
							<View style={styles.statusBar} />
							<View style={styles.headerContent}>
								<TouchableOpacity style={styles.backButton} onPress={handleClose}>
									<Icon name="chevron-left" type="feather" size={24} color="#FFFFFF" />
								</TouchableOpacity>
								<Text style={styles.headerTitle}>{title}</Text>
								<View style={styles.headerSpacer} />
							</View>
						</View>

						{/* Subtitle */}
						<View style={styles.subtitleContainer}>
							<Text style={styles.subtitle}>{subtitle}</Text>
						</View>

						{/* Capture Button */}
						<View style={styles.bottomControls}>
							<TouchableOpacity
								style={styles.captureButton}
								onPress={handleTakePhoto}
								disabled={isTakingPhoto}
							>
								<View style={styles.captureButtonInner}>
									{isTakingPhoto && (
										<ActivityIndicator size="small" color="#FFFFFF" />
									)}
								</View>
							</TouchableOpacity>
						</View>


					</>
				) : (
					<>
						{/* Preview Screen */}
						{capturedPhoto && (
							<>
								{/* Photo Preview */}
								<Image
									source={{ uri: capturedPhoto.base64 }}
									style={StyleSheet.absoluteFill}
									resizeMode="contain"
								/>

								{/* Dark Overlay with cutout for ID card frame */}
								<View style={styles.overlay}>
									{/* Top overlay */}
									<View style={styles.overlayTop} />

									{/* Middle row with frame */}
									<View style={[styles.overlayMiddle, { height: frameHeight }]}>
										<View style={styles.overlaySide} />
										<View style={[
											styles.frameGuide,
											{
												width: frameWidth,
												height: frameHeight,
												borderRadius: frameBorderRadius,
											},
										]}>
											{/* Corner brackets - only show for rectangular frame */}
											{!isCircularFrame && (
												<>
													<View style={[styles.corner, styles.cornerTopLeft]} />
													<View style={[styles.corner, styles.cornerTopRight]} />
													<View style={[styles.corner, styles.cornerBottomLeft]} />
													<View style={[styles.corner, styles.cornerBottomRight]} />
												</>
											)}
										</View>
										<View style={styles.overlaySide} />
									</View>

									{/* Bottom overlay */}
									<View style={styles.overlayBottom} />
								</View>

								{/* Header */}
								<View style={styles.header}>
									<View style={styles.statusBar} />
									<View style={styles.headerContent}>
										<TouchableOpacity style={styles.backButton} onPress={handleClose}>
											<Icon name="chevron-left" type="feather" size={24} color="#FFFFFF" />
										</TouchableOpacity>
										<Text style={styles.headerTitle}>{title}</Text>
										<View style={styles.headerSpacer} />
									</View>
								</View>

								{/* Subtitle */}
								<View style={styles.subtitleContainer}>
									<Text style={styles.subtitle}>{subtitle}</Text>
								</View>

								{/* Help Text */}
								<View style={styles.helpTextContainer}>
									<Text style={styles.helpText}>
										Hãy đảm bảo hình ảnh GTTT của bạn không bị mờ, chói loá
									</Text>
								</View>

								{/* Bottom Action Buttons */}
								<View style={styles.bottomActionBar}>
									<View style={styles.buttonContainer}>
										<Button
											title="Chụp lại"
											onPress={handleRetake}
											type="outline"
											buttonStyle={styles.retakeButton}
											titleStyle={styles.retakeButtonText}
											containerStyle={styles.buttonWrapper}
										/>

										<Button
											title="Chọn"
											onPress={handleConfirm}
											buttonStyle={styles.confirmButton}
											titleStyle={styles.confirmButtonText}
											containerStyle={styles.buttonWrapper}
										/>
									</View>

								</View>
							</>
						)}
					</>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000000',
		borderRadius: 8
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'transparent',
	},
	overlayTop: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
	},
	overlayMiddle: {
		flexDirection: 'row',
		// height is set dynamically via inline style
	},
	overlaySide: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
	},
	frameGuide: {
		// width, height, and borderRadius are set dynamically via inline style
		borderWidth: 2,
		borderColor: '#F1F1F1',
		position: 'relative',
	},
	corner: {
		position: 'absolute',
		width: 24,
		height: 24,
		borderColor: '#F1F1F1',
	},
	cornerTopLeft: {
		top: -3,
		left: -3,
		borderTopWidth: 4,
		borderLeftWidth: 4,
		borderTopLeftRadius: FRAME_BORDER_RADIUS_BACK,
	},
	cornerTopRight: {
		top: -3,
		right: -3,
		borderTopWidth: 4,
		borderRightWidth: 4,
		borderTopRightRadius: FRAME_BORDER_RADIUS_BACK,
	},
	cornerBottomLeft: {
		bottom: -3,
		left: -3,
		borderBottomWidth: 4,
		borderLeftWidth: 4,
		borderBottomLeftRadius: FRAME_BORDER_RADIUS_BACK,
	},
	cornerBottomRight: {
		bottom: -3,
		right: -3,
		borderBottomWidth: 4,
		borderRightWidth: 4,
		borderBottomRightRadius: FRAME_BORDER_RADIUS_BACK,
	},
	overlayBottom: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
	},
	header: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		zIndex: 10,
	},
	statusBar: {
		height: Platform.OS === 'ios' ? 54 : StatusBar.currentHeight || 0,
		backgroundColor: 'transparent',
	},
	headerContent: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 50,
		paddingHorizontal: 16,
		backgroundColor: 'transparent',
	},
	backButton: {
		width: 44,
		height: 44,
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerTitle: {
		flex: 1,
		fontSize: 16,
		fontWeight: '600',
		color: '#FFFFFF',
		textAlign: 'center',
		fontFamily: 'Inter',
	},
	headerSpacer: {
		width: 20,
	},
	subtitleContainer: {
		position: 'absolute',
		top: 135,
		left: 0,
		right: 0,
		alignItems: 'center',
		zIndex: 10,
	},
	subtitle: {
		fontSize: 18,
		fontWeight: '700',
		color: '#FFFFFF',
		fontFamily: 'KoHo',
		textAlign: 'center',
	},
	bottomControls: {
		position: 'absolute',
		bottom: Platform.OS === 'ios' ? 100 : 80,
		left: 0,
		right: 0,
		alignItems: 'center',
		zIndex: 10,
	},
	captureButton: {
		width: 71,
		height: 71,
		borderRadius: 35.5,
		borderWidth: 5,
		borderColor: '#FFFFFF',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent',
	},
	captureButtonInner: {
		width: 57,
		height: 57,
		borderRadius: 28.5,
		backgroundColor: '#FFFFFF',
		justifyContent: 'center',
		alignItems: 'center',
	},
	homeIndicator: {
		position: 'absolute',
		bottom: 8,
		left: (SCREEN_WIDTH - 139) / 2,
		width: 139,
		height: 5,
		backgroundColor: '#FFFFFF',
		borderRadius: 2.5,
	},
	// Preview screen styles
	helpTextContainer: {
		position: 'absolute',
		bottom: 150,
		left: 0,
		right: 0,
		paddingHorizontal: 65,
		alignItems: 'center',
		zIndex: 10,
	},
	helpText: {
		fontSize: 14,
		fontWeight: '500',
		color: '#FFFFFF',
		fontFamily: 'KoHo',
		textAlign: 'center',
		lineHeight: 21,
	},
	bottomActionBar: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: Platform.OS === 'ios' ? 0 : 16,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.1,
		shadowRadius: 16,
		elevation: 8,
	},
	buttonContainer: {
		flexDirection: 'row',
		gap: 16,
		paddingBottom: 16,
	},
	buttonWrapper: {
		flex: 1,
	},
	retakeButton: {
		height: 48,
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 24,
		paddingVertical: 12,
	},
	retakeButtonText: {
		fontSize: 16,
		fontWeight: '700',
		color: '#FFFFFF',
		fontFamily: 'KoHo',
		textAlign: 'center',
		lineHeight: 24,
	},
	confirmButton: {
		height: 48,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 24,
		paddingVertical: 12,
	},
	confirmButtonText: {
		fontSize: 16,
		fontWeight: '700',
		color: '#FFFFFF',
		fontFamily: 'KoHo',
		textAlign: 'center',
		lineHeight: 24,
	},
	homeIndicatorPreview: {
		width: 139,
		height: 5,
		backgroundColor: '#000000',
		borderRadius: 2.5,
		alignSelf: 'center',
		marginTop: 8,
		marginBottom: 8,
	},
	permissionContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
		padding: 20,
	},
	permissionText: {
		fontSize: 16,
		color: '#333',
		textAlign: 'center',
		marginTop: 20,
		marginBottom: 30,
	},
	permissionButton: {
		backgroundColor: '#007AFF',
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
	},
	cancelButtonContainer: {
		width: 200,
	},
	cancelButtonText: {
		color: '#666',
		fontSize: 16,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#000000',
	},
	loadingText: {
		fontSize: 16,
		color: '#000000',
		marginTop: 16,
	},
});

// Helper function to open the modal
export const showCameraModal = (options?: {
	title?: string;
	subtitle?: string;
	cameraPosition?: 'back' | 'front';
}) => {
	return new Promise<PhotoData | null>((resolve, reject) => {
		modal.showBottomSheet({
			render: (
				<ModalCamera
					visible={true}
					title={options?.title || 'Chụp ảnh CCCD'}
					subtitle={options?.subtitle || 'Mặt trước'}
					cameraPosition={options?.cameraPosition || 'back'}
				/>
			),
			onDone: (data) => {
				resolve(data as PhotoData);
			},
			onClose: () => {
				resolve(null);
			},
			props: {
				closeOnBackdrop: false,
				maxHeight: 1
			} as ModalType.BottomSheet,
		});
	});
};

export default ModalCamera;
