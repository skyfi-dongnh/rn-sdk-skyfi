import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, {
	Defs,
	FeBlend,
	FeColorMatrix,
	FeFlood,
	FeGaussianBlur,
	FeOffset,
	Filter,
	G,
	LinearGradient,
	Path,
	Rect,
	Stop,
} from 'react-native-svg';

export const SimIllustration: React.FC = () => {
  return (
    <View style={styles.container}>
      <Svg width={123} height={106} viewBox="0 0 123 106" fill="none">
        <Path
          d="M61.1235 87.2242C84.2292 87.2242 102.961 68.4921 102.961 45.3038C102.961 22.1156 84.1467 3.38342 61.1235 3.38342C38.0178 3.38342 19.2856 22.1156 19.2856 45.3038C19.2856 68.4921 38.0178 87.2242 61.1235 87.2242Z"
          fill="#EAEEF9"
        />
        <Path
          d="M100.238 17.8243C102.107 17.8243 103.622 16.3095 103.622 14.441C103.622 12.5724 102.107 11.0576 100.238 11.0576C98.3698 11.0576 96.855 12.5724 96.855 14.441C96.855 16.3095 98.3698 17.8243 100.238 17.8243Z"
          fill="#EAEEF9"
        />
        <Path
          d="M105.189 4.62114C106.466 4.62114 107.5 3.58667 107.5 2.31057C107.5 1.03448 106.466 0 105.189 0C103.913 0 102.879 1.03448 102.879 2.31057C102.879 3.58667 103.913 4.62114 105.189 4.62114Z"
          fill="#EAEEF9"
        />
        <Path
          d="M21.5137 17.7419C22.7898 17.7419 23.8243 16.7074 23.8243 15.4313C23.8243 14.1552 22.7898 13.1207 21.5137 13.1207C20.2376 13.1207 19.2031 14.1552 19.2031 15.4313C19.2031 16.7074 20.2376 17.7419 21.5137 17.7419Z"
          fill="#EAEEF9"
        />
        <Path
          d="M11.7911 67.6898C14.161 67.6898 16.0821 65.7686 16.0821 63.3987C16.0821 61.0288 14.161 59.1077 11.7911 59.1077C9.42117 59.1077 7.5 61.0288 7.5 63.3987C7.5 65.7686 9.42117 67.6898 11.7911 67.6898Z"
          fill="#EAEEF9"
        />

        {/* Main SIM card with shadow */}
        <G filter="url(#filter0_d_298_45151)">
          <Path
            d="M94.5128 72.6564H27.733C24.6626 72.6564 22.168 70.1617 22.168 67.0914V24.2985C22.168 21.2282 24.6626 18.7335 27.733 18.7335H94.5128C97.5832 18.7335 100.078 21.2282 100.078 24.2985V67.2833C99.8859 70.1617 97.3913 72.6564 94.5128 72.6564Z"
            fill="url(#paint0_linear_298_45151)"
          />
        </G>

        {/* SIM card details */}
        <Rect x="34.3245" y="20.7054" width="11.5646" height="4.25218" rx="1" fill="#D8DDEB"/>
        <Rect x="75.7781" y="20.7054" width="11.5646" height="4.25218" rx="1" fill="#D8DDEB"/>

        {/* Left connector */}
        <G filter="url(#filter1_d_298_45151)">
          <Path
            d="M43.2364 11.0576H36.9849C36.4326 11.0576 35.9849 11.5053 35.9849 12.0576V21.6643C35.9849 22.2166 36.4326 22.6643 36.9849 22.6643H43.2364C43.7887 22.6643 44.2364 22.2166 44.2364 21.6643V12.0576C44.2364 11.5053 43.7887 11.0576 43.2364 11.0576Z"
            fill="url(#paint1_linear_298_45151)"
          />
        </G>

        {/* Right connector */}
        <G filter="url(#filter2_d_298_45151)">
          <Path
            d="M84.69 11.0576H78.4385C77.8862 11.0576 77.4385 11.5053 77.4385 12.0576V21.6643C77.4385 22.2166 77.8862 22.6643 78.4385 22.6643H84.69C85.2423 22.6643 85.69 22.2166 85.69 21.6643V12.0576C85.69 11.5053 85.2423 11.0576 84.69 11.0576Z"
            fill="url(#paint2_linear_298_45151)"
          />
        </G>

        {/* User profile icon */}
        <Path
          d="M46.347 48.0937C49.8444 48.0937 52.6796 45.2585 52.6796 41.7612C52.6796 38.2638 49.8444 35.4286 46.347 35.4286C42.8496 35.4286 40.0144 38.2638 40.0144 41.7612C40.0144 45.2585 42.8496 48.0937 46.347 48.0937Z"
          stroke="#939DAE"
          strokeWidth="4"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M36.1765 58.4587C36.1765 52.8937 40.782 48.2882 46.347 48.2882C51.912 48.2882 56.5175 52.8937 56.5175 58.4587"
          stroke="#939DAE"
          strokeWidth="4"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Info lines */}
        <Path
          d="M67.0715 40.6095H87.6044"
          stroke="#939DAE"
          strokeWidth="4"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M67.0715 50.972H75.1312"
          stroke="#939DAE"
          strokeWidth="4"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Add button */}
        <Path
          d="M73.8565 80.7445C73.5903 81.8756 73.1911 83.0732 72.7254 84.0712C71.4612 86.533 69.4652 88.4625 67.0034 89.7267C64.4751 90.9909 61.481 91.5231 58.487 90.8578C51.4343 89.394 46.9099 82.4744 48.3737 75.4217C49.8374 68.369 56.6905 63.7781 63.7432 65.3084C66.2715 65.8407 68.4672 67.1049 70.3301 68.8348C73.4573 71.9619 74.788 76.4863 73.8565 80.7445Z"
          fill="url(#paint3_linear_298_45151)"
        />
        <Path
          d="M65.2735 76.9521H62.2794V73.958C62.2794 73.3592 61.8137 72.8269 61.1483 72.8269C60.5495 72.8269 60.0172 73.2927 60.0172 73.958V76.9521H57.0232C56.4244 76.9521 55.8921 77.4178 55.8921 78.0832C55.8921 78.7485 56.3578 79.2142 57.0232 79.2142H60.0172V82.2083C60.0172 82.8071 60.483 83.3394 61.1483 83.3394C61.7472 83.3394 62.2794 82.8737 62.2794 82.2083V79.2142H65.2735C65.8723 79.2142 66.4046 78.7485 66.4046 78.0832C66.4046 77.4178 65.8723 76.9521 65.2735 76.9521Z"
          fill="white"
        />

        {/* Filters and gradients */}
        <Defs>
          <Filter id="filter0_d_298_45151" x="0.167969" y="7.73352" width="121.91" height="97.9229" filterUnits="userSpaceOnUse">
            <FeFlood floodOpacity="0" result="BackgroundImageFix"/>
            <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <FeOffset dy="11"/>
            <FeGaussianBlur stdDeviation="11"/>
            <FeColorMatrix type="matrix" values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0"/>
            <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_298_45151"/>
            <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_298_45151" result="shape"/>
          </Filter>

          <Filter id="filter1_d_298_45151" x="13.9849" y="0.0576172" width="52.2515" height="55.6067" filterUnits="userSpaceOnUse">
            <FeFlood floodOpacity="0" result="BackgroundImageFix"/>
            <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <FeOffset dy="11"/>
            <FeGaussianBlur stdDeviation="11"/>
            <FeColorMatrix type="matrix" values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0"/>
            <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_298_45151"/>
            <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_298_45151" result="shape"/>
          </Filter>

          <Filter id="filter2_d_298_45151" x="55.4385" y="0.0576172" width="52.2515" height="55.6067" filterUnits="userSpaceOnUse">
            <FeFlood floodOpacity="0" result="BackgroundImageFix"/>
            <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <FeOffset dy="11"/>
            <FeGaussianBlur stdDeviation="11"/>
            <FeColorMatrix type="matrix" values="0 0 0 0 0.397708 0 0 0 0 0.47749 0 0 0 0 0.575 0 0 0 0.27 0"/>
            <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_298_45151"/>
            <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_298_45151" result="shape"/>
          </Filter>

          <LinearGradient id="paint0_linear_298_45151" x1="61.0975" y1="17.4862" x2="61.0975" y2="73.2377" gradientUnits="userSpaceOnUse">
            <Stop stopColor="#FDFEFF"/>
            <Stop offset="0.9964" stopColor="#ECF0F5"/>
          </LinearGradient>

          <LinearGradient id="paint1_linear_298_45151" x1="40.1079" y1="10.7891" x2="40.1079" y2="22.7895" gradientUnits="userSpaceOnUse">
            <Stop stopColor="#FDFEFF"/>
            <Stop offset="0.9964" stopColor="#ECF0F5"/>
          </LinearGradient>

          <LinearGradient id="paint2_linear_298_45151" x1="81.5616" y1="10.7891" x2="81.5616" y2="22.7895" gradientUnits="userSpaceOnUse">
            <Stop stopColor="#FDFEFF"/>
            <Stop offset="0.9964" stopColor="#ECF0F5"/>
          </LinearGradient>

          <LinearGradient id="paint3_linear_298_45151" x1="48.0867" y1="78.0827" x2="74.1531" y2="78.0827" gradientUnits="userSpaceOnUse">
            <Stop stopColor="#B0BACC"/>
            <Stop offset="1" stopColor="#969EAE"/>
          </LinearGradient>
        </Defs>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 123,
    height: 106,
  },
});

export default SimIllustration;