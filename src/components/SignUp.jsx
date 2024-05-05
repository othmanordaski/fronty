import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Stepper from './Stepper';
import Grid from '@mui/material/Grid';
import { CssBaseline } from '@mui/material';
import image from '../assets/image.png';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '65%',
  height: '95%',
  bgcolor: 'background.paper',
  boxShadow: 28,
  borderRadius: '20px',
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <CssBaseline />
      <Button onClick={handleOpen}>Sign up</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container>
            <Grid item xs={12} sm={6.5}>
              <Stepper />
            </Grid>
            <Grid item xs={12} sm={5.5}>
              <img 
                src={image}
                alt="Description of image" 
                style={{width: '100%', height: '95vh', objectFit: 'cover',borderTopRightRadius: '20px', borderBottomRightRadius: '20px'}} 
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
}