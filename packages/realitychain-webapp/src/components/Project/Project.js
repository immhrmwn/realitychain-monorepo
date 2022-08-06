import PuzzleIcon from '@heroicons/react/solid/PuzzleIcon'
import DollarIcon from '@heroicons/react/solid/CurrencyDollarIcon'
import GiftIcon from '@heroicons/react/solid/GiftIcon'
import ArrowRightIcon from '@heroicons/react/solid/ArrowRightIcon'
import PlusIcon from '@heroicons/react/solid/PlusIcon'

import React from "react";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';

import {useNavigate} from 'react-router-dom';



import {useStyles} from './project.style'
import {TabsComponent} from '../Tabs/Tabs';

export const ProjectComponent = () => {
  const navigate = useNavigate();
  const style = useStyles()
  const [activeTab, setActiveTab] = React.useState('0');

  const tabs1 = () => {
    return (
      <Paper style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: 480}}>
        <Typography variant="h4" style={{marginBottom: 10}}>Let’s start create metaverse!</Typography>
        <Typography variant="subtitle1" style={{marginBottom: 40}}>Once you had submit project, the progress will appear here. Submit now and start minting your NFT Parcels</Typography>
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
      title: 'ONE OWNER',
      component: tabs1(),
    },
    {
      id: '1',
      title: 'CROWD STAKING',
      component: tabs2(),
      disabled: true
    },
  ];

  const handleChangeTab = (tab) => {
    setActiveTab(tab);
  };

  const handleCreateMetaverse = () => {
    navigate('/create-metaverse')
  }

  return (
    <Container style={{marginTop: 24, maxWidth: 1171}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start'}}>
        <div style={{display: 'flex', gap: 24}}>
          <Paper elevation={0} className={style.blackPaper}>
            <div className={style.box} style={{backgroundColor: 'rgba(232, 196, 71, 0.2)'}}>
              <SvgIcon component={DollarIcon} viewBox="0 0 20 20" style={{color: "rgba(232, 196, 71, 1)"}} />
            </div>
            <Typography color="textSecondary" style={{fontSize: 13}}>TOTAL STAKE</Typography>
            <Typography style={{fontSize: 30}}>0</Typography>
          </Paper>
          <Paper elevation={0} className={style.blackPaper}>
            <div className={style.box} style={{backgroundColor: 'rgba(205, 155, 222, 0.2)'}}>
              <SvgIcon component={PuzzleIcon} viewBox="0 0 20 20" style={{color: "#CD9BDE"}} />
            </div>
            <Typography color="textSecondary" style={{fontSize: 13}}>METAVERSE</Typography>
            <Typography style={{fontSize: 30}}>0</Typography>
          </Paper>
          <Paper elevation={0} className={style.blackPaper}>
            <div className={style.box} style={{backgroundColor: 'rgba(125, 233, 181, 0.2)'}}>
              <SvgIcon component={GiftIcon} viewBox="0 0 20 20" style={{color: "rgba(125, 233, 181, 1)"}} />
            </div>
            <Typography color="textSecondary" style={{fontSize: 13}}>NFT Parcel</Typography>
            <Typography style={{fontSize: 30}}>0</Typography>
          </Paper>
          <Paper elevation={0} className={style.purplePaper}>
            <div style={{width: 336}}>
              <Typography variant="h4" style={{marginBottom: 4}}>Set up your profile</Typography>
              <Typography variant="subtitle1">Complete your profile to start create metaverse</Typography>
            </div>
            <IconButton color="inherit">
              <SvgIcon component={ArrowRightIcon} viewBox="0 0 20 20" />
            </IconButton>
          </Paper>
        </div>
        <Typography variant="h4" style={{marginTop: 24, marginBottom: 24}}>My Project</Typography>
      </div>
      <div style={{position: 'relative', marginBottom: 24}}>
        <Button 
          onClick={handleCreateMetaverse}
          className={style.button}
          variant="contained"
          color="primary"
          startIcon={
            <SvgIcon component={PlusIcon} viewBox="0 0 20 20" />
          }>
          create metaverse
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
