import React from 'react';

import Paper from '@material-ui/core/Paper';
import { CardMedia, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

import {useStyles} from './nft-parcels.style'

export const NftParcels = () => {
  const style = useStyles();
  return (
    <div className={style.root}>
      <Paper style={{width: 256, paddingBottom: 16}}>
        <CardMedia className={style.media} image={""} title={"user.nam"} />
        <div className={style.card}>
          <Typography variant="body2">NFT parcel is locked</Typography>
        </div>
      </Paper>
      <Paper style={{width: 256, paddingBottom: 16}}>
        <CardMedia className={style.media2} image={""} title={"user.nam"} />
        <div className={style.card}>
          <Typography variant="body2">JKT (124,40)</Typography>
          <Typography variant="overline" color="textSecondary">Owned by</Typography>
          <div className={style.subtitle}>
            <Avatar className={style.avatar} src="" variant="circle">
              A
            </Avatar>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <Typography variant="caption" style={{lineHeight: 1}}>Robert Downey</Typography>
              <Typography variant="overline" color="textSecondary" style={{lineHeight: 1, textTransform: 'none'}}>robert.near</Typography>
            </div>
          </div>
        </div>
      </Paper>
      <Paper style={{width: 256, paddingBottom: 16}}>
        <CardMedia className={style.media} image={""} title={"user.nam"} />
        <div className={style.card}>
          <Typography variant="body2">NFT parcel is locked</Typography>
        </div>
      </Paper>
      <Paper style={{width: 256, paddingBottom: 16}}>
        <CardMedia className={style.media} image={""} title={"user.nam"} />
        <div className={style.card}>
          <Typography variant="body2">NFT parcel is locked</Typography>
        </div>
      </Paper>
    </div>
  )
}