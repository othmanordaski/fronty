import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import StepOne from './SignUp/StepOne';
import StepTwo from './SignUp/StepTwo';
import StepThree from './SignUp/StepThree';
import { FormDataContext } from './FromDataContext';
import {registerClient} from '../../Api/userApi'

const steps = [
    'Account information',
    'Personal information',
    'Confirmation',
];


const theme = createTheme(
    {
        palette: {
            primary: {
                main: '#87A922',
            },
            secondary: {
                main: '#fff'
            }
        }
    
    }
);

export default function HorizontalLinearAlternativeLabelStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [isValid, setIsValid] = React.useState(false);
    const [formData, setFormData] = React.useState({
        username: '',
        email: '',
        password: '',
        confirmPassword : '',
        age: '',
        clientAddress: '',
        role : '',
        phone: '',
        
      });
    
      const handleNext = () => {
        console.log('before',isValid)
        if (isValid){
            if (activeStep === steps.length - 2) {
                console.log('handle submit');
                console.log('data',formData);
                registerClient(formData)
                .then((response) => {
                    console.log(response.data);
                    console.log('client  registered successfully');
                })
                .catch((error) => {
                    console.log(error.message);
                });
                setActiveStep((prevActiveStep) => prevActiveStep + 1)
                setIsValid(false);
                console.log('after',isValid);
            } else {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setIsValid(false);
            }
        } else {
            console.log('Form is invalid');
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <FormDataContext.Provider value={{formData,setFormData,setIsValid}}>
        <ThemeProvider theme={theme} >
            <Container component="main"  maxWidth="xs" >
            <Box sx={{marginTop: 4 }}>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => (
                        <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: 'center', marginTop: '2rem' ,}}>
                {activeStep === 0 && <StepOne />}
                {activeStep === 1 && <StepTwo />}
                {activeStep === 2 && <StepThree />}
                {activeStep === steps.length && (
                    <div >
                    <p >All steps completed</p>
                    <Button onClick={handleReset}>Reset</Button>
                    </div>
                )}
                {activeStep < steps.length && (
                    <Box sx={{ display: 'flex' }}>
                    {activeStep !== 0 && (
                        <Button
                        onClick={handleBack}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, mr: 10 , color : 'white',borderRadius: '20px' , padding: '8px'}}
                        >
                        Back
                        </Button>
                    )}
                    <Button
                        type={activeStep === steps.length - 1 ? "submit" : "button"}
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2, mb: 2 ,color : 'white',padding: '8px',borderRadius: '20px'}}
                        onClick={handleNext}
                    >
                        {activeStep === steps.length - 1 ? 'Finish' : activeStep === steps.length - 2 ? 'Submit' : 'Next'}
                    </Button>
                    </Box>
                )}
                </Box>
            </Box>
        </Box>
        </Container>
        </ThemeProvider>
        </FormDataContext.Provider>

    );
}