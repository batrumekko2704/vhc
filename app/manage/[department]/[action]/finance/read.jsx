import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ProductTotalChart from "@/app/manage/[department]/[action]/finance/chart/ProductTotalChart";
import BusinessSectorChart from "@/app/manage/[department]/[action]/finance/chart/BusinessSectorChart";
import OrderProfitChart from "@/app/manage/[department]/[action]/finance/chart/OrderProfitChart";
import CustomerWardChart from "@/app/manage/[department]/[action]/finance/chart/CustomerWardChart";
import * as React from "react";

const queryClient = new QueryClient()

export default function ImportRead() {
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
    )
}