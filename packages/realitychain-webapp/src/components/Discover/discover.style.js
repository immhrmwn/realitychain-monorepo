import {createStyles, makeStyles} from '@material-ui/core/styles';
import image from '../../assets/discover.png'

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {},
    paper: {
      width: 672,
      height: 244,
      padding: 24,
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover'
    },
    blackPaper: {
      width: 208, height: 160, padding: 24, fontSize: 13
    },
    box: {
      padding: 10.4,
      borderRadius: 4,
      display: 'inline-flex',
      marginBottom: 8
    },
  }),
);
