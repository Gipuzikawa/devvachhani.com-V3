import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import HeroCarousel from '../components/home/HeroCarousel'
import BentoSkillsGrid from '../components/home/BentoSkillsGrid'
import AccomplishmentCard from '../components/home/AccomplishmentCard'

const CAROUSEL_SLIDES = [
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmXFVRR0pGbQQEK2wzIWYn-8sCYf0qR5zlGXKWwRmMPHeGX3hSjN8w4QprMDZMKII1oBo3dRlQ0oqvWse8xyoN7RZ_KJVEzoisknWk3TENAh0mjPCSVwEM3f30roiCrbZHZbr-Mxu5sCSEcToMmW_H6EbVJOsyoR607Ehvw4oARDPxt1f9iLfkg0Jo1-YZJGCpB5UZ4vbT14aRwgI20oOcZADc-460ZaFsuj15MB-atoghRAe52TxWd3zVseZy28Rzme1NzIGLEJrG',
    alt: 'Dev Vachhaniworking on UI design at desk',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0H7t1HzLerIYeuHhjtWaeHLo16ZaeD-sF9p0PpI0YBbCIeN9CYPBJR9-G6xW2VoQUYA0TXQaX8D8kSeGsOQRzN4H84cGj9Kh9QM5uSnTaa8XJvinzJW1ZbHheqxNFebnBkbqr-fpMsnEzs6N_O0M2H_VF067kTxF3hNvt1JT-YNdgO6ebKuwtaUgPzORYRINcZI682I_X6bnyW6niluxJ72APSWC9uZbGR5PqJDBZcC-3esj70f-rYeUvyBEQiLAeYV_1MrblvXYU',
    alt: 'Design work presentation and wireframes',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAv_vfUpSawN92foCqt567Oxt5-E0rfxUpwM3Om326V-0BFSNCAN2EgZEKJHZCenaUH_C6eHh0fW66x5_uobQkUP9dzFUrIUUZyoO086qUrjtZdHl1wGM6xCNQfOSbOXuVf5IuJG1iAtYSqjwjZ3AI12mMKk_8A3ABibWNvcE1jJK6vmMg-TyDZodxhYH61a0m02okS0XHmyi_Nr5Bt9HHMWpnETTveanAmPJQegdUDE3lhIoVuEekCmuuM4KKlD25Rct7MdT8d64i7',
    alt: 'Creative workspace with design tools',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0H7t1HzLerIYeuHhjtWaeHLo16ZaeD-sF9p0PpI0YBbCIeN9CYPBJR9-G6xW2VoQUYA0TXQaX8D8kSeGsOQRzN4H84cGj9Kh9QM5uSnTaa8XJvinzJW1ZbHheqxNFebnBkbqr-fpMsnEzs6N_O0M2H_VF067kTxF3hNvt1JT-YNdgO6ebKuwtaUgPzORYRINcZI682I_X6bnyW6niluxJ72APSWC9uZbGR5PqJDBZcC-3esj70f-rYeUvyBEQiLAeYV_1MrblvXYU',
    alt: 'Portfolio showcase and project overview',
  },
]

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Dev Vachhani | Portfolio.OS</title>
        <meta name="description" content="Dev Vachhani— UI/UX designer and developer. High school student building accessible digital experiences for education and social impact." />
        <meta property="og:title" content="Dev Vachhani| Portfolio.OS" />
        <meta property="og:description" content="High school UI/UX designer building accessible digital experiences for education and social impact." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Text Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 w-fit">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary-dim text-sm font-semibold font-label tracking-wide">
                Available for Projects
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black font-headline leading-[1.05] tracking-tight text-white">
              Designing<br />
              <span className="text-primary text-glow">Futures</span>,<br />
              One Pixel<br />at a Time.
            </h1>

            <p className="text-on-surface-variant text-lg leading-relaxed max-w-lg font-body">
              Hi, I'm <span className="text-white font-semibold">Dev Vachhani</span> — a high school UI/UX designer building accessible digital experiences for education and social impact. I turn complex problems into intuitive, beautiful interfaces.
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              <Link
                to="/projects"
                className="bg-primary text-on-primary font-bold px-8 py-3.5 rounded-full hover:scale-105 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 active:scale-95 font-headline text-sm"
              >
                View Portfolio
              </Link>
              <Link
                to="/me"
                className="border border-outline-variant text-on-surface font-semibold px-8 py-3.5 rounded-full hover:border-primary hover:text-primary transition-all duration-300 font-headline text-sm"
              >
                Read My Story
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex gap-8 mt-4 pt-6 border-t border-outline-variant/20">
              <div>
                <p className="text-3xl font-black font-headline text-white">12+</p>
                <p className="text-on-surface-variant text-sm font-body">Projects Shipped</p>
              </div>
              <div>
                <p className="text-3xl font-black font-headline text-white">3</p>
                <p className="text-on-surface-variant text-sm font-body">Design Awards</p>
              </div>
              <div>
                <p className="text-3xl font-black font-headline text-white">2K+</p>
                <p className="text-on-surface-variant text-sm font-body">Community Members</p>
              </div>
            </div>
          </div>

          {/* Carousel Column */}
          <div className="lg:col-span-5">
            <HeroCarousel slides={CAROUSEL_SLIDES} />
            {/* Mobile identity chip */}
            <div className="glass-panel border border-white/10 rounded-2xl px-5 py-4 mt-4 lg:hidden">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-black text-white font-headline text-sm">
                  AC
                </div>
                <div>
                  <p className="text-white font-bold font-headline text-sm">Alex Chen</p>
                  <p className="text-on-surface-variant text-xs font-body">UI/UX Designer · High School</p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-xs text-green-400 font-semibold">Open to Work</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Bento Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-10">
          <span className="text-primary font-semibold text-sm font-label tracking-widest uppercase">What I Do</span>
          <h2 className="text-4xl font-black font-headline text-white mt-2">Skills &amp; Expertise</h2>
        </div>
        <BentoSkillsGrid />
      </section>

      {/* Accomplishments */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-10">
          <span className="text-primary font-semibold text-sm font-label tracking-widest uppercase">Recognition</span>
          <h2 className="text-4xl font-black font-headline text-white mt-2">Accomplishments</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AccomplishmentCard
            title="National HS Design Challenge — 1st Place"
            date="2024"
            description="Designed an inclusive civic engagement app for first-time voters, earning top marks from a panel of industry professionals at AIGA."
            tags={['AIGA']}
            imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAv_vfUpSawN92foCqt567Oxt5-E0rfxUpwM3Om326V-0BFSNCAN2EgZEKJHZCenaUH_C6eHh0fW66x5_uobQkUP9dzFUrIUUZyoO086qUrjtZdHl1wGM6xCNQfOSbOXuVf5IuJG1iAtYSqjwjZ3AI12mMKk_8A3ABibWNvcE1jJK6vmMg-TyDZodxhYH61a0m02okS0XHmyi_Nr5Bt9HHMWpnETTveanAmPJQegdUDE3lhIoVuEekCmuuM4KKlD25Rct7MdT8d64i7"
            imageAlt="National Design Award ceremony and recognition"
            awardLabel="National Recognition"
          />
          <AccomplishmentCard
            title="Google Student Developer Challenge — Top 10"
            date="2023"
            description="Placed in the top 10 nationally for an AI-assisted reading tool for dyslexic students, combining NLP with accessible UI principles."
            tags={['Google']}
            imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuD0H7t1HzLerIYeuHhjtWaeHLo16ZaeD-sF9p0PpI0YBbCIeN9CYPBJR9-G6xW2VoQUYA0TXQaX8D8kSeGsOQRzN4H84cGj9Kh9QM5uSnTaa8XJvinzJW1ZbHheqxNFebnBkbqr-fpMsnEzs6N_O0M2H_VF067kTxF3hNvt1JT-YNdgO6ebKuwtaUgPzORYRINcZI682I_X6bnyW6niluxJ72APSWC9uZbGR5PqJDBZcC-3esj70f-rYeUvyBEQiLAeYV_1MrblvXYU"
            imageAlt="Google Student Developer Challenge award"
            awardLabel="Industry Award"
            awardIcon="star"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 mb-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary-container via-primary/80 to-tertiary-container p-12 md:p-20 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,82,255,0.15)_0%,_transparent_70%)]" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black font-headline text-white mb-6 leading-tight">
              Let's Build Something<br />
              <span className="text-primary-dim text-glow">Extraordinary</span>
            </h2>
            <p className="text-on-primary-container text-lg max-w-2xl mx-auto mb-10 font-body leading-relaxed">
              Whether you need a full design system, a mobile app, or just want to chat about UX — I'm always open to new collaborations and conversations.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-primary-container font-bold px-10 py-4 rounded-full hover:scale-105 hover:shadow-xl hover:shadow-white/20 transition-all duration-300 font-headline"
              >
                Start a Conversation
              </Link>
              <Link
                to="/projects"
                className="border-2 border-white/50 text-white font-bold px-10 py-4 rounded-full hover:border-white hover:scale-105 transition-all duration-300 font-headline"
              >
                See My Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
