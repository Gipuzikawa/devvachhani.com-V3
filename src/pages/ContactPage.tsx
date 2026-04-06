import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import ContactForm from '../components/contact/ContactForm'

const AVAILABILITY = [
  { label: 'Freelance Projects', status: 'Open', color: 'text-green-400 bg-green-400/10' },
  { label: 'Internships', status: 'Open', color: 'text-green-400 bg-green-400/10' },
  { label: 'Full-time Roles', status: 'Post-graduation', color: 'text-yellow-400 bg-yellow-400/10' },
]

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact | Alex Chen · Portfolio.OS</title>
        <meta name="description" content="Get in touch with Alex Chen for freelance work, internship opportunities, or just to say hello." />
        <meta property="og:title" content="Contact | Alex Chen · Portfolio.OS" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-primary font-semibold text-sm font-label tracking-widest uppercase">
              Get in Touch
            </span>
            <h1 className="text-5xl md:text-7xl font-black font-headline text-white mt-4 mb-6 leading-[1.05]">
              Let's build<br />the future<br />
              <span className="text-primary text-glow">together.</span>
            </h1>
            <p className="text-on-surface-variant text-lg font-body leading-relaxed max-w-lg mb-8">
              Whether you need a design partner for a project, want to discuss an internship, or just want to talk about design — I'd love to hear from you. I respond within 24 hours.
            </p>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:alex@example.com"
                className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-surface-container-high group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                  <span className="material-symbols-outlined text-base">mail</span>
                </div>
                <span className="font-body text-sm">alex@example.com</span>
              </a>
              <div className="flex items-center gap-3 text-on-surface-variant">
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-base">location_on</span>
                </div>
                <span className="font-body text-sm">San Francisco Bay Area, CA</span>
              </div>
              <div className="flex items-center gap-3 text-on-surface-variant">
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                </div>
                <span className="font-body text-sm text-green-400 font-semibold">
                  Currently accepting new projects
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden aspect-video lg:aspect-square">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZo8u57aMte50E4WBuw3qSMChnSyHTHVIXaRLGDF5zcQ1y6KNxZEuHS0wDrnxOQ9efuJxasg1tqi6P06aTIJCLuZQTKLKeLeqF9Q_eWJ9fACbuwV1GhhJd7AxKiFlORdXbHP35TjWNDq57fTffj41zEYiSh0EEzYQpnLULHuaxgCU6NnOXEdp_b9cLalkYT7srQ7RR7k-n0wOs-Rp0OJbt_PqhyoD88xN2HYmNzqJ9an2JytkcPpGQFzr5KLTEaGM5ifdIGbOO22kY"
              alt="Alex Chen design workspace"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Bento: Form + Social */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-surface-container-high rounded-2xl p-8 border border-outline-variant/20">
            <h2 className="text-2xl font-black font-headline text-white mb-6">Send a Message</h2>
            <ContactForm />
          </div>

          {/* Social + Info */}
          <div className="flex flex-col gap-4">
            {/* Social Links */}
            <div className="bg-surface-container-high rounded-2xl p-6 border border-outline-variant/20 flex-1">
              <h3 className="text-lg font-bold font-headline text-white mb-4">Find Me Online</h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'LinkedIn', sub: 'Professional network', iconColor: '#0A66C2', icon: 'work' },
                  { label: 'GitHub', sub: 'Code & open source', iconColor: null, icon: 'code' },
                  { label: 'Dribbble', sub: 'Design portfolio', iconColor: '#EA4C89', icon: 'palette' },
                ].map(({ label, sub, iconColor, icon }) => (
                  <a
                    key={label}
                    href="#"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 transition-colors group"
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: iconColor ? `${iconColor}1a` : 'rgba(255,255,255,0.05)' }}
                    >
                      <span
                        className="material-symbols-outlined text-base"
                        style={{ color: iconColor ?? undefined }}
                      >
                        {icon}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-semibold font-headline text-sm group-hover:text-primary transition-colors">
                        {label}
                      </p>
                      <p className="text-on-surface-variant text-xs font-body">{sub}</p>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant text-base ml-auto">
                      open_in_new
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <div className="glass-panel border border-primary/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-primary text-xl">schedule</span>
                <h3 className="text-white font-bold font-headline text-sm">Response Time</h3>
              </div>
              <p className="text-on-surface-variant text-sm font-body leading-relaxed">
                I typically respond within{' '}
                <span className="text-white font-semibold">24 hours</span> on weekdays. For urgent matters, mention it in your subject line.
              </p>
            </div>

            {/* Availability */}
            <div className="bg-surface-container-high rounded-2xl p-6 border border-outline-variant/20">
              <h3 className="text-white font-bold font-headline text-sm mb-3">Current Availability</h3>
              <div className="flex flex-col gap-2">
                {AVAILABILITY.map(({ label, status, color }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-on-surface-variant text-xs font-body">{label}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${color}`}>{status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work That Speaks Section */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="mb-10">
          <span className="text-primary font-semibold text-sm font-label tracking-widest uppercase">
            Portfolio Highlights
          </span>
          <h2 className="text-4xl font-black font-headline text-white mt-2">Work that speaks volumes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: 'emoji_events', iconBg: 'bg-primary/10 group-hover:bg-primary/20', iconColor: 'text-primary', value: '3', label: 'Design awards won at national and regional competitions', fill: true },
            { icon: 'folder_open', iconBg: 'bg-tertiary/10 group-hover:bg-tertiary/20', iconColor: 'text-tertiary-dim', value: '12+', label: 'Projects shipped with real users and measurable impact', fill: false },
            { icon: 'people', iconBg: 'bg-secondary-container/50 group-hover:bg-secondary-container', iconColor: 'text-secondary-dim', value: '2K+', label: 'Students reached through educational tools and design workshops', fill: false },
          ].map(({ icon, iconBg, iconColor, value, label, fill }) => (
            <div key={value} className="bg-surface-container-high rounded-2xl p-6 border border-outline-variant/20 hover:border-primary/30 transition-all duration-300 group text-center">
              <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center mx-auto mb-4 transition-colors`}>
                <span
                  className={`material-symbols-outlined ${iconColor} text-2xl`}
                  style={fill ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {icon}
                </span>
              </div>
              <p className="text-4xl font-black font-headline text-white mb-2">{value}</p>
              <p className="text-on-surface-variant font-body text-sm">{label}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            to="/projects"
            className="flex items-center gap-2 border border-primary/30 text-primary font-bold px-8 py-3.5 rounded-full hover:bg-primary/10 transition-all duration-300 font-headline text-sm"
          >
            <span className="material-symbols-outlined text-base">grid_view</span>
            View All Projects
          </Link>
        </div>
      </section>
    </>
  )
}
