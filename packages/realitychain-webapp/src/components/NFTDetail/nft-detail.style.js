import {createStyles, makeStyles, } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {},
    image: {
      minWidth: 600,
      minHeight: 600,
    },
    media: {
      height: '100%',
      width: '100%',
      objectFit: 'contain',
      borderRadius: 8
    },
    content: {
      display: 'flex',
      gap: 24
    },
    row2: {
      width: '100%'
    },
    avatar: {
      width: 40,
      height: 40,
      background: '#222731',
      color: '#FFF'
    },
    subtitle: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 24
    },
    detail: {
      padding: 24,
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
    },
    link: {
      padding: 24,
      width: '100%',
    },
    key: {
      textTransform: 'uppercase',
      width: 160
    },
    value: {
      width: 284
    },
  }),
);
