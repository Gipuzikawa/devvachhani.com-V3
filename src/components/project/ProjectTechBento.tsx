import type { TechCard } from '../../types'

interface ProjectTechBentoProps {
  techCards: TechCard[]
}

function getCardClasses(variant: TechCard['variant']) {
  switch (variant) {
    case 'elevated':
      return {
        wrapper: 'md:col-span-2 lg:col-span-3 p-10 bg-surface-container-high rounded-xl border border-primary/20',
        icon: 'material-symbols-outlined text-primary text-4xl mb-6',
        title: 'text-2xl font-bold mb-4 text-white',
        description: 'text-on-surface-variant mb-8',
        tags: 'px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-bold',
      }
    case 'mini':
      return {
        wrapper:
          'md:col-span-2 p-8 bg-surface-container-low rounded-xl border border-outline-variant/5 group hover:bg-surface-container transition-colors',
        icon: 'material-symbols-outlined text-secondary mb-4 group-hover:text-primary transition-colors',
        title: 'font-bold text-white',
        description: 'text-sm text-on-surface-variant mt-2',
        tags: '',
      }
    case 'standard':
    default:
      return {
        wrapper: 'md:col-span-2 lg:col-span-3 p-10 bg-surface-container rounded-xl border border-outline-variant/5',
        icon: 'material-symbols-outlined text-primary text-4xl mb-6',
        title: 'text-2xl font-bold mb-4 text-white',
        description: 'text-on-surface-variant mb-8',
        tags: 'px-4 py-2 bg-background rounded-full text-xs font-bold border border-outline-variant/20',
      }
  }
}

export default function ProjectTechBento({ techCards }: ProjectTechBentoProps) {
  return (
    <section className="space-y-12">
      <h2 className="text-3xl md:text-4xl font-headline font-extrabold tracking-tight text-on-surface">
        Technical Architecture
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {techCards.map((card) => {
          const classes = getCardClasses(card.variant)

          return (
            <article key={card.title} className={classes.wrapper}>
              <span className={classes.icon}>{card.icon}</span>
              <h3 className={classes.title}>{card.title}</h3>
              <p className={classes.description}>{card.description}</p>

              {card.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span key={tag} className={classes.tags}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
