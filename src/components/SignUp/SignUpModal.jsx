import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from './SignUpStepper';
import Grid from '@mui/material/Grid';
import { CssBaseline } from '@mui/material';
import registerpage from '@/assets/registerpage.png';
const style = {
  position: "absolute",
    height: "95vh",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 750,
    border: "px solid #000",
    boxShadow: 14,
    pl: 2,
    borderRadius: "20px",
};

export default function BasicModal() {

  return (
    <React.Fragment>
      <CssBaseline />      
        <Box sx={style} >
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Stepper />
            </Grid>
            <Grid item xs={12} sm={6}>
              <img 
                src={registerpage}
                alt="Description of image"
                style={{
                  width: "100%",
                  height: "95vh",
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px",}} 
              />
            </Grid>
          </Grid>
        </Box>
    </React.Fragment>
  );
}