import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { articles } from '../data/articles'
import { person } from '../data/person'
import FeaturedBento from '../components/articles/FeaturedBento'
import ArticleCard from '../components/articles/ArticleCard'
import ArticleFilterBar from '../components/articles/ArticleFilterBar'
import NewsletterCard from '../components/articles/NewsletterCard'

export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const featuredArticles = useMemo(() => articles.filter((a) => a.featured), [])

  const listArticles = useMemo(() => {
    const nonFeatured = articles.filter((a) => !a.featured)
    if (activeCategory === 'All') return nonFeatured
    return nonFeatured.filter((a) => a.category === activeCategory)
  }, [activeCategory])

  return (
    <>
      <Helmet>
        <title>Articles | Alex Chen · Portfolio.OS</title>
        <meta name="description" content="Research, thoughts, and stories on technology, social science, and design by Alex Chen." />
        <meta property="og:title" content="Articles | Alex Chen · Portfolio.OS" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-primary font-semibold text-sm font-label tracking-widest uppercase">
              Knowledge Base
            </span>
            <h1 className="text-5xl md:text-7xl font-black font-headline text-white mt-4 leading-tight">
              Articles &amp;<br />
              <span className="text-primary text-glow">Writing</span>
            </h1>
          </div>
          <div className="flex items-center gap-3 bg-surface-container-high rounded-2xl p-3 max-w-sm">
            <img
              src={person.avatarUrl}
              alt="Alex Chen author avatar"
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div>
              <p className="text-white font-bold font-headline text-sm">Alex Chen</p>
              <p className="text-on-surface-variant text-xs font-body">Designer · Researcher · Writer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <FeaturedBento featured={featuredArticles} />
      </section>

      {/* Article List */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black font-headline text-white">All Articles</h2>
          <ArticleFilterBar active={activeCategory} onChange={setActiveCategory} />
        </div>

        {listArticles.length === 0 ? (
          <p className="text-center text-on-surface-variant text-sm py-16">
            No articles in this category yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
            <NewsletterCard />
          </div>
        )}
      </section>
    </>
  )
}
