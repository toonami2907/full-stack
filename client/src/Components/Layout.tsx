
import {Outlet} from 'react-router-dom'
import Footer from './Footer/Footer'
import AnotherHeader from './Header/Header'
function Layout() {
  return (
   <>
   <AnotherHeader/>
   <Outlet/>
   <Footer/>
   </>
  )
}

export default Layout