import {createStyles, makeStyles} from '@material-ui/core/styles';


export const useStyles = makeStyles(theme =>
  createStyles({
    root: {},
    tabs: {
      marginBottom: '16px',
      minHeight: props => (props.size === 'small' ? 36 : 48),
      background: props => props.background ?? 'transparent',

      // '& .MuiTabs-scroller': {
      //   height: props => (props.size === 'small' ? 36 : 48),
      // },

      '& .MuiTab-wrapper': {
        textTransform: 'capitalize',
        fontWeight: 500,
        fontSize: 13,
        lineHeight: '20px',
      },

      // '& .Mui-selected': {
      //   backgroundColor: props =>
      //     props.mark === 'underline' ? 'transparent' : theme.palette.secondary.main,
      //   borderRadius: 5,
      //   color: '#12130F',

      //   '& .MuiTab-wrapper': {
      //     fontWeight: 600,
      //   },
      // },

      // '& .MuiTabs-indicator': {
      //   display: props => (props.mark === 'underline' ? 'block' : 'none'),
      //   height: theme.spacing(0.5),
      //   borderTopLeftRadius: theme.spacing(0.25),
      //   borderTopRightRadius: theme.spacing(0.25),
      // },
    },
    tab: {
      // minHeight: props => (props.size === 'small' ? 36 : 48),
      // minWidth: props => (props.size === 'small' ? 36 : 48),
      // padding: theme.spacing(0.5),
      // color: props =>
      //   props.mark === 'underline' ? theme.palette.text.secondary : theme.palette.text.primary,
      // [theme.breakpoints.down('xs')]: {
      //   padding: theme.spacing(0.5, 1),
      // },
    },
    indicator: {
      // marginLeft: 4,
      // width: '50%',
      // height: props => (props.size === 'small' ? 4 : 6),
      // display: props => (props.mark === 'underline' ? 'block' : 'none'),
      // background: '#FFC857',
    },
    indicatorColor: {
      backgroundColor: 'rgba(183, 97, 194, 1)',
    },
  }),
);
