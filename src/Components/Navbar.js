import React, { useState } from 'react';
import { setConstraint } from "../constraints";
import { BsFillCaretDownFill } from 'react-icons/bs';
import { Button, Menu, MenuItem, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Navbar() {
  const token = window.localStorage.getItem("token");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const signout = () => {
    setConstraint(false);
    localStorage.clear();
    window.location.href = "/log-in";
  };

  const buttonStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    textTransform: 'none',
    color: 'black',
    '&:hover': { color: 'primary.main', backgroundColor: 'transparent' },
    '&:focus': { color: 'primary.main', backgroundColor: 'transparent' },
  };

  const renderItemsBrowserMenu = () => (
    <Stack>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.4 }}>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={buttonStyle}
          endIcon={<BsFillCaretDownFill size={15} />}
        >
          Items Browser
        </Button>
      </motion.div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
      >
        <MenuItem component={Link} to={token ? "/LostItems" : "/log-in"} onClick={handleClose}>
          Lost Items
        </MenuItem>
        <MenuItem component={Link} to={token ? "/FoundItems" : "/log-in"} onClick={handleClose}>
          Found Items
        </MenuItem>
      </Menu>
    </Stack>
  );

  return (
    <Stack
      width="100%"
      maxWidth="1440px"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      borderRadius="0 0 20px 20px"
      px={{ xs: 3, sm: 5, md: 5 }}
      zIndex={20}
      gap={1}
      sx={{ backgroundColor: '#F6F8F8' }}
      mb="10px"
    >
      {/* Logo */}
      <Link to="/">
        <Stack maxWidth="180px">
          <img src="https://i.ibb.co/G2851XX/Main-Logo-1.png" alt="logo" width="100%" />
        </Stack>
      </Link>

      {/* Menu Buttons */}
      <Stack direction="row" gap="38px" display={{ xs: 'none', md: 'flex' }}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.4 }}>
          <Button component={Link} to="/" sx={buttonStyle}>Home</Button>
        </motion.div>

        {renderItemsBrowserMenu()}

        {token && (
          <>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.4 }}>
              <Button component={Link} to="/postitem" sx={buttonStyle}>Post Item</Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.4 }}>
              <Button component={Link} to="/mylistings" sx={buttonStyle}>My Listings</Button>
            </motion.div>
          </>
        )}
      </Stack>

      {/* Auth Buttons */}
      <Stack direction="row" gap="20px">
        {token ? (
          <Button variant="contained" onClick={signout} sx={{ textTransform: 'none', px: 3, display: { xs: 'none', md: 'flex' } }} size="small" disableRipple>
            Logout
          </Button>
        ) : (
          <>
            <Button component={Link} to="/log-in" variant="contained" sx={{ textTransform: 'none', px: 3 }} size="small" disableRipple>
              Login
            </Button>
            <Button component={Link} to="/sign-up" variant="contained" sx={{ textTransform: 'none', px: 3 }} size="small" disableRipple>
              Sign Up
            </Button>
          </>
        )}
      </Stack>
    </Stack>
  );
}

export default Navbar;
