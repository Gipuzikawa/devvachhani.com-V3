import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { projects } from '../data/projects'
import type { Project, ProjectDetail } from '../types'
import ProjectHero from '../components/project/ProjectHero'
import ProjectMission from '../components/project/ProjectMission'
import ProjectTechBento from '../components/project/ProjectTechBento'
import ProjectEvolution from '../components/project/ProjectEvolution'
import ProjectImpact from '../components/project/ProjectImpact'

type DetailedProject = Project & { detail: ProjectDetail }

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>()
  const project = projects.find((entry) => entry.id === id)

  if (!project || !project.detail) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6">
        <h1 className="text-4xl font-black font-headline text-white">Project Not Found</h1>
        <p className="text-on-surface-variant font-body">This case study doesn't exist or has been removed.</p>
        <Link to="/projects" className="text-primary font-semibold font-label hover:underline">
          Back to Projects
        </Link>
      </div>
    )
  }

  const detailedProject = project as DetailedProject

  return (
    <>
      <Helmet>
        <title>{project.title} | Dev Vachhani</title>
      </Helmet>

      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto space-y-32">
        <ProjectHero project={detailedProject} />
        <ProjectMission mission={project.detail.mission} objectives={project.detail.objectives} />
        <ProjectTechBento techCards={project.detail.techCards} />
        <ProjectEvolution stages={project.detail.evolution} />
        <ProjectImpact metrics={project.detail.metrics} />
      </main>
    </>
  )
}
