import { NavLink } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { authStorage } from "../services/storage.service";
import { Role } from "../models/auth";
import { ROUTES } from "../routes/routeConstants";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo">
        HelpDesk
      </div>

      <nav>
        <NavLink to={ROUTES.DASHBOARD}>
          <DashboardIcon fontSize="medium" />
          Dashboard
        </NavLink>

        <NavLink to={ROUTES.TICKETS}>
          <LocalActivityIcon fontSize="medium" />
          Tickets
        </NavLink>

        {authStorage.getRole() === Role.ADMIN && <NavLink to={ROUTES.USERS}>
          <GroupIcon fontSize="medium" />
          Users
        </NavLink>}
      </nav>
    </aside>
  )
}

export default Sidebar
