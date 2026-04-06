import type { Article } from '../../types'
import ArticleCard from '../articles/ArticleCard'

interface RelatedArticlesSidebarProps {
  currentSlug: string
  allArticles: Article[]
}

export default function RelatedArticlesSidebar({ currentSlug, allArticles }: RelatedArticlesSidebarProps) {
  const related = allArticles.filter((a) => a.slug !== currentSlug).slice(0, 3)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {related.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  )
}
