import UserIcon from '@heroicons/react/solid/UserIcon'
import React from 'react'

import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import SvgIcon from '@material-ui/core/SvgIcon';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import {TabsComponent} from '../Tabs/Tabs';
import {useStyles} from './profile.style'

export const ProfileComponent = () => {
  const style = useStyles();
  const [activeTab, setActiveTab] = React.useState('0');

  const tabs1 = () => {
    return (
      <Paper style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: 480}}>
        <Typography variant="h4" style={{marginBottom: 10}}>Create NFT utility now!</Typography>
        <Typography variant="subtitle1" style={{marginBottom: 40}}>Create and use your NFT utilities in metaverse.</Typography>
        <Button variant="text">LEARN MORE</Button>
      </Paper>
    )
  }

  const tabs2 = () => {
    return (
      <Paper style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: 480}}>
        <Typography variant="h4" >hola Ciao</Typography>
      </Paper>
    )
  }

  const tabs = [
    {
      id: '0',
      title: 'NFT UTILITY',
      component: tabs1(),
    },
    {
      id: '1',
      title: 'NFT PARCEL',
      component: tabs2(),
    },
  ];

  const handleChangeTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Container style={{marginTop: 24, maxWidth: 1120, padding: 0}}>
      <div className={style.header}>
        <Avatar className={style.avatar} src="" variant="circle">
          <SvgIcon component={UserIcon} viewBox="0 0 20 20" />
        </Avatar>
        <Typography variant="h4">unknown.near</Typography>
        <Typography variant="body2" color="textSecondary">Joined 24 October 2022</Typography>
        <Button variant="text">edit profile</Button>
      </div>
      
      <div style={{position: 'relative'}}>
        <Button 
          onClick={console.log} //open modal show myriad town
          className={style.button}
          variant="contained"
          color="primary"
          >
          create nft utility 
        </Button>
        <TabsComponent
          position="left"
          tabs={tabs}
          selected={activeTab}
          size={'small'}
          onChangeTab={handleChangeTab}
        />
      </div>
    </Container>
  );
};