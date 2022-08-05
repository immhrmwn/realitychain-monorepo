import DotsVerticalIcon from '@heroicons/react/solid/DotsVerticalIcon'
import FilterIcon from '@heroicons/react/solid/FilterIcon'

import React from 'react'
import { useParams } from 'react-router-dom'
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import SvgIcon from '@material-ui/core/SvgIcon';
import CardMedia from '@material-ui/core/CardMedia';

import {TabsComponent} from '../Tabs/Tabs';
import {NftParcels} from './Render/NftParcels'
import {useStyles} from './project-detail.style'

export const ProjectDetail = () => {
  const { id } = useParams()
  const style = useStyles()
  const [activeTab, setActiveTab] = React.useState('0');
  
  const tabs = [
    {
      id: '0',
      title: 'NFT PARCELS',
      component: <NftParcels />,
    },
    {
      id: '1',
      title: 'NFT UTILITY',
      component: <h1>hola Ciao</h1>,
    },
    {
      id: '2',
      title: 'ACTIVITY',
      component: <h1>hola moshimos</h1>,
    },
  ];

  const handleChangeTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Container style={{marginTop: 24, maxWidth: 1120, padding: 0}}>
      <Paper className={style.blackpaper}>
        <div className={style.row1}>
          <CardMedia className={style.media} image={""} title={"user.nam"} />
        </div>
        <div className={style.row2}>
          <div className={style.header}>
            <div>
              <Typography variant="h1" style={{marginBottom: 8}}>Metaverse 1</Typography>
              <div className={style.subtitle}>
                <Avatar className={style.avatar} src="" variant="circle">
                  A
                </Avatar>
                <Typography variant="body1">Robert Downey</Typography>

              </div>
            </div>
            <div>
              {false && <Button variant="contained" className={style.button}>In progress</Button>}
              {true && <div>
                <Button variant="contained" className={style.button2} color="primary">EXPLORE metaverse</Button>
                <IconButton className={style.iconButton}>
                  <SvgIcon component={DotsVerticalIcon} viewBox="0 0 20 20" style={{color: '#FFF'}} />
                </IconButton>
              </div>
              }
            </div>
          </div>
          {true && (
            <div className={style.metric}>
              <div style={{textAlign: 'center', width: '25%'}}>
                <Typography variant="h6" style={{marginBottom: 4}}>324</Typography>
                <Typography variant="body1" color="textSecondary">NFT Voucher left</Typography>
              </div>
              <div style={{textAlign: 'center', width: '25%'}}>
                <Typography variant="h6" style={{marginBottom: 4}}>1000</Typography>
                <Typography variant="body1" color="textSecondary">NFT PARCEL</Typography>
              </div>
              <div style={{textAlign: 'center', width: '25%'}}>
                <Typography variant="h6" style={{marginBottom: 4}}>40</Typography>
                <Typography variant="body1" color="textSecondary">NFT UTILITY</Typography>
              </div>
              <div style={{textAlign: 'center', width: '25%'}}>
                <Typography variant="h6" style={{marginBottom: 4}}>40</Typography>
                <Typography variant="body1" color="textSecondary">Population</Typography>
              </div>
            </div>
          )}
          {false && (
            <Paper className={style.greypaper}>
              <Typography style={{marginBottom: 8}} variant="body1">Detail</Typography>
              <div className={style.flexwarp}>
                <Typography variant="body1" style={{width: '25%', color: 'rgba(194, 194, 194, 1)'}}>BLOCKCHAIN</Typography>
                <Typography variant="body1" style={{width: '25%'}}>NEAR</Typography>
                <Typography variant="body1" style={{width: '25%', color: 'rgba(194, 194, 194, 1)'}}>Map</Typography>
                <Typography variant="body1" style={{width: '25%'}}>Option A</Typography>
                <Typography variant="body1" style={{width: '25%', color: 'rgba(194, 194, 194, 1)'}}>Metaverse size</Typography>
                <Typography variant="body1" style={{width: '25%'}}>Large</Typography>
                <Typography variant="body1" style={{width: '25%', color: 'rgba(194, 194, 194, 1)'}}>Wallet address</Typography>
                <Typography variant="body1" style={{width: '25%'}}>unknown.near</Typography>
                <Typography variant="body1" style={{width: '25%', color: 'rgba(194, 194, 194, 1)'}}>Metaverse TYPE</Typography>
                <Typography variant="body1" style={{width: '25%'}}>3D</Typography>
                <Typography variant="body1" style={{width: '25%', color: 'rgba(194, 194, 194, 1)'}}>NFT MARKETPLACE</Typography>
                <Typography variant="body1" style={{width: '25%'}}>PARAS</Typography>
                <Typography variant="body1" style={{width: '25%', color: 'rgba(194, 194, 194, 1)'}}>Requirement</Typography>
                <Typography variant="body1" style={{width: '25%'}}>500 REAL</Typography>
              </div>
            </Paper>
          )}
        </div>
      </Paper>
      {true && (
        <div style={{position: 'relative'}}>
        <div style={{position: 'absolute', right: 0, display: 'flex', gap: 8, alignItems: 'center', zIndex: 1, padding: 6, fontSize: 13}}>
          <Button style={{width: 'auto'}} startIcon={<SvgIcon component={FilterIcon} viewBox="0 0 20 20" style={{color: '#FFF'}} />}>filter</Button>
        </div>
        <TabsComponent
          position="left"
          tabs={tabs}
          selected={activeTab}
          size={'small'}
          onChangeTab={handleChangeTab}
          />
        </div>
      )}
      </Container>
    </div>
  )
}