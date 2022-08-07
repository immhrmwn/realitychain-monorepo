import React from 'react'

import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
  table: {
    
    '& .MuiTableCell-sizeSmall': {
      padding: 6
    },

    '& .MuiTableCell-stickyHeader': {
      background: 'transparent'
    },
    '& .MuiTableCell-root': {
      borderBottom: '8px solid rgba(25, 31, 41, 1)',
      fontSize: 13
    },
    '& .MuiTableBody-root': {
      background: 'rgba(53, 60, 73, 0.6)'
    }
  },
  body: {
    width: '100%',
    display: 'flex',
    fontSize: 13,
    background: 'rgba(53, 60, 73, 0.6)',
  }
}));

function createData(name, assets, metaverse) {
  return { name, assets, metaverse };
}

const rows = [
  createData('Dwayne Johnson', 40, 2),
  createData('Tom Hardy', 37, 2),
  createData('Chris Evans', 32, 2),
  createData('Tom Holland', 29, 1),
  createData('Chris Hemsworth', 15, 1),
];


export const TablesComponent = () => {
  const classes = useStyles({rows});

  return (
    <>
      <div style={{width: '100%', display: 'flex', fontSize: 13, marginBottom: 8}}>
        <div style={{width: 144, padding: '16px 6px 16px 16px'}}>Creator</div>
        <div style={{width: 116, padding: '16px 6px'}}>Total Asset</div>
        <div style={{width: 116, padding: '16px 6px'}}>Total Metaverse</div>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
      {rows.map((row, i) => (
        <div className={classes.body}>
          <div style={{width: 144, padding: '16px 6px 16px 16px'}}>{row.name}</div>
          <div style={{width: 116, padding: '16px 6px'}}>{row.assets}</div>
          <div style={{width: 116, padding: '16px 6px'}}>{row.metaverse}</div>
        </div>
      ))}
      </div>
    </>
  )
}