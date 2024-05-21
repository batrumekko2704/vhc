'use client'

import * as React from 'react';
import Box from '@mui/material/Box';

import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableRowsIcon from '@mui/icons-material/TableRows';
import {createTheme, ThemeProvider, styled} from '@mui/material/styles';
import Content from '@/app/manage/[department]/[action]/content'
import PaidIcon from '@mui/icons-material/Paid';
import Link from 'next/link'
import Popchat from "@/app/manage/[department]/[action]/Popchat";

const theme = createTheme({
    typography: {
        fontFamily: "Montserrat",
    },
});

const drawerWidth = 240;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Manage({params}) {

    const handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        // Now send the message throught the backend API
    };

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Popchat/>
            <ThemeProvider theme={theme}>
                <Box sx={{display: 'flex'}}>
                    <CssBaseline/>
                    <AppBar position="fixed" open={open}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{mr: 2, ...(open && {display: 'none'})}}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" noWrap component="div">
                                Hệ thống quản lý thông tin Việt Hương Ceramics
                            </Typography>
                            <Box sx={{ml: "auto"}}></Box>
                            <Link href={`/manage/${params.department}/read`}>
                                <IconButton
                                    color="inherit"
                                    sx={{mr: 2}}
                                >
                                    <DashboardIcon/>
                                </IconButton>
                            </Link>
                            <Link href={`/manage/${params.department}/add`}>
                                <IconButton
                                    color="inherit"
                                    sx={{mr: 2}}
                                >
                                    <ModeEditIcon/>
                                </IconButton>
                            </Link>
                            <Link href={`/manage/${params.department}/table`}>
                                <IconButton
                                    color="inherit"
                                    sx={{mr: 2}}
                                >
                                    <TableRowsIcon/>
                                </IconButton>
                            </Link>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: drawerWidth,
                                boxSizing: 'border-box',
                            },
                        }}
                        variant="persistent"
                        anchor="left"
                        open={open}
                    >
                        <DrawerHeader>
                            <IconButton onClick={handleDrawerClose}>
                                <ChevronLeftIcon/>
                            </IconButton>
                        </DrawerHeader>
                        <Divider/>
                        <List>
                            <Link href="/manage/finance/read">
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <PaidIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Ban kinh doanh"/>
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                            <Link href="/manage/import/read">
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <ImportExportIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Ban nhập khẩu"/>
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        </List>
                    </Drawer>
                    <Main open={open}>
                        <DrawerHeader/>
                        <Content department={params.department} action={params.action}/>
                    </Main>
                </Box>
            </ThemeProvider>
        </>
    );
}