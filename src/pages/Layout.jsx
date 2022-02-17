// ----- 沛珊 ----- //

import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from '../components/Sidebar_listItems';
import Avatar from '@mui/material/Avatar';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccordionTools from '../components/Sidebar_tools';
import AccordionGame from '../components/Sidebar_game';
import PageTitle from '../components/PageTitle';
import Breadcrumb from '../components/Breadcrumb';
import { Outlet } from 'react-router-dom';
// login component
// import MemberLogin from "../components/MemberLogin";
// import MemberRegister from "../components/MemberRegister";
// login component



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Duckside
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme({
  typography: {
    "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
    "fontSize": 14,
    "fontWeight": 'bold',
  },

});

function Layout() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {/* headerBar */}
        <AppBar position="absolute" open={open} sx={{ bgcolor: '#E5CC4D' }}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />

              {/* <Avatar sx={{ width: '60px', height: '60px' }} alt="duckside" src="/duck_left.png" /> */}
            </IconButton>
            <Typography
              component="h1"
              variant="h5"
              color="inherit"
              noWrap
              sx={{
                flexGrow: 1,
                ...(open && { display: 'none' }),
                fontWeight: 'bold'
              }}
            >
              Duckside
            </Typography>
            <Typography
              sx={{
                flexGrow: 1,
              }}
            >
            </Typography>

            <IconButton color="inherit" >
              <Badge badgeContent={50} color="error">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <PersonOutlineIcon />
              {/* login component */}        
              {/* <MemberLogin show={showLogin} showtoggle={showtoggle} close={showClose}></MemberLogin>
              <MemberRegister show={showregister} showtoggle={showtoggle}></MemberRegister> */}
              {/* login component */}
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <Avatar sx={{ width: '60px', height: '60px' }} alt="duckside" src="/assets/images/duck_right.png" />
            <Link underline="none" color="black" href='/'>
              <Typography
                component="h1"
                variant="h5"
                color="inherit"
                noWrap
                sx={{
                  flexGrow: 1,
                  color: "#53B8C5",
                  fontWeight: 'bold',
                  fontSize: '25px'
                }}
              >
                &nbsp;&nbsp;Duckside
              </Typography>
            </Link>

            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>

          <List component="nav" >
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            <AccordionTools />
            <AccordionGame />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="1g" sx={{ mt: 2, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <div className="content-wrap">
                    <div className="main">
                      <div className="container-fluid">
                        <div className="row">
                          <PageTitle />
                          <Breadcrumb />
                        </div>
                        <section id="main-content">
                          <Outlet />
                        </section>
                      </div>
                    </div>
                  </div>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 60 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <Layout />;
}