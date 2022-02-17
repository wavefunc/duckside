import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import ListSubheader from '@mui/material/ListSubheader';
import PieChartIcon from '@mui/icons-material/PieChart';
import CalculateIcon from '@mui/icons-material/Calculate';
import { Link, NavLink } from 'react-router-dom';



export default function NestedList() {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <React.Fragment>
            <ListSubheader component="div" inset>
                其他常用
            </ListSubheader>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <HomeRepairServiceIcon />
                </ListItemIcon>
                <ListItemText primary="小工具" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    <Link to="/tools/chart_pie" style={{ color: 'black' }}>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <PieChartIcon />
                            </ListItemIcon>
                            <ListItemText primary="圓餅圖: 部位配置" />
                        </ListItemButton>
                    </Link>

                </List><List component="div" disablePadding>
                    <Link to="#" style={{ color: 'black' }}>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <CalculateIcon />
                            </ListItemIcon>
                            <ListItemText primary="計算機: 風險報酬" />
                        </ListItemButton>
                    </Link>

                </List>
            </Collapse>
        </React.Fragment>

    )
}