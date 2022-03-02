import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PubSub from 'pubsub-js';
import Axios from "axios";

import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Card,
    Chip,
    ClickAwayListener,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popper,
    Typography
} from '@mui/material';
import Transitions from '../NotificationSection/Transitions';
import MainCard from '../NotificationSection/MainCard';

// icon
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

// login component
import MemberLogin from "../../MemberLogin";
import MemberRegister from "../../MemberRegister";
import MemberForget from "../../MemberForget";
import "../../../css/bootstrap.min.css";
// login component

const ProfileSection = () => {
    // login component
    const [showLogin, setShowLogin] = useState(false);
    const [showregister, setShowRegister] = useState(false);
    const [showforget, setShowForget] = useState(false);
    function showLoginToggle() {
        setShowLogin(!showLogin);
        setShowRegister(!showregister);
    }
    function showLoginClose() {
        setShowLogin(false);
        setShowRegister(false);
    }
    function showLoginOpen() {
        setShowLogin(true);
        setShowRegister(false);
        setListOpen(false);
    }
    function showForgetToggle() {
        setShowLogin(!showLogin);
        setShowForget(!showforget);
    }
    // login component

    const theme = useTheme();

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [listOpen, setListOpen] = useState(false);
    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);

    const handleLogout = () => {
        localStorage.clear();
        setListOpen(false);
        window.location.href ="http://localhost:3000"
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setListOpen(false);
    };

    const handleToggle = () => {
        setListOpen((prevOpen) => !prevOpen);
        setShowLogin(false);
        setShowRegister(false);
        setShowForget(false);
    };

    const prevOpen = useRef(listOpen);
    useEffect(() => {
        if (prevOpen.current === true && listOpen === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = listOpen;
    }, [listOpen]);

    let loginState = localStorage.getItem("loginState");
    
    //抓取大頭照State
    const [memberPhoto, setMemberPhoto] = useState("");

    useEffect(() => {
        PubSub.subscribe('Path Name', () => {
            if (loginState === null) {
                setShowLogin(true);
            } else if (typeof loginState === "string") {
                setShowLogin(false);
            }
        })
        //抓取大頭照Axios
        Axios.post("http://localhost:5000/account/list", {
            acc_email: localStorage.getItem("loginState"),
        }).then((result) => {
            setMemberPhoto(result.data.acc_avatar)
        });
    }, [loginState])

    return (
        <>
            <Chip
                sx={{
                    height: '45px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: "#E5CC4D",
                    backgroundColor: "#E9E37C",
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: '#E9E37C',
                        background: '#E9E37C !important',
                        color: 'black',
                        '& svg': {
                            stroke: 'black'
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                icon={
                    // 頭貼，src更換照片
                    <Avatar
                        src={memberPhoto}
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer',
                        }}
                        ref={anchorRef}
                        aria-controls={listOpen ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                    />
                }
                label={<LoginIcon stroke={1.5} size="1.5rem" sx={{ color: 'white' }} />}
                variant="outlined"
                ref={anchorRef}
                aria-controls={listOpen ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            />

            {/* 下拉選單 */}
            <Popper
                placement="bottom-end"
                open={listOpen}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions in={listOpen} {...TransitionProps}>
                        <Paper sx={{ borderRadius: "20px" }}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard sx={{ borderRadius: "20px" }} border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>

                                    <Box >
                                        <Card
                                            sx={{
                                                bgcolor: theme.palette.primary.light,
                                            }}
                                        >
                                        </Card>
                                        <List
                                            component="nav"
                                            sx={{
                                                width: '100%',
                                                maxWidth: 300,
                                                minWidth: 200,
                                                backgroundColor: theme.palette.background.paper,
                                                borderRadius: '10px',
                                                [theme.breakpoints.down('md')]: {
                                                    minWidth: '100%'
                                                },
                                                '& .MuiListItemButton-root': {
                                                    mt: 0.5
                                                }
                                            }}
                                        >
                                            {
                                                loginState === null ?
                                                    <>
                                                        {/* 登入選項 */}
                                                        <ListItemButton
                                                            sx={{ borderRadius: `20px` }}
                                                            selected={selectedIndex === 0}
                                                            onClick={showLoginOpen}
                                                        >
                                                            <ListItemIcon>
                                                                <LoginIcon stroke={1.5} size="1.3rem" />
                                                            </ListItemIcon>
                                                            <ListItemText primary={<Typography variant="body2">登入/註冊</Typography>} />
                                                        </ListItemButton>

                                                    </> :
                                                    <>
                                                        {/* 登出選項 */}
                                                        <ListItemButton
                                                            sx={{ borderRadius: `20px` }}
                                                            selected={selectedIndex === 4}
                                                            onClick={handleLogout}
                                                        >
                                                            <ListItemIcon>
                                                                <LogoutIcon stroke={1.5} size="1.3rem" />
                                                            </ListItemIcon>
                                                            <ListItemText primary={<Typography variant="body2">登出</Typography>} />
                                                        </ListItemButton>
                                                        {/* 會員資料修改 */}
                                                        <Link to="/member/info" style={{ color: 'black' }}>
                                                            <ListItemButton
                                                                sx={{ borderRadius: `20px` }}
                                                                selected={selectedIndex === 4}
                                                            >
                                                                <ListItemIcon>
                                                                    <SettingsOutlinedIcon stroke={1.5} size="1.3rem" />
                                                                </ListItemIcon>
                                                                <ListItemText primary={<Typography variant="body2">會員資料修改</Typography>} />
                                                            </ListItemButton>
                                                        </Link>
                                                    </>
                                            }

                                            {/* 忘記密碼 */}
                                            {/* <Link to="/member/changePass" style={{ color: 'black' }}>
                                                            <ListItemButton
                                                                sx={{ borderRadius: `20px` }}
                                                                selected={selectedIndex === 4}
                                                                onClick={handleLogout}
                                                            >
                                                                <ListItemIcon>
                                                                    <VpnKeyOutlinedIcon stroke={1.5} size="1.3rem" />
                                                                </ListItemIcon>
                                                                <ListItemText primary={<Typography variant="body2">忘記密碼</Typography>} />
                                                            </ListItemButton>
                                                        </Link> */}

                                        </List>
                                    </Box>

                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>



            {/* login component */}
            <MemberLogin show={showLogin} showtoggle={showLoginToggle} showForgetToggle={showForgetToggle} close={showLoginClose} ></MemberLogin>
            <MemberRegister show={showregister} showtoggle={showLoginToggle} close={showLoginClose}></MemberRegister>
            <MemberForget show={showforget} showForgetToggle={showForgetToggle}></MemberForget>
            {/* login component */}

        </>

    )
}

export default ProfileSection;