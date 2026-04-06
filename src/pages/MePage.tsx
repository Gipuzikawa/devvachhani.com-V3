import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { person } from '../data/person'
import StatCard from '../components/ui/StatCard'
import SkillBar from '../components/me/SkillBar'
import EducationTimeline from '../components/me/EducationTimeline'
import ActivitiesList from '../components/me/ActivitiesList'
import InterestsBento from '../components/me/InterestsBento'

export default function MePage() {
  return (
    <>
      <Helmet>
        <title>About Me | Alex Chen · Portfolio.OS</title>
        <meta name="description" content="Learn about Alex Chen — high school junior, UI/UX designer, coding club president, and aspiring technologist." />
        <meta property="og:title" content="About Me | Alex Chen · Portfolio.OS" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero: Portrait + Bio */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Portrait */}
          <div className="lg:col-span-4">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden aspect-[3/4]">
                <img src={person.portraitUrl} alt="Alex Chen — portrait photo" className="w-full h-full object-cover" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 glass-panel border border-primary/20 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-xs font-semibold font-label">Open to Work</span>
                </div>
                <p className="text-white font-bold font-headline text-sm mt-0.5">Alex Chen</p>
                <p className="text-on-surface-variant text-xs font-body">High School Junior · Designer</p>
              </div>
            </div>

            {/* Quick facts */}
            <div className="mt-10 flex flex-col gap-3">
              {person.quickFacts.map((fact) => (
                <div key={fact.text} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-base">{fact.icon}</span>
                  <span className="text-on-surface-variant text-sm font-body">{fact.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <Link
                to="/contact"
                className="bg-primary text-on-primary font-bold px-6 py-3 rounded-full hover:scale-105 transition-all duration-300 font-headline text-sm text-center"
              >
                Get in Touch
              </Link>
              <a
                href="#"
                className="border border-outline-variant/30 text-on-surface-variant font-semibold px-6 py-3 rounded-full hover:border-primary hover:text-primary transition-all duration-300 font-headline text-sm text-center flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">download</span>
                Download CV
              </a>
            </div>
          </div>

          {/* Bio Content */}
          <div className="lg:col-span-8">
            <span className="text-primary font-semibold text-sm font-label tracking-widest uppercase">About Me</span>
            <h1 className="text-5xl md:text-6xl font-black font-headline text-white mt-4 mb-6 leading-tight">
              Hi, I'm <span className="text-primary text-glow">Alex.</span>
            </h1>

            <div className="flex flex-col gap-5 text-on-surface-variant font-body leading-relaxed text-lg">
              {person.bio.map((para, i) => (
                <p key={i}>
                  {i === 2 ? (
                    <>
                      My design philosophy is simple:{' '}
                      <span className="text-white font-semibold">technology should dissolve into the task at hand</span>
                      . The best interface is the one you don't notice — the one that gets out of the way and lets people do what they came to do, with dignity and ease.
                    </>
                  ) : (
                    para
                  )}
                </p>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              {person.stats.map((stat) => (
                <StatCard key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>

            {/* Skills */}
            <div className="mt-10">
              <h2 className="text-xl font-bold font-headline text-white mb-5">Technical Skills</h2>
              <div className="flex flex-col gap-4">
                {person.skills.map((skill) => (
                  <SkillBar key={skill.name} {...skill} />
                ))}
              </div>
            </div>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 mt-8 bg-primary text-on-primary font-bold px-8 py-3.5 rounded-full hover:scale-105 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 font-headline text-sm"
            >
              View My Projects
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="bg-surface-container-lowest py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <span className="text-primary font-semibold text-sm font-label tracking-widest uppercase">Background</span>
            <h2 className="text-4xl font-black font-headline text-white mt-2">Education &amp; Activities</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold font-headline text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">school</span>
                Education
              </h3>
              <EducationTimeline items={person.education} />
            </div>

            <div>
              <h3 className="text-lg font-bold font-headline text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">groups</span>
                Leadership &amp; Activities
              </h3>
              <ActivitiesList items={person.activities} />
            </div>
          </div>
        </div>
      </section>

      {/* Interests Bento */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-10">
          <span className="text-primary font-semibold text-sm font-label tracking-widest uppercase">Outside of Design</span>
          <h2 className="text-4xl font-black font-headline text-white mt-2">What I'm Into</h2>
        </div>
        <InterestsBento items={person.interests} />
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-br from-primary-container via-primary/60 to-tertiary-container rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,82,255,0.15)_0%,_transparent_70%)]" />
          <div className="relative z-10">
            <h2 className="text-4xl font-black font-headline text-white mb-4">Let's work together</h2>
            <p className="text-on-primary-container font-body max-w-xl mx-auto mb-8">
              I'm always open to interesting projects, internships, and conversations with people building things that matter.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-primary-container font-bold px-8 py-3.5 rounded-full hover:scale-105 transition-all duration-300 font-headline text-sm"
              >
                Get in Touch
              </Link>
              <Link
                to="/projects"
                className="border-2 border-white/40 text-white font-bold px-8 py-3.5 rounded-full hover:border-white transition-all duration-300 font-headline text-sm"
              >
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
