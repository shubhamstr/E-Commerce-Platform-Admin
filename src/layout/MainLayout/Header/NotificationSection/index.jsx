import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Button,
  Chip,
  ClickAwayListener,
  Fade,
  Grid,
  Paper,
  Popper,
  List,
  ListItemText,
  ListSubheader,
  ListItemSecondaryAction,
  Typography,
  ListItemButton,
  Badge
} from '@mui/material';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// assets
import NotificationsNoneTwoToneIcon from '@mui/icons-material/NotificationsNoneTwoTone';
import CheckIcon from '@mui/icons-material/Check';

// services
import { getNotifications, markAsRead, markAllAsRead } from 'services/notificationService';

// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const [notifications, setNotifications] = React.useState([]);
  const [unreadCount, setUnreadCount] = React.useState(0);

  const fetchNotifications = React.useCallback(async () => {
    try {
      const response = await getNotifications();
      if (response.data && response.data.success) {
        const list = response.data.data || [];
        setNotifications(list);
        setUnreadCount(list.filter((n) => !n.isRead).length);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  }, []);

  React.useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);
      fetchNotifications();
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      fetchNotifications();
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Button
        sx={{
          minWidth: { sm: 50, xs: 35 }
        }}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        aria-label="Notification"
        onClick={handleToggle}
        color="inherit"
      >
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsNoneTwoToneIcon sx={{ fontSize: '1.5rem' }} />
        </Badge>
      </Button>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 10]
            }
          },
          {
            name: 'preventOverflow',
            options: {
              altAxis: true // false by default
            }
          }
        ]}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 350,
                    minWidth: 280,
                    backgroundColor: theme.palette.background.paper,
                    pb: 0,
                    borderRadius: '10px'
                  }}
                >
                  <ListSubheader disableSticky>
                    <Grid container alignItems="center" justifyContent="space-between" sx={{ pt: 1, pb: 1 }}>
                      <Grid item>
                        <Chip size="small" color="primary" label={`${unreadCount} New`} />
                      </Grid>
                      {unreadCount > 0 && (
                        <Grid item>
                          <Button variant="text" size="small" onClick={handleMarkAllAsRead} sx={{ fontSize: '0.75rem' }}>
                            Mark all as read
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </ListSubheader>
                  <PerfectScrollbar style={{ height: 320, overflowX: 'hidden' }}>
                    {notifications.length === 0 ? (
                      <Typography sx={{ p: 3, textAlign: 'center', color: theme.palette.text.secondary }}>
                        No notifications
                      </Typography>
                    ) : (
                      notifications.map((item) => (
                        <ListItemButton
                          key={item.id}
                          alignItems="flex-start"
                          sx={{
                            pt: 1,
                            pb: 1,
                            backgroundColor: item.isRead ? 'transparent' : 'rgba(33, 150, 243, 0.05)',
                            '&:hover': {
                              backgroundColor: item.isRead ? 'rgba(0, 0, 0, 0.04)' : 'rgba(33, 150, 243, 0.08)'
                            }
                          }}
                        >
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1" sx={{ fontWeight: item.isRead ? 400 : 600 }}>
                                {item.title}
                              </Typography>
                            }
                            secondary={
                              <>
                                <Typography variant="subtitle2" color="text.primary" sx={{ mb: 0.5 }}>
                                  {item.message}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {new Date(item.createdAt).toLocaleString()}
                                </Typography>
                              </>
                            }
                          />
                          {!item.isRead && (
                            <ListItemSecondaryAction sx={{ top: 22 }}>
                              <Button
                                size="small"
                                onClick={() => handleMarkAsRead(item.id)}
                                sx={{ minWidth: 'auto', p: 0.5 }}
                                title="Mark as read"
                              >
                                <CheckIcon sx={{ fontSize: '1rem' }} />
                              </Button>
                            </ListItemSecondaryAction>
                          )}
                        </ListItemButton>
                      ))
                    )}
                  </PerfectScrollbar>
                </List>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default NotificationSection;

