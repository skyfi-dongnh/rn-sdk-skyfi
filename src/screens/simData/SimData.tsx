import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PackageItem } from '../../components/common/PackageItem';
import { showMessage } from '../../components/modals/ModalComfirm';
import { SimDataHeader, SimNumberSection, SimTypeSection, StepsIndicator, SummarySection } from '../../components/screens/SimData';
import { useLoading } from '../../hooks';
import SimDataApi from '../../services/api/simdata.api';
import SimData from '../../types/simdata.d';
import { formatPhoneNumber, toCurrency } from '../../utils/format';
import { basePriceSim, priceSim } from '../../utils/price';

const SimDataScreen: React.FC = () => {
	const navigation = useNavigation();
	const [selectedSimType, setSelectedSimType] = useState<SimData.SimType>('USIM');
	const [selectedPackageId, setSelectedPackageId] = useState<string>('1');
	const [currentStep] = useState<number>(1);
	const [simData, setSimData] = useState<SimData.SimCard | null>(null);
	const [listPackages, setListPackages] = useState<SimData.Package[]>([]);
	const { load, close } = useLoading();




	const getRandomSim = async () => {
		try {
			load();
			const response = await SimDataApi.randomSim();
			if (response.code != 200 || !response.result || response.result.length === 0) {
				throw new Error('Lấy số SIM thất bại');
			}
			setSimData(response.result[0]);
		}
		catch (error) {
			showMessage({
				title: 'Thông báo',
				description: error.message || 'Lấy số SIM thất bại, vui lòng thử lại sau!',
				confirmLabel: 'Đóng'
			})
		}
		finally {
			close();
		}
	};

	const getPackagesByMsisdnId = async (msisdn_id: number) => {
		try {
			load();
			const response = await SimDataApi.getPackagesByMsisdnId(msisdn_id);
			if (response.code != 200 || !response.result) {
				throw new Error('Lấy gói cước thất bại');
			}

			setListPackages(response.result);

		}
		catch (error) {
			showMessage({
				title: 'Thông báo',
				description: error.message || 'Lấy gói cước thất bại, vui lòng thử lại sau!',
				confirmLabel: 'Đóng'
			})
			setListPackages([]);
		}
		finally {
			close();
		}
	}
	useEffect(() => {
		getRandomSim();
	}, []);

	useEffect(() => {
		if (simData) {
			getPackagesByMsisdnId(simData.msisdn_id);
		}
	}, [simData]);



	const handleBack = () => {
		navigation.goBack();
	};

	const handleCart = () => {
		console.log('Open cart');
		// Navigate to cart screen
	};

	const handleChangeNumber = () => {
		console.log('Change phone number');
		// Navigate to phone number selection screen
	};

	const handleAddToCart = () => {
		console.log('Add to cart');
		// Add selected package to cart
	};

	const handleCheckout = () => {
		console.log('Checkout');
		// Navigate to checkout screen
	};

	const totalAmount = useMemo(() => {
		if (!simData) return 0;

		const basePrice = priceSim(simData, selectedSimType);
		const packagePrice = listPackages.find(pkg => pkg.id.toString() === selectedPackageId)?.sale_price || 0;

		return basePrice + packagePrice;
	}, [simData, selectedSimType, selectedPackageId]);

	return (
		<SafeAreaView style={styles.container} edges={['top', 'bottom']}>
			{/* Header */}
			<SimDataHeader
				title="Mua SIM mới"
				onBack={handleBack}
				onCart={handleCart}
			/>

			{/* Steps Indicator */}
			<StepsIndicator
				currentStep={currentStep}
				steps={['Chọn số', 'Kích hoạt', 'Miễn phí cước']}
			/>

			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.content}>
					{/* SIM Section */}
					<View style={styles.simSection}>
						{/* Phone Number Section */}
						<SimNumberSection
							phoneNumber={simData ? formatPhoneNumber(simData.msisdn) : 'Đang tải...'}
							onChangeNumber={handleChangeNumber}
						/>

						{/* SIM Type Section */}
						{simData && <SimTypeSection
							selectedType={selectedSimType}
							onTypeChange={setSelectedSimType}
							price={priceSim(simData, selectedSimType)}
							basePrice={basePriceSim(simData, selectedSimType)}
						/>
						}
					</View>

					{/* Data Packages Section */}
					<View style={styles.packagesSection}>
						{listPackages.map((pkg) => (
							<PackageItem
								key={pkg.id}
								package={pkg}
								isSelect={selectedPackageId == pkg.id.toString()}
								onViewDetails={() => {}}
								isView={false}

								onRegister={() => setSelectedPackageId(pkg.id.toString())}

							/>
						))}
					</View>
				</View>
			</ScrollView>

			{/* Summary Section */}
			<SummarySection
				totalAmount={toCurrency(totalAmount)}
				onAddToCart={handleAddToCart}
				onCheckout={handleCheckout}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		flexGrow: 1,
		paddingBottom: 140,
	},
	content: {
		flex: 1,
		gap: 24,
		padding: 16,
	},
	simSection: {
		gap: 16,
		backgroundColor: '#FFFFFF',
		borderRadius: 16,

	},
	packagesSection: {
		gap: 16,
	},
});

export default SimDataScreen;
