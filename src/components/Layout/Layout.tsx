import Sidebar from '../Sidebar'
import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'
import { LayoutRoot, Main, Content } from './Layout.styles'

const Layout = () => {
  return (
    <LayoutRoot>
      <Sidebar />
      <Main>
        <Navbar />
        <Content>
          <Outlet />
        </Content>
      </Main>
    </LayoutRoot>
  )
}

export default Layout
