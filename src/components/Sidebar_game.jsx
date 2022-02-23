import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import StarBorder from '@mui/icons-material/StarBorder';
import VideogameAssetOutlinedIcon from '@mui/icons-material/VideogameAssetOutlined';
import ListSubheader from '@mui/material/ListSubheader';
import { Link } from 'react-router-dom';


export default function NestedList() {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <React.Fragment>
             <ListSubheader component="div" inset sx={{ bgcolor: '#ecdfb1' }}>
                其他常用
            </ListSubheader>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <VideogameAssetOutlinedIcon sx={{ color: '#2A6470' }}/>
                </ListItemIcon>
                <ListItemText primary="模擬投資" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <Link to="/game/daily" style={{ color: 'black' }}>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="划水日記" />
                        </ListItemButton>
                    </Link>

                </List>

                <List component="div" disablePadding>
                    <Link to="/game/room" style={{ color: 'black' }}>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="小鴨房間" />
                        </ListItemButton>
                    </Link>

                </List>
            </Collapse>
        </React.Fragment>

    )
}