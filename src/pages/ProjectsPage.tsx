import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { projects } from '../data/projects'
import FilterBar from '../components/projects/FilterBar'
import ProjectTimeline from '../components/projects/ProjectTimeline'
import CTABanner from '../components/ui/CTABanner'

const FILTERS = ['All Projects', 'Design', 'Research', 'Dev']

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All Projects')

  const filtered = useMemo(() => {
    if (activeFilter === 'All Projects') return projects
    return projects.filter((p) => p.category === activeFilter)
  }, [activeFilter])

  return (
    <>
      <Helmet>
        <title>Projects | Dev Vachhani· Portfolio.OS</title>
        <meta name="description" content="A timeline of Alex Chen's design and development projects — from neural synthesis research to mobile apps and design systems." />
        <meta property="og:title" content="Projects | Dev Vachhani· Portfolio.OS" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
        <span className="text-primary font-semibold text-sm font-label tracking-widest uppercase">My Work</span>
        <h1 className="text-5xl md:text-7xl font-black font-headline text-white mt-4 mb-6 leading-tight">
          Projects <span className="text-primary text-glow">&amp; Work</span>
        </h1>
        <p className="text-on-surface-variant text-lg max-w-2xl mx-auto font-body leading-relaxed">
          A timeline of design systems, mobile apps, and research projects — each one a step forward in creating meaningful, accessible digital experiences.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mt-8">
          <FilterBar filters={FILTERS} active={activeFilter} onChange={setActiveFilter} />
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <ProjectTimeline projects={filtered} />
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <CTABanner
          heading="Have a project in mind?"
          body="I'm always looking for meaningful collaborations. Let's talk about how I can help bring your vision to life."
          primaryLabel="Hire Me"
          primaryHref="/contact"
        />
      </section>
    </>
  )
}
