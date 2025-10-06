import { createTheme } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';

// Button gradient colors
export const buttonGradientColors = ['#2C4EFF', '#0000FF', '#6100FF', '#DA0191', '#FF8A00', '#FFB907'];

export const theme = createTheme({
  lightColors: {
    primary: '#2C4EFF',
    secondary: '#D2008C',
    background: '#FFFFFF',
  },
  darkColors: {
    primary: '#2C4EFF',
    secondary: '#D2008C',
    background: '#FFFFFF',

  },
  components: {
    Button: {
      raised: false,
      ViewComponent: LinearGradient,
      linearGradientProps: {
        colors: buttonGradientColors,
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
        locations: [0, 0.04, 0.47, 0.78, 0.98, 1],
      },
      buttonStyle: {
        height: 48,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
      },
      titleStyle: {
        // fontFamily: 'Be Vietnam Pro',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 24,
        letterSpacing: -0.2,
        color: '#FFFFFF',
      },
    },
    Text: {
      h1Style: {
        // fontFamily: 'Be Vietnam Pro',
        fontSize: 24,
        fontWeight: 'medium',
        lineHeight: 32,
        color: '#0C0C0E',
      },
      h2Style: {
        // fontFamily: 'Be Vietnam Pro',
        fontSize: 18,
        fontWeight: 'semibold',
        lineHeight: 24,
        color: '#0C0C0E',
      },
      h3Style: {
        // fontFamily: 'Be Vietnam Pro',
        fontSize: 14,
        fontWeight: 'regular',
        lineHeight: 20,
        color: '#0C0C0E',
      },
      h4Style: {
        // fontFamily: 'Be Vietnam Pro',
        fontSize: 12,
        fontWeight: 'regular',
        lineHeight: 20,
        color: '#0C0C0E',
      },
    },

  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },

});
