import { Icon } from '@rneui/themed';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuthStore } from '../../../store/slices/authSlice';
import { CustomButton } from '../../common/CustomButton';
import { SimIllustration } from '../../Svgs/SimIllustration';
import { DataUsageCircle } from './DataUsageCircle';

// Info row component for user data
const InfoRow = ({ label, value }: { label: string; value: string }) => (
	<View style={styles.infoRow}>
		<Text style={styles.infoLabel}>{label}</Text>
		<Text style={styles.infoValue}>{value}</Text>
	</View>
);

interface SimCardProps {
	onActivatePress?: () => void;
	onBuySimPress?: () => void;
	onTopUpPress?: () => void;
	onChangePackagePress?: () => void;
}

export const SimCard: React.FC<SimCardProps> = ({
	onActivatePress,
	onBuySimPress,
	onTopUpPress,
	onChangePackagePress,
}) => {
	const { user } = useAuthStore();

	if (user) {
		// No user state - Simple card asking about SIM
		return (
			<View style={styles.container}>
				<View style={styles.noUserCard}>
					<View style={styles.noUserContent}>
						<SimIllustration />
						<Text style={styles.noUserTitle}>Bạn đã có SIM SkyFi chưa?</Text>
						<Text style={styles.noUserSubtitle}>
							Nhấn "Mua SIM" để lựa chọn cho mình số điện thoại và gói cước phù hợp.
						</Text>
					</View>
					<View style={styles.buttonRow}>
						<CustomButton
							title="Kích hoạt SIM"
							onPress={onActivatePress}
							type="outline"
							size="small"
							width={150}
						/>
						<CustomButton
							title="Mua SIM"
							onPress={onBuySimPress}
							type="primary"
							size="small"
							width={150}
						/>
					</View>
				</View>
			</View>
		);
	}

	// User logged in - Account balance and data usage cards
	return (
		<View style={styles.container}>
			{/* Account Balance Card */}
			<View style={styles.userCard}>
				<View style={styles.cardContent}>
					<InfoRow label="Tài khoản gốc" value="100.000 VND" />
					<CustomButton
						title="Nạp tiền"
						onPress={onTopUpPress}
						type="primary"
						size="small"
						style={{ borderRadius: 35, marginTop: 4 }}
					/>
				</View>
			</View>

			{/* Data Usage Card */}
			<View style={styles.dataCard}>
				<View style={styles.dataCardContent}>
					<View style={styles.dataInfo}>
						<InfoRow label="Gói cước chính" value="SF79" />
						<InfoRow label="Thời hạn còn" value="5 ngày" />
						<TouchableOpacity style={styles.changePackageButton} onPress={onChangePackagePress}>
							<Icon
								name="refresh-cw"
								type="feather"
								size={16}
								color="#D2008C"
							/>
							<Text style={styles.changePackageText}>Đổi gói cước</Text>
						</TouchableOpacity>
					</View>
					<DataUsageCircle used={2.5} total={3} />
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 8,
	},
	// No user state styles
	noUserCard: {
		backgroundColor: '#FFFFFF',
		borderRadius: 12,
		padding: 16,
		alignItems: 'center',
		gap: 16,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 5,
	},
	noUserContent: {
		alignItems: 'center',
		gap: 8,
		paddingHorizontal: 16,

	},
	simIllustration: {
		width: 123,
		height: 106,
		alignItems: 'center',
		justifyContent: 'center',
	},
	noUserTitle: {
		fontFamily: 'Inter',
		fontSize: 16,
		fontWeight: '600',
		lineHeight: 24,
		color: '#333333',
		textAlign: 'center',
	},
	noUserSubtitle: {
		fontFamily: 'Inter',
		fontSize: 14,
		fontWeight: '400',
		lineHeight: 20,
		color: '#8A8A8A',
		textAlign: 'center',
	},
	buttonRow: {
		flexDirection: 'row',
		gap: 10,
	},
	// User state styles
	userCard: {
		backgroundColor: '#FFFFFF',
		borderRadius: 12,
		paddingVertical: 4,
		paddingHorizontal: 12,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 3,
	},
	cardContent: {
		gap: 4,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	dataCard: {
		backgroundColor: '#FFFFFF',
		borderRadius: 12,
		padding: 16,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 5,
	},
	dataCardContent: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 12,
	},
	dataInfo: {
		flex: 1,
		gap: 4,
	},
	infoRow: {
		paddingVertical: 8,
	},
	infoLabel: {
		fontFamily: 'Inter',
		fontSize: 12,
		fontWeight: '400',
		lineHeight: 16,
		color: '#8A8A8A',
		marginBottom: 4,
	},
	infoValue: {
		fontFamily: 'Inter',
		fontSize: 14,
		fontWeight: '500',
		lineHeight: 20,
		color: '#333333',
	},
	changePackageButton: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		paddingVertical: 4,
	},
	changePackageText: {
		fontFamily: 'Inter',
		fontSize: 14,
		fontWeight: '600',
		lineHeight: 20,
		color: '#D2008C',
	},
});

export default SimCard;
