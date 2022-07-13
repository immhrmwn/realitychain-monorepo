import "@fontsource/montserrat"; // Defaults to weight 400.

import {createTheme} from '@material-ui/core/styles';

const {breakpoints} = createTheme();

const breakpointsValue = {
  xs: 500,
  sm: 960,
  md: 1280,
  lg: 1366,
  xl: 1920,
};

//Neutral colors
const neutral20 = '#F5F5F5';
const neutral90 = '#404040';

//Primary colors
// const primaryPurple = '#7342CC';
const primaryOrange = '#FFD24D';

const primaryGreen = '#39BF87';
const primaryRed = '#FE3333';
const primaryBlue = '#1E4FCB';
const primaryWhite = '#FFFFFF';

// text colors
const textPrimary = '#FFFFFF';
const textSecondary = '#95A1B7';

//Surface colors
const surfacePurple = '#EBE0FF';
const surfaceOrange = '#FFF2CC';
const surfaceGreen = '#DAF1E6';
const surfaceRed = '#FFD7D7';
const surfaceBlue = '#CFE2F4';

// Pressed colors
const pressedGreen = '#268054';
const pressedRed = '#A62121';
const pressedOrange = '#E8AE00';

//Border colors
const borderPurple = '#DECCFF';

//Font weight
const textRegular = 400;
const textMedium = 600;
const textBold = 700;

//Font size
const textXs = 10;
const textSm = 12;
const textBs = 14;
const textMd = 16;
const textLg = 18;
const textXl = 22;
const text2Xl = 28;
const text3Xl = 34;


const theme = createTheme({
  breakpoints: {
    values: breakpointsValue,
  },
  status: {
    success: {
      main: primaryGreen,
      surface: surfaceGreen,
      pressed: pressedGreen,
    },
    warning: {
      main: primaryOrange,
      surface: surfaceOrange,
      pressed: pressedOrange,
    },
    danger: {
      main: primaryRed,
      surface: surfaceRed,
      pressed: pressedRed,
    },
    info: {
      main: primaryBlue,
      surface: surfaceBlue,
    },
    primary: {
      surface: surfacePurple,
    },
  },

  palette: {
    background: {
      default: '#0F1319',
      paper: '#191F29'
    },
    primary: {
      main: '#0F1319',
      contrastText: '#FFFFF',
    },
    secondary: {
      main: primaryOrange,
      contrastText: '#FFFFF',
    },
    text: {
      primary: textPrimary,
      secondary: textSecondary,
    },
  },

  typography: {
    fontFamily: ['Montserrat', 'serif'].join(','),
    fontWeightRegular: textRegular,
    fontWeightMedium: textMedium,
    fontWeightBold: textBold,
    subtitle1: {
      fontSize: textXs,
    },
    subtitle2: {
      fontSize: textSm,
    },
    caption: {
      fontSize: textSm,

      [breakpoints.down(breakpointsValue.lg)]: {
        fontSize: textXs,
      },
      [breakpoints.down(breakpointsValue.xs)]: {
        fontSize: textBs,
        fontWeight: textMedium,
      },
    },
    body1: {
      fontSize: textBs,
    },
    h6: {
      fontSize: textBs,
      fontWeight: 600,
    },
    h5: {
      fontSize: textMd,
      fontWeight: 600,

      [breakpoints.down(breakpointsValue.lg)]: {
        fontSize: textBs,
      },
    },
    h4: {
      fontSize: textLg,
      fontWeight: 600,

      [breakpoints.down(breakpointsValue.lg)]: {
        fontSize: textMd,
      },
    },
    h3: {
      fontSize: textXl,

      [breakpoints.down(breakpointsValue.lg)]: {
        fontSize: textLg,
      },
    },
    h2: {
      fontSize: text2Xl,

      [breakpoints.down(breakpointsValue.lg)]: {
        fontSize: textXl,
      },
    },
    h1: {
      fontSize: text3Xl,

      [breakpoints.down(breakpointsValue.lg)]: {
        fontSize: text2Xl,
      },
    },
  },

  overrides: {
    MuiTypography: {
      gutterBottom: {
        marginBottom: 10,
      },
    },
    MuiListItem: {
      container: {
        width: '100%',
      },
    },
    MuiButton: {
      root: {
        textTransform: 'none',
        boxSizing: 'border-box',
        borderRadius: 4,
        width: 270
      },
      sizeSmall: {
        width: 180,
        height: 40,
        [breakpoints.down(breakpointsValue.xs)]: {
          width: 120,
        },
      },
      sizeMedium: {
        width: 270,
        height: 40,
      },
      sizeLarge: {
        width: 583,
        height: 40,
      },
      text: {
        color: textSecondary,
      },
      containedPrimary: {
        backgroundColor: primaryBlue,
        color: '#FFFFFF',
        '&:hover': {
          backgroundColor: primaryBlue,
        },
      },
      containedSecondary: {
        backgroundColor: `${primaryWhite}`,
        color: '#191F29',
        '&:hover': {
          backgroundColor: primaryWhite,
        },
      },
      outlinedPrimary: {
        border: `2px solid ${borderPurple}`,
        backgroundColor: '#FFF',
        '&:hover': {
          backgroundColor: neutral20,
        },
      },
      outlinedSecondary: {
        border: `2px solid ${primaryOrange}`,
        backgroundColor: '#FFF',
        color: neutral90,
        '&:hover': {
          backgroundColor: '#FFC85733',
        },
      },
    },
    MuiButtonGroup: {
      groupedOutlinedPrimary: {
        borderColor: '#9816A8',
        backgroundColor: 'transparent',
        color: '#FFF',
        '&:hover': {
          backgroundColor: 'transparent',
          borderColor: '#9816A8',
        },
      }
    }
  }
});

export default theme;
