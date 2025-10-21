import { Icon } from '@rneui/themed';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type SimType = 'physical' | 'esim';

interface SimTypeSectionProps {
	selectedType: SimType;
	onTypeChange: (type: SimType) => void;
	price?: string;
}

export const SimTypeSection: React.FC<SimTypeSectionProps> = ({ 
	selectedType, 
	onTypeChange,
	price = '0 VND'
}) => {
	return (
		<View style={styles.container}>
			<View style={styles.optionsRow}>
				<View style={styles.radioGroup}>
					<TouchableOpacity 
						style={styles.radioOption}
						onPress={() => onTypeChange('physical')}
					>
						<View style={[
							styles.radioCircle,
							selectedType === 'physical' && styles.radioCircleSelected
						]}>
							{selectedType === 'physical' && (
								<View style={styles.radioInner} />
							)}
						</View>
						<Text style={styles.radioLabel}>SIM vật lý</Text>
					</TouchableOpacity>
					
					<TouchableOpacity 
						style={styles.radioOption}
						onPress={() => onTypeChange('esim')}
					>
						<View style={[
							styles.radioCircle,
							selectedType === 'esim' && styles.radioCircleSelected
						]}>
							{selectedType === 'esim' && (
								<View style={styles.radioInner} />
							)}
						</View>
						<Text style={styles.radioLabel}>eSIM</Text>
					</TouchableOpacity>
				</View>
				
				<View style={styles.priceContainer}>
					<Text style={styles.price}>{price}</Text>
					<Icon
						name="information-circle-outline"
						type="ionicon"
						size={24}
						color="rgba(128, 128, 128, 0.55)"
					/>
				</View>
			</View>
			
			<Text style={styles.shippingNote}>
				*Giao SIM tại nhà - Có tính phí vận chuyển
			</Text>
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
		lineHeight: 26,
		color: '#333333',
	},
	shippingNote: {
		fontFamily: 'Inter',
		fontSize: 12,
		fontWeight: '400',
		lineHeight: 16,
		color: '#5C5C5C',
	},
});
