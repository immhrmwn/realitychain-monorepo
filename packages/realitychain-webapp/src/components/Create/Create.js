import ChevronRightIcon from '@heroicons/react/solid/ChevronRightIcon'

import React from 'react'

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import CardMedia from '@material-ui/core/CardMedia';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


import { ReactComponent as NearIcon } from "../../assets/wallets/near24.svg";
import { ReactComponent as PolyIcon } from "../../assets/wallets/polygon.svg";
import { ReactComponent as EthereumIcon } from "../../assets/wallets/ethereum.svg";
import {IconButtonUpload} from './Render/IconButtonUpload'

import {useStyles} from './create.style'

export const CreateComponent = () => {
  const style = useStyles()
  const [name, setName] = React.useState('');
  const [image, setImage] = React.useState('');
  const [type, setType] = React.useState('');
  const [size, setSize] = React.useState('');
  const [metaverse, setMetaverse] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [selectedBlockchain, setSelectedBlockchain] = React.useState(undefined);

  const blockchains = [
    {id: 'near', name: 'NEAR'},
    {id: 'ethereum', name: 'Ethereum'},
    {id: 'polygon', name: 'Polygon'},
  ]

  const icons = React.useMemo(
    () => ({
      ethereum: <SvgIcon component={EthereumIcon} viewBox="0 0 32 32" />,
      near: <SvgIcon component={NearIcon} viewBox="0 0 24 24" />,
      polygon: <SvgIcon component={PolyIcon} viewBox="0 0 32 32" />,
    }),
    [],
  );

  const handleUpdateImage = async (_image) => {
    setImage(_image);
  };

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleChangeType = (_value) => {
    setType(_value);
  };

  const handleSelectBlockchain = (_value) => {
    setSelectedBlockchain(blockchains.filter(item => item.id === _value)[0]);
    setOpen(open => !open)
  };

  const handleChangeSize = (_value) => {
    setSize(_value);
  };

  const handleChangeMetaverse = (_value) => {
    setMetaverse(_value);
  };


  const handleClick = () => {
    setOpen(!open);
  };

  const handleReset = () => {
    setMetaverse('');
    setSize('');
    setSelectedBlockchain('');
    setType('');
    setName('');
    setImage('');
  }

  return (
    <Container style={{marginTop: 24, maxWidth: 888, boxSizing: 'border-box'}}>
      <div style={{display: 'flex', gap: 16, marginBottom: 24}}>
        {/* TODO: Breadcrumbs */}
        <Typography variant='h6'>My Project</Typography>
        <SvgIcon component={ChevronRightIcon} viewBox="0 0 20 20" />
        <Typography variant='h6'>Create Metaverse</Typography>
      </div>
      <Paper style={{minHeight: 972, padding: 24, marginBottom: 24}}>
        <Typography variant='h4' style={{marginBottom: 8}}>Create Metaverse</Typography>
        <Typography variant='body1' style={{marginBottom: 24}}>Select an option from the list below</Typography>
        <div style={{display: 'flex', gap: 40}}>
          <Paper className={style.blackPaper}>
            <IconButtonUpload 
            title="Upload Image"
            onImageSelected={handleUpdateImage}
            loading={false}
            accept="image"
            image={image}
            />
            {!!image &&
              <CardMedia className={style.media} image={image ? image instanceof File ? URL.createObjectURL(image) : image : ''} title={'image'} />
            }
          </Paper>
          <div style={{width: '100%'}}>
            <Typography variant='subtitle1' style={{marginBottom : 4}}>METAVERSE NAME</Typography>
            <TextField value={name} onChange={handleChange} style={{marginBottom: 24}} className={style.input} id="outlined-basic" fullWidth placeholder='Add metaverse name' />
            
            <Typography variant='subtitle1' style={{marginBottom : 4}}>TYPE OF STAKING</Typography>
            <div className={style.radio} style={{marginBottom: 24}}>
              <Button onClick={() => handleChangeType('One owner')} className={`${style.button} ${type === 'One owner' && style.purple}`} variant="outlined" >One owner</Button>
              <Button onClick={() => handleChangeType('Crowd Staking')} className={`${style.button} ${type === 'Crowd Staking' && style.purple}`} variant="outlined" >Crowd Staking</Button>
            </div>

            <Typography variant='subtitle1' style={{marginBottom : 4}}>BLOCKCHAIN SELECTION</Typography>
            <List
              aria-labelledby="nested-list-subheader"
              className={style.list}
              style={{marginBottom: 24}}
              dense
            >
              <ListItem button onClick={handleClick}>
                {selectedBlockchain && <ListItemIcon>{icons[selectedBlockchain.id]}</ListItemIcon>}
                <ListItemText primary={selectedBlockchain ? selectedBlockchain.name : 'Select'} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding dense>
                  {blockchains.map(item => (
                    <ListItem button className={style.nested} key={item.id} onClick={() => handleSelectBlockchain(item.id)}>
                      <ListItemIcon>{icons[item.id]}</ListItemIcon>
                      <ListItemText primary={item.name} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </List>

            <Typography variant='subtitle1' style={{marginBottom : 4}}>METAVERSE SIZE</Typography>
            {/* TODO: BUTTON */}
            <div className={style.radio} style={{marginBottom: 24}}>
              <Button onClick={() => handleChangeSize('small')} className={`${style.button} ${size === 'small' && style.purple}`} variant="outlined" >Small</Button>
              <Button onClick={() => handleChangeSize('medium')} className={`${style.button} ${size === 'medium' && style.purple}`} variant="outlined" >Medium</Button>
              <Button onClick={() => handleChangeSize('large')} className={`${style.button} ${size === 'large' && style.purple}`} variant="outlined" >Large</Button>
            </div>

            <Typography variant='subtitle1' style={{marginBottom : 4}}>METAVERSE TYPE</Typography>
            {/* TODO: BUTTON */}
            <div className={style.radio} style={{marginBottom: 24}}>
              <Button onClick={() => handleChangeMetaverse('2d')} className={`${style.button} ${metaverse === '2d' && style.purple}`} variant="outlined" >2d</Button>
              <Button onClick={() => handleChangeMetaverse('3d')} className={`${style.button} ${metaverse === '3d' && style.purple}`} variant="outlined" >3d</Button>
            </div>

            <Typography variant='subtitle1' style={{marginBottom : 4}}>NFT MARKETPLACE</Typography>
            {/* TODO: LISTCOMPONENT NESTED */}
            <List
              aria-labelledby="nested-list-subheader"
              className={style.list}
              style={{marginBottom: 24}}
              dense
            >
              <ListItem button onClick={handleClick}>
                <ListItemText primary="Select" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding dense>
                  <ListItem button className={style.nested}>
                    <ListItemIcon>
                      <SvgIcon component={NearIcon} viewBox="0 0 24 24" />
                    </ListItemIcon>
                    <ListItemText primary="NEAR" />
                  </ListItem>
                </List>
              </Collapse>
            </List>

            <Typography variant='subtitle1' style={{marginBottom : 4}}>MAP</Typography>
            {/* TODO: LISTCOMPONENT NESTED */}
            <List
              aria-labelledby="nested-list-subheader"
              className={style.list}
              style={{marginBottom: 24}}
              dense
            >
              <ListItem button onClick={handleClick}>
                <ListItemText primary="Select" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding dense>
                  <ListItem button className={style.nested}>
                    <ListItemIcon>
                      <SvgIcon component={NearIcon} viewBox="0 0 24 24" />
                    </ListItemIcon>
                    <ListItemText primary="NEAR" />
                  </ListItem>
                </List>
              </Collapse>
            </List>

            <Typography variant='subtitle1' style={{marginBottom : 4}}>WALLET ADDRESS</Typography>
            {/* TODO: TEXFIELD DISABLED */}
            <TextField disabled style={{marginBottom: 24}} className={style.input} id="outlined-basic" fullWidth placeholder='unknown.near' value="unknown.near" />

            <Typography variant='subtitle1' style={{marginBottom : 4}}>REQUIREMENT</Typography>
            <TextField className={style.input} style={{marginBottom : 24}} id="outlined-basic" fullWidth placeholder='REAL' />

            <div style={{display: 'flex', justifyContent: 'flex-end', gap: 16}}>
              <Button variant="outlined" className={style.button} onClick={handleReset}>reset</Button>
              <Button variant="contained" color="primary" style={{width: 'auto', fontSize: 13, fontWeight: 400}}>Submit</Button>
            </div>
          </div>
        </div>
      </Paper>
    </Container>
  )
}