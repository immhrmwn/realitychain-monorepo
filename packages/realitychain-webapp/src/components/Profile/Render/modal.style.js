import {createStyles, makeStyles} from '@material-ui/core/styles';


export const useStyles = makeStyles(theme =>
  createStyles({
    root: {},
    media: {
      height: 148,
      width: 148,
      objectFit: 'cover',
      background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
      borderRadius: theme.spacing(1),
      marginBottom: 8
    },
    content: {
      width: "calc(752px - 48px)",
      height: 512,
      display: 'flex',
      flexWrap: 'wrap',
      gap: 32
    },
    card: {
      textAlign: 'center',
      '& :hover': {
        cursor: 'pointer'
      }
    }
  }),
);
