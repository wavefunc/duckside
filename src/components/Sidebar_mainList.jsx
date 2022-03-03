import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AssistantPhotoOutlinedIcon from '@mui/icons-material/AssistantPhotoOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import VideogameAssetOutlinedIcon from '@mui/icons-material/VideogameAssetOutlined';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import StarBorder from '@mui/icons-material/StarBorder';
import { Link, NavLink } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import PubSub from 'pubsub-js';


export default function MainListItem() {

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const handleListItemClick = (event, index) => {
        PubSub.publish('Path Name', event.view.location.pathname);
        setSelectedIndex(index);
    };

    PubSub.subscribe('Sidebar Index', (msg, data) => {
        setSelectedIndex(data)
    })

    const [pathName, setPathName] = React.useState("");
    const pathClick = (event, index) => {
        setPathName(index);
        PubSub.publish('Path', index);
    }


    return (
        <React.Fragment>

            <ListSubheader component="div" inset sx={{ bgcolor: '#ecdfb1' }}>
                投資管理
            </ListSubheader>
            <NavLink to="/manage/dashboard" style={{ color: 'black' }} onClick={(event) => pathClick(event, "/manage/dashboard")}>
                <ListItemButton onClick={(event) => handleListItemClick(event, 1)}
                    sx={{
                        boxShadow: selectedIndex === 1 ? 'inset 0 -2px 5px rgba(0,0,0,0.15),inset 0 2px 5px rgba(0,0,0,0.15)' : null,
                        bgcolor: selectedIndex === 1 ? '#E0E0D8' : null
                    }}>
                    <ListItemIcon>
                        <BarChartIcon sx={{ color: '#2A6470' }} />
                    </ListItemIcon>
                    <ListItemText primary="總覽" />
                </ListItemButton>
            </NavLink>
            <NavLink to="/manage/plan" style={{ color: 'black' }} onClick={(event) => pathClick(event, "/manage/plan")}>
                <ListItemButton onClick={(event) => handleListItemClick(event, 2)}
                    sx={{
                        boxShadow: selectedIndex === 2 ? 'inset 0 -2px 5px rgba(0,0,0,0.15),inset 0 2px 5px rgba(0,0,0,0.15)' : null,
                        bgcolor: selectedIndex === 2 ? '#E0E0D8' : null,
                    }}>
                    <ListItemIcon>
                        <AssistantPhotoOutlinedIcon className='listIcon' sx={{ color: '#2A6470' }} />
                    </ListItemIcon>
                    <ListItemText primary="我的計畫" />
                </ListItemButton>
            </NavLink>

            <NavLink to="/manage/transaction" style={{ color: 'black' }} onClick={(event) => pathClick(event, "/manage/transaction")}>
                <ListItemButton onClick={(event) => handleListItemClick(event, 3)}
                    sx={{
                        boxShadow: selectedIndex === 3 ? 'inset 0 -2px 5px rgba(0,0,0,0.15),inset 0 2px 5px rgba(0,0,0,0.15)' : null,
                        bgcolor: selectedIndex === 3 ? '#E0E0D8' : null,
                    }}>
                    <ListItemIcon>
                        <MonetizationOnOutlinedIcon sx={{ color: '#2A6470' }} />
                    </ListItemIcon>
                    <ListItemText primary="交易紀錄" />
                </ListItemButton>
            </NavLink>

            <NavLink to="/manage/asset" style={{ color: 'black' }} onClick={(event) => pathClick(event, "/manage/asset")}>
                <ListItemButton onClick={(event) => handleListItemClick(event, 4)}
                    sx={{
                        boxShadow: selectedIndex === 4 ? 'inset 0 -2px 5px rgba(0,0,0,0.15),inset 0 2px 5px rgba(0,0,0,0.15)' : null,
                        bgcolor: selectedIndex === 4 ? '#E0E0D8' : null,
                    }}>
                    <ListItemIcon>
                        <TextSnippetOutlinedIcon sx={{ color: '#2A6470' }} />
                    </ListItemIcon>
                    <ListItemText primary="資產明細" />
                </ListItemButton>
            </NavLink>


            <NavLink to="/manage/check" style={{ color: 'black' }} onClick={(event) => pathClick(event, "/manage/check")}>
                <ListItemButton onClick={(event) => handleListItemClick(event, 5)}
                    sx={{
                        boxShadow: selectedIndex === 5 ? 'inset 0 -2px 5px rgba(0,0,0,0.15),inset 0 2px 5px rgba(0,0,0,0.15)' : null,
                        bgcolor: selectedIndex === 5 ? '#E0E0D8' : null,
                    }}>
                    <ListItemIcon>
                        <AutoGraphIcon sx={{ color: '#2A6470' }} />
                    </ListItemIcon>
                    <ListItemText primary="投資成果" />
                </ListItemButton>
            </NavLink>
            {/* 分隔線 */}
            <Divider sx={{ my: 1 }} />

            <ListSubheader component="div" inset sx={{ bgcolor: '#ecdfb1' }}>
                其他常用
            </ListSubheader>

            {/* 遊戲 */}
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <VideogameAssetOutlinedIcon sx={{ color: '#2A6470' }} />
                </ListItemIcon>
                <ListItemText primary="模擬投資" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <Link to="/game/daily" style={{ color: 'black' }}>
                        <ListItemButton onClick={(event) => handleListItemClick(event, 6)}
                            sx={{
                                pl: 4,
                                boxShadow: selectedIndex === 6 ? 'inset 0 -2px 5px rgba(0,0,0,0.15),inset 0 2px 5px rgba(0,0,0,0.15)' : null,
                                bgcolor: selectedIndex === 6 ? '#E0E0D8' : null
                            }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="划水日記" />
                        </ListItemButton>
                    </Link>

                </List>

                <List component="div" disablePadding>
                    <Link to="/game/room" style={{ color: 'black' }}>
                        <ListItemButton onClick={(event) => handleListItemClick(event, 7)}
                            sx={{
                                pl: 4,
                                boxShadow: selectedIndex === 7 ? 'inset 0 -2px 5px rgba(0,0,0,0.15),inset 0 2px 5px rgba(0,0,0,0.15)' : null,
                                bgcolor: selectedIndex === 7 ? '#E0E0D8' : null
                            }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="小鴨房間" />
                        </ListItemButton>
                    </Link>
                </List>
            </Collapse>

            {/* secondlist */}
            <NavLink to="/about_site" style={{ color: 'black' }}>
                <ListItemButton onClick={(event) => handleListItemClick(event, 8)}
                    sx={{
                        boxShadow: selectedIndex === 8 ? 'inset 0 -2px 5px rgba(0,0,0,0.15),inset 0 2px 5px rgba(0,0,0,0.15)' : null,
                        bgcolor: selectedIndex === 8 ? '#E0E0D8' : null,
                    }}>
                    <ListItemIcon>
                        <HomeOutlinedIcon sx={{ color: '#2A6470' }} />
                    </ListItemIcon>
                    <ListItemText primary="關於本站" />
                </ListItemButton>
            </NavLink>


            <NavLink to="/about_team" style={{ color: 'black' }}>
                <ListItemButton onClick={(event) => handleListItemClick(event, 9)}
                    sx={{
                        boxShadow: selectedIndex === 9 ? 'inset 0 -2px 5px rgba(0,0,0,0.15),inset 0 2px 5px rgba(0,0,0,0.15)' : null,
                        bgcolor: selectedIndex === 9 ? '#E0E0D8' : null,
                    }}>
                    <ListItemIcon>
                        <EmojiPeopleIcon sx={{ color: '#2A6470' }} />
                    </ListItemIcon>
                    <ListItemText primary="合作夥伴" />
                </ListItemButton>
            </NavLink>
        </React.Fragment>
    )
}