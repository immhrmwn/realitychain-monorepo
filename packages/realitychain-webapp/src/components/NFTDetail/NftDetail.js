import UserIcon from '@heroicons/react/solid/UserIcon'
import ExternalLinkIcon from '@heroicons/react/solid/ExternalLinkIcon'

import React from 'react'

import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import SvgIcon from '@material-ui/core/SvgIcon';

import { useStyles } from './nft-detail.style';
import { Typography, Avatar } from '@material-ui/core';
import { useParams } from 'react-router-dom';

export const NFTDetail = () => {
  const style = useStyles();
  const {id} = useParams();

  React.useEffect(() => {
    console.log(id)
    // fetch data nft from id or any else
  }, [id])

  const handleOpenLink = () => {
    // make sure fix link
    window.open("https://paras.id/", { target: '_blank'});
  }

  return (
    <Container style={{marginTop: 24, maxWidth: 1120, padding: 0}}>
      <div className={style.content}>
        <Paper className={style.image}>
          <CardMedia className={style.media} image={"https://sb.kaleidousercontent.com/67418/800x533/a5ddfb21a6/persons3-nobg.png"} title={"user.nam"} />
        </Paper>
        <div className={style.row2}>
          <Typography variant="h1" style={{marginBottom: 24}}>Polo Shirt</Typography>
          <Typography variant="body2" style={{marginBottom: 8}}>Owned by</Typography>
          <div className={style.subtitle}>
            <Avatar className={style.avatar} src="" variant="circle">
              <SvgIcon component={UserIcon} viewBox="0 0 20 20" />
            </Avatar>
            <Typography variant="subtitle1">unknown.near</Typography>
          </div>
          <Paper className={style.detail} style={{marginBottom: 24}}>
            <Typography variant="subtitle1" className={style.key} color={'textSecondary'}>Description</Typography>
            <Typography variant="subtitle1" className={style.value}>Shirt for my avatar</Typography>
            <Typography variant="subtitle1" className={style.key} color={'textSecondary'}>TYPE</Typography>
            <Typography variant="subtitle1" className={style.value}>AvatarTop</Typography>
            <Typography variant="subtitle1" className={style.key} color={'textSecondary'}>Body</Typography>
            <Typography variant="subtitle1" className={style.value}>Male</Typography>
            <Typography variant="subtitle1" className={style.key} color={'textSecondary'}>Metaverse</Typography>
            <Typography variant="subtitle1" className={style.value}>Myriad.Town</Typography>
          </Paper>
          <Paper className={style.link}>
            <Typography variant="subtitle1" className={style.key} color={'textSecondary'}>NFT Utility link</Typography>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer'}}>
              <Typography variant="subtitle1" component="a" style={{color: '#D391D6'}} onClick={handleOpenLink}>{'paras.id/abcde'}</Typography>
              <SvgIcon component={ExternalLinkIcon} viewBox="0 0 20 20" />
            </div>
          </Paper>
        </div>
      </div>
    </Container>
  )
}