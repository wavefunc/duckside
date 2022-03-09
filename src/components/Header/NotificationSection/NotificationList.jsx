// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
    Avatar,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from '@mui/material';

// assets
import User1 from './duck-favicon.jpg';

// styles
const ListItemWrapper = styled('div')(() => ({
    cursor: 'pointer',
    padding: 16,
    '&:hover': {
        background: 'rgba(202, 233, 255,0.3)'
    },
    '& .MuiListItem-root': {
        padding: 0
    }
}));

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const NotificationList = () => {
    const theme = useTheme();

    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 330,
                py: 0,
                borderRadius: '10px',
                [theme.breakpoints.down('md')]: {
                    maxWidth: 300
                },
                '& .MuiListItemSecondaryAction-root': {
                    top: 22
                },
                '& .MuiDivider-root': {
                    my: 0
                },
                '& .list-container': {
                    pl: 7
                }
            }}
        >
            <ListItemWrapper>
                <ListItem alignItems="center">
                    <ListItemAvatar>
                    <Avatar alt="John Doe" src={User1} sx={{ bgcolor: "#53B8C5" }} />
                    </ListItemAvatar>
                    <ListItemText primary="2330 台積電" />
                    <ListItemSecondaryAction>
                        <Grid container justifyContent="flex-end">
                            <Grid item xs={12}>
                                <Typography variant="caption" display="block" gutterBottom>
                                    2 min ago
                                </Typography>
                            </Grid>
                        </Grid>
                    </ListItemSecondaryAction>
                </ListItem>
                <Grid container direction="column" className="list-container">
                    <Grid item xs={12} sx={{ pb: 2 }}>
                        <Typography variant="subtitle2">現在價格602元，已到達合理價格。</Typography>
                    </Grid>
                   
                </Grid>
            </ListItemWrapper>
            <Divider />
            <ListItemWrapper>
                <ListItem alignItems="center">
                    <ListItemAvatar>
                        
                            <Avatar alt="John Doe" src={User1} sx={{ bgcolor: "#53B8C5" }} />
                        
                    </ListItemAvatar>
                    <ListItemText primary={<Typography variant="subtitle1">2603 長榮</Typography>} />
                    <ListItemSecondaryAction>
                        <Grid container justifyContent="flex-end">
                            <Grid item xs={12}>
                                <Typography variant="caption" display="block" gutterBottom>
                                    1 min ago
                                </Typography>
                            </Grid>
                        </Grid>
                    </ListItemSecondaryAction>
                </ListItem>
                <Grid container direction="column" className="list-container">
                    <Grid item xs={12} sx={{ pb: 2 }}>
                        <Typography variant="subtitle2">現在價格160，已到達合理價格。</Typography>
                    </Grid>
                    
                </Grid>
            </ListItemWrapper>
            <Divider />
            {/* <ListItemWrapper>
                <ListItem alignItems="center">
                    <ListItemAvatar>
                        
                            <Avatar alt="John Doe" src={User1} sx={{ bgcolor: "#53B8C5" }} />
                       
                    </ListItemAvatar>
                    <ListItemText primary={<Typography variant="subtitle1">系統通知</Typography>} />
                    <ListItemSecondaryAction>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Typography variant="caption" display="block" gutterBottom>
                                    2 min ago
                                </Typography>
                            </Grid>
                        </Grid>
                    </ListItemSecondaryAction>
                </ListItem>
                <Grid container direction="column" className="list-container">
                    <Grid item xs={12} sx={{ pb: 2 }}>
                        <Typography variant="subtitle2">All done! Now check your inbox as you&apos;re in for a sweet treat!</Typography>
                    </Grid>
                    
                </Grid>
            </ListItemWrapper>
            <Divider />
            <ListItemWrapper>
                <ListItem alignItems="center">
                    <ListItemAvatar>
                    <Avatar alt="John Doe" src={User1} sx={{ bgcolor: "#53B8C5" }} />
                    </ListItemAvatar>
                    <ListItemText primary={<Typography variant="subtitle1">系統通知</Typography>} />
                    <ListItemSecondaryAction>
                        <Grid container justifyContent="flex-end">
                            <Grid item xs={12}>
                                <Typography variant="caption" display="block" gutterBottom>
                                    2 min ago
                                </Typography>
                            </Grid>
                        </Grid>
                    </ListItemSecondaryAction>
                </ListItem>
                <Grid container direction="column" className="list-container">
                    <Grid item xs={12} sx={{ pb: 2 }}>
                        <Typography component="span" variant="subtitle2">
                            Uploaded two file on &nbsp;
                            <Typography component="span" variant="h6">
                                21 Jan 2020
                            </Typography>
                        </Typography>
                    </Grid>
                   
                </Grid>
            </ListItemWrapper>
            <Divider /> */}
            
        </List>
    );
};

export default NotificationList;