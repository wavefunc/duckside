import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import PaidIcon from '@mui/icons-material/Paid';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Link } from 'react-router-dom';

export const mainListItems = (
    <React.Fragment>
        {/* <Link to="/member/info" style={{ color: 'black' }}>
            <ListItemButton>
                <ListItemIcon>
                    <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="會員中心" />
            </ListItemButton>
        </Link> */}

        <ListSubheader component="div" inset>
            投資管理
        </ListSubheader>
        <Link to="/manage/dashboard" style={{ color: 'black' }}>
            <ListItemButton>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="總覽" />
            </ListItemButton>
        </Link>
        <Link to="/manage/plan" style={{ color: 'black' }}>
            <ListItemButton >
                <ListItemIcon>
                    <AssistantPhotoIcon />
                </ListItemIcon>
                <ListItemText primary="進出策略" />
            </ListItemButton>
        </Link>

        <Link to="/manage/transaction" style={{ color: 'black' }}>
            <ListItemButton>
                <ListItemIcon>
                    <PaidIcon />
                </ListItemIcon>
                <ListItemText primary="交易紀錄" />
            </ListItemButton>
        </Link>

        <Link to="/manage/asset" style={{ color: 'black' }}>
            <ListItemButton>
                <ListItemIcon>
                    <TextSnippetIcon />
                </ListItemIcon>
                <ListItemText primary="資產明細" />
            </ListItemButton>
        </Link>


        <Link to="/manage/check" style={{ color: 'black' }}>
            <ListItemButton>
                <ListItemIcon>
                    <AutoGraphIcon />
                </ListItemIcon>
                <ListItemText primary="投資結算" />
            </ListItemButton>
        </Link>

    </React.Fragment>
);

export const secondaryListItems = (

    <React.Fragment>



        <Link to="/about_site" style={{ color: 'black' }}>
            <ListItemButton>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="關於本站" />
            </ListItemButton>
        </Link>


        <Link to="/about_team" style={{ color: 'black' }}>
            <ListItemButton>
                <ListItemIcon>
                    <EmojiPeopleIcon />
                </ListItemIcon>
                <ListItemText primary="合作夥伴" />
            </ListItemButton>
        </Link>

    </React.Fragment>
);