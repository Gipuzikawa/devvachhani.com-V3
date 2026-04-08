import { Link } from 'react-router-dom'
import type { Article } from '../../types'

interface ArticleSidebarRelatedProps {
  currentSlug: string
  allArticles: Article[]
}

export default function ArticleSidebarRelated({ currentSlug, allArticles }: ArticleSidebarRelatedProps) {
  const relatedArticles = allArticles.filter((article) => article.slug !== currentSlug).slice(0, 3)

  return (
    <div className="bg-surface-container-high rounded-lg p-6 border border-outline-variant/10">
      <h3 className="flex items-center gap-2 font-headline font-bold text-xl mb-6">
        <span className="material-symbols-outlined text-primary">trending_up</span>
        Related Articles
      </h3>

      {relatedArticles.map((article) => (
        <Link key={article.id} to={`/articles/${article.slug}`} className="group block">
          <div className="flex gap-4 mb-6 last:mb-0">
            {article.imageUrl ? (
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0 group-hover:scale-105 transition-transform border border-outline-variant/10"
              />
            ) : (
              <div className="w-20 h-20 rounded-lg bg-surface-container-highest flex-shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface-variant">article</span>
              </div>
            )}

            <div>
              <div className="font-semibold text-sm leading-tight text-on-surface group-hover:text-primary transition-colors">
                {article.title}
              </div>
              <div className="text-xs text-on-surface-variant mt-2">
                {article.readTime} min read &middot; {article.date}
              </div>
            </div>
          </div>
        </Link>
      ))}

      <Link
        to="/articles"
        className="w-full mt-8 py-3 rounded-full border border-primary/20 text-primary text-sm font-bold hover:bg-primary/10 transition-all block text-center"
      >
        View All Articles
      </Link>
    </div>
  )
}
