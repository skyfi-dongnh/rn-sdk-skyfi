import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const PackageIcon: React.FC = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 9C21 10.6569 16.9706 12 12 12C7.0294 12 3 10.6569 3 9M21 9C21 7.3431 16.9706 6 12 6C7.0294 6 3 7.3431 3 9M21 9V19C21 20.66 17 22 12 22C7 22 3 20.66 3 19V9M21 13.7202C21 15.3802 17 16.7202 12 16.7202C7 16.7202 3 15.3802 3 13.7202M21 17.44C21 19.1 17 20.44 12 20.44C7 20.44 3 19.1 3 17.44"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default PackageIcon;