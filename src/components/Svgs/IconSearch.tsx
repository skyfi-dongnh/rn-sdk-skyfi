import React from 'react';
import Svg, { Defs, Mask, Path } from 'react-native-svg';

interface IconSearchProps {
	width?: number;
	height?: number;
	color?: string;
}

export const IconSearch: React.FC<IconSearchProps> = ({ 
	width = 40, 
	height = 40,
	color = '#0000EA'
}) => {
	return (
		<Svg width={width} height={height} viewBox="0 0 40 40" fill="none">
			<Defs>
				<Mask id="path-1-inside-1_4078_17434" fill="white">
					<Path d="M0 8C0 3.58172 3.58172 0 8 0H32C36.4183 0 40 3.58172 40 8V32C40 36.4183 36.4183 40 32 40H8C3.58172 40 0 36.4183 0 32V8Z"/>
				</Mask>
			</Defs>
			<Path 
				d="M0 8C0 3.58172 3.58172 0 8 0H32C36.4183 0 40 3.58172 40 8V32C40 36.4183 36.4183 40 32 40H8C3.58172 40 0 36.4183 0 32V8Z" 
				fill="white"
			/>
			<Path 
				d="M8 0V1H32V0V-1H8V0ZM40 8H39V32H40H41V8H40ZM32 40V39H8V40V41H32V40ZM0 32H1V8H0H-1V32H0ZM8 40V39C4.13401 39 1 35.866 1 32H0H-1C-1 36.9706 3.02944 41 8 41V40ZM40 32H39C39 35.866 35.866 39 32 39V40V41C36.9706 41 41 36.9706 41 32H40ZM32 0V1C35.866 1 39 4.13401 39 8H40H41C41 3.02944 36.9706 -1 32 -1V0ZM8 0V-1C3.02944 -1 -1 3.02944 -1 8H0H1C1 4.13401 4.13401 1 8 1V0Z" 
				fill={color} 
				mask="url(#path-1-inside-1_4078_17434)"
			/>
			<Path 
				d="M27.5 27.5L24.5834 24.5833M26.6667 19.5833C26.6667 23.4954 23.4954 26.6667 19.5833 26.6667C15.6713 26.6667 12.5 23.4954 12.5 19.5833C12.5 15.6713 15.6713 12.5 19.5833 12.5C23.4954 12.5 26.6667 15.6713 26.6667 19.5833Z" 
				stroke={color} 
				strokeWidth="1.5" 
				strokeLinecap="round" 
				strokeLinejoin="round"
			/>
		</Svg>
	);
};

export default IconSearch;
