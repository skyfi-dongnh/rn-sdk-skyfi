import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SimDataApi from '../../services/api/simdata.api';
import Modal from '../../types/modal';
import SimData from '../../types/simdata';
import { CustomButton, modal, useModal } from '../common';
import InputNumber from '../forms/inputNumber';
import { IconSearch, SearchIllustration } from '../Svgs';

type ModalListPhoneProps = {
	defaultPrefix?: string;
	onSelectPhone?: (phone: SimData.SimCard) => void;
};

const ModalListPhoneContent = ({ defaultPrefix = '0772' }: ModalListPhoneProps) => {
	const { close, done } = useModal();
	const [searchValue, setSearchValue] = useState<string>('***');
	const [simList, setSimList] = useState<SimData.SimCard[]>([]);
	const [suggestedSims, setSuggestedSims] = useState<SimData.SimCard[]>([]);
	const [selectedSim, setSelectedSim] = useState<SimData.SimCard | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [showEmptyState, setShowEmptyState] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	

	// Initial load of suggested SIMs
	useEffect(() => {
		fetchSimList();
	}, []);

	// Fetch SIM list based on search
	const fetchSimList = async (search: string='') => {
		try {
			setLoading(true);
			setError('');
			setShowEmptyState(false);
			
			const res = await SimDataApi.getListSim({
				filters: {
					search:  search,
				},
				page: 1,
				pageSize: 20,
			});
			
			if (res && res.result.length > 0) {
				setSimList(res.result);
				setShowEmptyState(false);
			} else {
				setSimList([]);
				setShowEmptyState(true);

			}
		} catch (err) {
			setError('Không thể tải danh sách số điện thoại');
			console.error('Error fetching SIM list:', err);
		} finally {
			setLoading(false);
		}
	};

	// Handle search value change
	const handleSearchChange = (value: string) => {
		setSearchValue(value);
	};

	// Handle search completion (when user fills all input fields)
	const handleSearchComplete = (value: string) => {
		setSearchValue(value);
		fetchSimList(value);
	};

	// Handle SIM selection
	const handleSelectSim = (sim: SimData.SimCard) => {
		setSelectedSim(sim);
	};

	// Handle confirm button
	const handleConfirm = () => {
		if (selectedSim) {
			done(selectedSim);
		}
	};

	// Format price
	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(price).replace('₫', 'VND');
	};

	// Format phone number with spaces
	const formatPhoneNumber = (phone: string) => {
		if (phone.length === 10) {
			return `${phone.slice(0, 4)} ${phone.slice(4, 7)} ${phone.slice(7)}`;
		}
		return phone;
	};

	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<TouchableOpacity onPress={close} style={styles.closeButton}>
					<Text style={styles.closeIcon}>✕</Text>
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Chọn số khác</Text>
				<View style={styles.placeholder} />
			</View>

			{/* Search Section */}
			<View style={styles.searchSection}>
				<View style={styles.searchRow}>
					<Text style={styles.prefixText}>{defaultPrefix}</Text>
					<InputNumber
						number={6}
						onChange={handleSearchChange}
						onComplete={handleSearchComplete}
						width={32}
						format="*"
					/>
					<TouchableOpacity 
						style={styles.searchButton}
						onPress={() => fetchSimList(searchValue)}
					>
						<IconSearch width={40} height={40} />
					</TouchableOpacity>
				</View>
			</View>

			{/* SIM List */}
			<ScrollView 
				style={styles.simListContainer}
				contentContainerStyle={styles.simListContent}
				showsVerticalScrollIndicator={true}
			>
				{loading ? (
					<View style={styles.loadingContainer}>
						<ActivityIndicator size="large" color="#0000EA" />
						<Text style={styles.loadingText}>Đang tải...</Text>
					</View>
				) : error ? (
					<View style={styles.errorContainer}>
						<Text style={styles.errorText}>{error}</Text>
					</View>
				) : showEmptyState ? (
					// Empty state with illustration and suggested SIMs
					<View style={styles.emptyStateContainer}>
						<SearchIllustration width={100} height={100} />
						<Text style={styles.emptyStateText}>
							Rất tiếc, số bạn đang tìm hiện không còn. Có thể bạn sẽ thích những số sau:
						</Text>
						{suggestedSims.map((sim) => (
							<TouchableOpacity
								key={sim.msisdn_id}
								style={[
									styles.simCard,
									selectedSim?.msisdn_id === sim.msisdn_id && styles.simCardSelected,
								]}
								onPress={() => handleSelectSim(sim)}
							>
								<View style={styles.simCardContent}>
									<Text style={styles.phoneNumber}>
										{formatPhoneNumber(sim.msisdn)}
									</Text>
									
									<View style={styles.divider} />
									
									<View style={styles.priceContainer}>
										{sim.sale_price < sim.base_price ? (
											<>
												<Text style={styles.originalPrice}>
													{formatPrice(sim.base_price)}
												</Text>
												<Text style={styles.salePrice}>
													{formatPrice(sim.sale_price)}
												</Text>
											</>
										) : (
											<Text style={styles.price}>
												{formatPrice(sim.base_price)}
											</Text>
										)}
									</View>
								</View>
								
								{/* Radio Button */}
								<View style={styles.radioButton}>
									<View
										style={[
											styles.radioOuter,
											selectedSim?.msisdn_id === sim.msisdn_id && styles.radioOuterSelected,
										]}
									>
										{selectedSim?.msisdn_id === sim.msisdn_id && (
											<View style={styles.radioInner} />
										)}
									</View>
								</View>
							</TouchableOpacity>
						))}
					</View>
				) : simList.length === 0 ? (
					<View style={styles.emptyContainer}>
						<Text style={styles.emptyText}>Vui lòng nhập số điện thoại để tìm kiếm</Text>
					</View>
				) : (
					simList.map((sim) => (
						<TouchableOpacity
							key={sim.msisdn_id}
							style={[
								styles.simCard,
								selectedSim?.msisdn_id === sim.msisdn_id && styles.simCardSelected,
							]}
							onPress={() => handleSelectSim(sim)}
						>
							<View style={styles.simCardContent}>
								<Text style={styles.phoneNumber}>
									{formatPhoneNumber(sim.msisdn)}
								</Text>
								
								<View style={styles.divider} />
								
								<View style={styles.priceContainer}>
									{sim.sale_price < sim.base_price ? (
										<>
											<Text style={styles.originalPrice}>
												{formatPrice(sim.base_price)}
											</Text>
											<Text style={styles.salePrice}>
												{formatPrice(sim.sale_price)}
											</Text>
										</>
									) : (
										<Text style={styles.price}>
											{formatPrice(sim.base_price)}
										</Text>
									)}
								</View>
							</View>
							
							{/* Radio Button */}
							<View style={styles.radioButton}>
								<View
									style={[
										styles.radioOuter,
										selectedSim?.msisdn_id === sim.msisdn_id && styles.radioOuterSelected,
									]}
								>
									{selectedSim?.msisdn_id === sim.msisdn_id && (
										<View style={styles.radioInner} />
									)}
								</View>
							</View>
						</TouchableOpacity>
					))
				)}
			</ScrollView>

			{/* Confirm Button */}
			<View style={styles.footer}>
				<CustomButton
					title="Xác nhận"
					onPress={handleConfirm}
					disabled={!selectedSim}
					type="primary"
					size="medium"
					width="100%"
				/>
				<View style={styles.homeIndicator} />
			</View>
		</View>
	);
};

export const showListPhoneModal = async (props: ModalListPhoneProps = {}) => {
	return new Promise<SimData.SimCard | null>((resolve) => {
		modal.showBottomSheet({
			render: <ModalListPhoneContent {...props} />,
			onDone: (data: any) => {
				props.onSelectPhone?.(data);
				resolve(data);
			},
			onClose: () => {
				resolve(null);
			},
			props: {
				closeOnBackdrop: true,
				maxHeight: 0.95,
			} as Modal.BottomSheet,
		});
	});
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#F1F1F1',
	},
	closeButton: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	closeIcon: {
		fontSize: 20,
		color: '#333333',
		fontWeight: '400',
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: '#333333',
		lineHeight: 25.2,
	},
	placeholder: {
		width: 40,
	},
	searchSection: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		alignItems: 'center',
	},
	searchRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
		width: '100%',
		height: 60,
	},
	prefixText: {
		fontSize: 20,
		fontWeight: '600',
		color: '#333333',
		lineHeight: 28,
	},
	searchButton: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	simListContainer: {
		flex: 1,
		paddingHorizontal: 16,
	},
	simListContent: {
		gap: 16,
		paddingBottom: 16,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 40,
		gap: 12,
	},
	loadingText: {
		fontSize: 14,
		color: '#8A8A8A',
	},
	errorContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 40,
	},
	errorText: {
		fontSize: 14,
		color: '#E60A32',
		textAlign: 'center',
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 40,
	},
	emptyText: {
		fontSize: 14,
		color: '#8A8A8A',
		textAlign: 'center',
	},
	emptyStateContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		gap: 16,
		paddingVertical: 20,
	},
	emptyStateText: {
		fontSize: 14,
		fontWeight: '400',
		color: '#8A8A8A',
		textAlign: 'center',
		lineHeight: 20,
		paddingHorizontal: 16,
	},
	simCard: {
		backgroundColor: '#FFFFFF',
		borderRadius: 12,
		padding: 16,
		borderWidth: 1,
		borderColor: '#F1F1F1',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.05,
		shadowRadius: 4,
		elevation: 2,
		gap: 4,
	},
	simCardSelected: {
		borderColor: '#0000EA',
		borderWidth: 2,
	},
	simCardContent: {
		gap: 4,
	},
	phoneNumber: {
		fontSize: 20,
		fontWeight: '600',
		color: '#333333',
		lineHeight: 28,
	},
	divider: {
		height: 1,
		backgroundColor: '#F1F1F1',
		marginVertical: 4,
	},
	priceContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		gap: 8,
	},
	price: {
		fontSize: 16,
		fontWeight: '500',
		color: '#333333',
		lineHeight: 24,
	},
	originalPrice: {
		fontSize: 14,
		fontWeight: '500',
		color: '#8A8A8A',
		lineHeight: 20,
		textDecorationLine: 'line-through',
	},
	salePrice: {
		fontSize: 16,
		fontWeight: '500',
		color: '#D2008C',
		lineHeight: 24,
	},
	radioButton: {
		position: 'absolute',
		top: 10,
		right: 16,
	},
	radioOuter: {
		width: 24,
		height: 24,
		borderRadius: 12,
		borderWidth: 1.5,
		borderColor: '#A1A1A1',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
	},
	radioOuterSelected: {
		borderColor: '#0000EA',
		borderWidth: 2,
	},
	radioInner: {
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor: '#0000EA',
	},
	footer: {
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 0,
		backgroundColor: '#FFFFFF',
		borderTopWidth: 1,
		borderTopColor: '#F1F1F1',
		gap: 12,
	},
	homeIndicator: {
		width: 139,
		height: 5,
		backgroundColor: '#000000',
		borderRadius: 100,
		alignSelf: 'center',
		marginTop: 8,
		marginBottom: 8,
	},
});

export default ModalListPhoneContent;
