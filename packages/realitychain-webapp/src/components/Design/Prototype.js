import PuzzleIcon from '@heroicons/react/solid/PuzzleIcon'
import BellIcon from '@heroicons/react/solid/BellIcon'
import UserCircleIcon from '@heroicons/react/solid/UserCircleIcon'

import React from "react";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import AppBar from '@material-ui/core/AppBar';
// import Container from '@material-ui/core/Container';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';

export const Appbar = () => {
  return (
    <AppBar position="static" color='primary'>
      <Toolbar style={{justifyContent: 'space-between'}}>
        <div style={{display: 'flex', alignItems: "center"}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            A
          </IconButton>
          <Typography style={{fontSize: 22, fontWeight: 600, marginRight: 24}}>
            REALITYCHAIN
          </Typography>
          <div style={{display: 'flex', gap: 32}}>
            <Typography style={{fontSize: 12, fontWeight: 500}}>
              DISCOVER
            </Typography>
            <Typography style={{fontSize: 12, fontWeight: 500}}>
            MARKETPLACE
            </Typography>
            <Typography style={{fontSize: 12, fontWeight: 500}}>
            MY PROJECT
            </Typography>
            <Typography style={{fontSize: 12, fontWeight: 500}}>
            MY ASSET (Soon)
            </Typography>
            </div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
          <ButtonGroup size="small" variant="outlined" color="primary" style={{justifySelf: 'flex-end'}}>
            <Button style={{width: 'auto', color: '#B761C2', borderRightColor: 'transparent', marginRight: -3}}>500 REAL</Button>
            <Button style={{width: 'auto', backgroundColor: 'rgba(152, 22, 168, 0.15)', borderLeftColor: 'transparent'}}>unknown.near</Button>
          </ButtonGroup>
          <SvgIcon component={BellIcon} viewBox="0 0 20 20" />
          <SvgIcon component={UserCircleIcon} viewBox="0 0 20 20" />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export const Prototype = () => {

  return (
    <>
    <Appbar />
    <div style={{display: 'flex', flexDirection: 'column', gap: 8, padding: 100, alignItems: 'flex-start'}}>
      <Button variant="contained" color="primary">contained-primary</Button>
      <Button variant="contained" color="secondary">contained-secondary</Button>
      <h1>Design</h1>
      <Paper elevation={0} style={{width: 208, height: 160, padding: 24, fontSize: 13}}>
        <div
          style={{
            padding: 10.4,
            backgroundColor: 'rgba(205, 155, 222, 0.2)',
            borderRadius: 4,
            display: 'inline-flex',
            marginBottom: 8
          }}
        >
          <SvgIcon component={PuzzleIcon} viewBox="0 0 20 20" style={{color: "#CD9BDE"}} />
        </div>
        <Typography color="textSecondary" style={{fontSize: 13}}>METAVERSE</Typography>
        <Typography style={{fontSize: 30}}>0</Typography>
      </Paper>
      <Paper elevation={0} style={{width: 208, height: 160, padding: 24, fontSize: 13}}>
      </Paper>
    </div>
    </>
  );
};
