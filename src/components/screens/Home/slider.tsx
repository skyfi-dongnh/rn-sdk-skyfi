import React, { useRef, useState } from 'react';
import {
	Dimensions,
	Image,
	ImageSourcePropType,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { SliderIndicator } from '../../Svgs/SliderIndicator';

const { width: screenWidth } = Dimensions.get('window');
const SLIDE_WIDTH = screenWidth - 32; // 16px padding on each side

interface SlideData {
	id: string;
	image: ImageSourcePropType;
	onPress?: () => void;
}

interface HomeSliderProps {
	slides: SlideData[];
	autoPlay?: boolean;
	autoPlayInterval?: number;
}

export const HomeSlider: React.FC<HomeSliderProps> = ({
	slides,
	autoPlay = false,
	autoPlayInterval = 3000,
}) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const scrollViewRef = useRef<ScrollView>(null);
	const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const startAutoPlay = () => {
		if (autoPlay && slides.length > 1) {
			autoPlayTimerRef.current = setInterval(() => {
				setCurrentIndex((prevIndex) => {
					const nextIndex = (prevIndex + 1) % slides.length;
					scrollViewRef.current?.scrollTo({
						x: nextIndex * SLIDE_WIDTH,
						animated: true,
					});
					return nextIndex;
				});
			}, autoPlayInterval);
		}
	};

	const stopAutoPlay = () => {
		if (autoPlayTimerRef.current) {
			clearInterval(autoPlayTimerRef.current);
			autoPlayTimerRef.current = null;
		}
	};

	const handleScroll = (event: any) => {
		const contentOffsetX = event.nativeEvent.contentOffset.x;
		const index = Math.round(contentOffsetX / SLIDE_WIDTH);
		setCurrentIndex(index);
	};

	const handleSlidePress = (slide: SlideData) => {
		if (slide.onPress) {
			slide.onPress();
		}
	};

	React.useEffect(() => {
		startAutoPlay();
		return () => stopAutoPlay();
	}, [autoPlay, autoPlayInterval, slides.length]);

	if (!slides || slides.length === 0) {
		return null;
	}

	return (
		<View style={styles.container}>
			<ScrollView
				ref={scrollViewRef}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onScroll={handleScroll}
				scrollEventThrottle={16}
				onScrollBeginDrag={stopAutoPlay}
				onScrollEndDrag={startAutoPlay}
				contentContainerStyle={styles.scrollContent}
				style={styles.scrollView}
			>
				{slides.map((slide) => (
					<TouchableOpacity
						key={slide.id}
						style={styles.slide}
						onPress={() => handleSlidePress(slide)}
						activeOpacity={0.9}
					>
						<Image source={slide.image} style={styles.slideImage} resizeMode="cover" />
					</TouchableOpacity>
				))}
			</ScrollView>

			{slides.length > 1 && (
				<SliderIndicator totalSlides={slides.length} currentIndex={currentIndex} />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
		paddingHorizontal: 16,
		marginTop: 16,
	},
	scrollView: {
		width: screenWidth,
	},
	scrollContent: {
		alignItems: 'center',
	},
	slide: {
		width: SLIDE_WIDTH,
		height: 140,
		marginHorizontal: 4,
	},
	slideImage: {
		width: '100%',
		height: '100%',
		borderRadius: 12,
	},
});

export default HomeSlider;
