import React from 'react'

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

export const ModalConnect = (props) => {
  const { open, onHide, onLogin } = props;

  return (
    <Dialog onClose={onHide} aria-labelledby="customized-dialog-title" open={open} maxWidth="xs">
      <DialogTitle id="customized-dialog-title">
        Connect your wallet
      </DialogTitle>
      <DialogContent>
        <div style={{}}>
          <Typography variant="subtitle1">To deploy and work with your contracts, you must connect your NEAR wallet.</Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="text" style={{color: '#D391D6', width: 'auto'}} onClick={onHide}>Cancel</Button>
        <Button variant="text" style={{color: '#D391D6', width: 'auto'}} onClick={onLogin}>connect wallet</Button>
      </DialogActions>
    </Dialog>
  )
}