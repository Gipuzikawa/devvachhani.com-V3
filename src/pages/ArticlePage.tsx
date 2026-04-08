import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { articles } from '../data/articles'
import { person } from '../data/person'
import ReadingProgressBar from '../components/article/ReadingProgressBar'
import ProseArticle from '../components/article/ProseArticle'
import FloatingSocialSidebar from '../components/article/FloatingSocialSidebar'
import ArticleSidebarRelated from '../components/article/ArticleSidebarRelated'
import NewsletterCard from '../components/articles/NewsletterCard'

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6">
        <h1 className="text-4xl font-black font-headline text-white">Article Not Found</h1>
        <p className="text-on-surface-variant font-body">This article doesn't exist or has been removed.</p>
        <Link to="/articles" className="text-primary font-semibold font-label hover:underline">
          Back to Articles
        </Link>
      </div>
    )
  }

  const articleTags = article.tags ?? []

  return (
    <>
      <Helmet>
        <title>{article.title} | Dev Vachhani</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
      </Helmet>

      <ReadingProgressBar />

      <section className="relative min-h-[60vh] overflow-hidden flex items-center">
        {article.imageUrl && (
          <div className="absolute inset-0">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover opacity-20 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          </div>
        )}

        <div className="relative z-10 max-w-5xl w-full mx-auto px-6 pt-20 pb-16 md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 text-primary-dim text-sm font-semibold font-label hover:text-primary transition-colors mb-6 self-center md:self-start"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              View All Articles
            </Link>

            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
              <span className="text-xs bg-primary text-on-primary px-3 py-1.5 rounded-full font-label font-bold">
                {article.category}
              </span>
              {articleTags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-surface-container-high text-on-surface-variant px-3 py-1.5 rounded-full font-label"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-6xl font-black font-headline text-white text-glow leading-tight mb-6">
              {article.title}
            </h1>

            <p className="text-on-surface-variant text-xl font-body leading-relaxed max-w-2xl mb-10">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
              <div className="flex items-center gap-3">
                <img
                  src={person.avatarUrl}
                  alt="Dev Vachhaniauthor photo"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="text-white font-semibold font-headline text-sm">{person.name}</p>
                  <p className="text-on-surface-variant text-xs font-body">UI/UX Designer</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-on-surface-variant text-sm font-body">
                <span className="material-symbols-outlined text-base">calendar_today</span>
                {article.date}
              </div>
              <div className="flex items-center gap-1 text-on-surface-variant text-sm font-body">
                <span className="material-symbols-outlined text-base">schedule</span>
                {article.readTime} min read
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-[-4rem] relative z-20 pb-20">
        <FloatingSocialSidebar />

        <article className="lg:col-span-7 bg-surface-container-low rounded-xl p-8 md:p-12 shadow-2xl border border-outline-variant/10">
          <ProseArticle body={article.body} />

          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-outline-variant/10">
            {articleTags.map((tag) => (
              <span
                key={tag}
                className="bg-surface-bright px-4 py-1.5 rounded-full text-xs font-label text-on-surface-variant hover:text-primary transition-colors cursor-pointer border border-outline-variant/10"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 mt-6">
            <span className="text-on-surface-variant text-sm font-label">Share:</span>
            <button
              type="button"
              aria-label="Share article"
              className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <span className="material-symbols-outlined text-base">share</span>
            </button>
            <button
              type="button"
              aria-label="Copy link"
              className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <span className="material-symbols-outlined text-base">link</span>
            </button>
          </div>

          <div className="glass-panel border border-outline-variant/20 rounded-2xl p-6 mt-8 flex flex-col sm:flex-row gap-5 items-start">
            <img
              src={person.avatarUrl}
              alt="Dev Vachhaniauthor photo"
              className="w-16 h-16 rounded-2xl object-cover flex-shrink-0"
            />
            <div>
              <p className="text-white font-black font-headline text-lg">{person.name}</p>
              <p className="text-primary-dim text-sm font-label mb-2">UI/UX Designer · High School Junior</p>
              <p className="text-on-surface-variant text-sm font-body leading-relaxed">
                I write about design systems, accessibility, and the intersection of technology with everyday human
                experience. Currently building things at the edge of what high school designers usually attempt.
              </p>
              <Link
                to="/me"
                className="inline-flex items-center gap-1 text-primary font-semibold text-sm font-label mt-3 hover:gap-2 transition-all"
              >
                More about me <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>
          </div>
        </article>

        <aside className="lg:col-span-4 space-y-6">
          <ArticleSidebarRelated currentSlug={slug ?? ''} allArticles={articles} />
          <NewsletterCard />
        </aside>
      </section>
    </>
  )
}
