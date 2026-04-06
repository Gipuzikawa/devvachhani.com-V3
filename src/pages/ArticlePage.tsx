import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { articles } from '../data/articles'
import { person } from '../data/person'
import ReadingProgressBar from '../components/article/ReadingProgressBar'
import ProseArticle from '../components/article/ProseArticle'
import RelatedArticlesSidebar from '../components/article/RelatedArticlesSidebar'

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6">
        <h1 className="text-4xl font-black font-headline text-white">Article Not Found</h1>
        <p className="text-on-surface-variant font-body">This article doesn't exist or has been removed.</p>
        <Link to="/articles" className="text-primary font-semibold font-label hover:underline">
          ← Back to Articles
        </Link>
      </div>
    )
  }

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

      {/* Hero */}
      <section className="relative overflow-hidden">
        {article.imageUrl && (
          <div className="absolute inset-0">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          </div>
        )}

        <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-primary-dim text-sm font-semibold font-label hover:text-primary transition-colors mb-6"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            View All Articles
          </Link>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="text-xs bg-primary text-on-primary px-3 py-1.5 rounded-full font-label font-bold">
              {article.category}
            </span>
            {article.tags?.map((tag) => (
              <span key={tag} className="text-xs bg-surface-container-high text-on-surface-variant px-3 py-1.5 rounded-full font-label">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-6xl font-black font-headline text-white leading-tight mb-6">
            {article.title}
          </h1>

          <p className="text-on-surface-variant text-xl font-body leading-relaxed max-w-2xl mx-auto mb-10">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-3">
              <img
                src={person.avatarUrl}
                alt="Alex Chen author photo"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="text-white font-semibold font-headline text-sm">Alex Chen</p>
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
      </section>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-6 pb-20">
        <ProseArticle body={article.body} />

        {/* Share & Tags */}
        <div className="border-t border-outline-variant/20 pt-8 mt-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {article.tags?.map((tag) => (
              <span key={tag} className="text-xs bg-primary/10 text-primary-dim px-3 py-1.5 rounded-full font-label">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-on-surface-variant text-sm font-label">Share:</span>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all"
              aria-label="Share"
            >
              <span className="material-symbols-outlined text-base">share</span>
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all"
              aria-label="Copy link"
            >
              <span className="material-symbols-outlined text-base">link</span>
            </a>
          </div>
        </div>

        {/* Author Card */}
        <div className="glass-panel border border-outline-variant/20 rounded-2xl p-6 mt-8 flex flex-col sm:flex-row gap-5 items-start">
          <img
            src={person.avatarUrl}
            alt="Alex Chen author photo"
            className="w-16 h-16 rounded-2xl object-cover flex-shrink-0"
          />
          <div>
            <p className="text-white font-black font-headline text-lg">Alex Chen</p>
            <p className="text-primary-dim text-sm font-label mb-2">UI/UX Designer · High School Junior</p>
            <p className="text-on-surface-variant text-sm font-body leading-relaxed">
              I write about design systems, accessibility, and the intersection of technology with everyday human experience. Currently building things at the edge of what high school designers usually attempt.
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

      {/* Related Articles */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="border-t border-outline-variant/10 pt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black font-headline text-white">Related Articles</h2>
            <Link
              to="/articles"
              className="text-primary font-semibold text-sm font-label flex items-center gap-1 hover:gap-2 transition-all"
            >
              All Articles <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
          <RelatedArticlesSidebar currentSlug={slug ?? ''} allArticles={articles} />
        </div>
      </section>
    </>
  )
}
