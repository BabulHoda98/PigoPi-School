import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Select,
  MenuItem,
  Button,
  Tabs,
  Tab,
  Grid,
  Paper,
  IconButton,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Business as BusinessIcon,
  NotificationsActive as NotificationsIcon,
  AttachMoney as MoneyIcon,
  CreditCard as PaymentIcon,
  BarChart as ChartIcon,
  KeyboardArrowDown as ArrowDownIcon
} from '@mui/icons-material';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const revenueData = [
  { name: 'J', revenue2023: 40, revenue2022: 35 },
  { name: 'F', revenue2023: 60, revenue2022: 50 },
  { name: 'M', revenue2023: 75, revenue2022: 65 },
  { name: 'A', revenue2023: 55, revenue2022: 48 },
  { name: 'M', revenue2023: 80, revenue2022: 60 },
  { name: 'J', revenue2023: 65, revenue2022: 58 },
  { name: 'J', revenue2023: 90, revenue2022: 72 },
  { name: 'A', revenue2023: 70, revenue2022: 60 },
  { name: 'S', revenue2023: 85, revenue2022: 68 },
  { name: 'O', revenue2023: 78, revenue2022: 64 },
  { name: 'N', revenue2023: 92, revenue2022: 70 },
  { name: 'D', revenue2023: 88, revenue2022: 75 },
];

const buyData = [
  { name: 'J', value: 25 }, { name: 'F', value: 30 }, { name: 'M', value: 45 },
  { name: 'A', value: 32 }, { name: 'M', value: 50 }, { name: 'J', value: 40 },
  { name: 'J', value: 60 }, { name: 'A', value: 48 }, { name: 'S', value: 52 },
  { name: 'O', value: 56 }, { name: 'N', value: 62 }, { name: 'D', value: 59 },
];

const payData = [
  { name: 'J', value: 20 }, { name: 'F', value: 28 }, { name: 'M', value: 38 },
  { name: 'A', value: 30 }, { name: 'M', value: 45 }, { name: 'J', value: 35 },
  { name: 'J', value: 55 }, { name: 'A', value: 42 }, { name: 'S', value: 50 },
  { name: 'O', value: 54 }, { name: 'N', value: 58 }, { name: 'D', value: 60 },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('monthly');

  const stats = [
    {
      title: "Organisations",
      value: "150",
      icon: <BusinessIcon />,
      change: "+12.3%",
      changeType: "increase",
      description: "Total registered organizations"
    },
    {
      title: "Requests",
      value: "5",
      icon: <NotificationsIcon />,
      change: "+2.1%",
      changeType: "increase",
      description: "Pending approval requests"
    },
    {
      title: "Total Revenue",
      value: "$9,900",
      icon: <MoneyIcon />,
      change: "+18.7%",
      changeType: "increase",
      description: "All-time revenue generated"
    },
    {
      title: "Monthly Earning",
      value: "$8,999",
      icon: <PaymentIcon />,
      change: "-3.2%",
      changeType: "decrease",
      description: "Revenue this month"
    }
  ];

  return (
    <Box sx={{ bgcolor: 'grey.100', minHeight: '100vh', ml: 8 }}>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Dashboard Header */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold" color="text.primary">
              Dashboard
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Time Range</InputLabel>
              <Select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                label="Time Range"
                endAdornment={<ArrowDownIcon />}
              >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              startIcon={<ChartIcon />}
              sx={{ textTransform: 'none' }}
            >
              Generate Report
            </Button>
          </Box>
        </Box>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
        >
          {['overview', 'analytics', 'reports', 'settings'].map((tab) => (
            <Tab
              key={tab}
              label={tab.charAt(0).toUpperCase() + tab.slice(1)}
              value={tab}
            />
          ))}
        </Tabs>

        {/* Stat Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <IconButton color="primary" sx={{ mr: 1 }}>
                    {stat.icon}
                  </IconButton>
                  <Typography variant="h6">{stat.title}</Typography>
                </Box>
                <Typography variant="h4" sx={{ mb: 1 }}>{stat.value}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    variant="body2"
                    color={stat.changeType === 'increase' ? 'success.main' : 'error.main'}
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    {stat.change}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    {stat.description}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Charts Area */}
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            {/* Revenue Chart */}
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>Revenue Overview</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Monthly revenue performance
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue2023" fill="#1976d2" name="2023 Revenue" />
                    <Bar dataKey="revenue2022" fill="#90caf9" name="2022 Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Paper>

            {/* Buy & Pay Charts */}
            <Grid container spacing={3}>
              {[{
                title: "Buy Overview",
                data: buyData,
                fill: "#2e7d32",
                label: "Buy Count"
              }, {
                title: "Pay Overview",
                data: payData,
                fill: "#ed6c02",
                label: "Pay Count"
              }].map((chart, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>{chart.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Monthly {chart.title.toLowerCase().replace(' overview', '')} trend
                    </Typography>
                    <Box sx={{ height: 250 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chart.data}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill={chart.fill} name={chart.label} />
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Recent Activities</Typography>
              {/* Add recent activities content here */}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
