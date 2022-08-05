import React from 'react';
import Paper from '@material-ui/core/Paper';

import Box from '@material-ui/core/Box';
import {createStyles, makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles(theme =>
  createStyles({
    root: {},
    owner: {
      width: '100%',
      height: 586,
      background: 'transparent'
      // display: 'flex',
      // flexDirection: 'column',
      // justifyContent: 'center',
      // alignItems: 'center'
    }
  }),
);

export const TabPanel = props => {
  const {children, value, index, padding = 3, paddingLeft = 0, paddingRight = 0} = props;
  const styles = useStyles({...props, paddingLeft, paddingRight});

  return (
    <div className={styles.root} hidden={value !== index} role="tabpanel">
      <Paper className={styles.owner}>
        {children}
      </Paper>
      {/* <Box p={padding} className={styles.root}>
        {children}
      </Box> */}
    </div>
  );
};
