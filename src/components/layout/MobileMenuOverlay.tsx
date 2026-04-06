import { Link } from 'react-router-dom'
import { NAV_LINKS } from './Navbar'

interface MobileMenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenuOverlay({ isOpen, onClose }: MobileMenuOverlayProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] bg-[#0b0c10]/97 backdrop-blur-xl flex flex-col items-center justify-center gap-8">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full text-on-surface-variant hover:text-white hover:bg-white/10 transition-all"
        aria-label="Close menu"
      >
        <span className="material-symbols-outlined text-3xl">close</span>
      </button>
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          onClick={onClose}
          className="text-3xl font-headline font-bold text-white hover:text-primary transition-colors"
        >
          {link.label}
        </Link>
      ))}
      <Link
        to="/contact"
        onClick={onClose}
        className="mt-4 bg-primary text-on-primary font-bold px-10 py-4 rounded-full text-xl hover:scale-105 transition-all"
      >
        Hire Me
      </Link>
    </div>
  )
}
