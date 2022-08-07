import PlusIcon from '@heroicons/react/solid/PlusIcon'

import React, {useRef} from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import {createStyles, makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      position: 'absolute',
      justifyContent: 'flex-end',
    },
    wrapper: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    button: {
      color: theme.palette.text.secondary
    },
    buttonProgress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  }),
);

export const IconButtonUpload = ({onImageSelected, accept, loading, image}) => {
  const styles = useStyles({image});

  const uploadFieldRef = useRef(null);

  const selectFile = () => {
    const uploadField = uploadFieldRef?.current;

    if (!uploadField) return;

    uploadField.click();
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      onImageSelected(event.target.files[0]);

      if (uploadFieldRef && uploadFieldRef.current) {
        uploadFieldRef.current.value = '';
      }
    }
  };

  return (
    <div className={styles.root}>
      <input
        type="file"
        ref={uploadFieldRef}
        onChange={handleFileChange}
        style={{display: 'none'}}
        accept="image/*"
      />
      <div className={styles.wrapper}>
        <IconButton
          onClick={selectFile}
          disabled={loading}
          aria-label="upload-background"
          className={styles.button}
        >
          <SvgIcon component={PlusIcon} viewBox="0 0 20 20" />
        </IconButton>
        <Typography variant='subtitle1' >{!!image ? 'Change image' : 'Add image'}</Typography>
        {loading && (
          <CircularProgress size={24} color="secondary" className={styles.buttonProgress} />
        )}
      </div>
    </div>
  );
};
