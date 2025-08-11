import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  IconButton,
  Typography,
  Select,
  MenuItem,
  Button,
  Badge,
  Menu,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Tooltip,
  Paper
} from "@mui/material";
import {
  NotificationsOutlined as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  School as SchoolIcon,
  Person as PersonIcon
} from "@mui/icons-material";

const Topbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [academicYear, setAcademicYear] = useState('2025-2026');

  // Mock notifications
  const notifications = [
    { id: 1, title: 'New Admission Request', time: '5 minutes ago', unread: true },
    { id: 2, title: 'Fee Payment Received', time: '2 hours ago', unread: true },
    { id: 3, title: 'Staff Meeting Reminder', time: '1 day ago', unread: false },
  ];

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('erpEmail');
    localStorage.removeItem('erpPassword');
    navigate('/login');
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <Paper 
      elevation={1} 
      sx={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 1100,
        borderRadius: 0,
        bgcolor: '#fff'
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={3}
        py={1.5}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <SchoolIcon color="primary" />
          <Select
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            size="small"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="2025-2026">2025-2026</MenuItem>
            <MenuItem value="2024-2025">2024-2025</MenuItem>
          </Select>
        </Box>

        <Box display="flex" gap={2} alignItems="center">
          <Button 
            variant="contained" 
            color="warning" 
            size="small"
            startIcon={<PersonIcon />}
          >
            Admission Enquiry
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            size="small"
            startIcon={<SchoolIcon />}
          >
            Online Admission
          </Button>

          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton onClick={handleNotificationMenuOpen}>
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Profile */}
          <Tooltip title="Account settings">
            <IconButton onClick={handleProfileMenuOpen}>
              <Avatar
                sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}
              >
                A
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          onClick={handleProfileMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">Admin User</Typography>
            <Typography variant="body2" color="text.secondary">admin@schoolaura.com</Typography>
          </Box>
          <Divider />
          <MenuItem onClick={() => navigate('/profile')}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => navigate('/settings')}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationAnchorEl}
          open={Boolean(notificationAnchorEl)}
          onClose={handleNotificationMenuClose}
          onClick={handleNotificationMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            sx: { width: 320 }
          }}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">Notifications</Typography>
          </Box>
          <Divider />
          {notifications.map((notification) => (
            <MenuItem key={notification.id} sx={{ 
              py: 1,
              px: 2,
              bgcolor: notification.unread ? 'action.hover' : 'transparent'
            }}>
              <Box>
                <Typography variant="body2" fontWeight={notification.unread ? 'bold' : 'normal'}>
                  {notification.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {notification.time}
                </Typography>
              </Box>
            </MenuItem>
          ))}
          <Divider />
          <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
            <Button size="small" onClick={() => navigate('/notification')}>
              View All Notifications
            </Button>
          </Box>
        </Menu>
      </Box>
    </Paper>
  );
};

export default Topbar;
