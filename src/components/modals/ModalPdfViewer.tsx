import { Button, Icon } from '@rneui/themed';
import React, { useState } from 'react';
import {
	ActivityIndicator,
	Dimensions,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Pdf from 'react-native-pdf';
import ModalType from '../../types/modal';
import { modal, useModal } from '../common/modal';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ModalPdfViewerProps {
	visible: boolean;
	pdfSource: string | { uri: string; cache?: boolean } | number;
	title?: string;
	showPageNumbers?: boolean;
	enablePaging?: boolean;
	onLoadComplete?: (numberOfPages: number, filePath: string) => void;
	onError?: (error: Error) => void;
}

export const ModalPdfViewer: React.FC<ModalPdfViewerProps> = ({
	visible,
	pdfSource,
	title = 'PDF Viewer',
	showPageNumbers = true,
	enablePaging = true,
	onLoadComplete,
	onError,
}) => {
	const { close } = useModal();
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const handleClose = () => {
		close();
	};

	const handleLoadComplete = (numberOfPages: number, filePath: string) => {
		setTotalPages(numberOfPages);
		setIsLoading(false);
		if (onLoadComplete) {
			onLoadComplete(numberOfPages, filePath);
		}
	};

	const handlePageChanged = (page: number, numberOfPages: number) => {
		setCurrentPage(page);
	};

	const handleError = (err: Error) => {
		console.error('PDF Error:', err);
		setError(err.message || 'Failed to load PDF');
		setIsLoading(false);
		if (onError) {
			onError(err);
		}
	};

	// Normalize PDF source
	const getPdfSource = () => {
		if (typeof pdfSource === 'string') {
			// If it's a URL
			if (pdfSource.startsWith('http://') || pdfSource.startsWith('https://')) {
				return { uri: pdfSource, cache: true };
			}
			// If it's a file path
			if (pdfSource.startsWith('file://')) {
				return { uri: pdfSource };
			}
			// If it's a local path without file://
			return { uri: `file://${pdfSource}` };
		}
		// If it's already an object or a resource number
		return pdfSource;
	};

	if (!visible) return null;

	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<TouchableOpacity style={styles.backButton} onPress={handleClose}>
					<Icon name="chevron-left" type="feather" size={24} color="#333" />
				</TouchableOpacity>
				<Text style={styles.headerTitle} numberOfLines={1}>
					{title}
				</Text>
				<View style={styles.headerSpacer} />
			</View>

			{/* PDF Viewer */}
			<View style={styles.pdfContainer}>
				{error ? (
					<View style={styles.errorContainer}>
						<Icon name="alert-circle" type="feather" size={64} color="#FF3B30" />
						<Text style={styles.errorTitle}>Unable to load PDF</Text>
						<Text style={styles.errorMessage}>{error}</Text>
						<Button
							title="Close"
							onPress={handleClose}
							buttonStyle={styles.errorButton}
							titleStyle={styles.errorButtonText}
							containerStyle={styles.errorButtonContainer}
						/>
					</View>
				) : (
					<>
						<Pdf
							source={getPdfSource()}
							style={styles.pdf}
							onLoadComplete={handleLoadComplete}
							onPageChanged={handlePageChanged}
							onError={handleError}
							enablePaging={enablePaging}
							horizontal={false}
							spacing={10}
							fitPolicy={0} // 0: fit width, 1: fit height, 2: fit both
							trustAllCerts={false}
						/>

						{/* Loading Indicator */}
						{isLoading && (
							<View style={styles.loadingContainer}>
								<ActivityIndicator size="large" color="#007AFF" />
								<Text style={styles.loadingText}>Loading PDF...</Text>
							</View>
						)}

						{/* Page Counter */}
						{showPageNumbers && totalPages > 0 && !isLoading && (
							<View style={styles.pageCounter}>
								<Text style={styles.pageCounterText}>
									{currentPage} / {totalPages}
								</Text>
							</View>
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
		backgroundColor: '#F5F5F5',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: 56,
		paddingHorizontal: 16,
		backgroundColor: '#FFFFFF',
		borderBottomWidth: 1,
		borderBottomColor: '#E5E5E5',
		...Platform.select({
			ios: {
				shadowColor: '#000',
				shadowOffset: {
					width: 0,
					height: 2,
				},
				shadowOpacity: 0.1,
				shadowRadius: 3,
			},
			android: {
				elevation: 4,
			},
		}),
	},
	backButton: {
		width: 44,
		height: 44,
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerTitle: {
		flex: 1,
		fontSize: 17,
		fontWeight: '600',
		color: '#333',
		textAlign: 'center',
		marginHorizontal: 8,
	},
	headerSpacer: {
		width: 44,
	},
	pdfContainer: {
		flex: 1,
		position: 'relative',
	},
	pdf: {
		flex: 1,
		width: SCREEN_WIDTH,
		backgroundColor: '#F5F5F5',
	},
	loadingContainer: {
		...StyleSheet.absoluteFillObject,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5F5F5',
	},
	loadingText: {
		fontSize: 16,
		color: '#666',
		marginTop: 16,
		fontWeight: '500',
	},
	pageCounter: {
		position: 'absolute',
		bottom: Platform.OS === 'ios' ? 40 : 24,
		alignSelf: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
	},
	pageCounterText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#FFFFFF',
	},
	errorContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 24,
	},
	errorTitle: {
		fontSize: 20,
		fontWeight: '600',
		color: '#333',
		marginTop: 16,
		marginBottom: 8,
	},
	errorMessage: {
		fontSize: 14,
		color: '#666',
		textAlign: 'center',
		marginBottom: 24,
	},
	errorButton: {
		backgroundColor: '#007AFF',
		paddingHorizontal: 32,
		paddingVertical: 12,
		borderRadius: 8,
		height: 48,
	},
	errorButtonContainer: {
		marginTop: 8,
		minWidth: 120,
	},
	errorButtonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: '600',
	},
});

// Helper function to open the PDF viewer modal
export const showPdfViewerModal = (options: {
	pdfSource: string | { uri: string; cache?: boolean } | number;
	title?: string;
	showPageNumbers?: boolean;
	enablePaging?: boolean;
	onLoadComplete?: (numberOfPages: number, filePath: string) => void;
	onError?: (error: Error) => void;
}) => {
	return new Promise<void>((resolve, reject) => {
		console.log('Showing PDF Viewer Modal with source:', options.pdfSource);

		modal.showBottomSheet({
			render: (
				<ModalPdfViewer
					visible={true}
					pdfSource={options.pdfSource}
					title={options.title || 'PDF Viewer'}
					showPageNumbers={options.showPageNumbers !== false}
					enablePaging={options.enablePaging !== false}
					onLoadComplete={options.onLoadComplete}
					onError={options.onError}
				/>
			),
			onDone: () => {
				resolve();
			},
			onClose: () => {
				resolve();
			},
			props: {
				closeOnBackdrop: false,
				maxHeight: 1,
			} as ModalType.BottomSheet,
		});
	});
};

export default ModalPdfViewer;
