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
import BusinessSectorChart from "@/app/BusinessSectorChart"
import ProductTotalChart from "@/app/ProductTotalChart";

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
                        <ProductTotalChart/>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box height={'40vh'} sx={{
                        borderRadius: '20px',
                        backgroundColor: 'white'
                    }}>
                        <BusinessSectorChart/>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box height={'55vh'} sx={{
                        borderRadius: '20px',
                        backgroundColor: 'white'
                    }}>
                        <OrderProfitChart/>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box height={'55vh'} sx={{
                        borderRadius: '20px',
                        backgroundColor: 'white'
                    }}>
                        <CustomerWardChart/>
                    </Box>
                </Grid>
            </Grid>
        </QueryClientProvider>
    );
}
