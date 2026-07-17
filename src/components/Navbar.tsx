import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import { Button, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import React from 'react'
import { authStorage } from '../services/storage.service'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../routes/routeConstants'
import { Navbar as NavbarRoot, NavRight } from './Layout/Layout.styles'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { toggleTheme } from '../store/slices/themeSlice'

const Navbar = () => {
  const id = React.useId()
  const buttonId = `${id}-button`
  const menuId = `${id}-menu`
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const mode = useAppSelector((state) => state.theme.mode)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const handleLogout = () => {
    authStorage.clearAuth()
    handleClose()
    navigate(ROUTES.LOGIN)
  }

  return (
    <NavbarRoot>
      <NavRight>
        <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
          <IconButton onClick={() => dispatch(toggleTheme())} color="inherit" size="small">
            {mode === 'dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
          </IconButton>
        </Tooltip>

        <NotificationsNoneIcon />

        <Button
          id={buttonId}
          aria-controls={open ? menuId : undefined}
          aria-haspopup="true"
          aria-expanded={open}
          color="inherit"
          onClick={handleClick}
          sx={{ textTransform: 'none' }}
        >
          <AccountCircleIcon sx={{ marginRight: 1 }} />
          <span>{authStorage.getUserName()}</span>
        </Button>
        <Menu
          id={menuId}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{ list: { 'aria-labelledby': buttonId } }}
        >
          <MenuItem onClick={() => { handleClose(); navigate(ROUTES.PROFILE) }}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </NavRight>
    </NavbarRoot>
  )
}

export default Navbar
