import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Articles', href: '/articles' },
  { label: 'Me', href: '/me' },
  { label: 'Contact', href: '/contact' },
]

interface NavbarProps {
  onMenuOpen: () => void
}

export default function Navbar({ onMenuOpen }: NavbarProps) {
  const location = useLocation()

  function isActive(href: string) {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  return (
    <div className="px-4">
      <nav className="flex justify-between items-center w-full px-6 py-3 bg-slate-900/80 backdrop-blur-2xl rounded-full mt-6 mx-auto max-w-5xl sticky top-4 shadow-2xl shadow-primary/10 z-50">
        <Link to="/" className="text-2xl font-black tracking-tighter text-white font-headline">
          Portfolio.OS
        </Link>
        <div className="hidden md:flex items-center gap-6 font-headline tracking-tight font-semibold text-sm">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={
                isActive(link.href)
                  ? 'text-primary font-bold border-b-2 border-primary pb-1'
                  : 'text-on-surface-variant hover:text-white transition-colors hover:scale-105 duration-300'
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="bg-primary text-on-primary font-bold px-6 py-2 rounded-full hover:scale-105 transition-all duration-300 active:scale-95 hidden md:inline-block text-sm"
          >
            Hire Me
          </Link>
          <button
            onClick={onMenuOpen}
            className="md:hidden p-2 rounded-full text-on-surface-variant hover:text-white hover:bg-white/10 transition-all"
            aria-label="Open menu"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

export { NAV_LINKS }
