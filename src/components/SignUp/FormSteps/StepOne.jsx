import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import {FormDataContext} from '../../FromDataContext'
import * as yup from 'yup';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Email is not valid').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
});

export default function StepOne() {
  const {formData,setFormData,setIsValid} = React.useContext(FormDataContext);
  const [errors, setErrors] = React.useState({});

  const handleChange = (event) => {
    const updatedFormData = {
      ...formData,
      [event.target.name]: event.target.value,
    };
    setFormData(updatedFormData);
  
    schema.validateAt(event.target.name, {[event.target.name]: event.target.value, password: formData.password})
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
          autoComplete="given-name"
          name="username"
          required
          fullWidth
          id="username"
          label="Username"
          autoFocus
          value={formData.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          autoComplete="new-password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />
      </Grid>
      <Grid container justifyContent="flex-end">
              <Grid item sx={{mt : '4px'}}>
                <Link href="/login" variant="body2">
                  Already have an account?
                </Link>
              </Grid>
      </Grid>
    </Grid>
  );
}