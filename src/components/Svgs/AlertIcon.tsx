import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

export const AlertIcon: React.FC = () => (
  <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
    <Circle cx={20} cy={20} r={18.33} stroke="#D2008C" strokeWidth={2} />
    <Path
      d="M20 14v6M20 26h.01"
      stroke="#D2008C"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default AlertIcon;