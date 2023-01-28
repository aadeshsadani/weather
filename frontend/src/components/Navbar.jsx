import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import '@fontsource/roboto/400.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../state/reducers/userReducer';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const settings = ['Logout'];
const theme = createTheme({
    palette: {
      primary: {
        main: "#026ca0"
      },
      secondary: {
        main: '#026ca0',
      },
    }

    // backgroundColor: "#3178bd"
  });

export default function Navbar() {
  const getDataFromStor = useSelector((data) => data.userReducer)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear('token');
    dispatch(logout());
    navigate('/');
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // useEffect(() => {
  //   if(getDataFromStor.message === null){
  //     navigate('/');
  //   }
  // },[getDataFromStor])
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pakistan Weather Forcast
            {/* <Button variant="outlined" sx={{ ml: '45px' }}><Link to="/">Home</Link></Button> */}
            {
              getDataFromStor.message === 'active' ? 
                <>
                <Typography variant="" component="span" sx={{ ml: '45px' }} >
                  <Link to="/">Home</Link>
                </Typography>
                <Typography variant="" component="span" sx={{ ml: '45px' }} >
                  <Link to="/dashboard">Dashboard</Link>
                </Typography>
                </>
                : ''
            }
          </Typography>
          {
            getDataFromStor.message === 'active' ? 
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: "white", color: "#026ca0" }}>Z</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={handleLogout}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> : 
            <Button variant="outlined"><Link to="/signin">Sign in</Link></Button> 
          }
        </Toolbar>
      </AppBar>
    </Box>
    </ThemeProvider>
  );
}