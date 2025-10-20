import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Circle, Defs, LinearGradient, Stop, Svg } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface DataUsageCircleProps {
  used: number;
  total: number;
}

export const DataUsageCircle: React.FC<DataUsageCircleProps> = ({ used, total }) => {
  const percentage = (used / total) * 100;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const circleRef = useRef<any>(null);

  // Circle properties
  const size = 120;
  const strokeWidth = 8.57;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate the stroke dash offset for the progress
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  useEffect(() => {
    // Animate the circle progress
    Animated.timing(animatedValue, {
      toValue: percentage,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [percentage, animatedValue]);

  // Animated stroke dash offset
  const animatedStrokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, circumference - (circumference * percentage) / 100],
  });

  return (
    <View style={styles.dataCircleContainer}>
      {/* Background circle with gradient border */}
      <View style={styles.dataCircleBackground}>
        {/* Progress Circle using SVG */}
        <Svg
          width={size}
          height={size}
          style={styles.progressCircle}
        >
          {/* Background circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(229, 229, 229, 0.3)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Progress circle with gradient effect */}
          <AnimatedCircle
            ref={circleRef}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#progressGradient)"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={animatedStrokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            originX={size / 2}
            originY={size / 2}
          />

          {/* Gradient definition */}
          <Defs>
            <LinearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#2C4EFF" />
              <Stop offset="4%" stopColor="#0000FF" />
              <Stop offset="47%" stopColor="#6100FF" />
              <Stop offset="78%" stopColor="#DA0191" />
              <Stop offset="98%" stopColor="#FF8A00" />
              <Stop offset="100%" stopColor="#FFB907" />
            </LinearGradient>
          </Defs>
        </Svg>

        {/* Center content */}
        <View style={styles.dataContent}>
          <Text style={styles.dataLabel}>Còn lại</Text>
          <View style={styles.dataValueContainer}>
            <Text style={styles.dataValue}>{used}GB/{total}GB</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Data usage circle styles
  dataCircleContainer: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataCircleBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  progressCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  dataContent: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  dataLabel: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: '#5C5C5C',
  },
  dataValueContainer: {
    alignItems: 'center',
  },
  dataValue: {
    fontFamily: 'KoHo',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
    color: '#D2008C',
  },
});

export default DataUsageCircle;