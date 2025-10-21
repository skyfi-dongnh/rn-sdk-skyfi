import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StepsIndicatorProps {
	currentStep: number;
	steps: string[];
}

export const StepsIndicator: React.FC<StepsIndicatorProps> = ({ 
	currentStep = 1,
	steps = ['Chọn số', 'Kích hoạt', 'Miễn phí cước']
}) => {
	return (
		<View style={styles.container}>
			{/* Steps circles and lines */}
			<View style={styles.stepsRow}>
				{steps.map((_, index) => {
					const stepNumber = index + 1;
					const isActive = stepNumber <= currentStep;
					
					return (
						<React.Fragment key={stepNumber}>
							{/* Line before (except first) */}
							{index > 0 && (
								<View style={[
									styles.line,
									stepNumber <= currentStep && styles.lineActive
								]} />
							)}
							
							{/* Circle with number */}
							<View style={[
								styles.stepCircle,
								isActive ? styles.stepCircleActive : styles.stepCircleInactive
							]}>
								<Text style={styles.stepNumber}>{stepNumber}</Text>
							</View>
						</React.Fragment>
					);
				})}
			</View>

			{/* Step labels */}
			<View style={styles.labelsRow}>
				{steps.map((label, index) => (
					<Text 
						key={index} 
						style={[
							styles.stepLabel,
							(index + 1) === currentStep && styles.stepLabelActive
						]}
					>
						{label}
					</Text>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		gap: 8,
	},
	stepsRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		position: 'relative',
	},
	stepCircle: {
		width: 20,
		height: 20,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	stepCircleActive: {
		backgroundColor: '#0000EA',
	},
	stepCircleInactive: {
		backgroundColor: '#B4AFB4',
	},
	stepNumber: {
		fontFamily: 'Inter',
		fontSize: 12,
		fontWeight: '700',
		lineHeight: 18,
		color: '#FFFFFF',
	},
	line: {
		flex: 1,
		height: 1,
		backgroundColor: '#B4AFB4',
		marginHorizontal: 4,
	},
	lineActive: {
		backgroundColor: '#0000EA',
	},
	labelsRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 0,
	},
	stepLabel: {
		fontFamily: 'Inter',
		fontSize: 12,
		fontWeight: '500',
		lineHeight: 18,
		color: '#B4AFB4',
		flex: 1,
		textAlign: 'center',
	},
	stepLabelActive: {
		color: '#0000EA',
	},
});
