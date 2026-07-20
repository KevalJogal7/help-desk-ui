import { NavLink } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard'
import GroupIcon from '@mui/icons-material/Group'
import LocalActivityIcon from '@mui/icons-material/LocalActivity'
import { authStorage } from '../services/storage.service'
import { Role } from '../models/auth'
import { ROUTES } from '../routes/routeConstants'
import { Sidebar as SidebarRoot, SidebarLogo, SidebarNav } from './Layout/Layout.styles'

const Sidebar = () => {
  return (
    <SidebarRoot>
      <SidebarLogo>HelpDesk</SidebarLogo>
      <SidebarNav>
        {authStorage.getRole() === Role.ADMIN && (
          <NavLink to={ROUTES.DASHBOARD}>
            <DashboardIcon fontSize="medium" />
            Dashboard
          </NavLink>
        )}
        <NavLink to={ROUTES.TICKETS}>
          <LocalActivityIcon fontSize="medium" />
          Tickets
        </NavLink>
        {authStorage.getRole() === Role.ADMIN && (
          <NavLink to={ROUTES.USERS}>
            <GroupIcon fontSize="medium" />
            Users
          </NavLink>
        )}
      </SidebarNav>
    </SidebarRoot>
  )
}

export default Sidebar
