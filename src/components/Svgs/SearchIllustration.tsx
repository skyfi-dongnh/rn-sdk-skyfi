import React from 'react';
import Svg, { Circle, Ellipse, G, Path, Rect } from 'react-native-svg';

interface SearchIllustrationProps {
	width?: number;
	height?: number;
}

export const SearchIllustration: React.FC<SearchIllustrationProps> = ({ 
	width = 100, 
	height = 100 
}) => {
	return (
		<Svg width={width} height={height} viewBox="0 0 100 100" fill="none">
			{/* Background Circle */}
			<Ellipse
				cx="55.57"
				cy="47.85"
				rx="40.16"
				ry="40.32"
				fill="#EAEEF9"
			/>
			
			{/* Decorative dots */}
			<Circle cx="93.04" cy="13.83" r="3.24" fill="#EAEEF9" />
			<Circle cx="97.21" cy="2.21" r="2.21" fill="#EAEEF9" />
			<Circle cx="17.63" cy="14.78" r="2.21" fill="#EAEEF9" />
			<Circle cx="4.11" cy="55.57" r="4.11" fill="#EAEEF9" />
			
			{/* Document/Paper */}
			<G>
				<Path
					d="M27.51 77.08V5.69h55.97v71.62H27.51z"
					fill="url(#gradient)"
				/>
				<Path
					d="M27.51 77.08V5.69h55.97v71.62H27.51z"
					fill="#FCFEFF"
				/>
				
				{/* Text lines on document */}
				<Rect
					x="34.86"
					y="14.31"
					width="25.85"
					height="2.06"
					rx="1.03"
					fill="#D5DDEA"
				/>
				<Rect
					x="34.86"
					y="20"
					width="11.15"
					height="2.06"
					rx="1.03"
					fill="#D5DDEA"
				/>
				<Rect
					x="49.17"
					y="65.38"
					width="3.24"
					height="1.74"
					rx="0.87"
					fill="#CED7E2"
				/>
				<Rect
					x="34.86"
					y="65.38"
					width="12.02"
					height="1.74"
					rx="0.87"
					fill="#D5DDEA"
				/>
			</G>
			
			{/* Magnifying Glass */}
			<G>
				{/* Glass circle */}
				<Circle
					cx="57.07"
					cy="50.29"
					r="22.71"
					stroke="#989FB0"
					strokeWidth="2.5"
					fill="none"
				/>
				
				{/* Handle */}
				<Path
					d="M73.18 66.4l9.83 9.83"
					stroke="#989FB0"
					strokeWidth="2.5"
					strokeLinecap="round"
				/>
				
				{/* Eyes */}
				<Circle cx="50.61" cy="46.51" r="1.89" fill="#989FB0" />
				<Circle cx="63.51" cy="46.51" r="1.89" fill="#989FB0" />
				
				{/* Mouth - sad */}
				<Path
					d="M52.33 57.73c1.58-1.32 3.95-1.32 5.53 0"
					stroke="#989FB0"
					strokeWidth="1.5"
					strokeLinecap="round"
					fill="none"
				/>
			</G>
		</Svg>
	);
};

export default SearchIllustration;
