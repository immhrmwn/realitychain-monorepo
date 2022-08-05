import PuzzleIcon from '@heroicons/react/solid/PuzzleIcon'
import DollarIcon from '@heroicons/react/solid/CurrencyDollarIcon'
import GiftIcon from '@heroicons/react/solid/GiftIcon'
import UsersIcon from '@heroicons/react/solid/UsersIcon'

import React from 'react'

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';

import {useStyles} from './discover.style'
import {TablesComponent} from './Render/Tables'
export const DiscoverComponent = () => {
  const style = useStyles()

  return (
    <Container style={{marginTop: 24, maxWidth: 1171}}>
      <div style={{display: 'flex', gap: 24}}>
        <div style={{display: 'flex', width: 672, flexWrap: 'wrap', gap: 24}}>
          <Paper className={style.paper}>
            <Typography style={{marginTop: 46, marginBottom: 14}} variant="h2">Welcome to</Typography>
            <Typography style={{marginBottom: 19}} variant="h1">Reality Chain</Typography>
            <Button variant="contained" style={{background: 'rgba(15, 19, 25, 1)', width: 'auto', color: '#FFF'}}>create metaverse</Button>
          </Paper>
          <Paper elevation={0} className={style.blackPaper}>
            <div className={style.box} style={{backgroundColor: 'rgba(232, 196, 71, 0.2)'}}>
              <SvgIcon component={DollarIcon} viewBox="0 0 20 20" style={{color: "rgba(232, 196, 71, 1)"}} />
            </div>
            <Typography color="textSecondary" style={{fontSize: 13}}>TOTAL STAKE</Typography>
            <Typography style={{fontSize: 30}}>500 REAL</Typography>
          </Paper>
          <Paper elevation={0} className={style.blackPaper}>
            <div className={style.box} style={{backgroundColor: 'rgba(205, 155, 222, 0.2)'}}>
              <SvgIcon component={PuzzleIcon} viewBox="0 0 20 20" style={{color: "#CD9BDE"}} />
            </div>
            <Typography color="textSecondary" style={{fontSize: 13}}>METAVERSE</Typography>
            <Typography style={{fontSize: 30}}>46</Typography>
          </Paper>
          <Paper elevation={0} className={style.blackPaper}>
            <div className={style.box} style={{backgroundColor: 'rgba(125, 233, 181, 0.2)'}}>
              <SvgIcon component={GiftIcon} viewBox="0 0 20 20" style={{color: "rgba(125, 233, 181, 1)"}} />
            </div>
            <Typography color="textSecondary" style={{fontSize: 13}}>NFT Parcel</Typography>
            <Typography style={{fontSize: 30}}>1,945</Typography>
          </Paper>
        </div>
        <div style={{width: '100%'}}>
          <Typography style={{marginBottom: 13}} variant="h3">
            <Typography component="span" variant="h3" style={{color: 'rgba(255, 104, 233, 1)'}}>
              Top 5{' '}
            </Typography>
            Asset Creator
          </Typography>
          <Paper style={{width: '100%', height: 'calc(100% - 48px)', padding: 24}}>
            <TablesComponent/>
          </Paper>
        </div>
      </div>
      <Typography style={{marginTop: 24, marginBottom: 24}} variant="h3">
        <Typography component="span" variant="h3" style={{color: 'rgba(255, 104, 233, 1)'}}>
          Current{' '}
        </Typography>
        Crowd Staking
      </Typography>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 24}}>
        <Paper style={{width: 264, padding: 12}}>
          <Paper style={{marginBottom: 8, width: '100%', height: 240, background: 'linear-gradient(276.23deg, #1E3787 11.51%, #6339A6 89.52%)'}} />
          <Typography variant="h4" style={{marginBottom: 4}}>Thor</Typography>
          <Typography variant="caption">by Chris Hemsworth</Typography>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{width: 200, height: 4, background: '#D9D9D9', borderRadius: 4, overflow: 'hidden'}}>
              <div style={{width: '60%', height: 4, background: 'linear-gradient(91.46deg, #FF68E9 2.35%, #5B44FA 54.7%, #5DDEDE 99.93%)'}} />
            </div>
            <Typography variant="caption">60%</Typography>
          </div>
          <Typography variant="caption" style={{display: 'flex', alignItems: 'center', gap: 4}}>
          <SvgIcon component={UsersIcon} viewBox="0 0 20 20" fontSize="inherit" />
          200 people staked
          </Typography>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
              <Typography variant="caption" style={{fontSize: 10}}>GOALS</Typography>
              <Typography variant="h6">500 REAL</Typography>
            </div>
            <Button variant="outlined" color="primary" style={{width: 'auto'}}>stake</Button>
          </div>
        </Paper>
        <Paper style={{width: 264, height: 412, padding: 12}} />
        <Paper style={{width: 264, height: 412, padding: 12}} />
        <Paper style={{width: 264, height: 412, padding: 12}} />
      </div>
    </Container>
  )
}