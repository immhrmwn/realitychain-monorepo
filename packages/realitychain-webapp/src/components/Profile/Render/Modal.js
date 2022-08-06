import React from 'react'

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { withStyles } from '@material-ui/core/styles';
import { useNavigate } from "react-router-dom";
import {useStyles} from './modal.style'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(3),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h4">{children}</Typography>
      {props.subtitle && <Typography variant="body1">{props.subtitle}</Typography>}
      {onClose && (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      )}
    </MuiDialogTitle>
  );
});

export const SelectMetaverse = (props) => {
  const {onClose, open} = props
  const style = useStyles()
  const navigate = useNavigate();

  // make sure the metaverseId
  const handleCreate = (metaverseId) => {
    navigate(`/nft-utility/create?metaverseId=${metaverseId}`)
  }

  return (
    <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="sm">
      <DialogTitle id="customized-dialog-title" onClose={onClose} subtitle={"Select Metaverse to create new NFT Utility."}>
        Modal title
      </DialogTitle>
      <DialogContent>
        {/* maping data */}
        <div className={style.content}>
          <div className={style.card} onClick={() => handleCreate('myriad.town')}>
            <CardMedia className={style.media} image={""} title={"metaverseimage"} />
            <Typography variant="h6">Myriad.town</Typography>
          </div>
          <div className={style.card} onClick={() => handleCreate('metaverseId')}>
            <CardMedia className={style.media} image={""} title={"metaverseimage"} />
            <Typography variant="h6">Metaverse 1</Typography>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}