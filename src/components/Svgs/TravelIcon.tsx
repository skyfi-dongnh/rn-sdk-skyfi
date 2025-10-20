import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const TravelIcon: React.FC = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M8 22V20M9.5 15V7M16 22V20M14.5 15V7M8.8 20H15.2C16.8802 20 17.7202 20 18.362 19.673C18.9265 19.3854 19.3854 18.9265 19.673 18.362C20 17.7202 20 16.8802 20 15.2V6.8C20 5.1198 20 4.2798 19.673 3.638C19.3854 3.0735 18.9265 2.6146 18.362 2.327C17.7202 2 16.8802 2 15.2 2H8.8C7.1198 2 6.2798 2 5.638 2.327C5.0735 2.6146 4.6146 3.0735 4.327 3.638C4 4.2798 4 5.1198 4 6.8V15.2C4 16.8802 4 17.7202 4.327 18.362C4.6146 18.9265 5.0735 19.3854 5.638 19.673C6.2798 20 7.1198 20 8.8 20Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default TravelIcon;