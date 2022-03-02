import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    ButtonBase,
    ClickAwayListener,
    Grid,
    Divider,
    Paper,
    Popper,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import NotificationList from './NotificationList';
import Transitions from './Transitions';
import MainCard from './MainCard'


const NotificationSection = () => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));


    const [open, setOpen] = useState(false);
    const [badge,setBadge] = useState(4)

    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    
    const badgeChange = () => {
        setBadge(0)
    }


    return (
        <>
        {/* notification icon */}
            <Box
                sx={{
                    width: '20px',
                    ml: 2,
                    mr: 6,
                    [theme.breakpoints.down('md')]: {
                        mr: 3
                    }
                }}
            >
                <ButtonBase sx={{ borderRadius: '50%' }} onClick={badgeChange}>

                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: '#E5CC4D',
                            color: 'white',
                            '&[aria-controls="menu-list-grow"],&:hover': {
                                background: '#E9E37C',
                                color: 'black',
                                borderRadius: '50%'
                            },
                            width: '63px',
                            height: '63px',
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        color="inherit"
                    >

                        <Badge badgeContent={badge} color="error">
                            <NotificationsIcon sx={{fontSize:'32px'}}/>
                        </Badge>

                    </Avatar>
                </ButtonBase>
            </Box>

            {/* notification List */}
            <Popper
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? 5 : 0, 20]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
                        <Paper sx={{ borderRadius: "20px" }}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard sx={{ borderRadius: "20px" }} border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                    <Grid container direction="column" spacing={2}>
                                        <Grid item xs={12}>
                                            <Grid container alignItems="center" justifyContent="space-between" sx={{ pt: 2, px: 2 }}>
                                                <Grid item>
                                                    <Stack direction="row" spacing={2}>
                                                        <Typography variant="subtitle1">All Notification</Typography>

                                                    </Stack>
                                                </Grid>
                                                <Grid item>
                                                    <Typography component={Link} to="/manage/plan" variant="subtitle2" color="primary">
                                                        查看更多
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            {/* <PerfectScrollbar
                                                style={{ height: '100%', maxHeight: 'calc(100vh - 205px)', overflowX: 'hidden' }}
                                            > */}
                                                <Grid container direction="column" spacing={2}>

                                                    <Grid item xs={12} p={0}>
                                                        <Divider sx={{ my: 0 }} />
                                                    </Grid>
                                                </Grid>
                                                <NotificationList />
                                            {/* </PerfectScrollbar> */}
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                    {/* <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                                        <Button size="small" disableElevation>
                                            View All
                                        </Button>
                                    </CardActions> */}
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>









        </>


    )
}

export default NotificationSection;
