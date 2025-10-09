import { createContext, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const ContextLoading = createContext<{ load: () => void, close: () => void }>({ load: () => {}, close: () => {} });

const LoadingProvider = ({ children }: { children: React.ReactNode, }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const load = () => setIsLoading(true);
	const close = () => setIsLoading(false);

	return (
		<ContextLoading.Provider value={{ load, close }}>
			<View style={styles.container}>
				{children}
				{isLoading && (

					<View style={styles.overlay}>
						<ActivityIndicator size="large" color="#ffffff" />
					</View>

				)}
			</View>
		</ContextLoading.Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		flex: 1,
	},
	overlay: {
		flex: 1,
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 9999,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},

});

export { ContextLoading, LoadingProvider };
