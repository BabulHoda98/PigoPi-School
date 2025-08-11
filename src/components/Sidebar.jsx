import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Divider
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as UsersIcon,
  CreditCard as PaymentIcon,
  LocalOffer as TagIcon,
  Campaign as MegaphoneIcon,
  PieChart as ChartIcon,
  Notifications as BellIcon,
  Help as HelpIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  School as SchoolIcon
} from '@mui/icons-material';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          bgcolor: '#1e144f',
          color: 'white',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'grey.200', color: '#1e144f' }}>
          <SchoolIcon />
        </Avatar>
        <Typography variant="h6" fontWeight="bold">
          PigoPi School
        </Typography>
      </Box>

      <List sx={{ mt: 2, px: 1 }}>
        {[
          { path: '/dashboard', icon: <DashboardIcon />, label: 'Dashboard' },
          { path: '/organization', icon: <UsersIcon />, label: 'Organization' },
          { path: '/subscriptions', icon: <PaymentIcon />, label: 'Subscriptions' },
          { path: '/pricing', icon: <TagIcon />, label: 'Pricing' },
          { path: '/announcement', icon: <MegaphoneIcon />, label: 'Announcement' },
          { path: '/report', icon: <ChartIcon />, label: 'Report' },
          { path: '/notification', icon: <BellIcon />, label: 'Notification' },
          { path: '/help-and-support', icon: <HelpIcon />, label: 'Help and Support' },
        ].map((item) => (
          <ListItem
            button
            key={item.path}
            onClick={() => navigate(item.path)}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              bgcolor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.08)',
              },
              borderLeft: location.pathname === item.path ? '4px solid' : '4px solid transparent',
              borderColor: 'primary.main',
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.label}
              primaryTypographyProps={{
                fontSize: '0.875rem',
                fontWeight: location.pathname === item.path ? 'bold' : 'normal',
              }}
            />
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 'auto', p: 2 }}>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />
        <List>
          <ListItem
            button
            onClick={() => navigate('/settings')}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText
              primary="Settings"
              primaryTypographyProps={{
                fontSize: '0.875rem',
              }}
            />
          </ListItem>
          
          <ListItem
            button
            onClick={() => {
              localStorage.removeItem('isLoggedIn');
              localStorage.removeItem('erpEmail');
              localStorage.removeItem('erpPassword');
              navigate('/login');
            }}
            sx={{
              borderRadius: 1,
              color: 'error.light',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Logout Account"
              primaryTypographyProps={{
                fontSize: '0.875rem',
              }}
            />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

// import React from "react";
// import {
//   Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography,
// } from "@mui/material";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import SchoolIcon from "@mui/icons-material/School";

// const Sidebar = () => {
//   return (
//     <Drawer
//       variant="permanent"
//       anchor="left"
//       sx={{
//         width: 250,
//         height: '100vh',
//         [`& .MuiDrawer-paper`]: { 
//           width: 250, 
//           boxSizing: "border-box", 
//           bgcolor: "#FFF8EF",
//           border: 'none',
//           boxShadow: 1
//         },
//       }}
//     >
//       <Box display="flex" alignItems="center" justifyContent="center" py={2}>
//         <Typography variant="h6">PT School</Typography>
//       </Box>
//       <List>
//         {[
//           { label: "Dashboard", icon: <DashboardIcon /> },
//           { label: "Academic Management", icon: <SchoolIcon /> },
//           // ... more items from your screenshot
//         ].map((item, index) => (
//           <ListItem button key={index}>
//             <ListItemIcon>{item.icon}</ListItemIcon>
//             <ListItemText primary={item.label} />
//           </ListItem>
//         ))}
//       </List>
//     </Drawer>
//   );
// };

// export default Sidebar;
