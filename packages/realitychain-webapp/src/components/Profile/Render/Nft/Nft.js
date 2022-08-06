import { ReactComponent as RealityChain } from "../../../../assets/logo.svg";

import React from 'react'

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import SvgIcon from '@material-ui/core/SvgIcon';

import { useNavigate } from 'react-router-dom';

import {useStyles} from './nft.style'
export const NftUtility = ({nfts}) => {
  const style = useStyles()
  const navigate = useNavigate()

  const handleOpenDetail = (id) => {
    navigate(`/nft-utility/${id}`)
  }
  
  if (!nfts.length) return (
    <Paper style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: 480}}>
      <Typography variant="h4" style={{marginBottom: 10}}>Create NFT utility now!</Typography>
      <Typography variant="subtitle1" style={{marginBottom: 40}}>Create and use your NFT utilities in metaverse.</Typography>
      <Button variant="text">LEARN MORE</Button>
    </Paper>
  )

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', gap: 32, marginBottom: 24}}>
      {/* maping */}
      <Paper style={{width: 256, cursor: 'pointer'}} onClick={() => handleOpenDetail('id')}>
        <Paper variant="outlined" style={{width: '100%', height: 256, background: '#222731'}}>
          <CardMedia className={style.media} image={"https://sb.kaleidousercontent.com/67418/800x533/a5ddfb21a6/persons3-nobg.png"} title={"user.nam"} />
        </Paper>
        <div className={style.content}>
          <Typography variant="h6" style={{marginBottom: 4}}>Floor</Typography>
          <div><Typography variant="caption" color="textSecondary">by unknow.near</Typography></div>
          <Typography variant="caption" style={{color: '#D391D6'}}>Myriad.Town</Typography>
          <Divider style={{background: '#2B3240', height: 2, marginTop: 8, marginBottom: 8}}/>
          <div style={{display: 'flex', gap: 6, alignItems: 'center'}}>
            <Typography variant="caption" color="textSecondary">Minted</Typography>
              <SvgIcon component={RealityChain} viewBox="0 0 40 40" style={{fontSize: 20}}/>
            <Typography variant="caption">50 REAL</Typography>
          </div>
        </div>
      </Paper>
      {/*  */}
      <Paper style={{width: 256}} />
      <Paper style={{width: 256}} />
      <Paper style={{width: 256}} />
    </div>
  )
}