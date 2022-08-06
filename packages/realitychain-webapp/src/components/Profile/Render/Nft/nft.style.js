import {createStyles, makeStyles, } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {},
    media: {
      height: 256,
      width: 256,
      objectFit: 'contain',
    },
    content: {
      padding: 16,
    }
  }),
);
