import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import MobileMenuOverlay from '../components/layout/MobileMenuOverlay'
import Footer from '../components/layout/Footer'
import ScrollToTop from '../components/layout/ScrollToTop'

export default function PageLayout() {
  const location = useLocation()
  const [menuOpenPath, setMenuOpenPath] = useState<string | null>(null)
  const menuOpen = menuOpenPath === location.pathname

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <ScrollToTop />
      <Navbar onMenuOpen={() => setMenuOpenPath(location.pathname)} />
      <MobileMenuOverlay isOpen={menuOpen} onClose={() => setMenuOpenPath(null)} />
      <Outlet />
      <Footer />
    </>
  )
}
