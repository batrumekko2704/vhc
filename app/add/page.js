'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

import OrderProfitChart from "@/app/OrderProfitChart";
import CustomerWardChart from "@/app/CustomerWardChart"
import {Autocomplete, Button, TextField} from "@mui/material";

const queryClient = new QueryClient()

export default function Home() {
    const top100Films = [
        {label: 'The Shawshank Redemption', year: 1994},
        {label: 'The Godfather', year: 1972},
    ]
    return (
        <QueryClientProvider client={queryClient}>
            <Grid container spacing={2}>
                <Grid item xs display="flex" justifyContent="center" alignItems="center">
                    <h1> Order submission form </h1>
                </Grid>
                <Grid item>
                    <Box component="form"
                         sx={{
                             '& > :not(style)': {m: 1, width: '30vw'},
                         }}
                         noValidate
                         autoComplete="off"
                    >
                        <TextField id="staff-name" label="Staff name" variant="outlined"/>
                    </Box>
                    <Box component="form"
                         sx={{
                             '& > :not(style)': {m: 1, width: '30vw'},
                         }}
                         noValidate
                         autoComplete="off"
                    >
                        <TextField id="quantity" label="Quantity" variant="outlined"/>
                        <TextField id="total-money" label="Total money" variant="outlined"/>
                    </Box>
                    <Box component="form"
                         sx={{
                             '& > :not(style)': {m: 1, width: '30vw'},
                         }}
                         noValidate
                         autoComplete="off"
                    >
                        <TextField id="discount" label="Discount" variant="outlined"/>
                        <TextField id="shipping-cost" label="Shipping cost" variant="outlined"/>
                        <TextField id="summary-sale" label="Summary sale" variant="outlined"/>
                    </Box>
                    <Grid container sx={{
                        margin: 1
                    }}>
                        <Grid item sx={{
                            marginRight: 2
                        }}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={top100Films}
                                sx={{width: 300}}
                                renderInput={(params) => <TextField {...params} label="Movie"/>}
                            />
                        </Grid>
                        <Grid item>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={top100Films}
                                sx={{width: 300}}
                                renderInput={(params) => <TextField {...params} label="Movie"/>}
                            />
                        </Grid>
                    </Grid>
                    <Box component="form"
                         sx={{
                             '& > :not(style)': {m: 1, width: '30vw'},
                         }}
                         noValidate
                         autoComplete="off"
                    >
                        <TextField id="timestamp" label="Timestamp" variant="outlined"/>
                    </Box>
                </Grid>
                <Grid item xs display="flex" justifyContent="center" alignItems="center">
                    <Button variant="contained" size="large">Submit</Button>
                </Grid>
            </Grid>
        </QueryClientProvider>
    );
}
