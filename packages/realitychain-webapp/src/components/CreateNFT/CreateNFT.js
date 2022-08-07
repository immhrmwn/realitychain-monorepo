import ChevronRightIcon from '@heroicons/react/solid/ChevronRightIcon';

import React, {useRef} from 'react';
import { useSearchParams } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import {useStyles} from './create.style';

export const CreateNFTComponent = () => {
  const [searchParams] = useSearchParams();

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [image, setImage] = React.useState('');
  const [selectedType, setSelectedType] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [metaverseId, setMetaverseId] = React.useState(searchParams.get('metaverseId'))

  // make sure data of type
  const types = [
    {id: 'select1', name: 'Selection 1'},
    {id: 'select2', name: 'Selection 2'},
    {id: 'select3', name: 'Selection 3'},
    {id: 'select4', name: 'Selection 4'},
  ]
  

  React.useEffect(() => {
    console.log(metaverseId)
    // fetch data metaverse *myriad.town and set to state
  }, [metaverseId])

  const handleClick = () => {
    setOpen(!open);
  };

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const handleChangeDescription = (e) => {
    setDescription(e.target.value)
  }

  const handleSelectType = (_type) => {
    setSelectedType(types.filter(item => item.id === _type)[0]);
    setOpen(open => !open)
  };

  const uploadFieldRef = useRef(null);

  const selectFile = () => {
    const uploadField = uploadFieldRef?.current;

    if (!uploadField) return;

    uploadField.click();
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);

      if (uploadFieldRef && uploadFieldRef.current) {
        uploadFieldRef.current.value = '';
      }
    }
  };

  const handlePreview = () => {
    window.open("https://near.realitychain.io/previewer", { target: '_blank'});
  }

  const handleMint = () => {
    if (name && image && description && selectedType) {
      const payload = {
        name,
        description,
        image,
        selectedType,
        metaverse: 'myriad.town id' // or else ??
      }
      console.log(payload)
    }
  }

  const style = useStyles();
  return (
    <Container style={{marginTop: 24, maxWidth: 888, padding: 0}}>
      <div style={{display: 'flex', gap: 16, marginBottom: 24}}>
        {/* TODO: Breadcrumbs */}
        <Typography variant='h6'>NFT Utility</Typography>
        <SvgIcon component={ChevronRightIcon} viewBox="0 0 20 20" />
        <Typography variant='h6'>Create NFT Utility</Typography>
      </div>
      <Paper style={{minHeight: 972, padding: 24, marginBottom: 24}}>
        <Typography variant='h4' style={{marginBottom: 8}}>Create NFT Utility</Typography>
        <Typography variant='body1' style={{marginBottom: 24}} color="textSecondary">Create and use your own NFT Utility in metaverse.</Typography>
        <div style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24}}>
          {/* need ID, anything else to get myriad.town data */}
          <CardMedia className={style.picture} image={''} title={'image'} />
          <Typography variant='h6' >Myriad.town</Typography>
        </div>
        <div style={{display: 'flex', gap: 40}}>
          <Paper className={style.blackPaper}>
            {!image && <Typography variant='subtitle1' >No image preview</Typography>}
            {!!image &&
              <CardMedia className={style.media} image={image ? image instanceof File ? URL.createObjectURL(image) : image : ''} title={'image'} />
            }
          </Paper>

          <div style={{width: '100%'}}>
            <Typography variant='subtitle1' style={{marginBottom : 4}}>NAME</Typography>
            <TextField value={name} onChange={handleChangeName} style={{marginBottom: 24}} className={style.input} id="outlined-basic" fullWidth placeholder='Round head' />

            <Typography variant='subtitle1' style={{marginBottom : 4}}>DESCRIPTION</Typography>
            <TextField value={description} onChange={handleChangeDescription} style={{marginBottom: 24}} className={style.input} id="outlined-basic" fullWidth placeholder='Just to make variation' multiline minRows={3} />
            
            <Typography variant='subtitle1' style={{marginBottom : 4}}>TYPE</Typography>
            <List
              aria-labelledby="nested-list-subheader"
              className={style.list}
              style={{marginBottom: 24}}
              dense
            >
              <ListItem button onClick={handleClick}>
                <ListItemText primary={selectedType ? selectedType.name : 'Select category'} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                {types.map(type => (
                  <List component="div" disablePadding dense>
                    <ListItem button className={style.nested} key={type.id} onClick={() => handleSelectType(type.id)}>
                      <ListItemText primary={type.name} />
                    </ListItem>
                  </List>
                ))}
              </Collapse>
            </List>

            <Typography variant='subtitle1' style={{marginBottom : 4}}>File</Typography>
            <div style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8}}>
              <input
                type="file"
                ref={uploadFieldRef}
                onChange={handleFileChange}
                style={{display: 'none'}}
                accept="image/png"
              />
              <Button variant="contained" color="secondary" className={style.button} onClick={selectFile}>browse</Button>
              <Typography variant='body2' style={{wordWrap: 'break-word', width: 350}} >{image ? image.name : 'No file selected'}</Typography>
            </div>
            <Typography variant='caption' color="textSecondary">Upload your file here in PNG format.</Typography>

            <div style={{textAlign: 'right', marginTop: 24}}>
              
              <Button variant="outlined" color="primary" style={{width: 'auto', marginRight: 16}} onClick={handlePreview}>preview</Button>
              <Button variant="contained" color="primary" style={{width: 'auto'}} onClick={handleMint}>mint</Button>
            </div>
          </div>
        </div>
      </Paper>
    </Container>
  )
}