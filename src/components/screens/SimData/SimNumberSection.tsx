import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconData } from '../../Svgs';

interface SimNumberSectionProps {
	phoneNumber: string;
	onChangeNumber?: () => void;
}

export const SimNumberSection: React.FC<SimNumberSectionProps> = ({
	phoneNumber,
	onChangeNumber
}) => {
	return (
		<View style={styles.container}>
			<View style={styles.iconContainer}>
				<IconData />
			</View>

			<View style={styles.contentContainer}>
				<Text style={styles.label}>Số dành cho bạn</Text>
				<Text style={styles.phoneNumber}>{phoneNumber}</Text>
			</View>

			<TouchableOpacity style={styles.changeButton} onPress={onChangeNumber}>
				<Text style={styles.changeButtonText}>Chọn số khác</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	iconContainer: {
		width: 41,
		height: 41,
	},
	simIcon: {
		width: 41,
		height: 41,
		backgroundColor: '#0000EA',
		borderRadius: 12,
		justifyContent: 'center',
		alignItems: 'center',
	},
	simIconText: {
		color: '#FFFFFF',
		fontSize: 10,
		fontWeight: '600',
		fontFamily: 'Inter',
	},
	contentContainer: {
		flex: 1,
		gap: 4,
	},
	label: {
		fontFamily: 'Inter',
		fontSize: 14,
		fontWeight: '400',
		lineHeight: 20,
		color: '#5C5C5C',
	},
	phoneNumber: {
		fontFamily: 'Inter',
		fontSize: 18,
		fontWeight: '600',
		lineHeight: 26,
		color: '#333333',
	},
	changeButton: {
		backgroundColor: 'rgba(210, 0, 140, 0.1)',
		paddingVertical: 10,
		paddingHorizontal: 16,
		borderRadius: 1000,
	},
	changeButtonText: {
		fontFamily: 'Be Vietnam Pro',
		fontSize: 14,
		fontWeight: '600',
		lineHeight: 20,
		color: '#D2008C',
		letterSpacing: -0.23,
	},
});
