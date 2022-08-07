import {createStyles, makeStyles} from '@material-ui/core/styles';


export const useStyles = makeStyles(theme =>
  createStyles({
    root: {},
    tabs: {
      '& .MuiTabs-flexContainer': {
        justifyContent: 'left',
      },
      '& .MuiTab-textColorPrimary.Mui-selected': {
        color: '#FFF'
      },
      background: props => props.background ?? 'transparent',

      '& .MuiTab-wrapper': {
        textTransform: 'capitalize',
        fontWeight: 500,
        fontSize: 13,
        lineHeight: '20px',
      },
    },
    tab: {
      minWidth: 120,
    },
  }),
);
