import { Link } from 'react-router-dom'
import type { Article } from '../../types'

interface FeaturedBentoProps {
  featured: Article[]
}

export default function FeaturedBento({ featured }: FeaturedBentoProps) {
  const large = featured.find((a) => a.featuredSize === 'large')
  const sides = featured.filter((a) => a.featuredSize === 'side')

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:h-[600px] h-auto gap-4">
      {/* Featured Large Article */}
      {large && (
        <div className="md:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer min-h-[300px]">
          {large.imageUrl && (
            <img
              src={large.imageUrl}
              alt={large.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs bg-primary text-on-primary px-3 py-1 rounded-full font-label font-bold">
                Featured
              </span>
              <span className="text-xs text-on-surface-variant font-label">{large.readTime} min read</span>
              <span className="text-xs text-on-surface-variant font-label">·</span>
              <span className="text-xs text-on-surface-variant font-label">{large.category}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black font-headline text-white mb-3 leading-tight">
              {large.title}
            </h2>
            <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6 max-w-xl">
              {large.excerpt}
            </p>
            <Link
              to={`/articles/${large.slug}`}
              className="inline-flex items-center gap-2 bg-white text-background font-bold px-6 py-3 rounded-full text-sm font-headline hover:scale-105 transition-all duration-300"
            >
              Read More <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      )}

      {/* Side Articles */}
      <div className="flex flex-col gap-4">
        {sides.map((article) => (
          <div
            key={article.id}
            className="flex-1 relative rounded-2xl overflow-hidden group cursor-pointer min-h-[200px]"
          >
            {article.imageUrl && (
              <img
                src={article.imageUrl}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <span className="text-xs text-primary-dim font-label">
                {article.category} · {article.readTime} min
              </span>
              <h3 className="text-lg font-bold font-headline text-white mt-1 leading-tight">{article.title}</h3>
              <Link
                to={`/articles/${article.slug}`}
                className="inline-flex items-center gap-1 text-primary-dim text-xs font-semibold mt-2 hover:gap-2 transition-all font-label"
              >
                Read More <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
