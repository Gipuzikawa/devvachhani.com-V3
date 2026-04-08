export interface TechCard {
  icon: string
  title: string
  description: string
  tags: string[]
  variant: 'standard' | 'elevated' | 'mini'
}

export interface EvolutionStage {
  month: string
  title: string
  description: string
  imageUrl: string
  imageAlt: string
}

export interface MetricItem {
  value: string
  label: string
}

export interface ProjectDetail {
  role: string
  mission: string[]
  objectives: string[]
  techCards: TechCard[]
  evolution: EvolutionStage[]
  metrics: MetricItem[]
}

export interface Project {
  id: string
  year: number
  category: 'Research' | 'Design' | 'Dev'
  title: string
  description: string
  tags: string[]
  duration: string
  team: string
  imageUrl: string | null
  placeholderIcon?: string
  caseStudyUrl: string
  accentColor?: 'primary' | 'tertiary' | 'yellow'
  award?: string
  detail?: ProjectDetail
}

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  category: 'Design' | 'Tech' | 'Culture'
  readTime: number
  date: string
  imageUrl: string | null
  featured: boolean
  featuredSize?: 'large' | 'side'
  body: string
  tags?: string[]
}

export interface Skill {
  name: string
  percent: number
  color: 'primary' | 'tertiary' | 'secondary'
}

export interface Stat {
  value: string
  label: string
}

export interface EducationItem {
  institution: string
  role: string
  period: string
  description: string
  accentColor?: 'primary' | 'tertiary'
}

export interface ActivityItem {
  title: string
  description: string
  period: string
}

export interface InterestItem {
  type: 'image' | 'card'
  title: string
  description: string
  imageUrl?: string
  imageAlt?: string
  icon?: string
  iconColor?: string
  bgClass?: string
  tags: Array<{ label: string; className: string }>
  colSpan?: string
}

export interface PersonData {
  name: string
  role: string
  location: string
  bio: string[]
  quickFacts: Array<{ icon: string; text: string }>
  stats: Stat[]
  skills: Skill[]
  education: EducationItem[]
  activities: ActivityItem[]
  interests: InterestItem[]
  avatarUrl: string
  portraitUrl: string
}
