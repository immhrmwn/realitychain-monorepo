import {createStyles, makeStyles, } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
    },
    blackPaper: {
      width: 208, height: 160, padding: 24, fontSize: 13
    },
    purplePaper: {
      width: 428,
      height: 160,
      padding: 24,
      background: 'rgba(183, 97, 194, 1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    box: {
      padding: 10.4,
      borderRadius: 4,
      display: 'inline-flex',
      marginBottom: 8
    },
    button: {
      position: 'absolute',
      right: 0,
      zIndex: 1,
      width: 'auto'
    },
    owner: {
      width: '100%',
      height: 586,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }),
);
