import { Link } from 'react-router-dom'
import type { Article } from '../../types'

interface ArticleCardProps {
  article: Article
  size?: 'default' | 'compact'
}

export default function ArticleCard({ article, size = 'default' }: ArticleCardProps) {
  if (size === 'compact') {
    return (
      <div className="border-b border-outline-variant/10 pb-4 last:border-0">
        <Link to={`/articles/${article.slug}`} className="group flex flex-col gap-1">
          <span className="text-xs text-primary-dim font-label">{article.category} · {article.readTime} min</span>
          <h3 className="text-sm font-bold font-headline text-white truncate group-hover:text-primary-dim transition-colors">
            {article.title}
          </h3>
        </Link>
      </div>
    )
  }

  return (
    <article className="bg-surface-container-high rounded-2xl overflow-hidden border border-outline-variant/20 hover:border-primary/30 transition-all duration-300 group">
      {article.imageUrl ? (
        <div className="aspect-video overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="aspect-video overflow-hidden bg-gradient-to-br from-tertiary/10 to-primary/5 flex items-center justify-center">
          <span className="material-symbols-outlined text-tertiary-dim text-5xl">article</span>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs bg-primary/10 text-primary-dim px-3 py-1 rounded-full font-label">
            {article.category}
          </span>
          <span className="text-xs text-on-surface-variant font-label">{article.readTime} min read</span>
        </div>
        <h3 className="text-lg font-bold font-headline text-white mb-2 leading-tight group-hover:text-primary-dim transition-colors">
          {article.title}
        </h3>
        <p className="text-on-surface-variant text-sm font-body leading-relaxed mb-4">{article.excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-on-surface-variant font-label">{article.date}</span>
          <Link
            to={`/articles/${article.slug}`}
            className="text-primary font-semibold text-sm font-label flex items-center gap-1 hover:gap-2 transition-all"
          >
            Read More <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
