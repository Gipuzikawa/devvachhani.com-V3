import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import MobileMenuOverlay from '../components/layout/MobileMenuOverlay'
import Footer from '../components/layout/Footer'
import ScrollToTop from '../components/layout/ScrollToTop'

export default function PageLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <>
      <ScrollToTop />
      <Navbar onMenuOpen={() => setMenuOpen(true)} />
      <MobileMenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <Outlet />
      <Footer />
    </>
  )
}
