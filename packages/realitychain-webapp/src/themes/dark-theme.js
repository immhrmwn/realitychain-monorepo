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
const overline = 10;
const caption = 12;
const button2 = 13;
const button1 = 15;
const body2 = 13;
const body1 = 15;
const subtitle2 = 13;
const subtitle1 = 15;
const heading6 = 16;
const heading5 = 18;
const heading4 = 22;
const heading3 = 24;
const heading2 = 27;
const heading1 = 30;


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
      main: 'rgba(183, 97, 194, 1)',
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
      fontSize: subtitle1,
    },
    subtitle2: {
      fontSize: subtitle2,
    },
    caption: {
      fontSize: caption,
      fontWeight: 500,

      [breakpoints.down(breakpointsValue.xs)]: {},
    },
    body1: {
      fontSize: body1,
    },
    h6: {
      fontSize: heading6,
      fontWeight: 600,
    },
    h5: {
      fontSize: heading5,
      fontWeight: 600,

      [breakpoints.down(breakpointsValue.lg)]: {},
    },
    h4: {
      fontSize: heading4,
      fontWeight: 600,

      [breakpoints.down(breakpointsValue.lg)]: {},
    },
    h3: {
      fontSize: heading3,
      fontWeight: 600,
      lineHeight: '32px',

      [breakpoints.down(breakpointsValue.lg)]: {},
    },
    h2: {
      fontSize: heading2,
      fontWeight: 600,

      [breakpoints.down(breakpointsValue.lg)]: {},
    },
    h1: {
      fontSize: heading1,
      fontWeight: 600,

      [breakpoints.down(breakpointsValue.lg)]: {},
    },
    overline: {
      fontSize: overline
    }
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
        textTransform: 'uppercase',
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
        border: `2px solid rgba(30, 79, 203, 1)`,
        backgroundColor: 'transparent',
        color: '#FFF',
        
        '&:hover': {
          border: `2px solid rgba(255, 104, 233, 1)`,
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
