import {createStyles, makeStyles, } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 32,
    },
    media: {
      height: 250,
      width: '100%',
      objectFit: 'cover',
      background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
      borderRadius: theme.spacing(1),
    },
    media2: {
      height: 250,
      width: '100%',
      objectFit: 'cover',
      background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,114,1) 35%, rgba(255,0,41,1) 100%)',
      borderRadius: theme.spacing(1),
    },
    card: {
      padding: 16
    },
    subtitle: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    },
    avatar: {
      width: 24,
      height: 24
    },
  }),
);
