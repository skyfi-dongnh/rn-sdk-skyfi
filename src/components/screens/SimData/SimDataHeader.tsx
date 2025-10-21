import { Icon } from '@rneui/themed';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SimDataHeaderProps {
	title?: string;
	onBack?: () => void;
	onCart?: () => void;
}

export const SimDataHeader: React.FC<SimDataHeaderProps> = ({ 
	title = 'Mua SIM mới',
	onBack,
	onCart 
}) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.backButton} onPress={onBack}>
				<Icon
					name="chevron-left"
					type="feather"
					size={24}
					color="#333333"
				/>
			</TouchableOpacity>
			
			<Text style={styles.title}>{title}</Text>
			
			<TouchableOpacity style={styles.cartButton} onPress={onCart}>
				<Icon
					name="shopping-cart"
					type="feather"
					size={24}
					color="#333333"
				/>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: '#FFFFFF',
	},
	backButton: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontFamily: 'Inter',
		fontSize: 18,
		fontWeight: '600',
		lineHeight: 26,
		color: '#333333',
		flex: 1,
		textAlign: 'center',
	},
	cartButton: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
