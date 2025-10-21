import React from 'react';
import Svg, { G, Mask, Path } from 'react-native-svg';

export const IconData: React.FC = () => (
  <Svg width={42} height={42} viewBox="0 0 41 42" fill="none">
    <Path
      d="M0 12.5C0 5.87258 5.37258 0.5 12 0.5H29C35.6274 0.5 41 5.87258 41 12.5V29.5C41 36.1274 35.6274 41.5 29 41.5H12C5.37258 41.5 0 36.1274 0 29.5V12.5Z"
      fill="#0000EA"
    />
    <Mask
      id="mask0_298_45050"
      style={{ maskType: "luminance" }}
      maskUnits="userSpaceOnUse"
      x={7}
      y={10}
      width={27}
      height={22}
    >
      <Path
        d="M33.1908 10.4999V31.4992H27.7734V10.4999H33.1908ZM21.1189 15.5555V31.4992H26.5364V15.5555H21.1189ZM14.4635 20.612V31.5002H19.881V20.612H14.4635ZM7.80908 25.6676V31.4992H13.2265V25.6676H7.80908Z"
        fill="white"
      />
    </Mask>
    <G mask="url(#mask0_298_45050)">
      <Path
        d="M34.246 10.4999H6.58374V31.4992H34.246V10.4999Z"
        fill="white"
      />
    </G>
  </Svg>
);

export default IconData;
