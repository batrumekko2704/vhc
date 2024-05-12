'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

import OrderProfitChart from "@/app/OrderProfitChart";
import CustomerCityChart from "@/app/CustomerCityChart"
import ProductOriginChart from "@/app/ProductOriginChart";

const queryClient = new QueryClient()

export default function Home() {
    return (
        <QueryClientProvider client={queryClient}>
            <Grid container spacing={2} sx={{
                backgroundColor: '#f2f2f2'
            }}>
                <Grid item xs={8}>
                    <Box height={'40vh'} sx={{
                        borderRadius: '20px',
                        backgroundColor: 'white'
                    }}>
                        <ProductOriginChart/>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box height={'40vh'} sx={{
                        borderRadius: '20px',
                        backgroundColor: 'white'
                    }}>
                        <CustomerCityChart/>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box height={'55vh'} sx={{
                        borderRadius: '20px',
                        backgroundColor: 'white'
                    }}>
                        <OrderProfitChart/>
                    </Box>
                </Grid>
            </Grid>
        </QueryClientProvider>
    );
}
