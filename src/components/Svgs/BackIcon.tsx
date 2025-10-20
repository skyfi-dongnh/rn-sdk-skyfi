import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const BackIcon: React.FC = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 12h12M6 12l6-6M6 12l6 6"
      stroke="#333333"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default BackIcon;