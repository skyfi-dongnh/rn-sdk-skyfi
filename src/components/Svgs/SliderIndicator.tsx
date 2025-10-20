import React from 'react';
import { StyleSheet, View } from 'react-native';

interface SliderIndicatorProps {
  totalSlides: number;
  currentIndex: number;
}

export const SliderIndicator: React.FC<SliderIndicatorProps> = ({
  totalSlides,
  currentIndex,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSlides }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === currentIndex ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    height: 4,
    borderRadius: 2,
  },
  activeDot: {
    width: 12,
    backgroundColor: '#EA2227',
  },
  inactiveDot: {
    width: 4,
    backgroundColor: '#DDDDDD',
  },
});

export default SliderIndicator;