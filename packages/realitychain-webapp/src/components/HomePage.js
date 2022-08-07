import React from "react";

import { useNavigate } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ReactComponent as RealityChain } from "../assets/logo.svg";

export const HomePage = ({onConnect}) => {
  const navigate = useNavigate();

  const handleCreateNFT = () => {
    if (window.walletConnection.isSignedIn()) {
      navigate('/profile');
    } else {
      onConnect();
    }
  }

  return (
    <Container style={{marginTop: 153.5, maxWidth: 1115, padding: 0, paddingTop: 64.5, paddingBottom: 64.5}}>
      <div style={{position: 'relative'}}>
        <Typography variant="h1" style={{fontSize: 48, width: 587, wordWrap: 'break-word', marginBottom: 28}}>Discover and show your creativity to the metaverse</Typography>
        <Typography variant="subtitle1" style={{width: 298, wordWrap: 'break-word', marginBottom: 28}}>The NFT utility is now available to create in RealityChain.</Typography>
        <Button variant="contained" color="primary" style={{width: 'auto'}} onClick={handleCreateNFT}>Create now</Button>
        <div style={{position: 'absolute', right: 0, top: '50%', zIndex: -99}}>
          {/* change illustration */}
          <RealityChain />
        </div>
      </div>
    </Container>
  );
};
