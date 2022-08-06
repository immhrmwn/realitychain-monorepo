import {createStyles, makeStyles} from '@material-ui/core/styles';


export const useStyles = makeStyles(theme =>
  createStyles({
    root: {},
    tabs: {
      '& .MuiTabs-flexContainer': {
        justifyContent: props => props.position ?? null,
      },
      '& .MuiTab-textColorPrimary.Mui-selected': {
        color: '#FFF'
      },
      '& .MuiTab-textColorPrimary.Mui-disabled': {
        color: 'grey'
      }
    },
  }),
);
