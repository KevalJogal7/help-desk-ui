import { styled } from '@mui/material/styles'

export const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  backgroundColor: theme.palette.custom.pageBg,
}))

export const Sidebar = styled('aside')(({ theme }) => ({
  width: 250,
  backgroundColor: theme.palette.custom.sidebarBg,
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
}))

export const SidebarLogo = styled('div')({
  fontSize: 22,
  fontWeight: 'bold',
  padding: 24,
  borderBottom: '1px solid rgba(255,255,255,0.1)',
})

export const SidebarNav = styled('nav')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 12,
  '& a': {
    color: 'white',
    textDecoration: 'none',
    display: 'flex',
    gap: 12,
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 6,
    '&:hover, &.active': {
      backgroundColor: theme.palette.custom.sidebarActiveBg,
    },
  },
}))

export const Main = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
  overflow: 'hidden',
})

export const Navbar = styled('header')(({ theme }) => ({
  height: 64,
  backgroundColor: theme.palette.custom.navbarBg,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: '0 24px',
  boxShadow: theme.palette.custom.navbarShadow,
  flexShrink: 0,
}))

export const NavRight = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 20,
})

export const Content = styled('div')({
  flex: 1,
  padding: 24,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
  '& > .fill-height': {
    flex: 1,
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
  },
})
