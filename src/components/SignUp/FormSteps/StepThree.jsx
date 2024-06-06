import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { REGEXP_ONLY_DIGITS } from "input-otp"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

export default function StepThree() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        // Handle form submission
    };

    return (
        <>
            <Box sx={{ mt: 3 ,mb : 9 , display : 'flex' , flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                <Typography variant="h6" gutterBottom sx={{mb : 6}}>
                    Confirm Your Email
                </Typography>
                <Grid container sx={{pl : 10}} >
                    <Grid >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
                                <InputOTPGroup >
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                        </form>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}