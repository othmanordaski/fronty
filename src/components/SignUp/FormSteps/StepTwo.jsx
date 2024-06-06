import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { FormDataContext } from '../../FromDataContext';
import * as yup from 'yup';

const schema = yup.object().shape({
  age: yup.number().typeError('Age must be a number').positive('The age must be a positive number').integer('Phone number must be an integer').min(18, 'You must be at least 18 years old').max(110, 'Please enter a valid age').required('Age is required'),
  clientAddress: yup.string().required('Client Address is required'),
  phone: yup.number().positive('Phone number must be positive').integer('Phone number must be an integer').required('Phone is required').test('len', 'Phone number must be exactly 10 digits', val => val && val.toString().length === 9),
  role: yup.string().required('Role is required'),
});

export default function StepTwo() {
  const {formData,setFormData,setIsValid} = React.useContext(FormDataContext);
  const [errors, setErrors] = React.useState({});
  const [value, setValue] = React.useState();


  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    schema.validateAt(event.target.name, {[event.target.name]: event.target.value})
      .then(() => {
        setErrors({...errors, [event.target.name]: ''});
        setIsValid(true)
      })
      .catch(err => {
        setErrors({...errors, [event.target.name]: err.errors[0]});
        setIsValid(false)
      });
  };

  return (
    <Grid container spacing={2} >
      <Grid item xs={12}>
        <TextField
          name="age"
          type="number"
          required
          fullWidth
          id="age"
          label="Age"
          autoFocus
          value={formData.age}
          onChange={handleChange}
          error={!!errors.age}
          helperText={errors.age}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="clientAddress"
          label="Client Address"
          name="clientAddress"
          value={formData.clientAddress}
          onChange={handleChange}
          error={!!errors.clientAddress}
          helperText={errors.clientAddress}
        />
      </Grid>
      <Grid item xs={12}>
            <TextField
          required
          fullWidth
          id="role"
          label="Role"
          name="role"
          select
          value={formData.role}
          onChange={handleChange}
          error={!!errors.role}
          helperText={errors.role}
          >
          <MenuItem value="">
              Select role ...
          </MenuItem>
          <MenuItem value="Delivery">
              Personal Delivery
          </MenuItem>
          <MenuItem value="Restaurant">
              Restaurant Owner
          </MenuItem>
      </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="phoneNumber"
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone}
        />
      </Grid>
      
    </Grid>
  );
}