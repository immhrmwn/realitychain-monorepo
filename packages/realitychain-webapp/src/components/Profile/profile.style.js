import {createStyles, makeStyles, } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {},
    header: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      marginBottom: 24,
    },
    avatar: {
      width: 124,
      height: 124,
      background: '#222731',
      color: '#FFF',
      '& .MuiSvgIcon-root': {
        fontSize: 35,
      }
    },
    button: {
      position: 'absolute',
      right: 0,
      zIndex: 1,
      width: 'auto'
    },
  }),
);
