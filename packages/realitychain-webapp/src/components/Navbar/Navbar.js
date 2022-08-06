import React from "react";

import { ReactComponent as RealityChain } from "../../assets/logo.svg";

import BellIcon from '@heroicons/react/solid/BellIcon'
import UserCircleIcon from '@heroicons/react/solid/UserCircleIcon'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import AppBar from '@material-ui/core/AppBar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { useNavigate, useLocation } from "react-router-dom";
import {useStyles} from './navbar.style'

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  const style = useStyles();
  const navigate = useNavigate();
  return (
    <Tab
      component="a"
      className={style.tab}
      onClick={(event) => {
        event.preventDefault();
        navigate(props.href)
      }}
      {...props}
    />
  );
}

export const Navbar = ({onConnect, balance}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const style = useStyles();
  const [value, setValue] = React.useState(null);

  React.useEffect(() => {
    const paths = ['discover', 'marketplace', 'project', 'nft-utility']
    paths.forEach(path => {
      const regex = new RegExp(`${path}`, 'i');
      if (location.pathname.match(regex) !== null) {
          setValue(location.pathname.match(regex)[0])
      }
    })
  }, [location])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleConnectWallet = () => {
    onConnect();
  };

  return (
    <AppBar position="static" color='primary'>
      <Toolbar style={{justifyContent: 'space-between'}}>
        <div style={{display: 'flex', alignItems: "center"}}>
          <IconButton
            onClick={() => navigate('/')}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <SvgIcon component={RealityChain} viewBox="0 0 40 40" style={{fontSize: 40}} />
          </IconButton>
          <Typography variant="h4" style={{fontWeight: 600, marginRight: 24}}>
            REALITYCHAIN
          </Typography>
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
            classes={{root: style.tabs}}
          >
            <LinkTab label="DISCOVER" href="/discover" value={'discover'} {...a11yProps(0)} />
            <LinkTab label="MARKETPLACE" href="/marketplace" value={'marketplace'} disabled {...a11yProps(1)} />
            <LinkTab label="MY PROJECT" href="/project" value={'project'} {...a11yProps(2)} />
            <LinkTab label="NFT UTILITY" href="/nft-utility" value={'nft-utility'} disabled {...a11yProps(3)} />
          </Tabs>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
          {window.walletConnection.isSignedIn() ?
            <ButtonGroup size="small" variant="outlined" color="primary" style={{justifySelf: 'flex-end'}}>
              <Button style={{width: 'auto', color: '#B761C2', borderRightColor: 'transparent', marginRight: -3}}>500 REAL</Button>
              <Button style={{width: 'auto', backgroundColor: 'rgba(152, 22, 168, 0.15)', borderLeftColor: 'transparent'}}>unknown.near</Button>
            </ButtonGroup>
          :
            <Button variant="contained" color="primary" style={{width: 'auto'}} onClick={handleConnectWallet}>Connect</Button>
          }
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <SvgIcon component={BellIcon} viewBox="0 0 20 20" />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate('/profile')}
          >
            <SvgIcon component={UserCircleIcon} viewBox="0 0 20 20" />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}