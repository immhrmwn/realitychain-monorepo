import {createStyles, makeStyles, } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {},
    blackpaper: {
      width: '100%',
      padding: 24,
      display: 'flex',
      justifyContent: 'flex-start',
      gap: 24,
      marginTop: 150,
      marginBottom: 24
    },
    row1:{
      minWidth: 224,
      position: 'relative'
    },
    media: {
      position: 'absolute',
      left: 0,
      top: -140,
      height: '224px',
      width: '100%',
      objectFit: 'cover',
      background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
      borderRadius: theme.spacing(1),
    },
    row2:{
      width: '100%',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 24
    },
    avatar: {
      width: 24,
      height: 24
    },
    subtitle: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    },
    greypaper: {
      background: 'rgba(34, 39, 49, 1)',
      padding: 24
    },
    flexwarp: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    button: {
      height: 32,
      width: 'auto',
      background: '#F3D94E',
      color: '#0A0A0A',
      textTransform: 'none',
      fontWeight: 400
    },
    button2: {
      height: 32,
      width: 'auto',
    },
    iconButton: {
      padding: 6,
      marginLeft: 8
    },
    metric: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }),
);
