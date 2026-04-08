import type { PersonData } from '../types'

export const person: PersonData = {
  name: 'Alex Chen',
  role: 'UI/UX Designer · High School Junior',
  location: 'San Francisco Bay Area, CA',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCOke12GLCPN1ohq_oO8bKM3RUsH6_J09rwlxxQ82mOpPUHM7E9JX-AivRoFSKX0lE4X4JFYifOfl1WSqfBF4GiTIv7hGQM1JOzqd9e6dF6cpLYtAt6sRiuGVAgJWDGN_ChlLBxehMVgCbI0rQmlycQY2OXqeHECHGQQplOuVGpHorcvB7EjA8pArNRv8TUhxRPnU-PPjw4iQgo4YYaXbF6TNfjerK8eRSGtZE-VF2sQ1el0B05BlOZK33RVNN4UXDFvAqvOgyjf7n9',
  portraitUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDR96JzrWuFD0mgTKRZ1z6SwuG5S8VXRC7S6AQiIQUTHKD5PHQ_J6ljcge1uT_yy-fklDiVZu4v1Zql8OzOC5-imdrBl00C1G42_iFcLrf9obB2Y1QaZmPi5I-_3OhlSpwZ4RIEHWQkfhj_mhOaReF0PpQRPHWAsIt6GexgTPm0q758kNa4nr6cNuoP2QXvfMdGn_s_zEuEpwAM4T7_mgs1tv-5IWPRPgtIMapbBt_981eKE-_2CaJ1GMwkDxX6KHNuRm93V2ZzZ4iS',
  bio: [
    "I'm a high school junior in the San Francisco Bay Area who has been designing and building digital experiences for the past three years. I got into UI/UX design when I noticed how frustrating my school's learning management system was — and decided that if I was going to complain about it, I should try to fix it.",
    "That first redesign project led to winning a local design competition, which led to bigger projects, which led to here. I now serve as president of my school's Coding Club (which I've grown from 8 to 60+ members), and I run monthly design workshops for middle schoolers in my community.",
    'My design philosophy is simple: technology should dissolve into the task at hand. The best interface is the one you don\'t notice — the one that gets out of the way and lets people do what they came to do, with dignity and ease.',
    'I care especially about accessibility and inclusive design. Not as a compliance checkbox, but as a core creative challenge. Designing for the edges makes the center better for everyone.',
  ],
  quickFacts: [
    { icon: 'school', text: 'Year 11 at Nottingham High School, UK' },
    { icon: 'location_on', text: 'Mansfield, UK' },
    { icon: 'groups', text: 'Model United Nations, Engineering Society Founder' },
    { icon: 'translate', text: 'English' },
  ],
  stats: [
    { value: '3+', label: 'Years designing' },
    { value: '12+', label: 'Projects shipped' },
    { value: '60+', label: 'Club members led' },
    { value: '3', label: 'Awards won' },
  ],
  skills: [
    { name: 'Figma / Prototyping', percent: 95, color: 'primary' },
    { name: 'React / TypeScript', percent: 80, color: 'primary' },
    { name: 'User Research', percent: 85, color: 'primary' },
    { name: 'Motion / After Effects', percent: 70, color: 'tertiary' },
    { name: 'Python / AI/ML Basics', percent: 65, color: 'secondary' },
  ],
  education: [
    {
      institution: 'Westlake High School',
      role: 'Junior · GPA 4.2 (Weighted)',
      period: '2022 – 2026',
      description: 'AP Computer Science A, AP Art & Design, AP Statistics, AP English Literature',
      accentColor: 'primary',
    },
    {
      institution: 'Stanford Pre-Collegiate Studies',
      role: 'Design & Technology Summer Program',
      period: 'Summer 2023',
      description:
        'Intensive 3-week program covering human-centered design, rapid prototyping, and design thinking methodologies.',
      accentColor: 'tertiary',
    },
  ],
  activities: [
    {
      title: 'Coding Club — President',
      description:
        'Grew membership from 8 to 60+ students. Organized 4 hackathons, 3 industry speaker events.',
      period: '2023 – Now',
    },
    {
      title: 'Design For Good Initiative',
      description:
        'Monthly workshops teaching UX basics to middle schoolers in underserved communities.',
      period: '2022 – Now',
    },
    {
      title: 'FIRST Robotics — UX Lead',
      description:
        'Led interface design for robot operator console. Team placed 2nd at Regional Championships.',
      period: '2022 – 2024',
    },
    {
      title: 'School Newspaper — Design Editor',
      description:
        "Redesigned the publication's visual identity and digital presence. Increased readership by 40%.",
      period: '2023 – Now',
    },
  ],
  interests: [
    {
      type: 'image',
      title: 'Photography',
      description: 'Street and architectural photography — finding the geometry in everyday spaces.',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAblQwZBdzunBbFuxT9vuwaZJfdwlZirW4hveJFvrksLwHM-jliKrNf9ZTrZ2I3-78GS4yTpBeetJ4uw8OuFsMYlwDqvfMsmTuwYzxgwp3kkqNI4qG2qMar1MgHIC0hY2by7eN7YniXWyn9G-syfRqcK6MZEBqXOM2Jp9XzL7_4u1Xr_wo9TdIT9hQeOAyZMm4_p9zUIS8LGxTUweD60j2aplqONrHlkJytGzZtILefNNjoTsIe8Cx508LuHK-od0CGLqQy4PmiTfkp',
      imageAlt: 'Photography hobby — street and architectural photography',
      icon: 'photo_camera',
      colSpan: 'sm:col-span-2',
      tags: [],
    },
    {
      type: 'card',
      title: 'Reading',
      description:
        'Currently reading: "The Design of Everyday Things" for the third time, and "Thinking in Systems" by Donella Meadows.',
      icon: 'menu_book',
      iconColor: 'text-tertiary-dim',
      bgClass: 'bg-gradient-to-br from-tertiary/10 to-primary/5 border border-tertiary/20',
      tags: [
        { label: 'Design', className: 'text-xs bg-tertiary/10 text-tertiary-dim px-2 py-1 rounded-full font-label' },
        { label: 'Systems', className: 'text-xs bg-tertiary/10 text-tertiary-dim px-2 py-1 rounded-full font-label' },
        { label: 'Philosophy', className: 'text-xs bg-tertiary/10 text-tertiary-dim px-2 py-1 rounded-full font-label' },
      ],
    },
    {
      type: 'card',
      title: 'Music',
      description:
        'Classical piano for 9 years, currently exploring generative music and the intersection of algorithms and composition.',
      icon: 'piano',
      iconColor: 'text-on-surface-variant',
      bgClass: 'bg-surface-container-high border border-outline-variant/20',
      tags: [
        { label: 'Piano', className: 'text-xs bg-surface-container-highest text-on-surface-variant px-2 py-1 rounded-full font-label' },
        { label: 'Generative', className: 'text-xs bg-surface-container-highest text-on-surface-variant px-2 py-1 rounded-full font-label' },
      ],
    },
    {
      type: 'card',
      title: 'Hiking',
      description:
        'Weekends on the trails in the Santa Cruz mountains. Nature is the best reset for a screen-heavy week.',
      icon: 'landscape',
      iconColor: 'text-green-400',
      bgClass: 'bg-gradient-to-br from-green-900/20 to-surface-container border border-green-900/20',
      tags: [
        { label: 'Outdoors', className: 'text-xs bg-green-900/20 text-green-400 px-2 py-1 rounded-full font-label' },
        { label: 'Nature', className: 'text-xs bg-green-900/20 text-green-400 px-2 py-1 rounded-full font-label' },
      ],
    },
    {
      type: 'card',
      title: 'Chess',
      description:
        'Rated 1600+ on Chess.com. I find chess teaches the same thing as good UX: seeing consequences two steps ahead of the user.',
      icon: 'chess',
      iconColor: 'text-yellow-400',
      bgClass: 'bg-surface-container-high border border-outline-variant/20',
      tags: [
        { label: 'Strategy', className: 'text-xs bg-yellow-400/10 text-yellow-400 px-2 py-1 rounded-full font-label' },
        { label: '1600+ Rated', className: 'text-xs bg-yellow-400/10 text-yellow-400 px-2 py-1 rounded-full font-label' },
      ],
    },
  ],
}
