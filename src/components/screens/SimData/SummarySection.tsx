import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CustomButton } from '../../common/CustomButton';

interface SummarySectionProps {
	totalAmount: string;
	onAddToCart?: () => void;
	onCheckout?: () => void;
}

export const SummarySection: React.FC<SummarySectionProps> = ({
	totalAmount,
	onAddToCart,
	onCheckout,
}) => {
	return (
		<View style={styles.container}>
			{/* Total Amount */}
			<View style={styles.totalRow}>
				<Text style={styles.totalLabel}>Tổng cộng</Text>
				<Text style={styles.totalAmount}>{totalAmount}</Text>
			</View>

			{/* Action Buttons */}
			<View style={styles.buttonRow}>
				<CustomButton
					title="Thêm vào giỏ hàng"
					type="outline"
					size="small"
					onPress={onAddToCart}
					width={168}
				/>
				<CustomButton
					title="Thanh toán"
					type="primary"
					size="small"
					onPress={onCheckout}
					width={167}
				/>
			</View>

			{/* Home Indicator */}
			<View style={styles.homeIndicator} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFFF',
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 0,
		gap: 12,
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: -2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 8,
	},
	totalRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 8,
	},
	totalLabel: {
		fontFamily: 'Inter',
		fontSize: 14,
		fontWeight: '500',
		lineHeight: 20,
		color: '#333333',
		flex: 1,
	},
	totalAmount: {
		fontFamily: 'Inter',
		fontSize: 18,
		fontWeight: '600',
		lineHeight: 26,
		color: '#333333',
		textAlign: 'right',
	},
	buttonRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 10,
	},
	homeIndicator: {
		width: 375,
		height: 21,
		alignSelf: 'center',
		marginLeft: -16,
		marginRight: -16,
	},
});
