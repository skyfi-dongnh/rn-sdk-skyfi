import { Icon } from '@rneui/themed';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { toCurrency } from '../../../utils/format';



interface SimTypeSectionProps {
	selectedType: SimData.SimType;
	onTypeChange: (type: SimData.SimType) => void;
	price: number;
	basePrice?: number;

}

export const SimTypeSection: React.FC<SimTypeSectionProps> = ({
	selectedType,
	onTypeChange,
	price,
	basePrice
}) => {
	return (
		<View style={styles.container}>
			<View style={styles.optionsRow}>
				<View style={styles.radioGroup}>
					<TouchableOpacity
						style={styles.radioOption}
						onPress={() => onTypeChange('USIM')}
					>
						<View style={[
							styles.radioCircle,
							selectedType === 'USIM' && styles.radioCircleSelected
						]}>
							{selectedType === 'USIM' && (
								<View style={styles.radioInner} />
							)}
						</View>
						<Text style={styles.radioLabel}>SIM vật lý</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.radioOption}
						onPress={() => onTypeChange('ESIM')}
					>
						<View style={[
							styles.radioCircle,
							selectedType === 'ESIM' && styles.radioCircleSelected
						]}>
							{selectedType === 'ESIM' && (
								<View style={styles.radioInner} />
							)}
						</View>
						<Text style={styles.radioLabel}>eSIM</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.priceContainer}>
					<View style={{ flexDirection: 'column' }}
					>
						<Text style={styles.price}>{toCurrency(price)}</Text>
						{basePrice || basePrice > price ? <Text style={styles.basePrice}>{toCurrency(basePrice)}</Text> : null}
					</View>
					<Icon
						name="information-circle-outline"
						type="ionicon"
						size={24}
						color="rgba(128, 128, 128, 0.55)"
					/>
				</View>
			</View>

			{selectedType === 'USIM' ? (
				<Text style={styles.shippingNote}>
					*Giao SIM vật lý tận nhà - Miễn phí vận chuyển
				</Text>
			) : (
				<Text style={styles.shippingNote}>
					Lưu ý: eSIM là SIM điện tử, được gửi qua email khách hàng. eSIM chỉ sử dụng được trên các thiết bị di động có hỗ trợ.
					Xem danh sách thiết bị
				</Text>)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 8,
	},
	optionsRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 4,
	},
	radioGroup: {
		flexDirection: 'row',
		gap: 24,
		flex: 1,
	},
	radioOption: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	radioCircle: {
		width: 24,
		height: 24,
		borderRadius: 12,
		borderWidth: 1.5,
		borderColor: '#A1A1A1',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
	},
	radioCircleSelected: {
		borderColor: '#0000EA',
		borderWidth: 1.5,
	},
	radioInner: {
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor: '#0000EA',
	},
	radioLabel: {
		fontFamily: 'Inter',
		fontSize: 14,
		fontWeight: '400',
		lineHeight: 20,
		color: '#333333',
	},
	priceContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	price: {
		fontFamily: 'Inter',
		fontSize: 18,
		fontWeight: '600',

		color: '#333333',
	},
	basePrice: {
		fontFamily: 'Inter',
		fontSize: 16,
		textDecorationLine: 'line-through',
		color: '#A1A1A1',
	},
	shippingNote: {
		fontFamily: 'Inter',
		fontSize: 12,
		fontWeight: '400',
		lineHeight: 16,
		color: '#5C5C5C',
	},
});
