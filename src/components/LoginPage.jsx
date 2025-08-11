import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Tabs, Tab, TextField, Button, Typography, InputAdornment,
  IconButton, Divider, Paper, MenuItem, RadioGroup, FormControlLabel,
  Radio, Checkbox, Grid, useTheme, CircularProgress, Snackbar,
  Alert, Link, FormControl, InputLabel, Select, Fade, Slide, Dialog, 
  DialogTitle, DialogContent, DialogContentText, DialogActions, Stepper,
  Step, StepLabel, StepContent
} from '@mui/material';
import { 
  Visibility, VisibilityOff, ArrowBack, Refresh, 
  Google, Facebook, Apple, LinkedIn, Twitter, LockReset, Email
} from '@mui/icons-material';

import loginImage1 from '../assets/loginImageone.svg';
import loginImage2 from '../assets/loginImagetwo.svg';
import loginImage3 from '../assets/loginImagethree.svg';

const LoginPage = () => {
  const theme = useTheme();
  const [tabIndex, setTabIndex] = useState(0);
  const [isHeadBranch, setIsHeadBranch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [captcha, setCaptcha] = useState('288643');
  const [termsDialogOpen, setTermsDialogOpen] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetStep, setResetStep] = useState(0);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(0);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    branchCode: '',
    orgType: 'School',
    schoolName: '',
    yourName: '',
    contactNumber: '',
    gender: 'Male',
    referralCode: '',
    captcha: '',
  });

  const [resetFormData, setResetFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [resetErrors, setResetErrors] = useState({});

  const slideData = [
    {
      image: loginImage1,
      title: "Join ERP SchoolAura",
      description:
        "Manage your school efficiently with SchoolAura ERP. Automate tasks, reduce manual work, and enhance collaboration.",
    },
    {
      image: loginImage2,
      title: "Streamline Your Administration",
      description:
        "Easily handle student records, attendance, fees, and reports. Save time and focus on better education delivery.",
    },
    {
      image: loginImage3,
      title: "Empower Teachers & Students",
      description:
        "Improve communication between teachers, students, and parents with a centralized ERP solution built for schools.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % slideData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Check if credentials exist in localStorage
    const savedEmail = localStorage.getItem('erpEmail');
    const savedPassword = localStorage.getItem('erpPassword');
    
    if (savedEmail && savedPassword) {
      setFormData(prev => ({
        ...prev,
        email: savedEmail,
        password: savedPassword
      }));
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    // Password strength calculation
    if (!formData.password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (formData.password.length >= 8) strength += 1;
    if (/[A-Z]/.test(formData.password)) strength += 1;
    if (/[0-9]/.test(formData.password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(formData.password)) strength += 1;

    setPasswordStrength(strength);
  }, [formData.password]);

  useEffect(() => {
    // Countdown timer for OTP resend
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
  };

  const validateLogin = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (isHeadBranch && !formData.branchCode) {
      newErrors.branchCode = 'Branch code is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegister = () => {
    const newErrors = {};
    
    if (!formData.schoolName) newErrors.schoolName = 'School name is required';
    if (!formData.yourName) newErrors.yourName = 'Your name is required';
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.contactNumber) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Invalid phone number';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (passwordStrength < 3) {
      newErrors.password = 'Password is too weak';
    }
    
    if (formData.captcha !== captcha) {
      newErrors.captcha = 'Captcha does not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateResetForm = (step) => {
    const newErrors = {};
    
    if (step === 0) {
      if (!resetFormData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(resetFormData.email)) {
        newErrors.email = 'Email is invalid';
      }
    }
    
    if (step === 2) {
      if (!resetFormData.newPassword) {
        newErrors.newPassword = 'Password is required';
      } else if (resetFormData.newPassword.length < 8) {
        newErrors.newPassword = 'Password must be at least 8 characters';
      }
      
      if (resetFormData.newPassword !== resetFormData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setResetErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTabChange = (_, newValue) => {
    setTabIndex(newValue);
    setIsHeadBranch(newValue === 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleResetInputChange = (e) => {
    const { name, value } = e.target;
    setResetFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (resetErrors[name]) {
      setResetErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto focus next input
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  const navigate = useNavigate();
  
  const handleLogin = () => {
    if (!validateLogin()) return;

    setIsLoading(true);
    
    // Save credentials if "Remember Me" is checked
    if (rememberMe) {
      localStorage.setItem('erpEmail', formData.email);
      localStorage.setItem('erpPassword', formData.password);
    } else {
      localStorage.removeItem('erpEmail');
      localStorage.removeItem('erpPassword');
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSnackbar({
        open: true,
        message: 'Login successful! Redirecting...',
        severity: 'success'
      });
      
      // Store login state
      localStorage.setItem('isLoggedIn', 'true');
      
      // Redirect to dashboard after showing success message
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
      
      console.log('Login Data:', {
        email: formData.email,
        password: formData.password,
        ...(isHeadBranch && { branchCode: formData.branchCode })
      });
    }, 1500);
  };

  const handleRegister = () => {
    if (!validateRegister()) return;
    if (!termsAccepted) {
      setSnackbar({
        open: true,
        message: 'You must accept the terms and conditions',
        severity: 'error'
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSnackbar({
        open: true,
        message: 'Registration successful! Please check your email for verification.',
        severity: 'success'
      });
      
      // Actual registration logic would go here
      console.log('Register Data:', formData);
    }, 2000);
  };

  const handleBack = () => {
    setShowRegister(false);
    setFormData(prev => ({
      ...prev,
      orgType: 'School',
      schoolName: '',
      yourName: '',
      contactNumber: '',
      gender: 'Male',
      referralCode: '',
      captcha: '',
      branchCode: '',
    }));
    setTermsAccepted(false);
    setErrors({});
  };

  const handleSocialLogin = (provider) => {
    setSnackbar({
      open: true,
      message: `Logging in with ${provider}...`,
      severity: 'info'
    });
    // Actual social login implementation would go here
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const openTermsDialog = () => {
    setTermsDialogOpen(true);
  };

  const closeTermsDialog = () => {
    setTermsDialogOpen(false);
  };

  const openForgotPassword = () => {
    setForgotPasswordOpen(true);
    setResetStep(0);
    setResetFormData({ email: '', newPassword: '', confirmPassword: '' });
    setResetErrors({});
    setOtp(['', '', '', '', '', '']);
  };

  const closeForgotPassword = () => {
    setForgotPasswordOpen(false);
  };

  const handleSendResetEmail = () => {
    if (!validateResetForm(0)) return;
    
    setIsLoading(true);
    
    // Simulate sending email
    setTimeout(() => {
      setIsLoading(false);
      setResetStep(1);
      setCountdown(60); // Start 60-second countdown
      setSnackbar({
        open: true,
        message: 'Password reset email sent! Check your inbox.',
        severity: 'success'
      });
    }, 1500);
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      setSnackbar({
        open: true,
        message: 'Please enter the 6-digit OTP',
        severity: 'error'
      });
      return;
    }
    
    // Simulate OTP verification
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setResetStep(2);
      setSnackbar({
        open: true,
        message: 'OTP verified successfully!',
        severity: 'success'
      });
    }, 1000);
  };

  const handleResetPassword = () => {
    if (!validateResetForm(2)) return;
    
    setIsLoading(true);
    
    // Simulate password reset
    setTimeout(() => {
      setIsLoading(false);
      setSnackbar({
        open: true,
        message: 'Password reset successfully!',
        severity: 'success'
      });
      closeForgotPassword();
    }, 1500);
  };

  const handleResendOtp = () => {
    setCountdown(60);
    setSnackbar({
      open: true,
      message: 'New OTP sent to your email',
      severity: 'info'
    });
  };

  const passwordStrengthColors = [
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    theme.palette.success.main
  ];

  const passwordStrengthLabels = ['Very Weak', 'Weak', 'Good', 'Strong'];

  const resetSteps = [
    'Enter your email',
    'Verify OTP',
    'Reset password'
  ];

  return (
    <Box display="flex" minHeight="100vh" width="100vw" bgcolor="#fff" position="relative" maxHeight="100vh" overflowY="auto">
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Dialog
        open={termsDialogOpen}
        onClose={closeTermsDialog}
        aria-labelledby="terms-dialog-title"
        maxWidth="md"
      >
        <DialogTitle id="terms-dialog-title">Terms and Conditions</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h6" gutterBottom>1. Acceptance of Terms</Typography>
            <Typography paragraph>
              By accessing or using SchoolAura ERP, you agree to be bound by these Terms and Conditions. 
              If you do not agree to all terms, do not use our services.
            </Typography>
            
            <Typography variant="h6" gutterBottom>2. Account Registration</Typography>
            <Typography paragraph>
              You must provide accurate and complete information when creating an account. 
              You are responsible for maintaining the confidentiality of your account credentials.
            </Typography>
            
            <Typography variant="h6" gutterBottom>3. Data Privacy</Typography>
            <Typography paragraph>
              We collect and process personal data in accordance with our Privacy Policy. 
              By using our services, you consent to such processing.
            </Typography>
            
            <Typography variant="h6" gutterBottom>4. Service Usage</Typography>
            <Typography paragraph>
              You agree to use SchoolAura ERP only for lawful purposes and in compliance with all applicable laws and regulations.
            </Typography>
            
            <Typography variant="h6" gutterBottom>5. Password Security</Typography>
            <Typography paragraph>
              You are responsible for maintaining the security of your password. SchoolAura cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeTermsDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Forgot Password Dialog */}
      <Dialog
        open={forgotPasswordOpen}
        onClose={closeForgotPassword}
        aria-labelledby="forgot-password-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="forgot-password-dialog-title">
          <Box display="flex" alignItems="center">
            <LockReset sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Typography variant="h6">Reset Your Password</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stepper activeStep={resetStep} orientation="vertical" sx={{ my: 2 }}>
            {resetSteps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  {index === 0 && (
                    <Box>
                      <Typography variant="body2" mb={2}>
                        Enter the email address associated with your account and we'll send you a verification code.
                      </Typography>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        value={resetFormData.email}
                        onChange={handleResetInputChange}
                        error={!!resetErrors.email}
                        helperText={resetErrors.email}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleSendResetEmail}
                          disabled={isLoading}
                          endIcon={isLoading ? <CircularProgress size={20} /> : null}
                        >
                          Send Verification Code
                        </Button>
                      </Box>
                    </Box>
                  )}
                  
                  {index === 1 && (
                    <Box>
                      <Typography variant="body2" mb={2}>
                        We've sent a 6-digit verification code to {resetFormData.email}. Please enter it below.
                      </Typography>
                      
                      <Box display="flex" justifyContent="center" gap={1} mb={2}>
                        {otp.map((digit, idx) => (
                          <TextField
                            key={idx}
                            id={`otp-input-${idx}`}
                            value={digit}
                            onChange={(e) => handleOtpChange(idx, e.target.value)}
                            inputProps={{ 
                              maxLength: 1, 
                              style: { textAlign: 'center' } 
                            }}
                            sx={{ 
                              width: 50, 
                              '& input': { fontSize: 20, py: 1.5 } 
                            }}
                          />
                        ))}
                      </Box>
                      
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" color="textSecondary">
                          Didn't receive the code? 
                          <Button 
                            disabled={countdown > 0}
                            onClick={handleResendOtp}
                            size="small"
                            sx={{ ml: 1 }}
                          >
                            Resend {countdown > 0 && `(${countdown}s)`}
                          </Button>
                        </Typography>
                        
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleVerifyOtp}
                          disabled={isLoading}
                          endIcon={isLoading ? <CircularProgress size={20} /> : null}
                        >
                          Verify Code
                        </Button>
                      </Box>
                    </Box>
                  )}
                  
                  {index === 2 && (
                    <Box>
                      <Typography variant="body2" mb={2}>
                        Please create a new password for your account.
                      </Typography>
                      
                      <TextField
                        fullWidth
                        label="New Password"
                        name="newPassword"
                        type="password"
                        value={resetFormData.newPassword}
                        onChange={handleResetInputChange}
                        margin="normal"
                        error={!!resetErrors.newPassword}
                        helperText={resetErrors.newPassword || "Minimum 8 characters with uppercase, number and symbol"}
                      />
                      
                      <TextField
                        fullWidth
                        label="Confirm New Password"
                        name="confirmPassword"
                        type="password"
                        value={resetFormData.confirmPassword}
                        onChange={handleResetInputChange}
                        margin="normal"
                        error={!!resetErrors.confirmPassword}
                        helperText={resetErrors.confirmPassword}
                      />
                      
                      <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleResetPassword}
                          disabled={isLoading}
                          endIcon={isLoading ? <CircularProgress size={20} /> : null}
                        >
                          Reset Password
                        </Button>
                      </Box>
                    </Box>
                  )}
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </DialogContent>
      </Dialog>

      {showRegister && (
        <IconButton
          onClick={handleBack}
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 10,
            color: theme.palette.secondary.main,
            bgcolor: 'rgba(255,255,255,0.8)',
            '&:hover': { bgcolor: 'rgba(255,255,255,1)' }
          }}
        >
          <ArrowBack />
        </IconButton>
      )}

      {/* Left Slider Section - Hidden on small screens */}
      <Box
        sx={{
          width: { xs: '0%', md: '50%' },
          display: { xs: 'none', md: 'flex' },
          bgcolor: '#fef3e2',
          p: 4,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          transition: 'all 0.5s ease-in-out',
          overflow: 'hidden',
        }}
      >
        <Box maxWidth={500} textAlign="center">
          <Fade in={true} key={currentImageIndex}>
            <Box>
              <img
                src={slideData[currentImageIndex].image}
                alt="ERP Slide"
                style={{
                  width: '100%',
                  maxHeight: '300px',
                  objectFit: 'contain',
                }}
              />
              <Typography
                variant="h5"
                mt={3}
                fontWeight="bold"
                color="secondary"
              >
                {slideData[currentImageIndex].title}
              </Typography>
              <Typography
                variant="body1"
                mt={2}
                color="text.secondary"
              >
                {slideData[currentImageIndex].description}
              </Typography>
            </Box>
          </Fade>

          {/* Dot Indicators */}
          <Box mt={3} display="flex" justifyContent="center" gap={1}>
            {slideData.map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                sx={{
                  width: currentImageIndex === index ? 14 : 10,
                  height: currentImageIndex === index ? 14 : 10,
                  bgcolor: currentImageIndex === index ? 'primary.main' : 'grey.400',
                  borderRadius: '50%',
                  transition: 'all 0.3s ease-in-out',
                  cursor: 'pointer',
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Right Form Section */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          minHeight: '100vh',
          overflowY: 'auto'
        }}
      >
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
          <Paper elevation={3} sx={{ 
            p: { xs: 2, sm: 4 }, 
            width: { xs: '100%', sm: 450 },
            borderRadius: 3 
          }}>
            {!showRegister ? (
              <>
                <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
                  {isHeadBranch ? "Head Branch Login" : "School ERP Account Login"}
                </Typography>

                <Tabs value={tabIndex} onChange={handleTabChange} centered sx={{ mb: 3 }}>
                  <Tab label="School/Staff" />
                  <Tab label="Head Branch" />
                </Tabs>

                {isHeadBranch && (
                  <TextField
                    fullWidth 
                    label="Branch Code" 
                    name="branchCode"
                    value={formData.branchCode} 
                    onChange={handleInputChange}
                    margin="normal" 
                    required
                    error={!!errors.branchCode}
                    helperText={errors.branchCode}
                  />
                )}

                <TextField
                  fullWidth 
                  label="Email" 
                    name="email"
                    value={formData.email} 
                    onChange={handleInputChange}
                    margin="normal" 
                    required
                    error={!!errors.email}
                    helperText={errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
                
                <TextField
                  fullWidth 
                  label="Password" 
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password} 
                  onChange={handleInputChange}
                  margin="normal" 
                  required
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockReset />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(prev => !prev)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Box display="flex" justifyContent="space-between" alignItems="center" my={1}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={rememberMe} 
                        onChange={(e) => setRememberMe(e.target.checked)}
                        size="small" 
                        color="primary" 
                      />
                    }
                    label={<Typography variant="body2">Remember me</Typography>}
                  />
                  
                  <Link 
                    variant="body2" 
                    sx={{ cursor: 'pointer', color: 'primary.main' }}
                    onClick={openForgotPassword}
                  >
                    Forgot Password?
                  </Link>
                </Box>

                <Button 
                  variant="contained" 
                  fullWidth 
                  color="primary" 
                  onClick={handleLogin}
                  disabled={isLoading}
                  sx={{ py: 1.5 }}
                >
                  {isLoading ? <CircularProgress size={24} /> : 'Login'}
                </Button>

                <Divider sx={{ my: 3 }}>OR</Divider>

                <Box display="flex" justifyContent="center" gap={1} mb={2}>
                  {['Google', 'Microsoft', 'Apple', 'LinkedIn'].map((provider, index) => (
                    <IconButton
                      key={provider}
                      onClick={() => handleSocialLogin(provider)}
                      sx={{
                        border: `1px solid ${theme.palette.divider}`,
                        bgcolor: 'background.paper',
                        '&:hover': { bgcolor: 'action.hover' }
                      }}
                    >
                      {index === 0 && <Google color="error" />}
                      {index === 1 && <Facebook color="primary" />}
                      {index === 2 && <Apple />}
                      {index === 3 && <LinkedIn color="info" />}
                    </IconButton>
                  ))}
                </Box>

                <Button 
                  variant="outlined" 
                  fullWidth 
                  color="primary" 
                  onClick={() => setShowRegister(true)}
                >
                  Create Free Account
                </Button>
              </>
            ) : (
              <>
                <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
                  Create SchoolAura Account
                </Typography>

                <FormControl fullWidth margin="normal">
                  <InputLabel id="org-type-label">Organization Type *</InputLabel>
                  <Select
                    labelId="org-type-label"
                    label="Organization Type *"
                    name="orgType"
                    value={formData.orgType} 
                    onChange={handleInputChange}
                  >
                    <MenuItem value="School">School</MenuItem>
                    <MenuItem value="Branch">Branch</MenuItem>
                    <MenuItem value="College">College</MenuItem>
                    <MenuItem value="Coaching">Coaching Center</MenuItem>
                  </Select>
                </FormControl>
                
                <TextField 
                  fullWidth 
                  label="School Name" 
                  name="schoolName" 
                  margin="normal" 
                  onChange={handleInputChange} 
                  required
                  error={!!errors.schoolName}
                  helperText={errors.schoolName}
                />
                
                <TextField 
                  fullWidth 
                  label="Your Full Name" 
                  name="yourName" 
                  margin="normal" 
                  onChange={handleInputChange} 
                  required
                  error={!!errors.yourName}
                  helperText={errors.yourName}
                />
                
                <TextField 
                  fullWidth 
                  label="Email" 
                  name="email" 
                  margin="normal" 
                  onChange={handleInputChange} 
                  required
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
                
                <TextField 
                  fullWidth 
                  label="Contact Number" 
                  name="contactNumber" 
                  margin="normal" 
                  onChange={handleInputChange} 
                  required
                  error={!!errors.contactNumber}
                  helperText={errors.contactNumber}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                  }}
                />

                <TextField
                  fullWidth 
                  label="Password" 
                  name="password"
                  type={showPassword ? 'text' : 'password'} 
                  onChange={handleInputChange}
                  margin="normal" 
                  required
                  error={!!errors.password}
                  helperText={errors.password || "Minimum 8 characters with uppercase, number and symbol"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockReset />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                
                {formData.password && (
                  <Box mt={-1} mb={1}>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={2}>
                        <Typography variant="caption">
                          Strength: 
                        </Typography>
                      </Grid>
                      <Grid item xs={10}>
                        <Box display="flex" gap={0.5}>
                          {[1, 2, 3, 4].map((level) => (
                            <Box
                              key={level}
                              sx={{
                                flex: 1,
                                height: 4,
                                bgcolor: passwordStrength >= level 
                                  ? passwordStrengthColors[passwordStrength - 1] 
                                  : 'divider',
                                borderRadius: 2
                              }}
                            />
                          ))}
                        </Box>
                      </Grid>
                      <Grid item xs={12} textAlign="right">
                        <Typography 
                          variant="caption" 
                          color={passwordStrengthColors[passwordStrength - 1]}
                          fontWeight={500}
                        >
                          {passwordStrength > 0 ? passwordStrengthLabels[passwordStrength - 1] : ''}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                )}

                <RadioGroup 
                  row 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleInputChange} 
                  sx={{ my: 1 }}
                >
                  <FormControlLabel value="Male" control={<Radio size="small" color="primary" />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio size="small" color="primary" />} label="Female" />
                  <FormControlLabel value="Other" control={<Radio size="small" color="primary" />} label="Other" />
                </RadioGroup>

                <TextField 
                  fullWidth 
                  label="Referral Code (Optional)" 
                  name="referralCode" 
                  margin="normal" 
                  onChange={handleInputChange} 
                />

                <Box mt={2} mb={1}>
                  <Typography variant="subtitle2" mb={1}>
                    Enter Captcha
                  </Typography>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={5}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          bgcolor: '#f5f5f5',
                          borderRadius: 1,
                          p: 1,
                        }}
                      >
                        <Box
                          sx={{
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 'bold',
                            letterSpacing: 3,
                            color: '#555',
                            textAlign: 'center',
                            transform: 'skewX(-10deg)',
                          }}
                        >
                          {captcha}
                        </Box>
                        <IconButton onClick={generateCaptcha} size="small">
                          <Refresh fontSize="small" />
                        </IconButton>
                      </Box>
                    </Grid>
                    <Grid item xs={7}>
                      <TextField 
                        fullWidth 
                        name="captcha" 
                        onChange={handleInputChange}
                        error={!!errors.captcha}
                        helperText={errors.captcha}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={termsAccepted} 
                      onChange={(e) => setTermsAccepted(e.target.checked)} 
                      color="primary" 
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      I agree to the{' '}
                      <Link 
                        component="button" 
                        variant="body2"
                        onClick={openTermsDialog}
                        sx={{ fontWeight: 600 }}
                      >
                        Terms and Conditions
                      </Link>
                      . I understand that I'll receive important account emails.
                    </Typography>
                  }
                  sx={{ mt: 1, alignItems: 'flex-start' }}
                />

                <Button 
                  variant="contained" 
                  fullWidth 
                  color="primary" 
                  sx={{ my: 2, py: 1.5 }} 
                  onClick={handleRegister}
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} /> : 'Create Account'}
                </Button>

                <Box textAlign="center" mt={2}>
                  <Typography variant="body2">
                    Already have an account?{' '}
                    <Link 
                      component="button" 
                      variant="body2" 
                      fontWeight={600}
                      onClick={() => setShowRegister(false)}
                    >
                      Sign In
                    </Link>
                  </Typography>
                </Box>
              </>
            )}
          </Paper>
        </Slide>
      </Box>
    </Box>
  );
};

export default LoginPage;