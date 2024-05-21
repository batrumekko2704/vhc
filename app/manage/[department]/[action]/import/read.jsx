import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TotalMonthChart from "@/app/manage/[department]/[action]/import/chart/TotalMonthChart";
import OrderOriginChart from "@/app/manage/[department]/[action]/import/chart/OrderOriginChart";
import OrderMaterialChart from "@/app/manage/[department]/[action]/import/chart/OrderMaterialChart";
import * as React from "react";

const queryClient = new QueryClient()

export default function FinanceRead() {
    return (
        <QueryClientProvider client={queryClient}>
            <Grid container spacing={2} sx={{
                backgroundColor: '#f2f2f2'
            }}>
                <Grid item xs={6}>
                    <Box height={'40vh'} sx={{
                        borderRadius: '20px',
                        backgroundColor: 'white'
                    }}>
                        <OrderMaterialChart/>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box height={'40vh'} sx={{
                        borderRadius: '20px',
                        backgroundColor: 'white'
                    }}>
                        <OrderOriginChart/>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box height={'55vh'} sx={{
                        borderRadius: '20px',
                        backgroundColor: 'white'
                    }}>
                        <TotalMonthChart/>
                    </Box>
                </Grid>
            </Grid>
        </QueryClientProvider>
    )
}