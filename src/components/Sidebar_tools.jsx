import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import ListSubheader from '@mui/material/ListSubheader';
import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined';
import PieChartOutlinedIcon from '@mui/icons-material/PieChartOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import { Link } from 'react-router-dom';



export default function NestedList() {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <React.Fragment>
            <ListSubheader component="div" inset sx={{ bgcolor: '#ecdfb1' }}>
                其他常用
            </ListSubheader>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <HomeRepairServiceOutlinedIcon sx={{ color: '#2A6470' }} />
                </ListItemIcon>
                <ListItemText primary="小工具" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    <Link to="/tools/chart_pie" style={{ color: 'black' }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <PieChartOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="圓餅圖: 部位配置" />
                        </ListItemButton>
                    </Link>
                </List>

                <List component="div" disablePadding>
                    <Link to="#" style={{ color: 'black' }}>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <CalculateOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="計算機: 風險報酬" />
                        </ListItemButton>
                    </Link>
                </List>
            </Collapse>
        </React.Fragment>

    )
}