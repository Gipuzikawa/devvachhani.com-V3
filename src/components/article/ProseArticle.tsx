interface ProseArticleProps {
  body: string
}

export default function ProseArticle({ body }: ProseArticleProps) {
  return (
    <div
      className="prose-article"
      dangerouslySetInnerHTML={{ __html: body }}
    />
  )
}
