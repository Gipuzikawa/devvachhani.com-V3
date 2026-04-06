export default function Footer() {
  return (
    <footer className="max-w-7xl mx-auto py-12 px-8 flex flex-col md:flex-row justify-between items-center border-t border-outline-variant/10 gap-6 mt-8">
      <div className="text-center md:text-left">
        <span className="text-xl font-black tracking-tighter text-white font-headline">Portfolio.OS</span>
        <p className="text-on-surface-variant font-body text-xs uppercase tracking-widest mt-2">
          © 2025 Alex Chen. Designed with Kinetic Precision.
        </p>
      </div>
      <div className="flex gap-8">
        <a
          className="text-on-surface-variant hover:text-primary transition-colors font-body text-sm uppercase tracking-widest"
          href="#"
        >
          LinkedIn
        </a>
        <a
          className="text-on-surface-variant hover:text-primary transition-colors font-body text-sm uppercase tracking-widest"
          href="#"
        >
          GitHub
        </a>
        <a
          className="text-on-surface-variant hover:text-primary transition-colors font-body text-sm uppercase tracking-widest"
          href="#"
        >
          Dribbble
        </a>
      </div>
    </footer>
  )
}
