import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { authStorage } from '../services/storage.service';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routeConstants';

const Navbar = () => {
    const id = React.useId();
    const buttonId = `${id}-button`;
    const menuId = `${id}-menu`;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        authStorage.clearAuth();
        handleClose();
        navigate(ROUTES.LOGIN);
    }

  return (
    <header className="navbar">
      <div className="nav-right">
        <NotificationsNoneIcon />

        <div className="profile">
            <Button
                id={buttonId}
                aria-controls={open ? menuId : undefined}
                aria-haspopup="true"
                color="inherit"
                aria-expanded={open}
                onClick={handleClick}
                sx={{textTransform: "none"}}
            >
                <AccountCircleIcon sx={{ marginRight: 1 }} />
                <span>{authStorage.getUserName()}</span>
            </Button>
            <Menu
                id={menuId}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                list: {
                    'aria-labelledby': buttonId,
                },
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
      </div>
    </header>
  )
}

export default Navbar
