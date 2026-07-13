import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'
import './Layout.css'

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <Navbar />

        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
