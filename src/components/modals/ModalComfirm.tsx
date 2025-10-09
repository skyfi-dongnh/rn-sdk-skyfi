
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from '../../types/modal';
import { modal, useModal } from "../common";

type ModalProps = {
	title: string;
	description: string;
	closeLabel?: string;
	confirmLabel?: string;
	onClose?(): void;
	onConfirm?(): void;
	closeOnBackdrop?: boolean;
}

const ConfirmModalContent = ({ title, description, closeLabel, confirmLabel }: ModalProps) => {
	const { close, done } = useModal();
	return (
		<View style={styles.modalContent}>
			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.description}>
					{description}
				</Text>
			</View>

			{/* Buttons */}
			<View style={styles.buttonContainer}>
			{closeLabel && (
				<TouchableOpacity style={styles.outlineButton} onPress={close}>
					<Text style={styles.outlineButtonText}>{closeLabel}</Text>
				</TouchableOpacity>
			)}

			{confirmLabel && (
				<TouchableOpacity style={styles.primaryButton} onPress={done}>
					<Text style={styles.primaryButtonText}>{confirmLabel}</Text>
				</TouchableOpacity>
			)}
			</View>
		</View>
	);
};


export const showMessage = ({closeOnBackdrop,...props}:ModalProps) => {
	modal.open({
	  render: <ConfirmModalContent {...props} />,
	  onDone: (data: any) => {
		props.onConfirm && props.onConfirm();
	  },
	  onClose: () => {
		props.onClose && props.onClose();
	  },
	  props: {
		closeOnBackdrop: false,
	  } as Modal.BaseModal,
	});
  };

const styles = StyleSheet.create({



	// Modal content styles (based on Figma design)
	modalContent: {
		gap: 24,
	},
	header: {
		gap: 12,
		alignItems: 'center',
	},
	title: {
		fontSize: 22,
		fontWeight: '700',
		lineHeight: 26.4,
		color: '#D2008C',
		textAlign: 'center',
	},
	description: {
		fontSize: 12,
		fontWeight: '500',
		lineHeight: 15,
		color: '#5C5C5C',
		textAlign: 'center',
		width: 300,
	},
	buttonContainer: {
		flexDirection: 'row',
		gap: 10,
		justifyContent: 'center',
	},
	outlineButton: {
		paddingVertical: 10,
		paddingHorizontal: 16,
		borderRadius: 1000,
		borderWidth: 1,
		borderColor: 'rgba(84, 85, 86, 0.12)',
		backgroundColor: '#FFFFFF',
		width: 144,
		alignItems: 'center',
	},
	outlineButtonText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#0E0E0F',
		lineHeight: 20,
	},
	primaryButton: {
		paddingVertical: 10,
		paddingHorizontal: 16,
		borderRadius: 1000,
		width: 144,
		alignItems: 'center',
		backgroundColor: '#6100FF', // Fallback color - use LinearGradient component for actual gradient
	},
	primaryButtonText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#FFFFFF',
		lineHeight: 20,
	},

	// Bottom sheet styles
	bottomSheetContent: {
		gap: 16,
	},
	bottomSheetTitle: {
		fontSize: 20,
		fontWeight: '700',
		textAlign: 'center',
	},
	bottomSheetText: {
		fontSize: 16,
		textAlign: 'center',
		color: '#666',
	},
	bottomSheetButtons: {
		flexDirection: 'row',
		gap: 12,
		justifyContent: 'center',
	},

	// Sheet styles
	sheetContent: {
		gap: 16,
	},
	sheetTitle: {
		fontSize: 18,
		fontWeight: '700',
		textAlign: 'center',
	},
	sheetText: {
		fontSize: 14,
		textAlign: 'center',
		color: '#666',
	},
	sheetButtons: {
		flexDirection: 'row',
		gap: 12,
		justifyContent: 'center',
	},
});