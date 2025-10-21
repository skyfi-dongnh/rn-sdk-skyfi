import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PackageData, PackageItem } from '../../components/common/PackageItem';
import { SimDataHeader, SimNumberSection, SimType, SimTypeSection, StepsIndicator, SummarySection } from '../../components/screens/SimData';

const SimDataScreen: React.FC = () => {
	const navigation = useNavigation();
	const [selectedSimType, setSelectedSimType] = useState<SimType>('physical');
	const [selectedPackageId, setSelectedPackageId] = useState<string>('1');
	const [currentStep] = useState<number>(1);

	// Mock data packages based on Figma design
	const dataPackages: PackageData[] = [
		{
			id: '1',
			name: 'QUÀ TẶNG VIKKI',
			data: 'Data: 2GB/ngày',
			minutes: 'Miễn phí: SMS banking Vikky',
			currentPrice: '69.000 VND',
			duration: '/ 30 ngày',
			isViki: true,
			isSelect: selectedPackageId === '1',
            isView:true,
			vikiPoints: {
				accumulated: '150đ',
				required: '150đ',
			},
			onViewDetails: () => {
				console.log('View details for package 1');
			},
			onRegister: () => {
				setSelectedPackageId('1');
			},
		},
		{
			id: '2',
			name: 'DATA NAME',
			data: 'Data: 2GB/ngày',
			minutes: 'Phút gọi: 800 phút gọi liên mạng',
			currentPrice: '69.000 VND',
			duration: '/ 30 ngày',
			isViki: false,
			isSelect: selectedPackageId === '2',
            isView:true,
			onViewDetails: () => {
				console.log('View details for package 2');
			},
			onRegister: () => {
				setSelectedPackageId('2');
			},
		},
		{
			id: '3',
			name: 'DATA NAME',
			data: 'Data: 2GB/ngày',
			minutes: 'Phút gọi: 800 phút gọi liên mạng',
			currentPrice: '69.000 VND',
			duration: '/ 30 ngày',
			isViki: false,
			isSelect: selectedPackageId === '3',
			onViewDetails: () => {
				console.log('View details for package 3');
			},
			onRegister: () => {
				setSelectedPackageId('3');
			},
		},
	];

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
							phoneNumber="0707 123 456"
							onChangeNumber={handleChangeNumber}
						/>

						{/* SIM Type Section */}
						<SimTypeSection
							selectedType={selectedSimType}
							onTypeChange={setSelectedSimType}
							price="0 VND"
						/>
					</View>

					{/* Data Packages Section */}
					<View style={styles.packagesSection}>
						{dataPackages.map((pkg) => (
							<PackageItem 
								key={pkg.id} 
								package={pkg}
							/>
						))}
					</View>
				</View>
			</ScrollView>

			{/* Summary Section */}
			<SummarySection
				totalAmount="148,000 VND"
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
		padding: 16,
	},
	packagesSection: {
		gap: 16,
	},
});

export default SimDataScreen;
