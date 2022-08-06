import {createStyles, makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {},
    paper: {},
    blackPaper: {
      background: 'rgba(15, 19, 25, 1)',
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      minWidth: 320,
      height: 320,
      color: theme.palette.text.secondary
    },
    input: {
      '& .MuiInputBase-root': {
        fontSize: 13
      },
      '& .MuiInputBase-input': {
        background: 'rgba(15, 19, 25, 1)',
        padding: '10px 8px',
        borderRadius: 4,
      },
      '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottom: 'none'
      },
      '& .MuiInput-underline:before': {
        borderBottom: 'none'
      },
      '& .MuiInput-underline:after': {
        borderBottom: 'none'
      },
      '& .MuiInputBase-input.Mui-disabled': {
        color: '#FFF',
        background: 'rgba(255, 255, 255, 0.1)'
      }
    },
    radio: {
        display: 'flex',
        gap: 8
    },
    button: {
      width:'auto',
      fontSize: 13,
      fontWeight: 400,
      borderColor: theme.palette.text.secondary
    },
    purple: {
      borderColor: 'rgba(183, 97, 194, 1)',
      background: 'rgba(152, 22, 168, 0.15)'
    },
    list: {
      width: '100%',
      backgroundColor: theme.palette.background.default,
      '& .MuiListItemIcon-root': {
        color: '#FFF'
      },
      paddingTop: 0,
      paddingBottom: 0,
      borderRadius: 4
    },
    nested: {
      // paddingLeft: theme.spacing(4),
    },
    picture: {
      height: 40,
      width: 40,
      objectFit: 'cover',
      borderRadius: theme.spacing(1),
      background: '#FFF'
    },
    media: {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
      borderRadius: theme.spacing(1),
    },
  }),
);
