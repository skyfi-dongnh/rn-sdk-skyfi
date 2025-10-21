import React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

export const IconCall: React.FC = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Rect
      x={2}
      y={1.5}
      width={21}
      height={21}
      rx={6}
      fill="#0000EA"
    />
    <G clipPath="url(#clip0_4075_21882)">
      <Path
        d="M7.51833 11.9616C6.88632 10.8595 6.58115 9.95965 6.39714 9.04747C6.125 7.69838 6.74779 6.38054 7.77951 5.53965C8.21555 5.18425 8.71541 5.30568 8.97325 5.76826L9.55537 6.8126C10.0168 7.64038 10.2475 8.05426 10.2017 8.49306C10.156 8.93186 9.84483 9.28924 9.22257 10.004L7.51833 11.9616ZM7.51833 11.9616C8.79759 14.1922 10.8051 16.2008 13.0383 17.4816M13.0383 17.4816C14.1404 18.1136 15.0403 18.4188 15.9524 18.6028C17.3015 18.8749 18.6194 18.2521 19.4603 17.2204C19.8157 16.7844 19.6942 16.2845 19.2317 16.0267L18.1873 15.4445C17.3595 14.9831 16.9457 14.7524 16.5069 14.7982C16.0681 14.844 15.7107 15.1551 14.9959 15.7774L13.0383 17.4816Z"
        stroke="white"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_4075_21882">
        <Rect
          width={16}
          height={16}
          fill="white"
          transform="translate(5 4)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);

export default IconCall;
